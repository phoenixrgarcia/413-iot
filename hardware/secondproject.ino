#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#include "Particle.h"


MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255

#if defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
uint16_t irBuffer[100];
uint16_t redBuffer[100];
#else
uint32_t irBuffer[100];
uint32_t redBuffer[100];
#endif

int32_t bufferLength; // data length
int32_t spo2;         // SPO2 value
int8_t validSPO2;     // indicator to show if the SPO2 calculation is valid
int32_t heartRate;    // heart rate value
int8_t validHeartRate; // indicator to show if the heart rate calculation is valid

byte pulseLED = 11;   // Must be on PWM pin
byte readLED = 13;    // Blinks with each data read

int LED = D7; // Argon onboard LED  

String deviceID = System.deviceID(); // Argon device ID

// State Machine States
enum State {
  DATA_COLLECTION,
  STANDBY
};

State currentState = STANDBY;
unsigned long stateStartTime = 0;
bool validReadings = false;
int validReadingsCount = 0;
bool bufferInitialized = false; // Tracks if the buffer setup has been done for this cycle

int frequencyMeasured = 1800000; // Default time to wait between measurements is 30 minutes
int startHours = 0; // Default start time is 6am
int startMinutes = 0;

int endHours = 24; // Default end time is 10pm
int endMinutes = 0;

const int EEPROM_START_ADDR = 0;  // EEPROM address for stored data
const int MAX_JSON_STORAGE = 200; // Maximum size of stored JSON data

void setup() {
  Serial.begin(115200);

  pinMode(LED, OUTPUT);
  RGB.control(true); // take control of the RGB LED
  pinMode(pulseLED, OUTPUT);
  pinMode(readLED, OUTPUT);
  RGB.control(true); // take control of the RGB LED

  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println(F("MAX30105 was not found. Please check wiring/power."));
    while (1);
  }

  Serial.println(F("Place finger on sensor."));

  byte ledBrightness = 60; // Options: 0=Off to 255=50mA
  byte sampleAverage = 4;  // Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2;        // Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  byte sampleRate = 100;   // Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411;    // Options: 69, 118, 215, 411
  int adcRange = 4096;     // Options: 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange);
  currentState = DATA_COLLECTION;
  stateStartTime = millis();

   // Set up the subscription
  Particle.subscribe("updateConfig", handleUpdateConfig, MY_DEVICES);
}

void loop() {
  unsigned long currentTime = millis();

  switch (currentState) {
    case DATA_COLLECTION: {
      int timeHour = Time.hour(); // current hours time
      int timeMin = Time.minute(); // current min time

      Serial.print(timeHour);
      Serial.print(timeMin);

      
      timeHour = timeHour - 7; // convert to MST from UT

      if(timeHour < 0){
        timeHour += 24; // account for negative time
      }

      

      if((timeHour >= startHours  && timeHour < endHours) || // checks to make sure between specified hours
          (timeHour == startHours && timeMin >= startMinutes) ||
           (timeHour == endHours && timeMin <= endMinutes)) {
      if (!bufferInitialized) {
        bufferLength = 100; // Buffer length of 100 stores 4 seconds of samples at 25sps

        // Read the first 100 samples and determine the signal range
        for (byte i = 0; i < bufferLength; i++) {
          while (particleSensor.available() == false) // Wait for new data
            particleSensor.check(); // Check the sensor for new data
          digitalWrite(LED, !digitalRead(LED)); //Blink onboard LED with every data read
          RGB.color(0,0,255); // Blink the LED color blue 
          redBuffer[i] = particleSensor.getRed();
          irBuffer[i] = particleSensor.getIR();
          particleSensor.nextSample(); // Move to next sample

          Serial.print(F("red="));
          Serial.print(redBuffer[i], DEC);
          Serial.print(F(", ir="));
          Serial.println(irBuffer[i], DEC);
        }

        bufferInitialized = true; // Mark buffer setup as complete
        Serial.println(F("Initial buffer setup complete."));
        // Calculate heart rate and SpO2 after the first 100 samples
      maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
      }

      

      validReadings = (validHeartRate == 1 && validSPO2 == 1); // Makes sure that user is giving valid readings before starting
      if (validReadings){
        validReadingsCount++;
      }
        // Shift the last 75 sets of samples to the top
        for (byte i = 25; i < 100; i++) {
          redBuffer[i - 25] = redBuffer[i];
          irBuffer[i - 25] = irBuffer[i];
        }

        // Take 25 new samples
        for (byte i = 75; i < 100; i++) {
          while (particleSensor.available() == false) // Wait for new data
            particleSensor.check(); // Check the sensor for new data

          digitalWrite(LED, !digitalRead(LED)); //Blink onboard LED with every data read
          RGB.color(0,0,255); // Blink the LED color blue

          redBuffer[i] = particleSensor.getRed();
          irBuffer[i] = particleSensor.getIR();
          particleSensor.nextSample(); // Move to next sample

          Serial.print(F("red="));
          Serial.print(redBuffer[i], DEC);
          Serial.print(F(", ir="));
          Serial.print(irBuffer[i], DEC);

          Serial.print(F(", HR="));
          Serial.print(heartRate, DEC);

          Serial.print(F(", HRvalid="));
          Serial.print(validHeartRate, DEC);

          Serial.print(F(", SPO2="));
          Serial.print(spo2, DEC);

          Serial.print(F(", SPO2Valid="));
          Serial.println(validSPO2, DEC);

           // Get the current UTC time
          time_t utcTime = Time.now();

          // Take time into MST for each data push
          time_t mstTime = utcTime - (7 * 3600);

          // Format the time in ISO 8601 with MST adjustment
          String dateTime = Time.format(mstTime, TIME_FORMAT_ISO8601_FULL);

          // Create the JSON string
          String jsonData = String::format(
              "{\"deviceID\":\"%s\",\"oxygenLevel\":%d,\"heartRate\":%d,\"dateTime\":\"%s\"}",
              deviceID.c_str(), spo2, heartRate, dateTime.c_str()
          );

         // Publish sensor data if data is valid
         if(validReadings){
          if (Particle.connected()) { // if connected to wifi publishes data, else stores locally
            Particle.publish("sensorData", jsonData, PRIVATE);
            digitalWrite(LED, HIGH); //Blink onboard LED Green with successful post
            RGB.color(255,0,0); // Blink the LED color blue
            delay(250);
            digitalWrite(LED, LOW); // turn off LED
          } else {
            Serial.println("Wi-Fi not connected. Storing data locally...");
            saveToEEPROM(jsonData);
            digitalWrite(LED, HIGH); //Blink onboard LED Yellow with successful post
            RGB.color(255,255,0); // Blink the LED color 
            delay(250);
            digitalWrite(LED, LOW); // turn off LED
          }
        
         }
        }

        // Recalculate heart rate and SpO2 after 25 samples
        maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

        if (validReadings){ // increments by one every time a set of valid data is read
        validReadingsCount++;
        }
        if (validReadingsCount > 10 || currentTime - stateStartTime >= 30000)  { // After 10 valid reading cycles will move into STANDBY or if 5 minutes has passed without a measurement
          currentState = STANDBY;
          stateStartTime = currentTime;
          validReadingsCount = 0; // Reset the count for the next collection phase
          bufferInitialized = false; // Reset buffer flag for the next cycle
          Serial.println(F("Switching to STANDBY state."));
        }
    }

    // if out of operating hours will go into standby mode
    else{
      currentState = STANDBY;
      stateStartTime = currentTime;
      validReadingsCount = 0; // Reset the count for the next collection phase
      bufferInitialized = false; // Reset buffer flag for the next cycle
      Serial.println(F("Out of operating hours. Switching to STANDBY state."));
     }
     break;
    }

    case STANDBY: {
      digitalWrite(LED, HIGH);
      RGB.color(255, 0, 0); // set color red

      if (Particle.connected()) {
        Serial.println("Wi-Fi connected. Sending stored data...");
        publishStoredData();
      }

      if (currentTime - stateStartTime >= frequencyMeasured) { // After specified time in seconds will switch back to datacollection, default 30 minutes
        currentState = DATA_COLLECTION;
        stateStartTime = currentTime;
        Serial.println(F("Switching to DATA_COLLECTION state."));
      }
      break;
    }
    }
  }

void saveToEEPROM(String data) {
  int len = data.length();
  if (len > MAX_JSON_STORAGE) {
    Serial.println("Data too large to store!");
    return;
  }

  // Convert String to char array
  char charArray[len + 1];
  data.toCharArray(charArray, len + 1);

  // Store the length and data in EEPROM
  EEPROM.put(EEPROM_START_ADDR, len);
  for (int i = 0; i < len; i++) {
    EEPROM.write(EEPROM_START_ADDR + 1 + i, charArray[i]);
  }
}

void publishStoredData() {
  int len;
  EEPROM.get(EEPROM_START_ADDR, len);
  if (len <= 0 || len > MAX_JSON_STORAGE) {
    //Serial.println("No valid data stored.");
    return;
  }

  // Read stored data into a char array
  char charArray[len + 1];
  for (int i = 0; i < len; i++) {
    charArray[i] = EEPROM.read(EEPROM_START_ADDR + 1 + i);
  }
  charArray[len] = '\0'; // Null-terminate the char array

  // Convert char array to String
  String storedData = String(charArray);

  // Publish stored data
  Particle.publish("sensorData", storedData, PRIVATE);
  Serial.println("Published stored data: " + storedData);

  // Clear EEPROM
  EEPROM.put(EEPROM_START_ADDR, 0);
}

// handling of getting data for time configurations
 void handleUpdateConfig(const char *event, const char *data) {
  // Ensure data is not null
  if (data == nullptr) {
    Serial.println("Received null data.");
    return;
  }

  Serial.println("Received config update: " + String(data));

  // Parse frequencyMeasured
  const char *freqKey = "\"frequencyMeasured\":";
  char *freqStart = strstr(data, freqKey);
  if (freqStart != nullptr) {
    frequencyMeasured = atoi(freqStart + strlen(freqKey));
    Serial.println("Updated frequencyMeasured to: " + String(frequencyMeasured));
  }

  // Parse startHours
  const char *startHoursKey = "\"startHours\":";
  char *startHoursStart = strstr(data, startHoursKey);
  if (startHoursStart != nullptr) {
    startHours = atoi(startHoursStart + strlen(startHoursKey));
    Serial.println("Updated startHours to: " + String(startHours));
  }

  // Parse startMinutes
  const char *startMinutesKey = "\"startMinutes\":";
  char *startMinutesStart = strstr(data, startMinutesKey);
  if (startMinutesStart != nullptr) {
    startMinutes = atoi(startMinutesStart + strlen(startMinutesKey));
    Serial.println("Updated startMinutes to: " + String(startMinutes));
  }

  // Parse endHours
  const char *endHoursKey = "\"endHours\":";
  char *endHoursStart = strstr(data, endHoursKey);
  if (endHoursStart != nullptr) {
    endHours = atoi(endHoursStart + strlen(endHoursKey));
    Serial.println("Updated endHours to: " + String(endHours));
  }

  // Parse endMinutes
  const char *endMinutesKey = "\"endMinutes\":";
  char *endMinutesStart = strstr(data, endMinutesKey);
  if (endMinutesStart != nullptr) {
    endMinutes = atoi(endMinutesStart + strlen(endMinutesKey));
    Serial.println("Updated endMinutes to: " + String(endMinutes));
  }
}

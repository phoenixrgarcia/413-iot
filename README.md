Here is the **entire `README.md`** file **completely formatted in raw Markdown**, ready to be copied and pasted into a file. This includes **code blocks, headings, links, and file structures** all properly written in Markdown.

---

```markdown
# **413 Heart Monitoring Project**  
**By William Rains, Ishan Adhikari, and Phoenix Garcia**  

---

## **Project Overview**  
The goal of this project was to create a fully functional **Heart Monitoring System**.  

- Users can measure their **heart rate** and **blood oxygen saturation** using a physical device.  
- The recorded data is sent to the **Particle platform**, which triggers a **webhook** to forward data to our MongoDB backend.  
- The backend exposes multiple endpoints using **Express** to interact with the data.  
- The frontend is a **React** web application that allows users to:  
   - Sign in securely.  
   - View **daily** and **weekly** heart rate and blood oxygen data.  
   - Configure Particle device settings.  
   - Add new devices.  
   - Update their account password.

---

## **File Hierarchy**  
Here is the high-level structure of the project files:

```plaintext
├── public/                  # Static files and mock data
│   └── resources/
│       └── dummy_data/      # Contains dummy JSON data for local testing
├── src/
│   ├── backend/             # Backend files
│   │   ├── server.js        # Express server
│   │   ├── models/          # Mongoose schemas
│   │   └── routes/          # API routes
│   ├── frontend/            # Frontend utilities and API calls
│   ├── components/          # React components
│   ├── pages/               # Application pages
│   └── App.js               # Main React app
├── package.json             # Project dependencies and scripts
└── README.md                # This file
```

---

## **Dependencies**  
Install the following dependencies using `npm install`:

```bash
├── @emotion/react@11.13.3
├── @emotion/styled@11.13.0
├── @mui/icons-material@6.1.5
├── @mui/lab@6.0.0-beta.17
├── @mui/material@6.1.9
├── @mui/x-date-pickers@7.23.0
├── @testing-library/jest-dom@5.17.0
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── bcrypt@5.1.1
├── concurrently@9.1.0
├── cors@2.8.5
├── d3-array@3.2.4
├── date-fns@4.1.0
├── express@4.21.1
├── jwt-simple@0.5.6
├── mongoose@8.8.3
├── mongosh@2.3.3
├── nodemon@3.1.7
├── react-dom@18.3.1
├── react-router-dom@6.27.0
├── react-scripts@5.0.1
├── react@18.3.1
├── recharts@2.14.1
└── web-vitals@2.1.4
```

---

## **Running the Project**  
Follow these steps to run the project locally:

### **Step 1: Install Dependencies**  
Run the following command to install all required dependencies:  
```bash
npm install
```

### **Step 2: Start the Application**  
To launch the app, use:  
```bash
npm run dev
```
This will:  
- Start the **MongoDB database**.  
- Start the **Express backend server**.  
- Launch the **React frontend**.

---

## **MongoDB Setup**  
If you are running the project locally:  

1. **Install MongoDB Community Server**:  
   Follow this guide: [MongoDB Local Setup Guide](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database).

2. **Start MongoDB**:  
   Ensure the `mongod` command works. If not, start MongoDB manually:  
   ```bash
   mongod --dbpath ./data/db
   ```

3. **Add Mock Data**:  
   Use the mock data provided in:  
   ```plaintext
   public/resources/dummy_data/dummy_data.json
   ```
   Import it into a MongoDB database named `sensors`.

---

## **Login Credentials**  
Use the following login credentials to access the app:  
```plaintext
Email: demo@example.com
Password: password123
```

---

## **Links**  

- **Pitch Video**: [Watch on YouTube](https://www.youtube.com/watch?v=LV28VCgQyi0)  
- **Demo Video**: *[Link Placeholder]*  
- **Project Server**: *[Link Placeholder]*  

---

## **Contact**  
For any questions or collaboration, reach out to the contributors:  
- **William Rains**  
- **Ishan Adhikari**  
- **Phoenix Garcia**

---

**Enjoy using the Heart Monitoring System! 🚀**


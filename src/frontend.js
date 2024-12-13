
export async function fetchRecords() {
    try {
      const response = await fetch("http://localhost:8080/patients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Records:", data);
      return data;
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }
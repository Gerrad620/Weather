// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
// Asynchronous function to fetch API data and save it as a text file
async function fetchAndSaveJSON() {
    // Specify the API URL
    const apiURL = "https://ensemble-api.open-meteo.com/v1/ensemble?latitude=46.1787&longitude=-119.1285&hourly=temperature_2m,relative_humidity_2m,precipitation,cloud_cover,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,wind_gusts_10m,soil_temperature_0_to_10cm,soil_moisture_0_to_10cm,sunshine_duration&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&past_days=7&forecast_days=30";
    
    // Create a new Request object
    const request = new Request(apiURL);
    
    // Fetch data from the API
    const jsonData = await request.loadJSON().catch(error => {
        console.error("Failed to fetch data:", error);
        return null; // Return null if the fetch fails
    });

    // Check if jsonData is not null
    if (jsonData) {
        // Get the FileManager instance for iCloud
        const fileManager = FileManager.iCloud();

        // Define the path for the new file in the Scriptable iCloud directory
        const filePath = fileManager.joinPath(fileManager.documentsDirectory(), "apiData.txt");
        
        // Convert JSON object to a string with pretty-print formatting
        const jsonContent = JSON.stringify(jsonData, null, 2);
        
        // Write the JSON data to a file
        fileManager.writeString(filePath, jsonContent);
        
        // Log the file path to verify where the file is saved
        console.log("File saved at:", filePath);
    } else {
        console.log("No data to save.");
    }
}

// Run the function
fetchAndSaveJSON();
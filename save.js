const fs = require('fs');

let config = {};

// Function to read the configuration from the JSON file
function readConfig() {
    try {
        const data = fs.readFileSync('sliderValues.json');
        config = JSON.parse(data);
        return config
    } catch (err) {
        console.error('Error reading config file:', err);
    }
}

// Function to save the configuration to the JSON file
function updateConfig(valuesArray) {
    try {
        // Read the existing config file
        const data = fs.readFileSync('sliderValues.json');
        let config = JSON.parse(data);

        // Update the configuration values based on the received array
        valuesArray.forEach((value, index) => {
            const propertyName = `slider${index + 1}`; // Assuming the property names are slider1Value, slider2Value, ...
            config[propertyName] = value;
        });

        // Write the updated configuration back to the JSON file
        fs.writeFileSync('sliderValues.json', JSON.stringify(config, null, 2));
        console.log('Config file updated successfully.');
    } catch (err) {
        console.error('Error updating config file:', err);
    }
}

module.exports = {
    readConfig,
    updateConfig
};

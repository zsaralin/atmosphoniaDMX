const DMX = require('dmx');
const express = require('express');
const path = require('path');
const { readConfig, updateConfig } = require("./save.js");

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const port = 3000; // You can use any port number
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    import('open').then(open => {
        open.default(`http://localhost:${port}`);
    });
});

const dmx = new DMX();

const universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', 'COM7');

const multiplesOfFive = [];
// Generate multiples of 5 up to 80
for (let i = 1; i <= 16; i++) {
    multiplesOfFive.push(i * 5);
}

app.post('/process-data', (req, res) => {
    const channel = parseInt(req.body.checkboxValue);
    // Store the original channel value before updating it
    if (req.body.buttonLabel !== 'led') {
        // Update the channels and store their original values
        const originalValues = {};
        let currentChannel = channel;
        for (let i = 0; i < 16; i++) {
            universe.update({ [currentChannel]: 255 }); // Set the channel value to 255
            originalValues[currentChannel] = 255; // Store the original value
            currentChannel += 5; // Increment to the next channel
        }

        // Restore the original values after a delay
        setTimeout(() => {
            let currentChannel = channel;
            for (let i = 0; i < 16; i++) {
                universe.update({ [currentChannel]: 0 }); // Set the channel back to its original value
                currentChannel += 5; // Increment to the next channel
            }
        }, parseInt(req.body.sliderValue)); // Use the slider value as the delay
    }
    else if (req.body.buttonLabel === 'led'){
        const brightness = parseInt(req.body.sliderValue)
        multiplesOfFive.forEach(channel => {
            universe.update({ [channel]: brightness });
        });
    }
    res.status(200).send('Data processed successfully.');

});

// GET route to fetch JSON values
app.get('/get-config', (req, res) => {
    const config = readConfig();
    if (config) {
        res.json(config);
    } else {
        res.status(500).json({ error: 'Error reading config file' });
    }
});

// POST endpoint to update configuration values
app.post('/update-config', (req, res) => {
    const updatedValues = req.body; // Assuming the updated values are sent as an array in the request body
    updateConfig(updatedValues);
    res.status(200).send('Config updated successfully.');
});

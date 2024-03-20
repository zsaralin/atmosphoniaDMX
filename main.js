const DMX = require('dmx');
const express = require('express');
const path = require('path');

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
    const channel = req.body.checkboxValue;

    // Store the original channel value before updating it
    if (req.body.buttonLabel !== 'led') {
        universe.update({ [channel]: 255 });
        setTimeout(() => {
            // After processing, set the channel back to its original value
            universe.update({ [channel]: 0 });
        }, parseInt(req.body.sliderValue)); // Use the slider value as the delay
    }
    else if (req.body.buttonLabel === 'led'){
        const brightness = parseInt(req.body.sliderValue)
        console.log(brightness)
        multiplesOfFive.forEach(channel => {
            universe.update({ [channel]: brightness });
        });
    }

});
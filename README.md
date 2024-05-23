Plug the USB Enttec into the Raspberry Pi.

Open the Terminal application.

Navigate to dmx folder.

Type node main.js and press Enter.

The browser will automatically open a website. Please wait for about a minute. If it doesn't open, type http://localhost:3000 into your browser's address bar.

You will see a web page with buttons and sliders.

To save the settings for next time, click the "Save" button.

Note: if using artnet instead of usb enttec, change line 21 in main.js to: 
**const universe = dmx.addUniverse('demo', 'artnet', '192.168.1.100', { universe: 0 }). Make sure to use the appropriate ip address. **

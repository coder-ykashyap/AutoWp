const puppeteer = require("puppeteer");
const qrCode = require("qrcode-terminal");

async function printQRCodeToConsole() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com");

    // Wait for QR code to appear
    await page.waitForSelector(".W3myC");

    // Save the screenshot to a file
    // await page.screenshot({ path: "./screenshot.png" });

    const qr = require('qrcode-terminal');

// Text or URL you want to encode in the QR code
const text = 'Hello, world!';

// Generate and display the QR code in the console
qr.generate(text, { small: true }, function(qr) {
    console.log(qr);
});




 
    // await browser.close();
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

// Call the function to print the QR code to the console
printQRCodeToConsole();

const puppeteer = require("puppeteer");

async function printQRCodeToConsole() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com");

    // Wait for QR code to appear
    await page.waitForSelector(".W3myC");

    // Get the URL of the QR code image
    const qrCodeUrl = await page.evaluate(() => {
      const qrCodeElement = document.querySelector("canvas");
      return qrCodeElement.toDataURL();
    });

    // Print the QR code URL to the console
    console.log(qrCodeUrl);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

// Call the function to print the QR code URL to the console
printQRCodeToConsole();


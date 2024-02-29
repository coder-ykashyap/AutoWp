const express = require("express");
const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require("path");

const app = express();

// Initialize the browser outside of the route handlers
let browser;
let page;

(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
})();

app.get("/qr-code", async (req, res) => {
  console.log("called");
  try {
    await page.goto("https://web.whatsapp.com");

    // Wait for QR code to appear
    await page.waitForSelector(".W3myC");

    await page.screenshot({ path: "./screenshot.png" });

    const filePath = path.join(__dirname, "screenshot.png");

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(err);
        return res.status(404).send("File not found");
      }

      // Stream the file to the response
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });
  } catch (error) {
    console.log(error, "some error occurred");
    res.status(500).send("Internal Server Error");
  }
});
app.get("/close", async (req, res) => {await browser.close(0)})

app.get("/sms", async (req, res) => {

let {msg , to} = req.query;
console.log(to,msg);
  try {
    // const page = await browser.newPage();
    // await page.goto("https://web.whatsapp.com");

    setInterval(async () => {
      await page.click(".iq0m558w");

      // Type recipient's name
      await page.waitForSelector("._2vDPL");
      await page.type("._2vDPL", to);
      // await page.waitForTimeout(3000); // Add a delay for the search results to appear

      //   // Click on the chat
      //   await page.waitForSelector("._8nE1Y");
      //   await page.click("._8nE1Y");

      await page.keyboard.press("Enter");

      await page.waitForSelector("._3Uu1_");
      await page.type("._3Uu1_", msg);

      await page.keyboard.press("Enter");
    }, 5000);

    res.send("Done");

    // Handle /hello route logic here
  } catch (error) {
    console.log(error, "some error occurred");
    res.status(500).send("Internal Server Error");
  }
});

app.listen(1000, () => {
  console.log("Server is running on port 1000");
});

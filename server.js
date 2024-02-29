const express = require("express");
const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require("path");

const app = express();

// Initialize the browser outside of the route handlers
let browser;

(async () => {
    browser = await puppeteer.launch({ headless: false });
})();

app.get("/qr-code", async (req, res) => {
    console.log("called");
    try {
        const page = await browser.newPage();
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

app.get("/hello", async (req, res) => {
    try {
        const page = await browser.newPage();
        // Handle /hello route logic here
    } catch (error) {
        console.log(error, "some error occurred");
        res.status(500).send("Internal Server Error");
    }
});

app.listen(1000, () => {
    console.log("Server is running on port 1000");
});

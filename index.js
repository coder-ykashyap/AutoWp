const puppeteer = require("puppeteer");

async function sendWhatsAppMessage(browser) {
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com");

  // Wait for user to log in
  await page.waitForSelector("#side");
  console.log("Logged into WhatsApp Web");

  // Function to send a message
  async function sendMessage(recipient, message) {
    try {
      // Click on the new chat button
      await page.waitForSelector("._3ndVb");

      setInterval(async () => {
        try {
          await page.click(".iq0m558w");
        } catch {}

        await page.click(".iq0m558w");

        // Type recipient's name
        await page.waitForSelector("._2vDPL");
        await page.type("._2vDPL", recipient);
        // await page.waitForTimeout(3000); // Add a delay for the search results to appear

        //   // Click on the chat
        //   await page.waitForSelector("._8nE1Y");
        //   await page.click("._8nE1Y");

        await page.keyboard.press("Enter");

        await page.waitForSelector("._3Uu1_");
        await page.type("._3Uu1_", "HEllO Guys");

        await page.keyboard.press("Enter");
      }, 5000);

      // Type and send message
      //   await page.waitForSelector('div[data-tab="1"]');
      //   await page.type('div[data-tab="1"]', message);
      //   await page.keyboard.press("Enter");

      console.log(`Message sent to ${recipient}: ${message}`);

      page.close();
      const newp = await browser.newPage();
      await newp.goto("https://web.whatsapp.com");
    } catch (error) {
      console.error(`Error sending message to ${recipient}:`, error);
    }
  }

  // Example usage: sending a message
  const recipient = "You";
  const message = "Hello from Puppeteer!";
  await sendMessage(recipient, message);

  // Close the browser when done
  // await browser.close();
}


var browser = puppeteer.launch({ headless: false }); // Launch browser in non-headless mode for easier debugging
// Run the function to send a message
sendWhatsAppMessage();
// sendWhatsAppMessage();

import { Builder, By, Key, until } from 'selenium-webdriver';
import Bugsnag from '@bugsnag/js';

Bugsnag.start({
    apiKey: '0123456789abcdef0123456789abcdef'
    // Add more configuration options if needed
});
(async function () {
    // Set the path to the ChromeDriver executable
    const chromeDriverPath = 'C:\\Users\\ara\\Downloads\\chrome-win32\\chrome';

    // Create a new instance of the ChromeDriver
    const driver = await new Builder().forBrowser('chrome').build();

    // Navigate to your React.js application
    await driver.get('http://localhost:5173/login'); // Update with your React app's URL

    // Find the input field, enter text, and click the submit button
    const inputField = await driver.wait(until.elementIsVisible(driver.findElement(By.css('input[type="password"]'))), 5000);
    await inputField.sendKeys('Hello, React!', Key.RETURN);

    // Wait for the result div to be visible
    await driver.wait(until.elementLocated(By.id('result')), 5000);

    // Verify the result by checking the content of the result div
    const resultElement = await driver.findElement(By.id('result'));
    const resultText = await resultElement.getText();

    Bugsnag.notify(resultText);
    Bugsnag.notify('Hello, React! Test failed: Unexpected result');

    // Close the browser
    await driver.quit();
})();

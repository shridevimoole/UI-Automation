const {test, expect} = require('@playwright/test');
//importing class
const {SaveSettingsPage} = require('../pageobjects/SaveSettings');

test.only('Gift card with page object', async({page})=>
{
  const transactionType = 'PAYMENT';
  const status = 'APPROVED';
  const grossAmount = '0.5';
  //const paymentData = page.locator("#accordionRequests-7");
  const apikey = "haTdoUWVhnXm5n75u6d0VG67vCCvKjQC";
  const userid = "121233";

     // creating object for SaveSettings and initializing objects
     const saveSettingsPage = new SaveSettingsPage(page);


   saveSettingsPage.goToTestHarness();
   saveSettingsPage.createSettings(apikey, userid, grossAmount );

    // Gift Card:
    await page.locator('text=Add gift card').click(); 
    await page.locator("[placeholder='Gift Card Number']").fill("6280005569396956162");
    await page.locator("[id='inline-form-input-pin']").fill("8923");
    await page.locator('text=Save card to my digital wallet').click();
    await page.locator('button:has-text("Pay")').nth(1).click();
  
    await page.locator('[placeholder="amount"]').click();
    // Fill [placeholder="amount"]
    await page.locator('[placeholder="amount"]').fill('0.5');
    // Click text=Pay $0.50 with Gift Card/s
    await page.locator('text=Pay $0.50 with Gift Card/s').click();
    await page.locator(".circle-loader load-complete").isVisible();
    
    // Validate from Network:
    await page.locator("text=' Network '").click();
    const paymentDetails = await page.locator("#accordionRequests-5").allTextContents();
    console.log(paymentDetails);
    await expect(page.locator("#accordionRequests-5")).toContainText("APPROVED");
    await expect(page.locator("#accordionRequests-5")).toContainText('status:"APPROVED"');
    await expect(page.locator("#accordionRequests-5")).toContainText('grossAmount:0.5');
 
    page.pause();
 
});
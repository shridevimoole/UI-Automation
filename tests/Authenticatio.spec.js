const {test, expect} = require('@playwright/test');



test('GooglePay with Authentication', async({browser})=>
{
   //
   const context = await browser.newContext({
       storageState: "./auth.json"
   })
    const page = await context.newPage();
    const transactionType = 'PAYMENT';
    const status = 'APPROVED';
    const grossAmount = '0.5';
    const paymentData = page.locator("#accordionRequests-7");


    await page.goto("https://wpay.z26.web.core.windows.net/");
   

    await expect(page).toHaveTitle("3ds-test-harness");    
    // console.log(await page.title("3ds-test-harness"));
  
    //css, xpath seclectors:
      // Merchant Details
     // await page.locator('text=Merchant').click();
      await page.locator('#apiKey').fill('');
      //await page.fill('#apiKey','haTdoUWVhnXm5n75u6d0VG67vCCvKjQC');
      await page.locator('#apiKey').type("9JMPM102iV1PtnO6HwZoorYNpdfqAWap");  
      await page.locator('text=Merchant').click();
  
      // Customer Details:   
      await page.locator('text=Customer').click(); 
      await page.locator("[id='userId']").fill('');
      await page.locator("[id='userId']").type("1221");
      await page.locator('text=Customer').click(); 
  
      // Payment Request:
      await page.locator('text=Payment Request').click(); 
      await page.locator("[id='grossAmount']").fill('');
      await page.locator("[id='grossAmount']").type("0.5");
      // Turn off two step payment:
      await page.locator("[for='twoStepPayment']").click();
      await page.locator('text=Payment Request').click();  
  
      // Save Settings:
      await page.locator("[type='submit']").click(); 
  
      //Google Pay
      await page.locator("text=Google Pay").click();
      //const framesPage = await page.frameLocator("iframe.gpay-card-info-iframe gpay-card-info-iframe-fade-in");
     // framesPage.locator("a[href*='pay.google.com']").click();


    // await page.locator("[id='google-pay-btn']").click();

     // await page.frameLocator('iframe').locator('[aria-label="Google Pay"]:visible').click();
     // await page.locator["[id='google-pay-btn']"].click();
     // await page.waitForTimeout(5000);
      //await page.locator("button.gpay-card-info-container black long en").click();
     // await page.locator("[aria-label='Google Pay']").click();
     //await page.locator("iframe.gpay-card-info-container black long en").click();
     
      await page.waitForTimeout(5000);
      // wait for dialog to appear
     // page.on('dialog', dialog => dialog.accept())
     // await page.waitForTimeout(5000);
      
      await page.locator("text=Continue").click();
      
  
      
      page.pause();
     /* page.close();
      browser.close();
      playwright.close(); */
   

});
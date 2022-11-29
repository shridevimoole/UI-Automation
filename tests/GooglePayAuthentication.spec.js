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


      //New pop-up window  
      context.waitForEvent()
      const [newPage]  = await Promise.all([
          context.waitForEvent('page'),
          await page.locator("[aria-label='Google Pay']").click(),
        
    
      ])

      // Child frame in POP up window:
      const framesPage = newPage.frameLocator("#sM432dIframe");
      await page.waitForTimeout(7000);
      await framesPage.locator("text=Continue").click();
      
      await page.waitForTimeout(15000);

     
      await page.locator(".circle-loader load-complete").isVisible();
      // Validate from Network:
    await page.locator("text=' Network '").click();
    const paymentDetails = await page.locator("#accordionRequests-4").allTextContents();
    console.log(paymentDetails);
    await expect(page.locator("#accordionRequests-4")).toContainText("APPROVED");
    await expect(page.locator("#accordionRequests-4")).toContainText('status:"APPROVED"');
    await expect(page.locator("#accordionRequests-4")).toContainText('grossAmount:0.5');
 
    page.pause();
   

     /* page.close();
      browser.close();
      playwright.close(); */
   

});
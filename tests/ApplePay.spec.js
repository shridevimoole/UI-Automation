const {test, expect} = require('@playwright/test');

// Run tests in this file with portrait-like viewport.
//test.use({ viewport: { width: 600, height: 900 } });


/*
(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({
    ...iPhone
  });
  const page = await context.newPage();
  await page.goto('http://example.com');
  // other actions...
  await browser.close();
})();

*/
test('ApplePay with Authentication', async()=>
{
const { webkit, devices } = require('@playwright/test');
const iPhone11 = devices['iPhone 11 Pro']
const browser = await webkit.launch();   
const context = await browser.newContext({
    viewport: iPhone11.viewport,
    userAgent: iPhone11.userAgent,
    ignoreHTTPSErrors: true
  })
  /* const context = await browser.newContext({
    ...iPhone11
  });*/

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
     await page.locator("[id='userId']").type("12213");
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
 
     //Apple Pay
     await page.locator("text=Apple Pay").click();
     page.pause();

});


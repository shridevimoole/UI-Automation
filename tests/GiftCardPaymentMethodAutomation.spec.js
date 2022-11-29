const {test, expect} = require('@playwright/test');

test('Gift card', async({page})=>
{
    const transactionType = 'PAYMENT';
    const status = 'APPROVED';
    const grossAmount = '0.5';
    const paymentData = page.locator("#accordionRequests-7");


    await page.goto("https://wpay.z26.web.core.windows.net/");
    //get title - assertions
    await expect(page).toHaveTitle("3ds-test-harness");    
  // console.log(await page.title("3ds-test-harness"));

  //css, xpath seclectors:
    // Merchant Details
   // await page.locator('text=Merchant').click();
    await page.locator('#apiKey').fill('');
    await page.fill('#apiKey','haTdoUWVhnXm5n75u6d0VG67vCCvKjQC');
   // await page.locator('#apiKey').type("9JMPM102iV1PtnO6HwZoorYNpdfqAWap");  
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
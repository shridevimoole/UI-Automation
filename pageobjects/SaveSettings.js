const {test, expect} = require('@playwright/test');

class SaveSettingsPage
{
   

    constructor(page)
    {
        this.page = page; // making page to be used outside the constructor
        // Storing locators in a variable
        this.merchantApiKey = page.locator('#apiKey');
        this.userId = page.locator("[id='userId']");
        this.total = page.locator("[id='grossAmount']");
        this.twoStepPayment = page.locator("[for='twoStepPayment']");

        this.merchantTab = page.locator('text=Merchant');
        this.customerTab = page.locator('text=Customer');
        this.paymentRequestTab = page.locator('text=Payment Request');
        this.submitSaveSettings = page.locator("[type='submit']");
    }

    async createSettings(apikey, userid, amount)
    {

        // Merchant Details:
        await this.merchantApiKey.fill('');   
        await this.merchantApiKey.type(apikey); 
        // await this.merchantApiKey.type(apikey);  
         await this.merchantTab.click();


        // Customer Details:   
        await this.customerTab.click(); 
        await this.userId.fill('');
        await this.userId.type(userid);
        await this.customerTab.click(); 

        // Payment Request:
        await this.paymentRequestTab .click(); 
        await this.total.fill('');
        await this.total.type(amount);

        // Turn off two step payment:
        await this.twoStepPayment.click();
        await this.paymentRequestTab.click();  

        // Save Settings:
        await this.submitSaveSettings.click(); 
    }

    async goToTestHarness()
    {

        await this.page.goto("https://wpay.z26.web.core.windows.net/");
        //get title - assertions
        await expect(this.page).toHaveTitle("3ds-test-harness");    
    }

}
module.exports = {SaveSettingsPage};
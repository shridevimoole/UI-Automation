const {test, expect} = require('@playwright/test');

test('First playwright test', async ({browser})=>
{
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    const context =await browser.newContext();
    const page =await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   // CSS
   await userName.type("shridevireddy");
   await page.locator("[type='password']").type("learning");
   await signIn.click();
   console.log(await page.locator("[style*='block']").textContent())
   await expect(page.locator("[style*='blocak']")).toContainText("Incorrect");
//type - fill (fill will clear and fill)
// wipe out the content
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();

console.log(await cardTitles.nth(1).textContent());
console.log(await cardTitles.first().textContent());
// All products
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);



});


test('Second playwright test', async ({page})=>
{
    
   await page.goto("https://google.com");
   //get title- assertion
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");


});
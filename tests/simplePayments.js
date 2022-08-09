import { expect, test } from "@playwright/test";

test("IDM Login", ({request, baseURL})=>
{
   const _response =  await request.post('${baseURL}', {
       data: { 
        "shopperId": "4981656674674",
        "username": "1656674674"
    }
   });
   expect(_response.status()).toBe(201);
   expect(_response.ok()).toBeTruthy();

})
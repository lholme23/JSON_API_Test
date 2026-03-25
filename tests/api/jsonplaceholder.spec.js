// tests/api/jsonplaceholder.spec.js
import {test, expect} from '@playwright/test';
import { JsonPlaceholderClient } from '../../pages/api/JsonPlaceholderClient';
import {
    API_BASE,
    newPost,
    updatedPost,
    productIDForGet,
    notFoundID
} from '../../test-data/apiData';

test.describe('API Testing with Playwright (Page + Data + Test)', () => {
    test('Product lifecycle flow: list > get > create > update > delete > 404 check', async ({request}) => {
        console.log('=== Starting API Test: Product Lifecycle===');
        const api = new JsonPlaceholderClient(request, API_BASE);
        
        //1. List all products (GET /posts)
        console.log('➝ Start Step 1: Fetching product list...');
        const products = await api.listPosts();
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        console.log(`✅ Complete Step 1 - ${products.length} products fetched successfully.`);

        //2. Get one product (GET /posts/:id)
        console.log(`➝ Start Step 2: Fetching product with ID ${productIDForGet}...`);
        const getRes = await api.getPost(productIDForGet);
        expect(getRes.status()).toBe(200);
        const product = await getRes.json();
        expect(product.id).toBe(productIDForGet); //just saying 1 should equal 1 (from test-data page)
        expect(product.title).toBeTruthy(); //just want to make sure we get a title back
        console.log(`✅ Complete Step 2 - Product Title: "${product.title}"`);

        //3. Create new product (POST /posts)
        console.log('➝ Start Step 3: Creating a new product...');
        const createRes = await api.createPost(newPost);
        expect(createRes.status()).toBe(201); //201 created (W3 schools explains the codes)
        const created= await createRes.json();
        expect(created.title).toBe(newPost.title);
        console.log(`✅ Complete Step 3- Product created with ID: ${created.id}`);

        //4. Update product (PUT /posts/:id)
        console.log('➝ Start Step 4: Updating existing product...');
        const updateRes = await api.updatePost(1, updatedPost);
        expect(updateRes.status()).toBe(200);
        const updated = await updateRes.json();
        expect(updated.title).toBe(updatedPost.title);
        console.log('✅ Complete Step 4- Product updated successfully');

        //5 Delete product (DELETE /posts/:id)
        console.log('➝ Start Step 5: Deleting product...');
        const deleteRes = await api.deletePost(1);
        expect (deleteRes.status()).toBe(200);
        console.log('✅ Complete Step 5- Product deleted successfully');

        //6. Negative test (404 not found)
        console.log('➝ Start Step 6: Testing 404 error response...');
        const notFoundRes = await api.getPost(notFoundID);
        expect(notFoundRes.status()).toBe(404);
        console.log('✅ Complete Step 6- 404 error handled corretly');

        console.log("🎯Test Complete: All API steps executed successfully.\n");
    });

    test('User API: validate structure and extract emails', async ({request}) => {
        console.log('=== Starting API Test: User Data Validation ===');
        const api = new JsonPlaceholderClient(request, API_BASE);

        //1. Get user list
        console.log('➝ Start Step 1: Fetching users...');
        const users = await api.listUsers();
        expect(Array.isArray(users)).toBe(true);
        console.log(`✅ Complete Step 1 - ${users.length} users returned.`);

        //2 Validate structure
        console.log('➝ Start Step 2: Validating user structure...');
        for (const u of users) {
            expect(u).toHaveProperty('id');
            expect(u).toHaveProperty('name');
            expect(u).toHaveProperty('email');
            expect(u.address).toHaveProperty('city');
        }
        console.log('✅ Complete Step 2- User data structure validated');

        //3. Extract emails
        console.log('➝ Start Step 3: Extracting user emails...');
        const emails = users.map(u => u.email);
        expect(emails.every(e => e.includes('@'))).toBe(true);
        console.log(`✅ Complete Step 3- ${emails.length} valid emails found`);

        console.log('🎯 Test Complete: User data validated successfully');
    });
}); 

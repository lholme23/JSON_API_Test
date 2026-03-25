//test-data/apiData.js

//BaseURL for the public demo API
export const API_BASE = 'https://jsonplaceholder.typicode.com';

//Sample payloads for create/update flows
export const newPost= {
    title: 'Test Product',
    body: 'This is a test product created via API',
    userID: 1,
};

export const updatedPost = {
    id: 1,
    title: 'Updated Test Product',
    body: 'This product has been updated',
    userID: 1,
};

// A productID to use when fetching single "product" (post)
export const productIDForGet = 1;

// A non-existing id to force a 404
export const nonFoundID= 999999;
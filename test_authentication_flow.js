// Test script to verify the complete authentication and coupon purchase flow
const axios = require('axios');

const BASE_URL = 'http://localhost:8082/api';

async function testAuthenticationFlow() {
    console.log('🧪 Testing Customer 20 Authentication and Coupon Purchase Flow...\n');

    try {
        // Step 1: Test Customer 20 Login
        console.log('1️⃣ Testing Customer 20 Login...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'customer20@gmail.com',
            password: 'password20',
            clientType: 'CUSTOMER'
        });

        if (loginResponse.status === 200) {
            console.log('✅ Customer 20 login successful');
            console.log('📝 Token received:', loginResponse.data.token ? 'Yes' : 'No');
            
            const token = loginResponse.data.token;
            const headers = { Authorization: `Bearer ${token}` };

            // Step 2: Test Token Validation by getting customer details
            console.log('\n2️⃣ Testing Token Validation...');
            try {
                const customerResponse = await axios.get(`${BASE_URL}/customer/details`, { headers });
                console.log('✅ Token validation successful');
                console.log('👤 Customer details:', {
                    id: customerResponse.data.id,
                    email: customerResponse.data.email,
                    firstName: customerResponse.data.firstName,
                    lastName: customerResponse.data.lastName
                });
            } catch (error) {
                console.log('❌ Token validation failed:', error.response?.status, error.response?.data);
            }

            // Step 3: Test Coupon Purchase (Coupon 1)
            console.log('\n3️⃣ Testing Coupon 1 Purchase...');
            try {
                const purchaseResponse = await axios.post(
                    `${BASE_URL}/company/customer_coupon/11/1`, 
                    {}, 
                    { headers }
                );
                console.log('✅ Coupon 1 purchase successful');
                console.log('🎫 Purchase details:', purchaseResponse.data);
            } catch (error) {
                if (error.response?.status === 400 && error.response?.data?.includes('already has')) {
                    console.log('ℹ️ Coupon 1 already owned (expected behavior)');
                } else {
                    console.log('❌ Coupon 1 purchase failed:', error.response?.status, error.response?.data);
                }
            }

            // Step 4: Test Coupon Purchase (Coupon 3 - should be new)
            console.log('\n4️⃣ Testing Coupon 3 Purchase...');
            try {
                const purchaseResponse = await axios.post(
                    `${BASE_URL}/company/customer_coupon/11/3`, 
                    {}, 
                    { headers }
                );
                console.log('✅ Coupon 3 purchase successful');
                console.log('🎫 Purchase details:', purchaseResponse.data);
            } catch (error) {
                if (error.response?.status === 400 && error.response?.data?.includes('already has')) {
                    console.log('ℹ️ Coupon 3 already owned');
                } else {
                    console.log('❌ Coupon 3 purchase failed:', error.response?.status, error.response?.data);
                }
            }

            // Step 5: Get Customer's Coupons
            console.log('\n5️⃣ Getting Customer 20 Coupons...');
            try {
                const couponsResponse = await axios.get(`${BASE_URL}/customer/coupons`, { headers });
                console.log('✅ Customer coupons retrieved successfully');
                console.log('🎫 Number of coupons owned:', couponsResponse.data.length);
                couponsResponse.data.forEach((coupon, index) => {
                    console.log(`   ${index + 1}. ${coupon.title} - $${coupon.price}`);
                });
            } catch (error) {
                console.log('❌ Failed to get customer coupons:', error.response?.status, error.response?.data);
            }

        } else {
            console.log('❌ Customer 20 login failed');
        }

    } catch (error) {
        console.log('❌ Login failed:', error.response?.status, error.response?.data);
    }

    console.log('\n🏁 Test completed!');
}

// Run the test
testAuthenticationFlow();

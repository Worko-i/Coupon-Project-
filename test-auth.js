// Simple test to verify JWT token handling
const jwt = require('jsonwebtoken');

// Sample token from server response
const token = "eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJmaXJzdDIwIiwibGFzdE5hbWUiOiJsYXN0MjAiLCJjbGllbnRUeXBlIjoiQ1VTVE9NRVIiLCJpZCI6MTEsImVtYWlsIjoiY3VzdG9tZXIyMEBnbWFpbC5jb20iLCJpYXQiOjE3NDgyNzk4NTMsImV4cCI6MTc0ODI4MTY1M30.NtzDvkzjVQujz_YCPBuLe233EBtgpiDkBLpvX_aUNn8";

try {
    const decoded = jwt.decode(token);
    console.log("Token payload:", JSON.stringify(decoded, null, 2));
    
    // Check if all required UserModel fields are present
    const requiredFields = ['id', 'email', 'clientType', 'firstName', 'lastName'];
    const missingFields = requiredFields.filter(field => !decoded.hasOwnProperty(field));
    
    if (missingFields.length === 0) {
        console.log("✅ All required UserModel fields are present");
    } else {
        console.log("❌ Missing fields:", missingFields);
    }
    
    // Test token expiration
    const now = Math.floor(Date.now() / 1000);
    const isExpired = decoded.exp <= now;
    console.log("Token expired:", isExpired);
    console.log("Current time:", now);
    console.log("Token exp:", decoded.exp);
    
} catch (error) {
    console.error("Error decoding token:", error);
}

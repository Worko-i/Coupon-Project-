interface UserModel{
    id?: number; // Optional since admin tokens don't have an ID
    email: string;
    password?: string; // Optional since it's not always included in JWT
    clientType: string;
    // Customer fields
    firstName?: string; // Optional for companies/admins
    lastName?: string;  // Optional for companies/admins
    // Company fields
    name?: string; // Optional for customers/admins
    // Admin fields
    role?: string; // Optional for customers/companies
    iat?: number; // JWT issued at time
    exp?: number; // JWT expiration time
}

export default UserModel;
interface UserModel{
    id?: number;
    email: string;
    password?: string;
    clientType: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    exp?: number;    // JWT expiration timestamp
    iat?: number;    // JWT issued at timestamp
}

export default UserModel;
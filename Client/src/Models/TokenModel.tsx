/**
 * Model representing the token response from the server
 */
class TokenModel {
    token: string | null = null;
    expiration: number | null = null; // Server response expiration timestamp

    constructor(token: string, expiration: number) {
        this.token = token;
        this.expiration = expiration;
    }
}

export default TokenModel;
package com.example.CouponProject.token;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.CouponProject.enums.ClientType;
import com.example.CouponProject.login.ClientTypeLoggedIn;
import com.example.CouponProject.user.UserData;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class TokenService {

    @Value("${jwt.secret:jwtCouponSystemSecretKey2025!@#$}")
    private String secretKey;
    
    // Make ClientTypeLoggedIn optional with @Autowired(required=false)
    @Autowired(required = false)
    private ClientTypeLoggedIn clientTypeLoggedIn;

    public TokenService() {
        // Default constructor
    }

    // Constant for token expiration duration (30 minutes)
    private static final long TOKEN_EXPIRATION_DURATION = 1000 * 60 * 30; // 30 minutes

    // function that receives a map and creates a token
    public String generateToken(Map<String, Object> claims) {
        long currentTimeMillis = System.currentTimeMillis();
        Date issuedAt = new Date(currentTimeMillis);
        Date expiration = new Date(currentTimeMillis + TOKEN_EXPIRATION_DURATION);

        // Add standard claims
        claims.put("iat", issuedAt.getTime() / 1000); // Standard JWT claim for issued at time
        claims.put("exp", expiration.getTime() / 1000); // Standard JWT claim for expiration time

        return Jwts.builder()
                .addClaims(claims)
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // function that receives the token as a parameter and returns true if the token is NOT expired
    public boolean isExpirationToken(String token) {
        return new Date().before(this.getExpirationFromToken(token));
    }

    // function that receives the token as a parameter and returns the expiration date of the token
    public Date getExpirationFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody().getExpiration();
        } catch (Exception e) {
            log.error("Error getting expiration from token: {}", e.getMessage());
            return new Date(0); // Return epoch time which is always expired
        }
    }

    // function that receives the token as a parameter and returns the creation date of the token
    public Date getCreationFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody().getIssuedAt();
        } catch (Exception e) {
            log.error("Error getting creation date from token: {}", e.getMessage());
            return null;
        }
    }

    // function that receives the token as a parameter and returns the email from the token
    public String getEmailFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("email").toString();
        } catch (Exception e) {
            log.error("Error getting email from token: {}", e.getMessage());
            return null;
        }
    }

    // function that receives the token as a parameter and returns the clientType from the token
    public String getClientTypeFromToken(String token) {
        try {
            String clientType = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("clientType").toString();
                    
            // Only try to set the clientType if the clientTypeLoggedIn is not null
            if (clientType != null && clientTypeLoggedIn != null) {
                try {
                    clientTypeLoggedIn.setClientType(ClientType.valueOf(clientType));
                } catch (Exception e) {
                    log.error("Error setting client type: {}", e.getMessage());
                }
            }
            return clientType;
        } catch (Exception e) {
            log.error("Error getting client type from token: {}", e.getMessage());
            return null;
        }
    }

    // function that receives the token as a parameter and returns the id from the token
    public int getIdFromToken(String token) {
        try {
            String id = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("id")
                    .toString();
            return Integer.parseInt(id);
        } catch (Exception e) {
            log.error("Error getting id from token: {}", e.getMessage());
            return 0;
        }
    }

    public Map<String, Object> buildClaims(UserData userData) {
        Map<String, Object> claims = new HashMap<>();
        if (userData != null) {
            if (userData.getEmail() != null) claims.put("email", userData.getEmail());
            if (userData.getFirstName() != null) claims.put("firstName", userData.getFirstName());
            if (userData.getLastName() != null) claims.put("lastName", userData.getLastName());
            if (userData.getClientType() != null) claims.put("clientType", userData.getClientType());
        }
        return claims;
    }
}

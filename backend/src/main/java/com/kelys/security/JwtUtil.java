package com.kelys.security;

import com.kelys.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    @Value("${app.jwt.secret}")
    private String secretKey;
    
    @Value("${app.jwt.expiration}")
    private long jwtExpirationMs;
    
    @Value("${app.jwt.refresh-expiration}")
    private long refreshExpirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof User u) {
            claims.put("role", u.getRole().name());
        }
        return Jwts.builder().claims(claims).subject(userDetails.getUsername())
                .issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey()).compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return Jwts.builder().subject(userDetails.getUsername())
                .issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + refreshExpirationMs))
                .signWith(getSigningKey()).compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String email = extractEmail(token);
            return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
}

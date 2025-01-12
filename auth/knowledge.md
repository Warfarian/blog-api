# Authentication

## JWT Implementation
- Uses Bearer token scheme in Authorization header
- Client should store JWT in localStorage for simplicity
- Token verification done via middleware (authenticateToken)

### Current Implementation
- Access tokens expire in 15s
- Refresh tokens stored in database with 7 day expiry
- Refresh token endpoint: POST /api/auth/token
- Login endpoint: POST /api/auth/login 
- Logout endpoint: DELETE /api/auth/logout

### Token Refresh Pattern
1. Store both tokens after login
2. Use access token for API calls
3. When request fails with 403, use refresh token to get new access token
4. Retry failed request with new access token
5. If refresh fails, redirect to login

### Future Considerations
Could explore more secure alternatives later:
- HTTP-only cookies
- Cross-site cookie configuration for production
- Shorter token expiration with automatic refresh
- Additional security headers

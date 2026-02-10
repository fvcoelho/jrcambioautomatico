# Admin Access Configuration

## How to Access Admin Panel

The admin panel is protected by a simple localStorage check. To gain access:

### Method 1: Browser Console (Recommended)

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Run this command:

```javascript
localStorage.setItem('jrcambio_admin_access', 'jrcambio_admin_2024')
```

4. Refresh the page or navigate to `/admin`

### Method 2: Directly in Code

The access key is stored in `/src/components/AdminAuth.tsx`:

```typescript
const ADMIN_ACCESS_KEY = 'jrcambio_admin_2024'
const STORAGE_KEY = 'jrcambio_admin_access'
```

### How It Works

- The `AdminAuth` component checks localStorage for the key `jrcambio_admin_access`
- If the value matches `jrcambio_admin_2024`, access is granted
- If not, the user is redirected to the home page
- The check happens on every page under `/admin/*`

### Removing Access

To remove access, run in browser console:

```javascript
localStorage.removeItem('jrcambio_admin_access')
```

### Changing the Access Key

To change the access key, edit the `ADMIN_ACCESS_KEY` constant in:
- `/src/components/AdminAuth.tsx`

### Security Note

This is a simple client-side protection suitable for:
- Development environments
- Internal tools
- Low-security admin panels

For production environments with sensitive data, implement proper server-side authentication with JWT tokens, sessions, or a complete authentication solution.

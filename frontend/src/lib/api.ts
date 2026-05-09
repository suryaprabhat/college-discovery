// Central API base URL — set NEXT_PUBLIC_API_URL in Vercel environment variables
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export default API_BASE;

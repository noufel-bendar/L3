// Auto-detect environment and use appropriate API base URL
const API_BASE = import.meta.env.VITE_API_BASE || 
  (import.meta.env.DEV ? 'http://localhost:8000/api' : 'https://l3-dkrz.onrender.com/api');

async function getJson(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`API Error for ${path}:`, error);
    throw new Error(`Failed to fetch data from ${path}: ${error.message}`);
  }
}

export { API_BASE, getJson };



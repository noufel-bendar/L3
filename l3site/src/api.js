const API_BASE = import.meta.env.VITE_API_BASE || 'https://l3-dkrz.onrender.com/api';

async function getJson(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export { API_BASE, getJson };



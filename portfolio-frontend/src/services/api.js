const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("portfolio_token");
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ── Public API ────────────────────────────────────────────
export const api = {
  getExperience: () => request("/experience"),
  getProjects: () => request("/projects"),
  submitContact: (payload) =>
    request("/contact", { method: "POST", body: JSON.stringify(payload) }),
  trackVisit: () =>
    request("/stats/visit", { method: "POST" }),
  health: () => request("/health"),
};

// ── Admin API (requires JWT) ──────────────────────────────
export const adminApi = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  getMe: () => request("/auth/me"),
  getStats: () => request("/stats"),
  getMessages: (page = 1) => request(`/contact?page=${page}`),
  markRead: (id) => request(`/contact/${id}/read`, { method: "PATCH" }),
  deleteMessage: (id) => request(`/contact/${id}`, { method: "DELETE" }),
  createExperience: (data) =>
    request("/experience", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id, data) =>
    request(`/experience/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteExperience: (id) =>
    request(`/experience/${id}`, { method: "DELETE" }),
  createProject: (data) =>
    request("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) =>
    request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) =>
    request(`/projects/${id}`, { method: "DELETE" }),
};

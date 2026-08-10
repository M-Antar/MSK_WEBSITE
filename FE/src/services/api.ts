import axios from "axios";

/**
 * Shared Axios instance for the NestJS REST API.
 *
 * Base URL comes from the VITE_API_BASE_URL env var, e.g.
 *   VITE_API_BASE_URL=http://localhost:3000
 *
 * All service files below build their paths relative to this base URL.
 */
export const api = axios.create({
  baseURL: import.meta.env["VITE_API_BASE_URL"] ?? "",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/**
 * Request interceptor placeholder.
 * TODO(backend): attach the auth token here once the NestJS auth module exists.
 *   config.headers.Authorization = `Bearer ${token}`
 */
api.interceptors.request.use((config) => config);

/**
 * Response interceptor placeholder.
 * TODO(backend): unwrap the API envelope and normalize error shapes
 * (e.g. { statusCode, message } from a NestJS exception filter).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

/**
 * Thrown by every service method until the backend is connected.
 * Screens render their error state when they see this.
 */
export class NotImplementedError extends Error {
  constructor(endpoint: string) {
    super(`Not connected to the backend yet. Expected endpoint: ${endpoint}`);
    this.name = "NotImplementedError";
  }
}

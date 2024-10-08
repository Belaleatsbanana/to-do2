export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER_ERROR: 500
}

export const API_URL = import.meta.env.VITE_API_URL

export const ROUTES = {
  LANDING: '/',
  ABOUT: '/about',
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  TASKS: '/tasks'
}

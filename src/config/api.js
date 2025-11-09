// ============================================================================
// GRADLY V2.5 - API CONFIGURATION
// ============================================================================
// Configuration Axios baseURL pour appels API backend
// ============================================================================

// ============================================================================
// API BASE URL
// ============================================================================
// URL du backend API (depuis variable d'environnement)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Vérifier que l'URL est définie
if (!process.env.REACT_APP_API_URL) {
  console.warn(
    '⚠️ REACT_APP_API_URL non défini dans .env - Utilisation de http://localhost:3000 par défaut'
  );
}

// ============================================================================
// API ENDPOINTS
// ============================================================================
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me'
  },

  // Questions
  QUESTIONS: {
    ALL: '/api/questions/all',
    PALIER: (palier) => `/api/questions/palier/${palier}`,
    ANSWERS: '/api/questions/answers',
    UPDATE_ANSWERS: '/api/questions/update-answers'
  },

  // Matches
  MATCHES: {
    FIND: '/api/matches/find',
    CURRENT: '/api/matches/current',
    HISTORY: '/api/matches/history'
  },

  // Chat
  CHAT: {
    START: '/api/chat/start',
    SEND: '/api/chat/send',
    MESSAGES: (id) => `/api/chat/${id}/messages`,
    CURRENT: '/api/chat/current',
    END: (id) => `/api/chat/${id}/end`
  },

  // Credits
  CREDITS: {
    BALANCE: '/api/credits/balance',
    HISTORY: '/api/credits/history'
  },

  // Payments
  PAYMENTS: {
    CREATE_CHECKOUT: '/api/payments/create-checkout',
    HISTORY: '/api/payments/history'
  },

  // Subscriptions
  SUBSCRIPTIONS: {
    CREATE: '/api/subscriptions/create',
    CURRENT: '/api/subscriptions/current',
    CANCEL: '/api/subscriptions/cancel',
    HISTORY: '/api/subscriptions/history'
  },

  // Profile
  PROFILE: {
    ME: '/api/profile/me',
    UPDATE: '/api/profile/update',
    PHOTO: '/api/profile/photo',
    PHOTO_URL: (userId) => `/api/profile/photo-url/${userId}`,
    CONVERSATIONS: '/api/profile/conversations',
    ANSWERS: '/api/profile/answers',
    DELETE: '/api/profile/delete'
  },

  // Moderation
  MODERATION: {
    BLOCK: '/api/moderation/block',
    UNBLOCK: '/api/moderation/unblock',
    BLOCKED: '/api/moderation/blocked',
    REPORT: '/api/moderation/report'
  },

  // Admin
  ADMIN: {
    STATS: '/api/admin/stats',
    REPORTS: '/api/admin/reports',
    REPORT_DETAIL: (id) => `/api/admin/reports/${id}`,
    REPORT_ACTION: (id) => `/api/admin/reports/${id}/action`,
    USERS: '/api/admin/users',
    USER_DETAIL: (id) => `/api/admin/users/${id}`,
    USER_ACTION: (id) => `/api/admin/users/${id}/action`,
    MONITORING: '/api/admin/monitoring',
    ANALYTICS: '/api/admin/analytics'
  },

  // Health
  HEALTH: '/api/health'
};

// ============================================================================
// API CONFIG
// ============================================================================
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 secondes
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================
export default {
  API_BASE_URL,
  API_ENDPOINTS,
  API_CONFIG
};
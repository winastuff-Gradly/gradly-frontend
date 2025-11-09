// ============================================================================
// GRADLY V2.5 - SUPABASE CLIENT CONFIGURATION
// ============================================================================
// Client Supabase avec anon key (frontend)
// ============================================================================

import { createClient } from '@supabase/supabase-js';

// Vérifier que les variables d'environnement existent
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ REACT_APP_SUPABASE_URL et REACT_APP_SUPABASE_ANON_KEY doivent être définis dans .env'
  );
}

// ============================================================================
// CLIENT SUPABASE (Anon Key pour frontend)
// ============================================================================
// IMPORTANT : Utiliser ANON key (pas service key) côté frontend
// La service key est UNIQUEMENT pour le backend

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true, // Auto-refresh du token (important)
    persistSession: true, // Persister la session dans localStorage
    detectSessionInUrl: true // Détecter session dans URL (ex: magic link)
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'gradly-frontend/2.5.0'
    }
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Vérifier si l'utilisateur est connecté
 * @returns {Promise<boolean>}
 */
export async function isAuthenticated() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Erreur vérification auth:', error);
    return false;
  }
}

/**
 * Obtenir la session actuelle
 * @returns {Promise<Object|null>}
 */
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Erreur récupération session:', error);
    return null;
  }
}

/**
 * Obtenir l'utilisateur actuel
 * @returns {Promise<Object|null>}
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Erreur récupération user:', error);
    return null;
  }
}

/**
 * Rafraîchir le token (utilisé par intercepteur Axios)
 * @returns {Promise<Object|null>}
 */
export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Erreur refresh session:', error);
    return null;
  }
}

/**
 * Déconnexion
 * @returns {Promise<boolean>}
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erreur déconnexion:', error);
    return false;
  }
}

// ============================================================================
// SUPABASE REALTIME (Optionnel - Pour chat en temps réel)
// ============================================================================
// Voir Chat.js pour l'implémentation Realtime

/**
 * Créer un channel Realtime pour une conversation
 * @param {string} conversationId - ID de la conversation
 * @param {Function} onMessage - Callback quand message reçu
 * @returns {Object} Channel Supabase
 */
export function createConversationChannel(conversationId, onMessage) {
  const channel = supabase
    .channel(`conversation:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        // RLS vérifie automatiquement si user a droit d'accès
        if (onMessage) {
          onMessage(payload.new);
        }
      }
    )
    .subscribe();

  return channel;
}

/**
 * Se désabonner d'un channel Realtime
 * @param {Object} channel - Channel Supabase
 */
export async function unsubscribeChannel(channel) {
  if (channel) {
    await supabase.removeChannel(channel);
  }
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================
export default supabase;
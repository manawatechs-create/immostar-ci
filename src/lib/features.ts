// 🎯 FEATURE FLAGS - Active/désactive les fonctionnalités
// Change ici pour activer ou désactiver

export const FEATURES = {
  // Abonnements et paiements
  SUBSCRIPTIONS_ENABLED: false,  // ← Change à true quand tu veux activer
  TRIAL_PERIOD_DAYS: 90,         // Durée de l'essai gratuit
  
  // Boosts d'annonces
  BOOSTS_ENABLED: false,         // ← Change à true pour activer
  
  // Service photo
  PHOTO_SERVICE_ENABLED: false,  // ← Change à true pour activer
  
  // Commissions
  COMMISSIONS_ENABLED: false,    // ← Change à true pour activer
  COMMISSION_RATE: 3,            // Pourcentage
  
  // Limites
  FREE_PROPERTIES_LIMIT: 3,      // Nombre de biens gratuits
  MAX_PHOTOS_FREE: 5,           // Photos max pour gratuit
  MAX_PHOTOS_PRO: 15,           // Photos max pour Pro
  
  // Période d'essai
  TRIAL_ACTIVE: true,            // ← Période d'essai en cours ?
  SHOW_UPGRADE_BANNER: false,    // ← Afficher la bannière upgrade ?
  
  // Paiement
  MOBILE_MONEY_ENABLED: false,   // ← Paiement Mobile Money ?
  CARD_PAYMENT_ENABLED: false,   // ← Paiement carte bancaire ?
}

// Fonction pour vérifier si une feature est activée
export function isFeatureEnabled(feature: keyof typeof FEATURES): boolean {
  return FEATURES[feature] === true
}

// Fonction pour savoir si l'essai est terminé
export function isTrialExpired(trialStartDate: string): boolean {
  const start = new Date(trialStartDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return diffDays > FEATURES.TRIAL_PERIOD_DAYS
}

// Fonction pour savoir combien de jours d'essai restent
export function getTrialDaysLeft(trialStartDate: string): number {
  const start = new Date(trialStartDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return Math.max(0, FEATURES.TRIAL_PERIOD_DAYS - diffDays)
}

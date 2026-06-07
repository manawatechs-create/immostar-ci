// 🎨 IMMOSTAR - PALETTE ORANGE IVOIRIEN 🇨🇮
// Palette complète harmonisée

export const palette = {
  // Orange Principal
  primary: {
    50: '#FFF7ED',   // Fond très clair
    100: '#FFEDD5',  // Fond clair
    200: '#FED7AA',  // Bordure claire
    300: '#FDBA74',  // Hover clair
    400: '#FB923C',  // Orange moyen
    500: '#F97316',  // ORANGE PRINCIPAL
    600: '#EA580C',  // Orange foncé
    700: '#C2410C',  // Hover foncé
    800: '#9A3412',  // Texte sur blanc
    900: '#7C2D12',  // Fond foncé
  },
  
  // Accent Jaune-Or (drapeau CI)
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',  // OR ACCENT
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  
  // Vert (disponible)
  success: '#10B981',
  successLight: '#D1FAE5',
  
  // Rouge (indisponible/erreur)
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  
  // Bleu (info)
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // Neutres
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',
}

export const gradients = {
  primary: 'from-orange-500 to-orange-600',
  primaryHover: 'from-orange-600 to-orange-700',
  accent: 'from-yellow-400 to-yellow-500',
  hero: 'from-orange-500/90 to-orange-700/90',
  card: 'from-orange-50 to-orange-100',
  cta: 'from-orange-50 via-orange-100 to-amber-50',
}

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  primary: 'shadow-orange-500/25',
}

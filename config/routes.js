export const ADMIN = '/admin'

export const NEW_CONTRACT = '/contracts/new'
export const EDIT_CONTRACT = '/contracts/edit/:contractId'
export const CONTRACTS = '/contracts'
export const CONTRACT = '/contracts/:contractId'

export const HOME = '/'
export const PRICING_PAGE = '/pricing'
export const ABOUT_PAGE = '/about'
export const TERMS_PAGE = '/terms'
export const PRIVACY_PAGE = '/privacy'
export const SUPPORT_PAGE = '/support'
export const STATUS = '/status'

export const CONFIRM_AND_SET_PASSWORD_PAGE = '/users/confirm'
export const CONFIRM = '/app-users/confirm'
export const SIGNIN = '/signin'
export const SIGNUP = '/signup'
export const PASSWORD_RESET = '/password-reset'
export const APP_CONFIRM = '/app-confirm/:appName/:apiKey'

export const ACCOUNT_SETTINGS = '/settings'
export const DISCOVER_EVENTS = '/events/discover'
export const NEW_EVENT = '/events/new'
export const NEW_EVENT_FROM_PARENT = '/events/new/:eventId'
export const EDIT_EVENT = '/events/:eventId/edit'
export const MY_EVENTS = '/events'

export const DISABLE_EMAIL = '/disable-email'

// Useful for controlling behaviour when in the App vs. on the landing pages/marketing site
export const MARKETING_ROUTES = [
  HOME,
  ABOUT_PAGE,
  TERMS_PAGE,
  PRIVACY_PAGE,
  SUPPORT_PAGE,
  STATUS,
  SIGNIN,
  SIGNUP,
  PASSWORD_RESET,
  APP_CONFIRM,
  CONFIRM,
  CONFIRM_AND_SET_PASSWORD_PAGE
]
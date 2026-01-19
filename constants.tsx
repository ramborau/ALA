import { PricingItem, IndustryOption, CurrencyOption, IntegrationCategory } from './types';

export const PLATFORMS: PricingItem[] = [
  { id: 'whatsapp', label: 'WhatsApp', price: 150, iconName: 'MessageCircle' },
  { id: 'instagram', label: 'Instagram', price: 150, iconName: 'Instagram' },
  { id: 'messenger', label: 'Messenger', price: 100, iconName: 'Facebook' },
  { id: 'tiktok', label: 'TikTok', price: 200, iconName: 'Video' },
  { id: 'website', label: 'Website Widget', price: 50, iconName: 'Globe' },
  { id: 'rcs', label: 'RCS', price: 120, iconName: 'MessageSquare' },
];

export const FEATURES: PricingItem[] = [
  { id: 'bot_building', label: 'AI Bot Building', price: 300, iconName: 'Bot' },
  { id: 'automation', label: 'AI Automation', price: 250, iconName: 'Zap' },
  { id: 'bookings', label: 'Appointment Bookings', price: 200, iconName: 'CalendarCheck' },
  { id: 'payments', label: 'Payments', price: 150, iconName: 'CreditCard' },
];

export const SUPPORT: PricingItem[] = [
  { id: 'sup_bot', label: 'Bot Building Support', price: 500, iconName: 'Headphones' },
  { id: 'sup_auto', label: 'Automation Support', price: 400, iconName: 'Wrench' },
  { id: 'sup_camp', label: 'Campaigns Mgmt', price: 350, iconName: 'Megaphone' },
  { id: 'sup_mon', label: '24/7 Monitoring', price: 600, iconName: 'Activity' },
];

export const INDUSTRIES: IndustryOption[] = [
  { value: 'ecommerce', label: 'E-Commerce', iconName: 'ShoppingCart' },
  { value: 'healthcare', label: 'Healthcare', iconName: 'HeartPulse' },
  { value: 'real_estate', label: 'Real Estate', iconName: 'Building' },
  { value: 'education', label: 'Education', iconName: 'GraduationCap' },
  { value: 'hospitality', label: 'Hospitality', iconName: 'Coffee' },
  { value: 'technology', label: 'Technology', iconName: 'Laptop' },
  { value: 'finance', label: 'Finance', iconName: 'Banknote' },
  { value: 'other', label: 'Other', iconName: 'MoreHorizontal' },
];

export const CURRENCIES: CurrencyOption[] = [
  { value: 'AED', label: '🇦🇪 AED', symbol: 'AED' },
  { value: 'USD', label: '🇺🇸 USD', symbol: '$' },
  { value: 'EUR', label: '🇪🇺 EUR', symbol: '€' },
  { value: 'GBP', label: '🇬🇧 GBP', symbol: '£' },
];

export const WHATSAPP_CHANNEL_PRICE = 99; // Price per channel

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  {
    title: 'E-commerce Platforms',
    iconName: 'ShoppingCart',
    items: ['Shopify', 'WooCommerce', 'BigCommerce']
  },
  {
    title: 'CRM Systems',
    iconName: 'Users',
    items: ['HubSpot', 'Zoho CRM', 'Salesforce', 'Pipedrive', 'Freshsales', 'LeadSquared']
  },
  {
    title: 'Marketing Automation & Engagement',
    iconName: 'Megaphone',
    items: ['Mailchimp', 'ActiveCampaign', 'Brevo', 'Klaviyo', 'MoEngage', 'WebEngage']
  },
  {
    title: 'Automation & Integration Platforms',
    iconName: 'Workflow',
    items: ['Zapier', 'Make', 'Pabbly Connect']
  },
  {
    title: 'Customer Support & Helpdesk',
    iconName: 'LifeBuoy',
    items: ['Zendesk', 'Freshdesk', 'Zoho Desk', 'Intercom', 'Gorgias', 'Help Scout']
  },
  {
    title: 'Spreadsheets & Databases',
    iconName: 'Table',
    items: ['Google Sheets', 'Microsoft Excel Online', 'Airtable']
  },
  {
    title: 'Calendars & Scheduling',
    iconName: 'Calendar',
    items: ['Google Calendar', 'Calendly', 'Microsoft Outlook Calendar']
  },
  {
    title: 'Payments & Invoicing',
    iconName: 'CreditCard',
    items: ['Razorpay', 'Stripe', 'PayPal']
  }
];
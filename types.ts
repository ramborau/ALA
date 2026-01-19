
export interface PlatformSelection {
  id: string;
  quantity: number;
}

export interface WizardData {
  // Step 1: Profile
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  industry: string;
  currency: string;
  termsAccepted: boolean;

  // Step 2: Platforms
  platforms: PlatformSelection[];

  // Step 3: Features
  features: string[];

  // Step 4: Support
  support: string[];

  // Step 5: Balance
  whatsappChannels: number;
  balance: number;

  // Step 6: Integrations
  integrations: string[];
}

export interface PricingItem {
  id: string;
  label: string;
  price: number; // in AED
  iconName: string;
}

export interface IndustryOption {
  value: string;
  label: string;
  iconName?: string;
}

export interface CurrencyOption {
  value: string;
  label: string; // e.g., "🇦🇪 AED"
  symbol: string;
}

export interface IntegrationCategory {
  title: string;
  iconName: string;
  items: string[];
}
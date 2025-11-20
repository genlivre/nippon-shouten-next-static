export type UnitType = "case" | "hon" | "wrap" | "bag";

export interface ProductOption {
  value: string;
  label: string; // The label shown in the unit display (e.g. "本", "ケース")
  selectionLabel?: string; // The label shown in the selection menu (e.g. "本数単位で購入（5本〜）")
  price?: string; // Price text to display when this option is selected
}

export interface Product {
  id: string;
  name: string;
  price?: string; // Display price (e.g. "1ケース 4,500円")
  unit: string;
  hasUnitSelection?: boolean; // For products like "天海のにがり" which can be hon or case
  unitOptions?: ProductOption[]; // Options for unit selection
  isSoldOut?: boolean; // If true, the product is marked as sold out and cannot be selected
}

export interface CampaignConfig {
  id: string;
  title: string;
  description: string;
  apiEndpoint: string;
  emailRecipient: string;
  products: Product[];
  images?: {
    main?: string; // Path to main image (default: /img/main_image.webp)
    description?: string; // Path to description image (default: /img/necchu_description.jpg)
  };
  flyerUrl?: string; // Path to flyer PDF (default: /assets/flyer.pdf)
  contactInfo?: {
    name?: string;
    address?: string;
    tel?: string;
    fax?: string;
    email?: string;
  };
  footerText?: string; // Custom footer text (e.g. "© 2021 お手軽に感染症対策 ジアウォッシュ")
}

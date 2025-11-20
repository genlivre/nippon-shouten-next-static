import { CampaignConfig } from "../../types/campaign";

export const magnesiumCampaign: CampaignConfig = {
  id: "magnesium",
  title: "マグネシウムキャンペーン",
  description: "マグネシウムキャンペーンを開催します",
  apiEndpoint: "https://myapii.com/api/contacts/92/post_contact",
  emailRecipient: "necchuutaisaku@gmail.com",
  footerText: "© 2025 日本商店株式会社",
  images: {
    main: "/img/magnesium_main1.webp",
    description: "/img/magnesium_main2.webp",
  },
  flyerUrl: "/assets/magnesium.pdf",
  products: [
    { id: "product07", name: "スポーツミネラル マグネシウムウォーター LIGHT（500ml）", unit: "case", price: "1ケース 2,592円(税込)", isSoldOut: false },
    {
      id: "product09",
      name: "天海のにがり（450ml）",
      unit: "case",
      hasUnitSelection: true,
      unitOptions: [
        { value: "hon", label: "本", selectionLabel: "本数単位で購入（5本〜）", price: "1本 810円(税込)" },
        { value: "case", label: "ケース", selectionLabel: "ケース単位で購入（20本入り）", price: "1ケース 12,960円(税込)" },
      ],
      isSoldOut: false
    },
    { id: "product_gohan_20", name: "ごはん名人(20本入り)", unit: "case", price: "1ケース 20本入り 9,720円(税込)", isSoldOut: false },
    { id: "product_gohan_5", name: "ごはん名人(5本入り)", unit: "case", price: "1ケース 5本入り 2,700円(税込) + 送料550円", isSoldOut: false },
  ],
};

import { CampaignConfig } from "../../types/campaign";

export const jiaWashCampaign: CampaignConfig = {
  id: "jia-wash",
  title: "ジアウォッシュキャンペーン",
  description: "ジアウォッシュキャンペーンを開催します",
  apiEndpoint: "https://myapii.com/api/contacts/62/post_contact",
  emailRecipient: "necchuutaisaku@gmail.com",
  images: {
    main: "/img/jia_wash_main1.webp",
    description: "",
  },
  flyerUrl: "/assets/jia_wash_flyer.pdf",
  contactInfo: {
    name: "感染症対策事務局",
    address: "〒272-0002 千葉県市川市二俣新町3-8",
    tel: "070-8414-4767",
    email: "tomo0414hisa@gmail.com",
  },
  footerText: "© 2021 お手軽に感染症対策 ジアウォッシュ｜感染症対策キャンペーン",
  products: [
    { id: "product01", name: "ジアウォッシュ", unit: "bag", price: "1袋 1,980円(税込)", isSoldOut: false },
  ],
};

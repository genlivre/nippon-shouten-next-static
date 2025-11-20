import { CampaignConfig } from "../../types/campaign";

export const tohtoCampaign: CampaignConfig = {
  id: "tohto",
  title: "東都大学野球連盟キャンペーン",
  description: "東都大学野球連盟応援キャンペーンを開催します",
  apiEndpoint: "https://myapii.com/api/contacts/62/post_contact",
  emailRecipient: "necchuutaisaku@gmail.com",
  products: [
    { id: "product01", name: "熱中対策水500ml(レモン味)", unit: "case", price: "1ケース 2,592円(税込)" },
    { id: "product02", name: "熱中対策水500ml(日向夏味)", unit: "case", price: "1ケース 2,592円(税込)" },
  ],
};

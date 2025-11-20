import { CampaignConfig } from "../../types/campaign";

export const allCampaign: CampaignConfig = {
  id: "all",
  title: "オールキャンペーン",
  description: "オールキャンペーンを開催します",
  apiEndpoint: "https://myapii.com/api/contacts/62/post_contact", // Assuming same endpoint for now, user can update
  emailRecipient: "necchuutaisaku@gmail.com",
  footerText: "© 2025 熱中対策キャンペーン",
  products: [
    { id: "product01", name: "熱中対策水500ml(レモン味)", unit: "case", price: "1ケース 2,592円(税込)" },
    { id: "product02", name: "熱中対策水500ml(日向夏味)", unit: "case", price: "1ケース 2,592円(税込)" },
    { id: "product03", name: "熱中対策水500ml(アセロラ味)", unit: "case", price: "1ケース 2,592円(税込)" },
    { id: "product04", name: "熱中対策水 10倍濃厚シトラス", unit: "case", price: "1ケース 3,862円(税込)" },
    { id: "product05", name: "熱中対策ゼリー(ぶどう味)", unit: "case", price: "1ケース 3,110円(税込)" },
    { id: "product06", name: "熱中対策ゼリー(マンゴー味)", unit: "case", price: "1ケース 3,110円(税込)" },
    { id: "product07", name: "スポーツミネラル マグネシウムウォーター LIGHT（500ml）", unit: "case", price: "1ケース 2,592円(税込)" },
    { id: "product12", name: "熱中対策水ソフトパウチ 300g(レモン味)", unit: "case", price: "1ケース 3,726円(税込)" },
    { id: "product14", name: "熱中対策水パウダー（日向夏味）", unit: "case", price: "1ケース 9,288円(税込)" },
    { id: "product08", name: "経口補水液（500ml）", unit: "case", price: "1ケース 3,240円(税込)" },
    {
      id: "product09",
      name: "天海のにがり（450ml）",
      unit: "case",
      hasUnitSelection: true,
      unitOptions: [
        { value: "hon", label: "本", selectionLabel: "本数単位で購入（5本〜）", price: "1本 810円(税込)" },
        { value: "case", label: "ケース", selectionLabel: "ケース単位で購入（20本入り）", price: "1ケース 12,960円(税込)" },
      ],
    },
    {
      id: "product10",
      name: "塩タブレットミックス（パイン・レモン・カシス500g 220粒）",
      unit: "case",
      hasUnitSelection: true,
      unitOptions: [
        { value: "wrap", label: "袋", selectionLabel: "袋単位で購入（3袋〜）", price: "3袋 6,480円(税込) / 6袋 11,016円(税込) / 12袋 19,440円(税込)" },
        { value: "case", label: "ケース", selectionLabel: "ケース単位で購入", price: "1ケース(12袋) 19,440円(税込)" },
      ],
    },
  ],
};

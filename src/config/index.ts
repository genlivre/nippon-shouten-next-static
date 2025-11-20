import { boysCampaign } from "./campaigns";
import { allCampaign } from "./campaigns/all";
import { jiaWashCampaign } from "./campaigns/jia-wash";
import { necchuuCampaign } from "./campaigns/necchuu";
import { tohtoCampaign } from "./campaigns/tohto";
import { yangCampaign } from "./campaigns/yang";
import { magnesiumCampaign } from "./campaigns/magnesium";
import { CampaignConfig } from "@/types/campaign";

export const campaigns: Record<string, CampaignConfig> = {
  [boysCampaign.id]: boysCampaign,
  [allCampaign.id]: allCampaign,
  [jiaWashCampaign.id]: jiaWashCampaign,
  [necchuuCampaign.id]: necchuuCampaign,
  [tohtoCampaign.id]: tohtoCampaign,
  [yangCampaign.id]: yangCampaign,
  [magnesiumCampaign.id]: magnesiumCampaign,
};

export const getCampaign = (id: string): CampaignConfig | undefined => {
  return campaigns[id];
};

import React from "react";
import { notFound } from "next/navigation";
import { getCampaign, campaigns } from "@/config";
import { DynamicForm } from "@/components/DynamicForm";
import { Footer } from "@/components/Footer";

interface PageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

// Generate static params for static export
export async function generateStaticParams() {
  return Object.keys(campaigns).map((id) => ({
    campaignId: id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { campaignId } = await params;
  const campaign = getCampaign(campaignId);

  if (!campaign) {
    return {
      title: "Campaign Not Found",
    };
  }

  return {
    title: campaign.title,
    description: campaign.description,
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { campaignId } = await params;
  const campaign = getCampaign(campaignId);

  if (!campaign) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
            {/* Header / Main Image Area */}
            <div className="max-w-4xl mx-auto text-center">
                {/* Placeholder for main image - in a real app this would be dynamic or fixed */}
                 <div className="mb-6">
                    {/* We assume assets are in public/img */}
                    <img
                      src={campaign.images?.main || "/img/main_image.webp"}
                      alt="Main Visual"
                      className="mx-auto max-w-full h-auto"
                    />
                    {campaign.images?.description !== "" && (
                      <img
                        src={campaign.images?.description ?? "/img/necchu_description.jpg"}
                        alt="Description"
                        className="mx-auto max-w-full h-auto mt-4"
                      />
                    )}
                 </div>

            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
            <section className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">申し込み</h2>
                <p className="mb-4 text-gray-600">
                    FAXでの申込みも受け付けております。<br />
                    <a
                      href={campaign.flyerUrl || "/assets/flyer.pdf"}
                      download
                      className="text-blue-600 hover:underline"
                    >
                      こちらの専用用紙
                    </a>を印刷の上、FAXまたはメールにてお送り下さい。<br />
                    {campaign.contactInfo?.fax ? `FAX: ${campaign.contactInfo.fax}` : "FAX: 047-702-5541"}<br />
                    送り先メールアドレス: <a href={`mailto:${campaign.contactInfo?.email || campaign.emailRecipient}`} className="text-blue-600 hover:underline">{campaign.contactInfo?.email || campaign.emailRecipient}</a>
                </p>
            </section>

            <DynamicForm config={campaign} />

            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                 <h2 className="text-lg font-bold mb-4">本件に関するお問い合わせ先</h2>
                 {campaign.contactInfo?.name ? (
                    <h3 className="text-xl font-bold mb-4">{campaign.contactInfo.name}</h3>
                 ) : (
                    <img src="/img/logo.png" alt="日本商店株式会社" className="mx-auto mb-4 w-48" />
                 )}
                 <p className="text-gray-600">{campaign.contactInfo?.address || "〒272-0002 千葉県市川市二俣新町3-8"}</p>
                 <p className="text-gray-600">TEL : {campaign.contactInfo?.tel || "047-702-5540( 平日 9時 ~18時 )"}</p>
                 <p className="text-gray-600">Mail: {campaign.contactInfo?.email || campaign.emailRecipient}</p>
            </div>
        </div>
      </div>
      <Footer text={campaign.footerText} />
    </main>
  );
}

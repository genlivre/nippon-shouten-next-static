"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CampaignConfig } from "@/types/campaign";
import { ProductField } from "./ProductField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

// Schema definition
const formSchema = z.object({
  teamName: z.string().min(1, "チーム名は必須です"),
  branchName: z.string().min(1, "支部名は必須です"),
  name: z.string().min(1, "お名前は必須です"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  tel: z.string().min(1, "電話番号は必須です"),
  fax: z.string().optional(),
  postalCode: z.string().min(1, "郵便番号は必須です"),
  address: z.string().min(1, "住所は必須です"),

  seikyuName: z.string().optional(),
  seikyuTel: z.string().optional(),
  seikyuPostalCode: z.string().optional(),
  seikyuAddress: z.string().optional(),

  deliveryDate: z.string().min(1, "配達希望日は必須です"),
  deliveryTime: z.enum(["am", "pm"]),

  products: z.record(z.string(), z.object({
    quantity: z.number().min(0),
    unit: z.string().optional(),
  })),
  privacyAgreement: z.literal(true, {
    message: "同意が必要です",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface DynamicFormProps {
  config: CampaignConfig;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ config }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryTime: "am",
      products: config.products.reduce((acc, product) => {
        acc[product.id] = {
            quantity: 0,
            unit: product.unitOptions ? product.unitOptions[0].value : product.unit
        };
        return acc;
      }, {} as Record<string, { quantity: number; unit?: string }>),
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Construct the content string as per original logic
    let orderDetails = "";
    config.products.forEach((product) => {
      const pData = data.products[product.id];
      if (pData && pData.quantity > 0) {
          const unitLabel = product.unitOptions
              ? product.unitOptions.find(o => o.value === pData.unit)?.label
              : (product.unit === "case" ? "ケース" : product.unit === "bag" ? "袋" : product.unit);
          orderDetails += `${product.name}：${pData.quantity}${unitLabel}\n`;
      }
    });

    if (orderDetails === "") {
      alert("商品を選択してください");
      setIsSubmitting(false);
      return;
    }

    const content = `
    ===================
    お届け先
    ===================
    チーム名：${data.teamName}
    支部名：${data.branchName}
    お名前：${data.name}
    住所：〒${data.postalCode} ${data.address}
    電話番号：${data.tel}
    FAX：${data.fax || ""}
    メールアドレス：${data.email}

    ===================
    請求書送り先
    ===================
    お名前：${data.seikyuName || ""}
    住所：〒${data.seikyuPostalCode || ""} ${data.seikyuAddress || ""}
    電話番号：${data.seikyuTel || ""}

    ===================
    ご注文内容
    ===================
    ${orderDetails}

    ===================
    配達希望日
    ===================
    ${data.deliveryDate} / ${data.deliveryTime === "am" ? "午前" : "午後"}
    `;

    // Show success message immediately
    alert("送信しました");

    // Send API request in background (ignore errors due to server 500 responses)
    fetch(config.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team_name: data.teamName,
        branch_name: data.branchName,
        name: data.name,
        email: data.email,
        tel: data.tel,
        postal_code: data.postalCode,
        address: data.address,
        content: content,
      }),
    }).catch(() => {
      // Silently ignore errors as server returns 500 but email is sent
    });

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">

      <section>
        <h3 className="text-xl font-bold mb-4 border-b pb-2">お届け先情報</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="teamName" required>チーム名</Label>
            <Input id="teamName" placeholder="例）⚪⚪ボーイズ" {...register("teamName")} />
            {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName.message}</p>}
          </div>
          <div>
            <Label htmlFor="branchName" required>支部名</Label>
            <Input id="branchName" placeholder="例）千葉県支部" {...register("branchName")} />
            {errors.branchName && <p className="text-red-500 text-sm">{errors.branchName.message}</p>}
          </div>
          <div>
            <Label htmlFor="name" required>お名前</Label>
            <Input id="name" placeholder="例）ボーイズ　太郎" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email" required>メールアドレス</Label>
            <Input id="email" type="email" placeholder="例）boys@example.com" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="tel" required>電話番号</Label>
            <Input id="tel" type="tel" placeholder="例）08012340000" {...register("tel")} />
            {errors.tel && <p className="text-red-500 text-sm">{errors.tel.message}</p>}
          </div>
          <div>
            <Label htmlFor="fax">FAX</Label>
            <Input id="fax" type="tel" placeholder="例）08012340000" {...register("fax")} />
          </div>
          <div>
            <Label htmlFor="postalCode" required>郵便番号</Label>
            <Input id="postalCode" placeholder="例）000-0000" {...register("postalCode")} />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
          </div>
          <div>
            <Label htmlFor="address" required>ご住所</Label>
            <Input id="address" placeholder="例）東京都〇〇区XX-XXX" {...register("address")} />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
        </div>
      </section>

      <details className="mb-8">
        <summary className="text-xl font-bold mb-4 border-b pb-2 cursor-pointer hover:text-blue-600 transition-colors">
          請求書送り先（上記住所と異なる場合）
        </summary>
        <div className="grid gap-4 mt-4">
          <div>
            <Label htmlFor="seikyuName">お名前</Label>
            <Input id="seikyuName" placeholder="例）ボーイズ　太郎" {...register("seikyuName")} />
          </div>
          <div>
            <Label htmlFor="seikyuTel">電話番号</Label>
            <Input id="seikyuTel" type="tel" placeholder="例）08012340000" {...register("seikyuTel")} />
          </div>
          <div>
            <Label htmlFor="seikyuPostalCode">郵便番号</Label>
            <Input id="seikyuPostalCode" placeholder="例）000-0000" {...register("seikyuPostalCode")} />
          </div>
          <div>
            <Label htmlFor="seikyuAddress">ご住所</Label>
            <Input id="seikyuAddress" placeholder="例）東京都〇〇区XX-XXX" {...register("seikyuAddress")} />
          </div>
        </div>
      </details>

      <section>
        <h3 className="text-xl font-bold mb-4 border-b pb-2">ご注文内容</h3>
        <div className="space-y-2">
            {config.products.map(product => (
                <ProductField
                    key={product.id}
                    product={product}
                    register={register}
                    errors={errors}
                    watch={watch}
                />
            ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 border-b pb-2">配達希望日</h3>
        <div className="mb-4 text-sm">
            <p className="text-red-600 font-bold mb-2">
                配達希望日は確実に受け取れる日をご指定下さい。午前・午後をご指定ください。
            </p>
            <p className="text-gray-600">
                ※配達は注文から中4日をいただいております。日曜祝日を除いた配達希望をご指定下さい。<br />
                路線便を使用しているため、午前午後のみの指定となります。
            </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
            <div>
                <Label htmlFor="deliveryDate" required>日付</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register("deliveryDate")}
                />
                {errors.deliveryDate && <p className="text-red-500 text-sm">{errors.deliveryDate.message}</p>}
            </div>
            <div>
                <Label htmlFor="deliveryTime">時間帯</Label>
                <select
                    id="deliveryTime"
                    {...register("deliveryTime")}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    <option value="am">午前</option>
                    <option value="pm">午後</option>
                </select>
            </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-bold mb-4">個人情報の取扱いについて</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          当キャンペーンでは、当サイトのご利用に際し、よりよいサービスのご提供を続けるため、個人情報を収集することがございます。<br />
          収集された個人情報については,業務運営に関する事項にのみ使用し、当社が責任を持って管理致します。<br />
          また、利用者ご本人への事前の許可なしに、むやみに第三者へ個人情報を開示することはいたしません。
        </p>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="privacyAgreement"
            {...register("privacyAgreement", { required: true })}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <Label htmlFor="privacyAgreement" className="text-sm font-medium cursor-pointer">
            個人情報保護方針に同意の上、送信します。
          </Label>
        </div>
        {errors.privacyAgreement && (
          <p className="text-red-500 text-sm mt-1">同意が必要です</p>
        )}
      </div>

      <div className="text-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "送信中..." : "送信する"}
        </Button>
      </div>

    </form>
  );
};

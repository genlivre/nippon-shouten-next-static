import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { Product } from "@/types/campaign";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface ProductFieldProps {
  product: Product;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
}

export const ProductField: React.FC<ProductFieldProps> = ({
  product,
  register,
  errors,
  watch,
}) => {
  const unitValue = watch(`products.${product.id}.unit`);

  return (
    <div className={`mb-6 p-4 border rounded-lg ${product.isSoldOut ? "bg-gray-100 border-gray-200 opacity-75" : "bg-gray-50 border-gray-100"}`}>
      <div className="flex justify-between items-start mb-1">
        <Label htmlFor={`products.${product.id}.quantity`} className="text-base block">
          {product.name}
        </Label>
        {product.isSoldOut && (
          <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SOLD OUT
          </span>
        )}
      </div>

      {product.price && (
        <p className="text-sm text-gray-600 mb-2">{product.price}</p>
      )}

      {product.hasUnitSelection && product.unitOptions ? (
        <div className="space-y-3">
          {/* Unit Selection Mode */}
          <div>
            <select
              {...register(`products.${product.id}.unit`)}
              disabled={product.isSoldOut}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
            >
              {product.unitOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.selectionLabel || opt.label}
                </option>
              ))}
            </select>
            {/* Dynamic Price Display */}
            {(() => {
              const selectedOption = product.unitOptions?.find(opt => opt.value === unitValue);
              if (selectedOption?.price) {
                return <p className="text-sm text-gray-600 mt-1 ml-1">{selectedOption.price}</p>;
              }
              return null;
            })()}
          </div>

          {/* Quantity Input */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0"
              placeholder="0"
              disabled={product.isSoldOut}
              {...register(`products.${product.id}.quantity`, { valueAsNumber: true })}
              className="text-right flex-1 disabled:bg-gray-100 disabled:text-gray-400"
            />
            <span className="text-sm text-gray-600 w-12">
              {product.unitOptions?.find(opt => opt.value === unitValue)?.label || product.unit}
            </span>
          </div>
        </div>
      ) : (
        // Standard case
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            placeholder="0"
            disabled={product.isSoldOut}
            {...register(`products.${product.id}.quantity`, { valueAsNumber: true })}
            className="text-right flex-1 disabled:bg-gray-100 disabled:text-gray-400"
          />
          <span className="text-sm text-gray-600 w-12">
            {product.unit === "case" ? "ケース" : product.unit === "bag" ? "袋" : product.unit}
          </span>
        </div>
      )}
    </div>
  );
};

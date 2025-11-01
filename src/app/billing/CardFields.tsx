'use client';

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const elementStyle = {
  style: {
    base: {
      color: "#1f2937",
      fontSize: "16px",
      fontFamily: "Inter, sans-serif",
      iconColor: "#f59e0b",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#ef4444" },
  },
};

export default function CardFields() {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Card Information
      </label>
      
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-orange-400 hover:shadow-md transition-all duration-200 space-y-3">
        {/* Card Number Field */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Card Number
          </label>
          <div className="p-3 border border-gray-200 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-orange-400 transition-all">
            <CardNumberElement options={elementStyle} />
          </div>
        </div>

        {/* Bottom Row - Expiry and CVC */}
        <div className="grid grid-cols-2 gap-3">
          {/* Expiry Field */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Expiry
            </label>
            <div className="p-3 border border-gray-200 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <CardExpiryElement options={elementStyle} />
            </div>
          </div>

          {/* CVC Field */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              CVC
            </label>
            <div className="p-3 border border-gray-200 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <CardCvcElement options={elementStyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

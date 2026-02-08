import React from "react";
import { productDetails } from "../config/productDetails";

export default function LandingView({ onEnterPremiumMode, onOpenDetails, breakpoint }) {
  const products = Object.values(productDetails);

  return (
    <div
    style={
        {
        paddingTop: '70px',
    }
        
    }
     className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      {/* Hero / Welcome */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
          Premium Dry Fruits & Seeds
          <br />
          <span className="text-emerald-700">Fresh • Natural • Delivered Today</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-10">
          Handpicked quality nuts, dates and seeds — ready to enjoy now.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" })}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md transition transform hover:scale-105"
          >
            Shop Now
          </button>

          <button
            onClick={onEnterPremiumMode}
            className="bg-white border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50 px-10 py-4 rounded-full text-lg font-semibold transition"
          >
            Future Collections →
          </button>
        </div>
      </div>

      {/* Ready products grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Available Now – Ready to Deliver
        </h2>

        <div
          className={`grid gap-8 ${
            breakpoint === "mobile"
              ? "grid-cols-1"
              : breakpoint === "tablet"
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-64 bg-gradient-to-br from-amber-50 to-emerald-50/30 flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{product.description}</p>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-bold text-emerald-700">
                    ₹{product.price.split(" ")[0]}
                  </span>
                </div>

                <button
                  onClick={() => onOpenDetails(product.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold transition"
                >
                  View & Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProductListPage } from "./Pages/ProductListPage";
import { FavoritesPage } from "./Pages/FavoritesPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";

function App() {
  return (
    <div style={{ display: "block" }}>
      <div className="container px-4 sm:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <BrowserRouter>
          <nav className="">
            <div className="max-w-7xl mx-auto px-0">
              <div className="flex items-center justify-between h-16">
                <div className="flex-shrink-0 text-white text-2xl font-bold">
                  My<span className="text-teal-200">Store</span>
                </div>

                <div className="md:flex space-x-6">
                  <Link
                    to="/"
                    className="text-white hover:text-teal-200 transition-colors font-medium"
                  >
                    Products
                  </Link>
                  <Link
                    to="/favorites"
                    className="text-white hover:text-teal-200 transition-colors font-medium"
                  >
                    Favorites
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

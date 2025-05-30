# MyStore - Product Listing and Favorites App

MyStore is a responsive React-based e-commerce front-end application that displays a list of products from a public API, allows users to filter and sort them, and manage a list of favorite items.

## ✨ Features

- 🔍 **Search by title**
- 📂 **Category filter and price sort**
- 🛍️ **Product details page**
- 💖 **Add/Remove from favorites**
- ✅ **Toast notifications**
- ⚡ **Responsive design**
- 🔗 **Routing with React Router**

## 📸 Screenshots

### 🛒 Product Listing Page

![Product Listing](https://res.cloudinary.com/dmpdvpvqt/image/upload/v1748592863/mystore/fqr7mvsj56rxtq2ou0ry.png)

### 📘 Product Details Page

![Product Details](https://res.cloudinary.com/dmpdvpvqt/image/upload/v1748592863/mystore/p4lfmz5fulxo6qxjlmdd.png)

### ❤️ Favorites Page

![Favorites](https://res.cloudinary.com/dmpdvpvqt/image/upload/v1748592862/mystore/ursbtwtgakz29ol0unew.png)

## 🧰 Tech Stack

- React
- Redux Toolkit
- React Router
- Tailwind CSS / Custom CSS
- Axios (for fetching products)
- [FakeStoreAPI](https://fakestoreapi.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```
1. git clone https://github.com/yourusername/mystore-app.git
    cd mystore-app
2. Install Dependencies
    npm install
3. Run the Application
    npm run dev
Open http://localhost:5173 to view it in the browser.

📁 Folder Structure
css
Copy
Edit
├── public/
├── src/
│   ├── Components/
│   │   ├── Filters.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── Toast.jsx
│   ├── Hooks/
│   │   └── useDebounce.js
│   ├── Pages/
│   │   ├── FavoritesPage.jsx
│   │   ├── ProductDetails.jsx
│   │   └── ProductListPage.jsx
│   ├── Redux/
│   │   ├── store.js
│   │   └── Reducers/
│   │       ├── FavoritesSlice.js
│   │       ├── FiltersSlice.js
│   │       └── ProductsSlice.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
📝 Notes
This project uses FakeStoreAPI to simulate real products.

Favorites are stored in the Redux store and reset on page refresh (persistence not implemented).
```

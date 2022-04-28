# Store It - Frontend

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## File Structure

```
.
├── package.json
├── package-lock.json
├── public
│   ├── bg.png
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── store.png
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── components
│   │   ├── BuyerView
│   │   │   ├── OrderHistory
│   │   │   │   ├── OrderCard
│   │   │   │   │   ├── OrderCard.css
│   │   │   │   │   ├── OrderCard.jsx
│   │   │   │   │   └── PrintOrder
│   │   │   │   │       ├── PrintOrder.css
│   │   │   │   │       └── PrintOrder.jsx
│   │   │   │   ├── OrderHistory.css
│   │   │   │   └── OrderHistory.jsx
│   │   │   └── Store
│   │   │       ├── CategoryNav
│   │   │       │   ├── CategoryNav.css
│   │   │       │   └── CategoryNav.jsx
│   │   │       ├── MenuCard
│   │   │       │   ├── MenuCard.css
│   │   │       │   └── MenuCard.jsx
│   │   │       ├── StoreBill
│   │   │       │   ├── StoreBill.css
│   │   │       │   └── StoreBill.jsx
│   │   │       ├── Store.css
│   │   │       └── Store.jsx
│   │   ├── Home
│   │   │   ├── Catalog
│   │   │   │   ├── CatalogItem.jsx
│   │   │   │   └── Catalog.jsx
│   │   │   ├── Home.css
│   │   │   └── Home.jsx
│   │   ├── LoginSignUp
│   │   │   ├── Buyer
│   │   │   │   ├── BuyerLogin.jsx
│   │   │   │   └── BuyerSignUp.jsx
│   │   │   ├── Login.css
│   │   │   ├── Login.jsx
│   │   │   └── Seller
│   │   │       ├── SellerLogin.jsx
│   │   │       └── SellerSignUp.jsx
│   │   ├── Navbar
│   │   │   ├── Card.jsx
│   │   │   ├── Display.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Nav.css
│   │   │   ├── SellerBar.jsx
│   │   │   └── Topbar.jsx
│   │   ├── NonExistingPage.jsx
│   │   ├── SellerView
│   │   │   └── Dashboard
│   │   │       ├── Categories
│   │   │       │   ├── AddCategory
│   │   │       │   │   ├── AddCategory.css
│   │   │       │   │   └── AddCategory.jsx
│   │   │       │   ├── Categories.css
│   │   │       │   ├── Categories.jsx
│   │   │       │   └── CategoryLog
│   │   │       │       ├── CategoryLog.css
│   │   │       │       └── CategoryLog.jsx
│   │   │       ├── Dashboard.css
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Navigation
│   │   │       │   ├── Navigation.css
│   │   │       │   └── Navigation.jsx
│   │   │       ├── Orders
│   │   │       │   ├── OrderCard
│   │   │       │   │   ├── OrderCard.css
│   │   │       │   │   ├── OrderCard.jsx
│   │   │       │   │   └── OrderStatus
│   │   │       │   │       ├── AcceptOrReject.jsx
│   │   │       │   │       ├── AfterAccepted.jsx
│   │   │       │   │       └── AfterRejected.jsx
│   │   │       │   ├── Orders.css
│   │   │       │   └── Orders.jsx
│   │   │       └── Products
│   │   │           ├── AddProducts
│   │   │           │   ├── AddProduct.css
│   │   │           │   └── AddProduct.jsx
│   │   │           ├── ProductLog
│   │   │           │   ├── ProductLog.css
│   │   │           │   └── ProductLog.jsx
│   │   │           ├── Products.css
│   │   │           └── Products.jsx
│   │   └── ThemePalette.jsx
│   ├── index.css
│   ├── index.jsx
│   ├── logo.svg
│   └── url.js
└── tree.txt

29 directories, 71 files
```
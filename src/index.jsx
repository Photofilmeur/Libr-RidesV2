import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import AuthContext from './constants/authContext'
import Home from './pages/Home'
import ErrorPage from './components/Notif&Error/404'
import AboutUs from './pages/AboutUs'
import Cart from './pages/Cart'
import Secondhand from './pages/Secondhand'
import RangeShop from './pages/Shop/ProductRangeShop'
import Header from './components/Header'
import Account from './pages/Account/Account'
import './index.css'
import 'slick-carousel/slick/slick.css'
import ProductRangeLoader from './components/designLayouts/Loaders/ProductRangeLoader/ProductRangeLoader'
import CardLoader from './components/designLayouts/Loaders/CardLoader/CardLoader'
import ProductDetails from './pages/Shop/ProductDetails'
import Product from './pages/Shop/Product'
import { isAuthenticated as checkAuth } from './components/Account/authAPI'
import PrivateRoute from './constants/PrivateRoute'
import MyAccount from './pages/Account/MyAccount'
import RegisterPage from './components/Account/RegisterPage'

import LogoutButton from './components/designLayouts/buttons/LogoutButton'
import DeleteAccountButton from './components/designLayouts/buttons/DeleteButton'
import DropBoxAccount from './components/designLayouts/DropDownBox/DropBoxAccount'
import DeleteAccount from './components/Account/MyAccount/DeleteAccount'
import { ErrorNotif } from './components/Notif&Error/Notif'
import SaveButton from './components/designLayouts/buttons/SaveButton'
import ImageUpload from './components/Account/MyAccount/ImgUpload/index'
import OrderCart from './components/designLayouts/buttons/OrderCart'
import AccueilLoader from './components/designLayouts/Loaders/AccueilLoader'
import Animation from './components/designLayouts/AccueilAnimation'
import Empty from './components/Cart/Empty'
import CartLoader from './components/designLayouts/Loaders/CartLoader'
import ShoppingCart from './components/Cart'
import InfoPersoLoader from './components/designLayouts/Loaders/InfoPersoLoader'
import LireSuiteButton from './components/designLayouts/buttons/LireSuite'
import CreditCardV2 from './components/designLayouts/CreditCard'
import PaymentOptions from './components/designLayouts/PaymentOptions/index'
import OrderHistory from './components/Account/MyAccount/OrderHistory'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth())

  useEffect(() => {
    setIsAuthenticated(checkAuth())
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <React.StrictMode>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Occasion" element={<Secondhand />} />

            <Route path="/Product" element={<RangeShop />} />

            <Route path="/Product/Route" element={<Product />} />
            <Route path="/Product/Cross" element={<Product />} />
            <Route path="/Product/Quads" element={<Product />} />

            <Route path="/Product/Route/:id" element={<ProductDetails />} />
            <Route path="/Product/Cross/:id" element={<ProductDetails />} />
            <Route path="/Product/Quads/:id" element={<ProductDetails />} />

            <Route
              path="/Account/Login"
              element={
                isAuthenticated ? (
                  <Navigate to="/Account/MyAccount" />
                ) : (
                  <Account />
                )
              }
            />
            <Route path="/Account/Sign-Up" element={<RegisterPage />} />

            <Route
              path="/Panier"
              element={<PrivateRoute element={<Cart />} />}
            />
            <Route
              path="/Account/MyAccount"
              element={<PrivateRoute element={<MyAccount />} />}
            />

            <Route path="*" element={<ErrorPage />} />

            <Route path="/TEST1" element={<CardLoader />} />
            <Route path="/TEST2" element={<ProductRangeLoader />} />
            <Route path="/TEST3" element={<DeleteAccountButton />} />
            <Route path="/TEST4" element={<LogoutButton />} />
            <Route path="/TEST5" element={<DropBoxAccount />} />
            <Route path="/TEST6" element={<DeleteAccount />} />
            <Route path="/TEST7" element={<ErrorNotif />} />
            <Route path="/TEST8" element={<SaveButton />} />
            <Route path="/TEST9" element={<ImageUpload />} />
            <Route path="/TEST10" element={<OrderCart />} />
            <Route path="/TEST11" element={<AccueilLoader />} />
            <Route path="/TEST12" element={<Animation />} />
            <Route path="/TEST13" element={<Empty />} />
            <Route path="/TEST14" element={<CartLoader />} />
            <Route path="/TEST15" element={<ShoppingCart />} />
            <Route path="/TEST16" element={<InfoPersoLoader />} />
            <Route path="/TEST17" element={<LireSuiteButton />} />
            <Route path="/TEST18" element={<CreditCardV2 />} />
            <Route path="/TEST19" element={<PaymentOptions />} />
            <Route path="/TEST20" element={<OrderHistory />} />


          </Routes>
        </Router>
      </React.StrictMode>
    </AuthContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import React, { Suspense } from 'react';
import { Spin } from 'antd';
import LoginModal from 'modals/LoginModal';
import RegisterModal from 'modals/RegisterModal';
import CartModal from 'modals/CartModal';
import NotFound from 'components/NotFound';
import { toast, ToastContainer } from 'react-toastify';
import Notification from 'components/Notification';
import Footer from 'components/Footer';
import Loading from 'components/Loading';

const Product = React.lazy(() => import("features/Product"))
const Cart = React.lazy(() => import("features/Cart"))


function App() {

  return (
    <div className="book-store">
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Header />
          <Notification />
          <Switch>
            <Redirect exact from='/' to='/product' />
            <Route path='/product' component={Product}></Route>
            <Route path='/cart' component={Cart}></Route>
            <Route component={NotFound}></Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

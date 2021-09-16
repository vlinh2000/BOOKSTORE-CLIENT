import './App.css';
import { BrowserRouter, Switch, Route, Router, Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';

import { createBrowserHistory } from 'history'

import Header from 'components/Header';
import NotFound from 'components/NotFound';
import Notification from 'components/Notification';
import Footer from 'components/Footer';
import Loading from 'components/Loading';

const Product = React.lazy(() => import("features/Product"))
const Cart = React.lazy(() => import("features/Cart"))

export const history = createBrowserHistory();

function App() {

  return (
    <div className="book-store">
      <Suspense fallback={<Loading />}>
        <Router history={history} >
          <Header />
          <Notification />
          <Switch>
            <Redirect exact from='/' to='/product' />
            <Route path='/product' component={Product}></Route>
            <Route path='/cart' component={Cart}></Route>
            <Route component={NotFound}></Route>
          </Switch>
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

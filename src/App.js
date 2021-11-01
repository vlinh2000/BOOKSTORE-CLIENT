import './App.css';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';

import { createBrowserHistory } from 'history'

import Header from 'components/Header';
import NotFound from 'components/NotFound';
import Notification from 'components/Notification';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import { useSelector } from 'react-redux';

const Product = React.lazy(() => import("features/Product"))
const Cart = React.lazy(() => import("features/Cart"))
const UserInfo = React.lazy(() => import("components/UserInfo"))

export const history = createBrowserHistory();

function App() {
  const { isAuth } = useSelector(state => state.user.currentUser);

  return (
    <div className="book-store">
      <Suspense fallback={<Loading />}>
        <Router history={history} >
          <Header />
          <Notification />
          <Switch>
            <Redirect exact from='/' to='/product' />
            <Route path='/product' component={Product} />
            <Route path='/cart' component={Cart} />
            <Route path='/me' render={() => {
              return isAuth ? <UserInfo /> : <Redirect to='/' />
            }} />
            <Route component={NotFound}></Route>
          </Switch>
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

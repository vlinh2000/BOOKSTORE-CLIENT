import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import React, { Suspense } from 'react';
import { Spin } from 'antd';
import LoginModal from 'modals/LoginModal';


const MainPage = React.lazy(() => import("features/Product"))


function App() {
  return (
    <div className="book-store">
      <Suspense fallback={<Spin />}>
        <BrowserRouter>
          <Header />
          <LoginModal />
          <Switch>
            <Route exact path='/' component={MainPage}></Route>
            <Route component={<div>Not found</div>}></Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Header />
        <Route path="/" ></Route>
        <Route component={<div>Not found</div>}></Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;

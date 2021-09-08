import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader';
import Home from './pages/Home';
import {StateContextProvider} from './context/StateContext'

import "./styles/main.scss";

const WatchList = lazy(() => import('./pages/WatchList'));
const Watched = lazy(() => import('./pages/Watched'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

const App = () => {

  return (
    <StateContextProvider>
      
      <BrowserRouter>
      
        <Header />
        
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route exact path='/' component={Home} />
            <Route path='/watchList' component={WatchList} />
            <Route path='/watched' component={Watched} />
            <Route path='/movieDetails' component={MovieDetails} />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </StateContextProvider>
  );
}

export default App;

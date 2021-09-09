import React, { lazy, Suspense } from 'react';
import {Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader';
import Home from './pages/Home';

import "./styles/main.scss";

const WatchList = lazy(() => import('./pages/WatchList'));
const Watched = lazy(() => import('./pages/Watched'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

const App = () => {

  return (
     <React.Fragment>

        <Header />
        
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route exact path='/' component={Home} />
            <Route path='/watchList' component={WatchList} />
            <Route path='/watched' component={Watched} />
            <Route path='/movieDetails' component={MovieDetails} />
          </Suspense>
        </Switch>
     </React.Fragment>
  );
}

export default App;

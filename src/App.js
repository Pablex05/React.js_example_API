import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Editar from "./components/Editar";
import New from "./components/New";


function App() {
  return (
      <React.Fragment>
          <Router>
              <Switch>
                  <Route path="/" exact render={props => (<Login {...props}/>)}></Route>
                  <Route path="/dashboard" exact render={props => (<Dashboard {...props}/>)}></Route>
                  <Route path="/editar/:id" exact render={props => (<Editar {...props}/>)}></Route>
                  <Route path="/new" exact render={props => (<New {...props}/>)}></Route>
              </Switch>
          </Router>
      </React.Fragment>
  );
}

export default App;

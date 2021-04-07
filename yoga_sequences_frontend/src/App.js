import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import NormalRoute from "./components/NormalRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import withAuth from './components/auth/withAuth';
import YogaSeqContainer from './containers/YogaSeqContainer';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
          <Route exact path='/' component={NormalRoute} />
          <Route exact path='/protected_route' component={withAuth(ProtectedRoute)} />
          <Route exact path='/yoga_sequences' component={withAuth(YogaSeqContainer)}/>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;

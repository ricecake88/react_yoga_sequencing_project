import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import NormalRoute from "./components/NormalRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import withAuth from './components/auth/withAuth';
import SeqContainer from './containers/SeqContainer';
import CategoryContainer from './containers/CategoryContainer';
import PoseContainer from './containers/PoseContainer';
import SeqShow from './components/sequences/SeqShow';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
          <Route exact path='/' component={NormalRoute} />
          <Route exact path='/protected_route' component={withAuth(ProtectedRoute)}/>
          <Route exact path='/sequences' component={withAuth(SeqContainer)}/>
          <Route exact path='/categories' component={withAuth(CategoryContainer)}/>
          <Route exact path='/poses' component={withAuth(PoseContainer)}/>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path="/sequence/:id" render={(props) => <SeqShow {...props}/>}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;

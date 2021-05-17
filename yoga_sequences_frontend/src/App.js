import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import NormalRoute from "./components/NormalRoute";
//import AllSequences from "./components/AllSequences";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import withAuth from './components/auth/withAuth';
//import SeqContainer from './containers/SeqContainer';
import SeqListContainer from './containers/SeqListContainer';
import CategoryContainer from './containers/CategoryContainer';
import PoseContainer from './containers/PoseContainer';
//import SeqShow from './components/sequences/SeqShow';
//import SeqFormNew from './components/sequences/SeqFormNew';
import SeqFormContainer from './containers/SeqFormContainer';
import SeqShowContainer from './containers/SeqShowContainer';

function App() {

  return (
    <div className="App">
      <Router>
      <Navbar />
      <div className="genericContainer">
        <div className="genericInnerContainer">
          <Switch>
              <Route exact path='/' component={NormalRoute} />
              {/*<Route exact path='/sequences' component={withAuth(AllSequences)}/>*/}
              {/*<Route exact path='/sequences/new' component={withAuth(SeqContainer)}/>*/}
              <Route exact path='/categories' component={withAuth(CategoryContainer)}/>
              <Route exact path='/poses' component={PoseContainer}/>
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route exact path="/sequences" component={withAuth(SeqListContainer)}/>
              <Route exact path="/sequences/add" component={withAuth(SeqFormContainer)}/>
              <Route exact path="/sequences/edit/:id" component={withAuth(SeqFormContainer)}/>
              <Route exact path="/sequences/:id" component={withAuth(SeqShowContainer)}/>
          </Switch>
        </div>
      </div>
      </Router>
    </div>
  );
}

export default App;

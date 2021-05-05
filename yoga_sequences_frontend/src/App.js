import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import NormalRoute from "./components/NormalRoute";
import AllSequences from "./components/AllSequences";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import withAuth from './components/auth/withAuth';
import SeqContainer from './containers/SeqContainer';
import SeqNewContainer from './containers/SeqNewContainer';
import CategoryContainer from './containers/CategoryContainer';
import PoseContainer from './containers/PoseContainer';
import SeqShow from './components/sequences/SeqShow';
import SeqFormNew from './components/sequences/SeqFormNew';
import SeqForm from './components/sequences/SeqForm';

function App() {

  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
          <Route exact path='/' component={NormalRoute} />
          <Route exact path='/sequences' component={withAuth(AllSequences)}/>
          <Route exact path='/sequences/new' component={withAuth(SeqContainer)}/>
          <Route exact path='/categories' component={withAuth(CategoryContainer)}/>
          <Route exact path='/poses' component={withAuth(PoseContainer)}/>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path="/sequence/:id" render={(props) => <SeqShow {...props}/>}/>
          {/*<Route exact path="/sequence/edit/:id" render={(props) => <SeqForm {...props} route={"Edit"}/>}/>*/}
          <Route exact path="/sequences/new2" component={withAuth(SeqNewContainer)}/>
          <Route exact path="/sequences/add" render={(props) => <SeqFormNew {...props} />}/>
          <Route exact path="/sequence/edit/:id" render={(props) => <SeqFormNew {...props} />}/>

      </Switch>
      </Router>
    </div>
  );
}

export default App;

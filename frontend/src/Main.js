import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom'
import Home from './Components/Home'
import auth from './services/authService'
import EditForm from './Components/Form/EditForm'
import Login from './Components/Login'
import PrivateRoute from './Components/util/PrivateRoute'
import UserView from './Components/Responding/UserView'
import RadioCheck from './Components/Responding/RadioCheck'
import Razorpay from './Razorpay'

function Main() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/s/:formId" component={UserView} />
          <PrivateRoute path="/form/:formId" component={EditForm} />

          <Route path="/payment" render={(props) => <Razorpay {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}
export default Main


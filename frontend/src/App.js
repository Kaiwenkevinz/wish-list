import React, { Component, Fragment } from 'react'
import { HashRouter, Route, Switch, Redirect} from  'react-router-dom'
import './App.css'
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// user defined
import WishItemsList from './components/wishItems/WishItemsList'
import { loadUser } from './actions/auth';
import store from './store';
import Alerts from './components/common/Alerts';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/layouts/Header';
import Register from './components/accounts/Register';
import Login from './components/accounts/Login';

const alertOptions = {
  // you can also just use 'bottom center'
  position: 'top center',
  timeout: 3000,
  // offset: '30px',
  // // you can also just use 'scale'
  // transition: transitions.SCALE
}

const CoreLayout = (
  <div >
    <Switch>
      <PrivateRoute exact path="/" component={WishItemsList} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </div>
)

export default class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
            <HashRouter>
              <Fragment>
                <div className="header">
                  <Header />
                </div>
                <Alerts/>
                {CoreLayout}
              </Fragment>
          </HashRouter>
        </AlertProvider>
      </Provider>
    );
  }
}

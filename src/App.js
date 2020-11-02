import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import LoginPanel from './LoginPanel';
import OrderDetail from './OrderDetail';
import ProductDetail from './ProductDetail';
import ProductsPage from './ProductsPage';
import ProductsBrowser from './ProductsBrowser';
import { loadToken } from './store/authentication';
import LogInOrSignUp from './LogInOrSignUp';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (<Route render={(props) => {
    return (
      rest.needLogin === true? <Redirect to='/users/login' />
      : <Component {...props}/>
    );
  }}/>);
}



const App = () => {

  const token = useSelector(state => state.authentication.token);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const needLogin = !token;

  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/users/login"
          render={(props) => (
            <LoginPanel {...props} />
          )}
          />
          <Route
            path="/users/logInOrSignUp"
            render={ (props) => (
              <LogInOrSignUp {...props} />
              )}
              />
        <Route
          path="/users/signup"
          render={(props) => (
            <SignUp {...props} />
          )}
          />
        <Route
          path="/products"
          render={(props) => (
            <ProductsBrowser {...props}/>
          )}
        />
        <Route
          path="/productDetail"
          render={(props) => (
            <ProductDetail {...props} />
          )}
        />
        <Route
          path="/productsPage"
          render={(props) => (
            <ProductsPage {...props} />
          )}
          />
        <PrivateRoute
          path="/order"
          exact={true}
          needLogin={needLogin}
          component={OrderDetail}
          />
          <Route
          path="/"
          render={(props) => (
            <ProductsBrowser {...props} />
          )}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

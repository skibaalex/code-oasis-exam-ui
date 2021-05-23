import { Container } from '@material-ui/core';
import Header from './components/Header';
import LoginModal from './components/Loginodal';
import AuthContext, { AuthProvider } from './context/Auth';
import { BooksProvider } from './context/Books';
import { Skeleton } from '@material-ui/lab';
import Home from './pages/Home';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AdminPage from './pages/Admin';
import { useContext } from 'react';



const AdminRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user, isInitialised } = useContext(AuthContext);
  return (
    <>
      {isInitialised ? <Route
        {...rest}
        render={({ location }) =>
          (isAuthenticated && user?.admin) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      /> : <Skeleton variant="rect" width={210} height={118} />}
    </>
  )
}


function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <Header />
        <Container maxWidth="lg">
          <Switch>
            <AdminRoute path="/admin">
              <AdminPage />
            </AdminRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        <LoginModal />
      </BooksProvider>
    </AuthProvider >
  );
}

export default App;

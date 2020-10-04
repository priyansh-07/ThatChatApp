import React, { useEffect } from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Signup from './components/Signup'
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  if (localStorage.getItem('localRoom') === null)
    localStorage.setItem('localRoom', 'General');
  // console.log(localStorage.getItem('localRoom'));

  // useEffect(() => {
  //   let displayMsg = 'This App is still under development, If you find any bugs or have a suggestion, feel free to drop an email at priyanshjain@acm.org.'
  //   alert(displayMsg);
  // }, [])
  return (
    <AuthContextProvider>
      <AuthContext.Consumer>{context => {
        return (
          <div className='App'>
            <Router>
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/'
                render={context.isAuthenticated ?
                  props => <Home {...props} /> :
                  props => <SignIn {...props} toggleAuth={context.toggleAuth} />}
              />
            </Router>
          </div>
        );
      }}
      </AuthContext.Consumer>
    </AuthContextProvider>
  );
}

export default App;

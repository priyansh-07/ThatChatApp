import React from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Signup from './components/Signup'
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SimpleModal from './components/InstructionModal';

function App() {
  if (localStorage.getItem('localRoom') === null)
    localStorage.setItem('localRoom', 'General');
  // console.log(localStorage.getItem('localRoom'));

  return (
    <AuthContextProvider>
      <AuthContext.Consumer>{context => {
        return (
          <div className='App'>
            <SimpleModal />
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

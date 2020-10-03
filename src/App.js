import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';

function App() {
  return (
      <AuthContextProvider>
        <AuthContext.Consumer>{context => {
          return (
            <div className='App'>
              {context.isAuthenticated ? <Home /> : <Login />}
            </div>
          );
        }}
        </AuthContext.Consumer>
      </AuthContextProvider>  
  );
}

export default App;

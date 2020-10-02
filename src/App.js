import React from 'react';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AuthContext.Consumer>{context => {
          return (
            <h1> {context.test} </h1>
          );
        }}
        </AuthContext.Consumer>
      </AuthContextProvider>  
    </div>
  );
}

export default App;

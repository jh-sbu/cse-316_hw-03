import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
import { GlobalStoreContext, useGlobalStore } from './store'

const AppWrapper = () => {

  let handleKeys = (event) => {
    store.store.handleKeyPress(event);
    //console.log("Test");
    //console.log(store.store.isEditSongOpen)
  }

  const store = useGlobalStore();
  //console.log("sdilkadskf");
  return (
    <div id="app-root" onKeyDown={handleKeys} tabIndex={-1}>
      <GlobalStoreContext.Provider value={store} onKeyDown={handleKeys}>
        <App />
      </GlobalStoreContext.Provider>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  //fakeRoot()
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
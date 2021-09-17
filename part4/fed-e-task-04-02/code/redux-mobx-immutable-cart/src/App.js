import React from 'react';
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer';

import {
  RootStore,
  RootStoreProvider
} from './store/RootStore'

const rootStore = new RootStore()

function App() {
  return (
    <RootStoreProvider store={rootStore}>
      <div className="section">
        <div className="section-inner">
          <Header />
          <List />
          <Footer />
        </div>

      </div>
    </RootStoreProvider>
  );
}

export default App;

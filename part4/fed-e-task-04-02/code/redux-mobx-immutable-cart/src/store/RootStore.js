import React from 'react';
import { createContext, useContext } from 'react'
import AppleListStore from './AppleListStore'

class RootStore {
  constructor() {
    this.appleListStore = new AppleListStore()
  }
}


const RootStoreContext = createContext();

const RootStoreProvider = ({store, children}) => {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  )
}

const useRootStore = () => {
  return useContext(RootStoreContext)
}

export {
  RootStore,
  RootStoreProvider,
  useRootStore,
}
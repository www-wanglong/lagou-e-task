import React from 'react';
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../store/RootStore';
import Item from './Item';


function List() {

  const { appleListStore: { showList } } = useRootStore()

  if (showList.length === 0) {
    return <div className="empty">空空如也</div>
  }
  return (
    <div className="list-wrap">
      {
        showList.map( (item, index) => <Item key={index} apple={item} />)
      }
    </div>
  );
}

export default observer(List);
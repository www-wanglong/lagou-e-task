import React from 'react';
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../store/RootStore';

function Footer() {

  const { appleListStore: { addApple, adding} } = useRootStore()

  return (
    <button className={`add-item-btn ${adding ? 'disabled' : ''}` } disabled={adding} onClick={addApple}>{adding ? '正在采摘...' : '摘苹果'}</button>
  );
}

export default observer(Footer);
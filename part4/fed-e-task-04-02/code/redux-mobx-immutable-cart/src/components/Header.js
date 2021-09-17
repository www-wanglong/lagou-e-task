import React from 'react';
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../store/RootStore';

function Header() {

  const { appleListStore: {
      showCount,
      showWeightTotal,
      hideCount,
      hideWeightTotal
    }
  } = useRootStore()

  return (
    <div className="head">
      <span className="head-title">苹果篮子</span>
      <div className="row-space-between-center head-content">
        <div>
          <div className="head-content-title">当前</div>
          <div>{showCount}个苹果，{showWeightTotal}克</div>
        </div>
        <div>
          <div className="head-content-title">已吃掉</div>
          <div>{hideCount}个苹果，{hideWeightTotal}克</div>
        </div>
      </div>
    </div>
  );
}

export default observer(Header);
import React from 'react';

function Item({ apple }) {

  return (
    <div className="row-space-between-center item-wrap">
      <div className="row-space-between-center">
        <div className="item-image">🍎</div>
        <div>
          <div className="item-title">{apple.name}</div>
          <div>{apple.weight}克</div>
        </div>
      </div>
      <button className="item-hide-btn" onClick={apple.hide}>吃掉</button>
    </div>
  );
}

export default Item;
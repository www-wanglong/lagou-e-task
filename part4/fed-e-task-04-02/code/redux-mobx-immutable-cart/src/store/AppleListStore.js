import AppleStore from './AppleStore'
import {
  action,
  computed,
  makeObservable,
  observable
} from 'mobx'

/**
 * 管理 苹果篮子
 */
class AppleListStore {

  list = []
  adding = false

  constructor(list) {
    if (!!list) {
      this.list = list
    }

    makeObservable(this, {
      list: observable,
      adding: observable,
      addApple: action.bound,
      showList: computed,
      showCount: computed,
      showWeightTotal: computed,
    })
  };

  /**
   * 采摘
   */
  addApple() {
    if (this.adding) {
      return
    }
    this.adding = true
    let name = `红苹果 - ${this.list.length + 1}号`
    setTimeout(() => {
      this.list.push(new AppleStore(name));
      this.adding = false
    }, 100)
  }

  get showList() {
    return this.list.filter( item => item.isShow )
  }

  get showCount() {
    return this.list.filter( item => item.isShow ).length
  }

  get showWeightTotal() {
    return this.list.reduce( (total, item) => item.isShow ? total += item.weight : total,  0)
  }

  get hideCount() {
    return this.list.filter( item => !item.isShow ).length
  }

  get hideWeightTotal() {
    return this.list.reduce( (total, item) => !item.isShow ? total += item.weight : total,  0)
  }


};

export default AppleListStore;
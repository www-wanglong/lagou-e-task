
import {
  action,
  makeObservable,
  observable
} from 'mobx'

/**
 * 管理 一个苹果
 */
class AppleStore {

  id = Math.random()
  name = ''
  weight = parseInt(Math.random() * 100) + 100
  isShow = true
  constructor (name) {

    this.name = name

    makeObservable(this, {
      isShow: observable,
      hide: action.bound,
    })
  }

  // 吃掉苹果
  hide() {
    this.isShow = false
  }

}

export default AppleStore;
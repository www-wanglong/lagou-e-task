/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/
/**
 *  1.Promise是一个类， 需要传入一个执行器立即执行
 *  2.Promise有三种状态pending, fulfilled, rejected
 *    状态的转化
 *     pending -> fulfilled
 *     pending -> rejected
 *    一旦状态发生变化便不可更改、
 *  3.resolve和reject用来改变promise的状态, 进来记录执行的值
 *  4.then方法需要传递两个参数，根据状态执行相应的函数，
 *  5.then方法异步执行(需要在pending状态记录传递的参数，然后在resolve/reject执行)
 *  6.then方法可以被同时多次调用
 *  7.then方法可以链式调用 上个返回的结果会给下个then 异步执行
 *  8.promise不能自己返回调用自己;
 *  9.promise的then方法如果传入值 会成功回调到下个;可以不传值
 *  10.all、resolve静态方法
 *  11.finally catch实例方法
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECT = 'reject'
class MyPromise {

  constructor (executor) {
    executor(this.resolve, this.reject)
  }

  status = PENDING
  successCallbacks = []
  failCallbacks = []

  resolve = (value) => {
    const { status, successCallbacks } = this
    // 状态只能从pending -> fulfilled或 pending -> rejected
    if (status !== PENDING) {
      return
    }
    this.value = value
    this.status = FULFILLED
    while (!!successCallbacks.length) {
      successCallbacks.shift()(this.value)
    }
  }

  reject = (reason) => {
    const { status, failCallbacks } = this
    if (status !== PENDING) {
      return
    }
    this.reason = reason
    this.status = REJECT
    while (!!failCallbacks.length) {
      failCallbacks.shift()(this.reason)
    }
  }

  then = (successCallback, failCallback) => {
    const { status, value, reason, successCallbacks, failCallbacks } = this
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => { throw reason }
    // then方法需要返回promise对象
    let promise2 = new MyPromise((resolve, reject) => {
      if (status === FULFILLED) {
        setTimeout( () => {
          try {
            let result = successCallback(value)
            resolvePromise(promise2, result, resolve, reject)
            resolve(result)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (status === REJECT) {
        setTimeout( () => {
          try {
            let reason1 = failCallback(reason)
            resolvePromise(promise2, reason1, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)

      } else {
        successCallbacks.push(() => {
          try {
            let v = successCallback(this.value)

            resolvePromise(promise2, v, resolve, reject)
          } catch (e) {
            reject(e)
          }

        })
        failCallbacks.push( () => {
          try {
            let r = failCallback(this.reason)
            resolvePromise(promise2, r, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2
  }

  finally (callback) {
    return this.then( value => {
      return MyPromise.resolve(callback()).then( () => value )
      // callback()
      // return value
    }, reason => {
      return MyPromise.resolve(callback()).then( () => { throw reason } )
      // callback()
      // throw reason
    })
  }

  finally (callback) {
    return this.then( value => {
      return MyPromise.resolve(callback()).then( () => value )
    }, reason => {
      return MyPromise.resolve(callback()).then( () => { throw reason } )
    })
  }

  catch (failCallback) {
    return this.then(undefined, failCallback)
  }


  /**
   * all方法
   * @param {Array} array
   */
  static all (array) {
    let result = []
    let index = 0

    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value
        index++;
        if (index === array.length) {// 保证每一项都执行完成 然后返回
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          current.then( value => addData(i, value), reason => reject(reason))
        } else {
          // 普通值
          addData(i, current)
        }
      }
    })
  }

  static resolve (value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise(resolve => resolve(value))
  }

}

function resolvePromise (promise2, result, resolve, reject) {
  if (result === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (result instanceof MyPromise) {
    result.then(resolve, reject)
  } else {
    resolve(x)
  }
}

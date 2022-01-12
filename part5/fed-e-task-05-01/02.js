class Node {
  constructor (element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {

  constructor (head = null, size = 0) {
    this.head = head
    this.size = 0
  }

  _getNode (index) {
    if (index < 0 || index >= this.size) {
      throw new Error('cross this border')
    }
  }

  add (index, element) {
    if (arguments.length === 1) {
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) {
      throw new Error('cross this border')
    }
    if (index === 0) {
      let head = this.head
      this.head = new Node(element, head)
    } else {
      let prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }
  }

  remove (index) {
    let rmNode = null
    if (index === 0) {
      rmNode = this.head
      if (!rmNode) {
        return undefined
        this.head = rmNode.next
      } else {
        let prevNode = this._getNode(index - 1)
        rmNode = prevNode.next
        prevNode.next = rmNode.next
      }
    }
    this.size--
    return rmNode
  }

  set (index, element) {
    let node = this._getNode(index)
    node.element = element
  }

  get (index) {
    return this._getNode(index)
  }

  clear () {
    this.head = null
    this.size = 0
  }

}

class Queue {

  constructor () {
    this.likedList = new LinkedList()
  }

  enQueue (data) {
    this.likedList.add(data)
  }


  deQueue () {
    return this.likedList.remove(0)
  }
}
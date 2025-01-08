import { describe, expect, it } from 'vitest'
import { LinkedList, LinkedNode } from '~/lib/linked-list'

describe('linked list', () => {
  it('linked to array', () => {
    const list = new LinkedList()
    const rn = new LinkedNode(1)
    const middle = new LinkedNode(2)
    const tn = new LinkedNode(3)

    rn.next = middle
    middle.next = tn

    tn.prev = middle
    middle.prev = rn

    list.root = rn
    list.tail = tn

    expect(list.toArray()).toEqual([1, 2, 3])
  })

  it('remove specified node ', () => {
    const list = new LinkedList()
    const rn = new LinkedNode(1)
    const middle = new LinkedNode(2)
    const tn = new LinkedNode(3)

    rn.next = middle
    middle.next = tn

    tn.prev = middle
    middle.prev = rn

    list.root = rn
    list.tail = tn

    list.remove(middle)

    expect(list.toArray()).toEqual([1, 3])
  })

  it('remove root node ', () => {
    const list = new LinkedList()
    const rn = new LinkedNode(1)
    const middle = new LinkedNode(2)
    const tn = new LinkedNode(3)

    rn.next = middle
    middle.next = tn

    tn.prev = middle
    middle.prev = rn

    list.root = rn
    list.tail = tn

    list.remove(rn)

    expect(list.toArray()).toEqual([2, 3])
  })

  it('remove tail node ', () => {
    const list = new LinkedList()
    const rn = new LinkedNode(1)
    const middle = new LinkedNode(2)
    const tn = new LinkedNode(3)

    rn.next = middle
    middle.next = tn

    tn.prev = middle
    middle.prev = rn

    list.root = rn
    list.tail = tn

    list.remove(tn)

    expect(list.tail).toEqual(middle)
    expect(list.toArray()).toEqual([1, 2])
  })

  it('remove unique node', () => {
    const list = new LinkedList()
    const node = new LinkedNode(1)

    list.root = node
    list.tail = node

    list.remove(node)

    expect(list.root).toBeFalsy()
    expect(list.tail).toBeFalsy()
  })

  it('insert at node', () => {
    const list = new LinkedList()
    const node = new LinkedNode(1)

    list.root = node
    list.tail = node

    list.insertAt(2, node)

    expect(list.toArray()).toEqual([1, 2])
  })
})

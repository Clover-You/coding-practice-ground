/**
 * <p>
 * intensity segments
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2025-01-07 23:57
 */

import { LinkedList, LinkedNode } from '~/lib/linked-list'

interface IntensitySegment {
  start: number
  value: number
}

function inRange(from: number, to: number, position: number) {
  return position >= from && position < to
}

function isWithoutNode(begin: number, end: number, index: number) {
  return begin < index && end > index
}

function insertNextNode(index: number, amount: number, curr?: LinkedNode<IntensitySegment>) {
  const node = new LinkedNode<IntensitySegment>({ start: index, value: amount })
  if (!curr)
    return node

  const currNext = curr.next
  curr.next = node
  node.next = currNext
  node.prev = curr

  if (currNext)
    currNext.prev = node

  return node
}

function shouldInsertAtEnd(index: number, node?: LinkedNode<IntensitySegment>) {
  if (node)
    return node.item.value !== 0 && node.item.start < index
  return false
}

function shouldInsertAtRoot(from: number, root?: LinkedNode<IntensitySegment>): root is LinkedNode<IntensitySegment> {
  if (!root)
    return false
  return !!root && root.item.start > from
}

function isZeroNode(node?: LinkedNode<IntensitySegment>): node is LinkedNode<IntensitySegment> {
  if (node)
    return Boolean(node && node.item.value === 0)
  return false
}

export class IntensitySegments {
  private segments = new LinkedList<IntensitySegment>()

  private ensureInitialized(from: number, to: number, amount: number) {
    if (!this.segments.root || !this.segments.tail) {
      this.segments.root = new LinkedNode<IntensitySegment>({ start: from, value: amount })
      this.segments.tail = insertNextNode(to, 0, this.segments.root)
      return true
    }
    return false
  }

  public add(from: number, to: number, amount: number) {
    if (!this.segments.root || !this.segments.tail) {
      if (this.ensureInitialized(from, to, amount))
        return
    }

    let curr: LinkedNode<IntensitySegment> | undefined = this.segments.root

    if (shouldInsertAtRoot(from, this.segments.root)) {
      const node = new LinkedNode<IntensitySegment>({ start: from, value: amount })
      this.segments.root.prev = node
      node.next = this.segments.root
      this.segments.root = node
    }

    while (curr) {
      const currentPosition = curr.item.start
      const nextPosition = curr.next?.item.start ?? 0
      const currAmount = curr.item.value

      if (isWithoutNode(currentPosition, nextPosition, from)) {
        const node = insertNextNode(from, currAmount + amount, curr)
        curr = node.next
        continue
      }

      if (inRange(from, to, currentPosition)) {
        const nowAmount = curr.item.value += amount
        if (nowAmount === 0) {
          // if it is within range, the next cycle needs to be processed it. skip
          if (isZeroNode(curr.next) && !inRange(from, to, curr.next.item.start))
            this.segments.remove(curr.next)

          // [[10,0],[20,1],[30,0]]
          if (!curr.prev || curr.prev.item.value === 0)
            this.segments.remove(curr.prev ?? curr)
        }
      }

      curr = curr.next
    }

    if (shouldInsertAtEnd(to, this.segments.tail))
      this.segments.tail = insertNextNode(to, 0, this.segments.tail)
  }

  public set(from: number, to: number, amount: number) {
    if (this.ensureInitialized(from, to, amount))
      return

    let curr: LinkedNode<IntensitySegment> | undefined = this.segments.root

    while (curr) {
      const currentPosition = curr.item.start

      if (inRange(from, to, currentPosition))
        curr.item.value = amount

      curr = curr.next
    }
  }

  public toString() {
    return JSON.stringify(this.segments.toArray().map(it => [it.start, it.value]))
  }
}

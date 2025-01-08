export class LinkedNode<T> {
  constructor(public item: T) { }

  public next?: LinkedNode<T>

  public prev?: LinkedNode<T>
}

export class LinkedList<T> {
  public root?: LinkedNode<T>

  public tail?: LinkedNode<T>

  public remove(node: LinkedNode<T>) {
    const next = node.next
    const prev = node.prev

    if (next)
      next.prev = prev
    if (prev)
      prev.next = next
    else
      this.root = next

    if (this.tail === node)
      this.tail = next ?? prev
  }

  public insertAt(item: T, curr?: LinkedNode<T>) {
    const node = new LinkedNode<T>(item)

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

  public toArray(): T[] {
    let curr = this.root
    const recors: T[] = []

    while (curr) {
      recors.push(curr.item)
      curr = curr.next
    }

    return recors
  }
}

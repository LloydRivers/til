class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  addToHead(data) {
    this.size++;
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  printList() {
    if (this.head == null) {
      console.log("The list is empty");
      return;
    }

    let current = this.head;
    let output = "<head>";

    while (current) {
      output += ` ${current.data}`;

      if (current.next) {
        output += " ->";
      }

      current = current.next;
    }

    output += " -> null";
    console.log(output);
  }
}

const ll = new LinkedList();
ll.addToHead(1);
ll.addToHead(2);
ll.addToHead(3);
// console.log();
ll.printList();

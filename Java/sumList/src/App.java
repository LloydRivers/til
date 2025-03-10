import java.util.Stack;

public class App {
    public static class Node {
        int data;
        Node next;

        public Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    public static void main(String[] args) throws Exception {
        Stack<Integer> stack = new Stack<>();

        // Create nodes
        Node node1 = new Node(1);
        Node node2 = new Node(2);
        Node node3 = new Node(3);

        // Link the nodes
        node1.next = node2;
        node2.next = node3;

        Node current = node1;
        while (current != null) {
            stack.add(current.data);
            current = current.next;
        }

        System.out.println(stack);
    }
}

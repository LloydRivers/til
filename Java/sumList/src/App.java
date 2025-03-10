import java.util.Stack;

public class App {
    public static void main(String[] args) throws Exception {
        Stack<Integer> stack = new Stack<>();

        Node node1 = new Node(1);
        Node node2 = new Node(2);
        Node node3 = new Node(3);

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

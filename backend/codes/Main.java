import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Creating a Scanner object to read input from the console
        Scanner scanner = new Scanner(System.in);


        // Reading the integer input from the user
        int a = scanner.nextInt();

        // Printing the entered integer
        System.out.println("You entered: " + a);

        // Closing the scanner to prevent resource leak
        scanner.close();
    }
}

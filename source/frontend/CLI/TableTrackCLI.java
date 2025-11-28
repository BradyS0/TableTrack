import java.io.Console;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;


public class TableTrackCLI {

    private static final String BASE_URL = "http://localhost:3000/v1";
    private static HttpClient client = HttpClient.newHttpClient();
    private static Scanner scanner = new Scanner(System.in);

    private static boolean loggedIn = false;
    private static String currentUserEmail = "";

    private static void printBanner() {
        System.out.println(
            "╔══════════════════════════════════════════╗\n" +
            "║        Welcome to the TableTrack CLI     ║\n" +
            "║       Manage Users • Restaurants • More  ║\n" +
            "╚══════════════════════════════════════════╝"
        );
    }
    

    public static void main(String[] args) throws Exception {
        printBanner();
        showHelp();

        while (true) {
            System.out.print("> ");
            String cmd = scanner.nextLine().trim();

            switch (cmd) {
                case "help":
                    showHelp();
                    break;

                case "signup":
                    if (loggedIn) {
                        System.out.println("You are already logged in. Logout first.");
                        break;
                    }
                    signup();
                    break;

                case "login":
                    if (loggedIn) {
                        System.out.println("You are already logged in. Logout first.");
                        break;
                    }
                    login();
                    break;

                case "restaurants":
                    listRestaurants();
                    break;

                case "whoami":
                    if (!loggedIn) System.out.println("Not logged in.");
                    else System.out.println("Logged in as: " + currentUserEmail);
                    break;

                case "logout":
                    if (!loggedIn) System.out.println("Not logged in.");
                    else {
                        loggedIn = false;
                        currentUserEmail = "";
                        System.out.println("Logged out!");
                    }
                    break;

                case "exit":
                    System.out.println("Goodbye!");
                    return;

                default:
                    System.out.println("Unknown command. Type: help");
            }
        }
    }

    private static void showHelp() {
    System.out.println("\n==============================================");
    System.out.println("                 COMMAND MENU");
    System.out.println("==============================================");

    if (loggedIn) {
        System.out.println("  whoami          Show logged-in user info");
        System.out.println("  logout          Log out of your account");
    } else {
        System.out.println("  signup          Create a new account");
        System.out.println("  login           Log into your account");
    }

    System.out.println("  restaurants     View available restaurants");
    System.out.println("  help            Show this menu");
    System.out.println("  exit            Quit the program");

    System.out.println("==============================================\n");
    }

    private static void signup() throws Exception {
    System.out.print("First Name: ");
    String first = scanner.nextLine();

    System.out.print("Last Name: ");
    String last = scanner.nextLine();

    System.out.print("Email: ");
    String email = scanner.nextLine();

    // MASKED PASSWORD
    Console console = System.console();
    String password;
    if (console != null) {
        char[] passChars = console.readPassword("Password: ");
        password = new String(passChars);
    } else {
        System.out.print("Password (visible): ");
        password = scanner.nextLine();
    }

    String json = String.format(
            "{\"first_name\":\"%s\",\"last_name\":\"%s\",\"email\":\"%s\",\"password\":\"%s\"}",
            first, last, email, password
    );

    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/user"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    // Print friendly message only
    if (response.statusCode() == 201) {
        System.out.println("\nSignup successful!");
    } else {
        System.out.println("\nSignup failed" );
    }
}

    

private static void login() throws Exception {
    System.out.print("Email: ");
    String email = scanner.nextLine();

    // MASKED PASSWORD
    Console console = System.console();
    String password;
    if (console != null) {
        char[] passChars = console.readPassword("Password: ");
        password = new String(passChars);
    } else {
        System.out.print("Password (visible): ");
        password = scanner.nextLine();
    }

    String json = String.format(
            "{\"email\":\"%s\", \"password\":\"%s\"}",
            email, password
    );

    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/user/login"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    if (response.body().contains("Login successful")) {
        loggedIn = true;
        currentUserEmail = email;
        System.out.println("\nLogin successful!");
    } else {
        System.out.println("\nLogin failed: Invalid email or password.");
    }
}
    

    private static void listRestaurants() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/restaurant"))
            .GET()
            .build();
    
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    
        String body = response.body();
    
        String arr = body.substring(body.indexOf("[") + 1, body.lastIndexOf("]"));
        String[] items = arr.split("\\},\\{");
    
        System.out.println("\n======= RESTAURANTS =======");
    
        for (String item : items) {
            String cleaned = item.replace("{", "").replace("}", "");
    
            String[] fields = cleaned.split(",");
    
            String id = "";
            String name = "";
    
            for (String pair : fields) {
                String[] kv = pair.split(":");
                if (kv.length < 2) continue;
    
                String key = kv[0].replace("\"", "").trim();
                String val = kv[1].replace("\"", "").trim();
    
                if (key.equals("restID")) id = val;
                if (key.equals("name")) name = val;
            }
    
            System.out.println(" [" + id + "] " + name);
        }
    
        System.out.println("===========================\n");
    }
    
}

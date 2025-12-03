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

    //  Colors
    private static final String RESET  = "\u001B[0m";
    private static final String CYAN   = "\u001B[36m";
    private static final String GREEN  = "\u001B[32m";
    private static final String RED    = "\u001B[31m";
    private static final String YELLOW = "\u001B[33m";
    private static final String PURPLE = "\u001B[35m";

    private static void clearScreen() {
        System.out.print("\u001B[2J");      // Clear screen buffer
        System.out.print("\u001B[H");       // Home cursor
        System.out.print("\u001B[1;1H");    // Force absolute row 1 col 1
        System.out.flush();
    }
    

    private static void printBanner() {
        clearScreen();
        System.out.print("\u001B[1;1H");
    
        final int WIDTH = 200; 
    
        String line1 = "╔══════════════════════════════════════════════╗";
        String line2 = "║        T A B L E T R A C K   C L I           ║";
        String line3 = "║  Account Management & Restaurant Exploration ║";
        String line4 = "╚══════════════════════════════════════════════╝";
    
        String commands =
            " 📨 signup  |  🔐 login  |  🍴 restaurants  |  🙂 whoami  |  📤 logout  |  ❌ exit";
    
        System.out.println(CYAN + center(line1, WIDTH));
        System.out.println(center(line2, WIDTH));
        System.out.println(center(line3, WIDTH));
        System.out.println(center(line4, WIDTH) + RESET + "\n");
    
        System.out.println(YELLOW + center(commands, WIDTH) + RESET + "\n");
    }
    
    
    private static String center(String text, int width) {
        int padding = (width - text.length()) / 2;
        if (padding < 0) padding = 0;
        return " ".repeat(padding) + text;
    }
    

    private static void printSection(String title) {
        System.out.println(PURPLE + "\n───────── " + title + " ─────────" + RESET);
    }

    private static void printSuccess(String msg) {
        System.out.println(GREEN + "✅ " + msg + RESET);
    }

    private static void printError(String msg) {
        System.out.println(RED + "❌ " + msg + RESET);
    }

    private static void showSpinner(String msg, int durationMs) {
        String[] frames = {"|", "/", "-", "\\"};
        long end = System.currentTimeMillis() + durationMs;
        int i = 0;

        while (System.currentTimeMillis() < end) {
            System.out.print("\r" + CYAN + msg + " " + frames[i % frames.length] + RESET);
            i++;
            try { Thread.sleep(120); } catch (Exception ignored) {}
        }

        System.out.print("\r" + GREEN + msg + " ✓" + RESET + "\n");
    }

    // Password masking 

    private static String readPassword(String prompt) {
        Console console = System.console();
        if (console != null) {
            char[] chars = console.readPassword(prompt);
            return new String(chars);
        } else {
            System.out.print(prompt);
            return scanner.nextLine();
        }
    }
    
    

    // ---------- MAIN APP ---------- //

    public static void main(String[] args) throws Exception {
        // initial screen
        printBanner();

        while (true) {
            System.out.print(YELLOW + "> " + RESET);
            String cmd = scanner.nextLine().trim();

            // After user hits enter, wipe old stuff and show fresh header + helper
            printBanner();

            switch (cmd) {
                
                case "signup":
                    if (loggedIn) {
                        printError("You are already logged in. Logout first.");
                        break;
                    }
                    signup();
                    break;

                case "login":
                    if (loggedIn) {
                        printError("You are already logged in. Logout first.");
                        break;
                    }
                    login();
                    break;

                case "restaurants":
                    listRestaurants();
                    break;

                case "whoami":
                    if (!loggedIn) printError("Not logged in.");
                    else System.out.println(GREEN + "Logged in as: " + currentUserEmail + RESET);
                    break;

                case "logout":
                    if (!loggedIn) printError("Not logged in.");
                    else {
                        loggedIn = false;
                        currentUserEmail = "";
                        printSuccess("Logged out successfully!");
                    }
                    break;

                case "exit":
                    clearScreen();
                    System.out.println(CYAN + "Goodbye! 👋" + RESET);
                    return;

                default:
                    printError("Unknown command.");
            }
        }
    }

    // ---------- SIGNUP ---------- //

    private static void signup() throws Exception {
        printSection("Signup");

        System.out.print("First Name: ");
        String first = scanner.nextLine();

        System.out.print("Last Name: ");
        String last = scanner.nextLine();

        System.out.print("Email: ");
        String email = scanner.nextLine();

        String password = readPassword("Password: ");

        String json = String.format(
                "{\"first_name\":\"%s\",\"last_name\":\"%s\",\"email\":\"%s\",\"password\":\"%s\"}",
                first, last, email, password
        );

        showSpinner("Creating account", 900);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/user"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 201) {
            printSuccess("Signup successful!");
        } else {
            printError("Signup failed.");
        }
    }

    // ---------- LOGIN ---------- //

    private static void login() throws Exception {
        printSection("Login");

        System.out.print("Email: ");
        String email = scanner.nextLine();

        String password = readPassword("Password: ");

        String json = String.format(
                "{\"email\":\"%s\", \"password\":\"%s\"}",
                email, password
        );

        showSpinner("Authenticating", 900);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/user/login"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.body().contains("Login successful")) {
            loggedIn = true;
            currentUserEmail = email;
            printSuccess("Login successful!");
        } else {
            printError("Login failed: Invalid email or password.");
        }
    }

    // ---------- RESTAURANTS ---------- //

    private static void listRestaurants() throws Exception {
        printSection("Restaurants");

        showSpinner("Fetching restaurants", 800);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/restaurant"))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        String body = response.body();
        String arr = body.substring(body.indexOf("[") + 1, body.lastIndexOf("]"));
        String[] items = arr.split("\\},\\{");

        System.out.println(GREEN + "\n===== Available Restaurants =====" + RESET);

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

            System.out.println(CYAN + " • [" + id + "] " + name + RESET);
        }

        System.out.println(GREEN + "====================================\n" + RESET);
    }
}

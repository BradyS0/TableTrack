#!/usr/bin/env node
import readline from "readline";
import { createUser, loginUser } from "./userClient.js";
import { listRestaurants } from "./resturantClient.js";

let currentUser = null; // tracks logged-in user

  
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Small helper for asking user input
function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

// Shows different help menus depending on login state
function showHelp() {
  console.log("\n=======================");
  if (currentUser) {
    console.log("Logged-in commands:");
    console.log("  whoami              Show logged-in user");
    console.log("  logout              Log out");
  } else {
    console.log("Available commands:");
    console.log("  signup              Create a new user");
    console.log("  login               Log in to an existing user");
  }
  console.log("\nCommon commands:");
  console.log("  resturants         View list of restaurants");
  console.log("  help                Show commands");
  console.log("  exit                Quit CLI");
  console.log("=======================\n");
}

console.log("Welcome to TableTrack CLI!");
showHelp();

async function main() {
  while (true) {
    const input = await ask("> ");
    const [cmd, arg] = input.trim().split(" ");

    // EXIT
    if (cmd === "exit") {
      console.log("Goodbye!");
      rl.close();
      process.exit(0);
    }

    // HELP
    if (cmd === "help") {
      showHelp();
      continue;
    }

    //     PUBLIC COMMANDS

    // VIEW ALL RESTAURANTS (no login required)
    // View restaurants (allowed with or without login)
    if (cmd === "resturants") {
        const list = await listRestaurants();
        if (!list.restaurants) {
          console.log("Failed to fetch restaurants.");
        } else {
          console.log("\nAvailable Restaurants:\n");
          list.restaurants.forEach(r => {
            console.log(`  [${r.restID}] ${r.name}`);
          });
          console.log();
        }
        continue;
      }

    //     WHEN USER NOT LOGGED IN
    if (!currentUser) {
        if (cmd === "signup") {
          const first = await ask("First Name: ");
          const last = await ask("Last Name: ");
          const email = await ask("Email: ");
          const password = await ask("Password: ");
      
          const result = await createUser(first, last, email, password);
      
          if (result.error) {
            console.log("Signup failed:", result.error);
          } else {
            console.log(`Account created successfully for ${result.first_name} ${result.last_name}`);
          }
      
          continue;
        }

      if (cmd === "login") {
        const email = await ask("Email: ");
        const password = await ask("Password: ");

        const result = await loginUser(email, password);

        if (result.user) {
          currentUser = result.user;
          console.log(`\nLogged in as ${currentUser.first_name} ${currentUser.last_name}`);
        } else {
          console.log(result.error || "Login failed");
        }

        showHelp();
        continue;
      }

      console.log("Unknown command. Try: signup | login | restaurants | exit");
      continue;
    }

    //     WHEN USER IS LOGGED IN

    if (cmd === "whoami") {
      console.log("\nYou are logged in as:");
      console.log(currentUser);
      continue;
    }

    if (cmd === "logout") {
      console.log(`Logged out: ${currentUser.first_name}`);
      currentUser = null;
      showHelp();
      continue;
    }

    // block signup & login while logged in
    if (cmd === "signup" || cmd === "login") {
      console.log("You are already logged in. Please logout first.");
      continue;
    }

    console.log("Unknown command. Try: whoami | logout | restaurants | exit");
  }
}

main();

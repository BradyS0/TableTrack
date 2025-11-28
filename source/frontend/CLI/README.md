# TableTrack CLI — README

Welcome to the **TableTrack CLI**, a lightweight command-line interface for interacting with the TableTrack backend API.  
This tool lets you **sign up**, **log in**, and **view restaurants** directly from your terminal using pure Java.

---

## Features
- Create a new user account  
- Log in with an existing account  
- Masked password entry for security  
- View all available restaurants (no login required)  
- Beautiful ASCII interface and guided prompts  

---

## Project Structure
```
/CLI
 ├── TableTrackCLI.java     # Main CLI program (Java)
 └── README.md              # This file
```

----

##  Prerequisites

Before running the program, ensure you have:

### ✔ Java Installed
Run:
```
java -version
```
You should see something like:
```
openjdk version "17" ...
```

### ✔ Backend Server Running
The CLI interacts with the backend at:
```
http://localhost:3000
```
Make sure your backend is running:
```
npm install
npm start
```

---

## ▶ How to Compile & Run the CLI

### 1. Navigate to the CLI folder
```
cd source/frontend/CLI
```

### 2. Compile the program
```
javac TableTrackCLI.java
```

### 3. Run the program
```
java TableTrackCLI
```

---

## Usage Guide

When the program launches, you will see a menu like:

```
Welcome to TableTrack CLI!
Type a command:
- signup
- login
- restaurants
- exit
```

### Signup Example
```
> signup
First Name: John
Last Name: Doe
Email: john.doe@gmail.com
Password: ********
Account created successfully!
```

### Login Example
```
> login
Email: john.doe@gmail.com
Password: ********
Login successful!
```

### View restaurants
```
> restaurants
[1] Pizza Yum
[2] Sushi Go!
[3] Taco Town
```



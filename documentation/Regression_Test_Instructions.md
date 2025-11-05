# Regression test run instructions

First create a .env file that has the folowing variables defined:

```bash
# .env file in root directory

DB_NAME=testdb
DB_USER=testuser
DB_PASS=testpassword
```
To figure out what commit/branch to compare changes to enter into the command line:

```bash
# in root directory

./changed_files.sh --help
```

Once you know what setting you'd like open regression.js and enter the changes into this function on line 13:

```bash
await cmd("./changed_files.sh --mode since-branch --base dev")
```

After you're happy with your change or lack-there-of, enter into the command line:

```bash
 ./regression.js
```
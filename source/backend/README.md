## Backend Directory Structure

```bash
\---backend
    +---logic # contains all logic code used in routes, one file for each route
    +---models # contains Sequelize model definitions
    +---routes # contains api route files, where all backend components come together
    \---tests
        +---integration # contains integration test files, one for each data type
        \---unit # contains unit test files, one for each data type
```
## Backend Run Instructions

In order to run locally:  
- Clone repository
- Open directory in editor or terminal/powershell
- Make sure you have docker desktop open

To do all the backend running, go to backend folder with command:

```bash
cd ./source/backend
```
To run the unit and integration tests, the test:all:endpoints script, the server to connect to the cloud database, and the profiler, you will need to install all necessary dependencies. Our package-lock contains all the details so all you need to do is to run the command:
```bash
# from ./source/backend

npm ci
```
### Tests

#### Unit

To run the unit tests:
```bash
# from ./source/backend

npm run test:unit
```

To run the integration tests create a `.env` file in the **backend** directory with the following credentials:
```bash
DB_NAME=testdb
DB_USER=testuser
DB_PASS=testpassword
```
#### Integration

For Integration Tests from the command line run:
```bash
# from ./source/backend

npm run test:integration:start  # this will initialize the docker container
npm run test:integration        # this will start the tests
npm run test:integration:stop   # this will clear the docker container
```
### API Server + Database

Next for the local API server + database, please change the `env` file to:
```bash
DB_USER=user
DB_PASS=password
DB_NAME=tabletrackdb
DB_HOST=localhost
DB_PORT=5432
API_PORT=3000
```

To start the backend server from the command line run:
```bash
# from ./source/backend

npm run local:start   # this will initialize the docker container
npm run test:endpoints:all    # this will test the API endpoints
npm run local:stop    # this will stop the backend and clear the docker container

```
### Local API Server + Cloud Database

To set up the local API and cloud database, please ask for the database credentials and add or change your `env` to:

```bash
DB_USER=postgres
DB_PASS=[given password]
DB_NAME=postgres
DB_HOST=[given host]
DB_PORT=5432
API_PORT=3000
```
Then run:

```bash
node server.js

# when you are done with the server simply hit CTRL-C to end the server
```

### Profiler

**Note**: We found running the profiler on windows doesn't seem to show as much detail compared to running it with mac.

To run the profiler on the dev API create or edit a `.env` file in the **backend** directory with the following credentials:

```bash
DB_USER=user
DB_PASS=password
DB_NAME=tabletrackdb
DB_HOST=localhost
DB_PORT=5432
API_PORT=3001
ENABLE_PROFILING=true
```

Then run the following commands:
```bash
# from ./source/backend

npm run local:start   # this will initialize the docker container
npm run start:profile
```

In another command line move to the backend directory again and run the endpoint tester with:

```bash
# from ./
cd source/backend

# from ./source/backend
npm run test:endpoints:all    # this will test the API endpoints
```

Go back to the first command line and hit Ctrl-c, then run:

```bash
npm run local:stop    # this will stop the backend and clear the docker container
```

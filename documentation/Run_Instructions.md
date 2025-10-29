## Run Instructions

In order to run locally:  
- Clone repository
- Open directory in editor or terminal/powershell
- Make sure you have docker desktop open

To do all the backend running, go to backend folder with command:

```bash
cd ./source/backend
```

To run the unit tests:
```bash
# from ./source/backend

npm ci
npm run test:unit
```

To run the integration tests create a `.env` file in the **backend** directory with the following credentials:
```bash
DB_NAME=testdb
DB_USER=testuser
DB_PASS=testpassword
```

For Integration Tests from the command line run:
```bash
# from ./source/backend

npm run test:integration:start  # this will initialize the docker container
npm run test:integration        # this will start the tests
npm run test:integration:stop   # this will clear the docker container
```

To start the backend server from the command line run:
```bash
# from ./source/backend

npm run local:dev:start   # this will initialize the docker container
npm run local:dev:test    # this will start the backend server
npm run local:dev:stop    # this will stop the backend and clear the docker container
```

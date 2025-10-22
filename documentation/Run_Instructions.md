### Run Instructions
In order to run locally:
- Clone repository
- Open directory in editor or terminal/powershell
- Make sure you have docker desktop open
- To do all the backend running, go to backend folder with command:
  - cd source/backend
- To run the unit tests:
  - npm ci
  - npm run test:unit
- To run the integration tests create a .env file in the source directory with the following:
DB_NAME=testdb
DB_USER=testuser
DB_PASS=testpassword
- In the command line run:
  - npm run test:integration:start
  - npm run test:integration
  - npm run test:integration:stop
- To build the project in command line type:
  - npm run local:dev:start
  - npm run local:dev:test
  - npm run local:dev:stop

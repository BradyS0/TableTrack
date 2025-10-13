### Run Instructions
In order to run locally:
- Clone repository
- Open directory in editor or terminal/powershell
- Make sure you have docker desktop open
- To build the project and run unit tests in command line type:
  - cd source
  - docker compose up --build
- In another terminal/powershell window type:
  - cd source
  - exec api npm run test:integration
- To shut down the project type(in same window as test):
  - docker compose down
- To run unit tests in command line type type(either window will work):
  - cd backend
  - npm ci
  - npm run test:unit
## Frontend Web Directory Structure
```bash
+---css  # all frontend styles go here
|   \---components # styles for individual components goes here
+---dist
|   \---assets # reusable assets like logo or any svg files being used goes here
+---floorplan # contains the styling and logic related to floorplan and reservation
|   \---js
|       \---Items # floorplan elements such as doors, windows, tables etc.
+---js
|   +---api_calls # holds code for api adapters to be used by front-end
|   |   +---live  # adapters that make call to backend
|   |   \---mock
|   +---components # logic to dynamically create reusable dom components
|   +---logic # contains reusable logic
|   \---pages # logic for a specific page goes here (index,userProfile etc.)
+---public
|   \---assets # stores shared assets mainly images/svg to be used by the frontend
\---test
    +---logic # tests for reusable logic functions used in the frontend
    \---ui
        \---components # tests for dom element creation and manipulation for the components
```

## Front end test instructions

### Prerequisites
  - [Node.js](https://nodejs.org/) (v18.0 or higher)
  - npm (comes with Node.js)

*In a Terminal/Bash:*  

```bash
 # from repos root directory
 cd ./source/frontend/web

# once in ./frontend/web
 npm ci 

 npm run test
```

## Front end start instructions

### Prerequisites
  - [Node.js](https://nodejs.org/) (v18.0 or higher)
  - npm (comes with Node.js)
  
```bash
# using a terminal
 # from repos root directory
 cd ./source/frontend/web

# once in ./frontend/web
 npm ci
 npm run start

 # this should first create a build of vite and host it
 # the path:port instructions should be visible once build is built successfully
 # you can either copy the link to your browser (chrome for expected visuals)
 # or type o + (press enter) to open the build on your default browser
```
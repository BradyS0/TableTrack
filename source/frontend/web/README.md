## Frontend Web Directory Structure
```bash
\---web
    +---assets  # stores shared assets mainly images/svg to be used by the frontend
    +---css   # all frontend styles go here
    |   \---components  # styles for individual components goes here
    \---js  
        +---api_calls   # holds code for api adapters to be used by front-end
        |   +---live  # adapters that make call to backend
        |   \---mock  # mimics backend messages used primarily to test layouts and design
        +---components  # logic to dynamically create reusable dom components
        +---logic   # contains reusable logic
        \---pages # logic for a specific page goes here (index,userProfile etc.)
    +---test
    |   +---logic # tests for reusable logic functions used in the frontend
    |   \---ui
            \---components  # tests for dom element creation and manipulation for the components
            #change addded for test

```


## Front end start instructions
  The css styling has been tested for google chrome only so far, other browsers may or may not look as expected  

### Prerequisites
  - [Node.js](https://nodejs.org/) (v18.0 or higher)
  - npm (comes with Node.js)

*In a Terminal/Bash:*  
```bash
 # from repos root directory
 cd ./source/frontend/web

# once in ./frontend/web
 npm run start

 # this should start the front end on your default browser
 # If it doesnt and the Five Server is successfully running
 # Go to http://localhost:8484
```
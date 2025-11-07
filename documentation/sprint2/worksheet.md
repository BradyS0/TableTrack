# Sprint 2 Worksheet

## 1. Regression Testing
Details on our regression tests:
### Choosing which tests to run:
We chose to get a list of changed files (either comparing to the last commit or a specific branch), then depending on which files have changed, run the unit/integration tests that cover those files.Hence, only tests that need to run will run.
### Tools used for regression tests:
- A bash script to compile all changed files relative to last commit or specified branch and put them into a text file
- A Node JS script that takes the list file, then for each unit and regression test, checks if certain file paths are in the changes and runs those tests. For integration tests it will spin up the docker test database with the docker-compose.test.yml
### Link to regression testing script:
- [Bash script to get changed file list](../../changed_files.sh)
- [Node JS script to choose and run unit/integration tests](../../regression.js)

#### Snapshot of execution results:
![Regression test image](https://github.com/BradyS0/TableTrack/blob/dev/documentation/sprint2/regression-run.png)

## 2. Testing Slowdown
How has our testing plan changed:
### Have we kept all unit & integration tests:  
We have kept all of our unit and integration tests from sprint 1.  
Currently most of the time spent in our tests is performing setup.  
Increase in Unit Test time from pull 53 to 83: 1.36s - 1.12s = 0.24s  
Increase in Integration Test time from pull 53 to 83: 2.5s - 1.8s = 0.7s  
As a reference our integration tests take around 40s-70s to run fully.  

For Unit tests click "Unit Tests" then click "tests" and see the time under the table.  
For Integration tests click "Integration Tests" then click "Run cd source/backend && npm run test:integration" and see the time under the table.  
- [New commit](https://github.com/BradyS0/TableTrack/pull/83/checks)  
- [Old commit](https://github.com/BradyS0/TableTrack/pull/53/checks)  

### Testing plans for different release types:  
Currently we do not have different plans for each release type.  
Our app is small enough that the time cost to run our tests is negligible compared to the time needed to perform the setup for them. So we simply run all the tests each release to ensure that as many bugs are caught as possible.  
If we found a way to speed up the setup of our tests, or if the amount of tests run began to take significant time, we would consider creating new plans testing only critical areas of our code.

## 3. Not Testing
Testing details for each layer:
### Untested parts of the system:
Currently there are no unit tests for time logic in the backend that just return the date.
We should include tests for these that ensure returns are within the expected scope.  
Additionally, once we refactor the backend and move all queries into the model files  
we should write unit tests for the queries to ensure they return the correct information.  
Lastly, our frontend has relied on manual testing up until now, and we are working on automated tests for it.

### Our updated system diagram:
![Diagram](https://github.com/BradyS0/TableTrack/blob/dev/documentation/sprint2/architecture/Architecture-Diagram.png)

### Level of testing for each layer:
- Frontend: (logic 100%) (components 42.5%)  
- API: (No unit tests) (Integration: 92.94%)  
- Logic: (Unit: 100%) (Integration: 95.52%)  
- Database: (No unit tests) (Integration: 100%)  

*Our integration test coverage is acceptable and we have worked to improve coverage of our unit tests to 100%.*  

*As for our frontend tests, we are currently fully testing any logic that is implemented within our frontend, but the ui for components isn't fully implemented, as jest tests were set up towards the end of the sprint. We do plan to test individual ui components to see if their dom element creation and manipulation is being done as expected*

### Coverage reports for testing:
- [Recent run of Unit Tests](https://github.com/BradyS0/TableTrack/actions/runs/19182230931/job/54841486243) *Click on “tests”.*  
- [Recent run of Integration Tests](https://github.com/BradyS0/TableTrack/actions/runs/19108227659/job/54597913251) *Click on “Run cd source/backend && npm run test:integration”.*  
- [Recent run of frontend tests](https://github.com/BradyS0/TableTrack/actions/runs/19179892389/job/54833837349) *Click on “frontend-test”*

## 4. Profiler
Results of running our profiler:
### Slowest endpoint in our API:    

#### **[POST]** /v1/user:
 Our slowest endpoint, however it's important to note that the API server and database are running locally with docker, so the response time depends heavily on local machine speed. We tested it out on a faster machine and the slowest endpoint [POST] /v1/user was down to 40 ms and the others were reduced by the same scale. (View Endpoint performance in output section, for times on the slower machine).
#### Can we fix the slow endpoint: 
After discussing, we realized it was making a findAll call to the database where the rest of our endpoints use findOne. In these cases if we find one or more it is going to be an invalid input. It seems like findOne is faster, it probably has less to do. Therefore using findOne in this case like the other endpoints will make the endpoint faster while not compromising functionality.

#### Output of the profiler:
![Endpoint performance](https://github.com/BradyS0/TableTrack/blob/dev/documentation/sprint2/profiler/Endpoint_performance.png)  


Below is the link to the html flame graph. This shows us the code that runs the longest. If you display all code like it has setup when you first open it, it will show everything that runs including dependencies (from node_modules) and internal Node JS code. Within all of the code, The internal Node JS code is taking the longest time, then dependencies like validator and sequelize.  

> **Warning:** It doesn't seem like you can remove the dependencies and Node JS from the graph with the checkboxes like I say below. If you want to try that out, you will have to download it and open it in a browser.  

[Flame graph](https://github.com/BradyS0/TableTrack/blob/dev/documentation/sprint2/profiler/5008.clinic-flame.html)  

In order to analyze our code, go along the bottom to the processTicksAndRejections and run functions (shown below). All the time before these is for setup and all time after is system closing. The run is a fairly small fraction of the time the code spent running.  

![Run function](https://github.com/BradyS0/TableTrack/blob/dev/documentation/sprint2/profiler/Run_function.png)  

If you hover over processTicksAndRejections or run and click expand, this will give a better view of how much time the code in our running program takes. ProcessTicksAndRejections seems to be more of the endpoint run-though. You can see it has a lot of sequelize code including a big findAll, then a bunch of the endpoints, including a much smaller findOne. Run seems to be more of the testSetup. You can see, quite a bit of the time is setting up Sequelize in db.js. After that it looks like defining our models takes some time. Then it also has some of the routes. Within all of this code, almost all of the time is spent running code in dependencies.

If you remove dependencies and Node JS by unchecking them, you get a more high def view of our running code but it is slightly misleading in the sense that for example, the code we wrote in db.js isn't running that long, its calling lots of dependencies/Node jS which take up a little time each but all together lots.  


#### Takeaway from our profiler:
While there's not a lot we can do about dependencies, I think it shows us how our choices to simplify some stuff like database interaction affect our project's speed. In the future we will think a bit more about what dependencies we truly need or what is just nice to have.

In conclusion, while this may be problematic for high demand systems, it isn't a big issue for us. As for our own code we write, all of it takes so much less time than the dependencies and Node JS code and therefore there isn't anything to worry about for now. We will continue running the profiler on our project to make sure it stays that way.

We also recognize that depending on what code we use from our dependencies, this could be slowing down our project like it was for the user creation endpoint. It isn't necessarily our code that's slow but if there are faster functions in our dependencies we can use without affecting the functionality or security, we should try to seek them out.

## 5. Last Dash
Issues we foresee in the final sprint:
### (1) Saved the hardest feature for last:
The main feature of TableTrack is the visual reservation system.
We decided to save this feature for last so we could develop a skeleton for the project before attempting something difficult, however, now that difficulty has hit us all at once.
We will need to devote more time to this feature than any other we have developed up to this point. It will take perfect time management and organization to ensure nothing goes wrong, and we can deliver our primary feature in its most polished form.

### (2) Buildup of tech debt & refactoring:
In the first sprint we started working on our code later than we should have, this led to many mistakes in the code, such as querying in the logic layer rather than data layer.
This violates the single responsibility principle.
In sprint 2, efforts were made to correct this for new modules such as schedules having querying done in the same file as the db model. However, we did not find time to correct our mistakes in the old modules, which we must sacrifice some time to do in sprint 3.

### (3) Time constraints:
Due to upcoming assessments in the course, namely the final test, technique sharing seminar, written assignment and the final project presentation, we may find ourselves with less time to work on the project than we expect. Especially due to saving what will be our hardest feature to implement for last, time is one of our biggest worries and including time needed to refactor, decipher and fix bugs, and document.

## 6. Show Off
Best work of each of our team members:
### Antoinne:
I believe so far my best work has either been the implementation of the Menus feature in the backend or User API documentation. I still have much to improve on with my code, especially with SOLID principles, but I believe that the more I work, the more I improve. With the Menus feature, I believe that I iterated on what worked when I implemented Account Creation and Management, learned from what went wrong and improved on it. 
With User API documentation, when writing I did not know about tools that helped with documentation like Swagger, but I took note of what seemed to be essential to document from Twitter/X’s API documentation and created a template that was simple to read and understand, including parameters needed, expected status codes and descriptions of API endpoints. While there is more to be desired, such as examples and format of response data, it laid the foundation for our API documentation and made things easier to document down the road.
- [Pull Request](https://github.com/BradyS0/TableTrack/pull/80)
- [User API documentation](https://github.com/BradyS0/TableTrack/blob/main/documentation/sprint1/api/user_api.md) 

### Arsalan:
In the previous sprint, for editing user or restaurant information, we created two separate forms that contained input fields for all their respective fields. This made the UI appear clunky and counterintuitive when a user only wanted to change their first name or email, or when a restaurant owner just wanted to update the restaurant’s phone number or tags. So, in this iteration, we decided to tackle that by replacing those forms with an [editPopup](https://github.com/BradyS0/TableTrack/blob/main/source/frontend/web/js/components/edit-popup.js) component. This component was made so that edits can be made to each field separately. It is also reusable and can have its behavior adjusted as needed for different types of input.
I consider this my best work for this iteration because this component allows users to edit individual pieces of information while providing more accurate feedback. It also allows developers to easily plug the popup into a page, add options to it, and pass in a function that handles the data from the input fields when the popup form is submitted. As of now, this component allows developers to create a popup, add the desired options, and define the behavior of the form upon submission. We have implemented three types of input options in this popup component: one for editing single input fields, one for editing passwords (which includes three password inputs for old, new, and confirm new password), and one for editing and creating weekly schedules for restaurants.
- [Pull-request for editPopup](https://github.com/BradyS0/TableTrack/pull/59)
- [Pull-request for edit-schedule](https://github.com/BradyS0/TableTrack/pull/70)
### Braydon:
One thing I did that I’m proud of was my test fix. After sprint 1 was due and our integration test wasn’t working, I spent a long time trying to fix them. While doing so, I learned more about sequelize and the flow of how the Express.js app works and starts up. With the knowledge I gained through experimentation as well as an article where someone was doing something similar (Express + Sequelize + Jest), I understood our app’s issue. 

I had set it up so in the same JavaScript file (index.js) the app was being created in, it was starting the server for the app. Not only did this violate single responsibility, but it meant that Sequelize was being imported twice. Once when running the integration tests and once in the index.js because the integration tests import the Express app. I didn’t really know importing would run the code but now I do. 

So, I followed a similar setup to the article of making the app in one file (app.js) and then the server in another (server.js). This along with creating a jest config and integration test setup fixed the issue and made our code better. 

- [Link to Pull Request of test fix](https://github.com/BradyS0/TableTrack/pull/53)

### Matthew:
Some code I am proud of from this sprint is the Schedule Model and its queries. This file handles all queries for the schedule table, and keeps that table private. This not only protects the Schedule table from improper use elsewhere, but also ensures troubleshooting queries for this table must only be done in one location. This file demonstrates the single responsibility principle and information hiding.  
Honorable mention from sprint 1: Our glorious logo.  
- [Schedule Model](https://github.com/BradyS0/TableTrack/blob/dev/source/backend/models/Schedule.js)  
- [TableTrack Logo](https://github.com/BradyS0/TableTrack/blob/dev/TableTrack-logo.svg)

### Mohammad:
I believe my best work in this project has been the implementation of the Menu Management feature on the front end. This was one of the most complex systems we built because it required the UI, session-based persistence, API mocks, and restaurant detail pages to all communicate seamlessly. Building it forced me to understand and unify multiple parts of our codebase: dynamic DOM rendering, category grouping, real-time state updates, and syncing owner and customer views without refreshing the page. I had to solve issues around stale sessionStorage data, race conditions during menu re-renders, and ensuring that added or deleted items updated consistently across the entire application. It was also one of the few features that required designing both a public-facing view and an administrator/owner panel using shared styling but different behaviors. While I still have room to grow in writing more modular UI logic, this feature pushed me to debug deeply, architect cleanly, and design a user experience that felt cohesive. Overall, the menu system showcases the strongest representation of my technical skills so far, from debugging and state flow to UI/UX integration and front-end architecture.

- [Link to Pull Request of menu feature](https://github.com/BradyS0/TableTrack/pull/83)


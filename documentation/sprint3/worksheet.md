# Sprint 3 Worksheet

## (1) Load Testing

### Our load testing environment

#### Tools used

We chose Artillery for our load testing software. Artillery provides a simpler test development and can be integrated right into our project as we used NodeJS a lot and Artillery is just a NodeJS library. In order to create tests you simply write up a .yml file. 

#### Load test cases

There are four flows that virtual users run through. The first one included:  
Get restaurants  
Get a specific restaurant  

The next flow is very long. This is because in order to use some routes we needed specific variables like userIDs and restIDs and needed to be in the same flow to capture and use them. It contains:  
Create user  
Login user  
Change user  first name  
Change user last name  
Change user password  
Change user email  
Create restaurant  
Change restaurant name  
Change restaurant tags  
Change restaurant address  
Change restaurant description  
Change restaurant phone number
Delete user    

The next flow is for menus and follows as:
Create menus  
Get all menu items for a restaurant  
Get a specific menu item  
Change menu item name  
Change menu item price  
Change menu item description  
Change menu item category  
Delete menu item

The last flow pertains to restaurant schedules:
Put schedule
Get schedule

We would have liked to implement floor plans and reservations but since we only implemented them right before the deadline, we weren’t able to add them in. 

### [Test report](https://app.artillery.io/share/sh_12bf9f0a1c37d7134df56087adb4c6cf23c135e50ded6ea964d61c4a1ec411ca)

### Bottleneck we found

Out of all of our tests, there were three endpoints that were substantially slower. The 3 are creating a user, changing their password, and user login. We initially thought it was because it had database calls to check data and then making calls after to create/update data. After reviewing other endpoints though, we found that other endpoints were making multiple calls as well. We still aren’t sure what exactly is making those three so much slower, though I know some refactoring could be done, and with these results, we know where we would start. On the positive note, the mean response time was 18 ms so the rest of the tests were much faster, though it was being tested using the local API and database so it would be slower in production.

### Did we meet non-functional requirements

In the project overview, the requirement we were given was: able to respond to 20 users with a total of 200 requests per minute concurrently. Our local API + database far exceeded these requirements, having an average of 51 reqs/sec and peak of 126 with no failed tests. I did try ramping it up a bit and did hit a ceiling with just under 10% failure rate. 

## (2) Security Analysis

### Our security analysis tool

For our static analysis tool, we chose to use SonarQube, a popular open-source option and I can see why. Though the free version only analysed our main branch, it provided an extremely in-depth dissection of our codebase, as well as providing explanations and possible solutions for issues it finds. 

#### How we ran security analysis

We integrated SonarQube into our continuous integration Github Actions workflow. A yml file will use the SonarQube configuration file to make a call to the cloud service when making a push or pull request to main.

#### How it analyzed our primary language (javascript)

SonarQube will analyze the codebase and give you 5 key metrics: security, reliability, maintainability, code coverage, and duplication. 

### [Static analysis report](https://sonarcloud.io/summary/overall?id=BradyS0_TableTrack&branch=main)

### Five detected problems

One issue it found in a few places was the using var instead of let or const.  
The main function in our CLI was labeled high maintainability because its complexity exceeds  the threshold. This is due to loops, ifs and switches changing the flow of the program.  
Another issue it found is a Javascript method that's empty as it is an abstract method that is inherited. Javascript doesn’t have a nice way of doing this though so it gets flagged.  
One of the problems that shows up the most and constitutes a large portion of the issues is using parseInt instead of Number.parseInt. However we looked into the specifics of each one and we decided that the function that fit our code was the global parseInt function.  
Similarly, It notified us that we should be using Number.isNaN function not the global version but again we thought it fit our code better. 

### Critical and high vulnerabilities (Descriptions and Commit links for each fix)  
An issue it found in a few places was the using var instead of let or const. https://github.com/BradyS0/TableTrack/pull/138/commits/2613ad30d24b3361f6bb8e04d0c1417794ac409c

A blocking reliability issue it found is having re as a unit in a css file. This is simply a typo that was made.
https://github.com/BradyS0/TableTrack/commit/f9a79b6689090aae8c7971a82ac3f5cddccb9dec

A critical issue it detected is that when exporting our sequelize instance, since there are 2 different ways to create it (local db and cloud db have slightly different setups), it’s declared with let but since we're exporting it it thinks this is bad as it could change. It labels this as a high severity risk but we don’t think it's as bad of an issue. 

Another problem it found that I will mention is in a couple places we used a comment to stop our linter from throwing an error because there is an undefined variable (it's injected by Vite at build time). It just says the comment needs to specify rules we want to disable but it already was working.

The last high severity issue I’ll mention is we have a Javascript file that has several functions where functions are nested 4 levels deep.

## (3) Continuous Integration and Deployment

### Description of our CI/CD environment

#### Our CI

JEST for backend and (some frontend) unit tests, integration tests.
Linter that checks for unused variables, undeclared variables
PR-Discord hook (introduced in sprint 3)
SonarQube for Static-Analysis Security Analysis
Regression test - uses our jest workflow

#### Our CD

Netlify builds and deploys - code pushed in main to  : https://tabletrack.netlify.app/
Github Action to build API server docker image, then upload to dockerhub. It will then be autodeployed through render

[Link to our pipeline](https://github.com/BradyS0/TableTrack/tree/main/.github/workflows)

### Snapshots of CI/CD

Snapshot of our continuous integration / github workflow running:
![CI run.png](https://github.com/BradyS0/TableTrack/blob/main/documentation/sprint3/Images/CI%20run.png)

Snapshot of a docker image being generated on a push request:
![Docker build run.png](https://github.com/BradyS0/TableTrack/blob/main/documentation/sprint3/Images/Docker%20build%20run.png)

Snapshot of Netlify creating a preview of our deployed project:
![Netlify run.png](https://github.com/BradyS0/TableTrack/blob/main/documentation/sprint3/Images/Netlify%20run.png)

## (4) Reflections

### Design changes

After working on this project, there are several design changes that would have made our work easier. To begin, we would implement automation tools for our documentation such as Swagger or OpenAPI. We did not implement this because we had no experience with these tools, nor were we aware of them but after seeing how useful it is for other groups and the problems we had doing our own documentation, this seems essential. Another change would be using TypeScript instead of Javascript in the frontend, since it would fit well into our system and make development easier. Alongside this, we believe different servers or deployment services may also offer better results as they may be more applicable to our work environment than what we currently have, but this is mainly speculation due to the difficulties we had during development. The final design change would be towards design choices behind our classes, as we believe what we have currently could be improved upon. We were able to implement some of these changes through refactoring our initial design, but there is still more to be done. An example would be error handling classes to uphold the single responsibility principle.

### Course/Project Setup changes

As a group, we believe the requirements and expectations in the deliverables should have been more consistent and organized. There are multiple documents, which scatters the information and we found the requirements to be inconsistent between them, causing confusion and panic. These documents include the rubric, worksheet, checklist and deliverables, namely the final deliverable. As for check-ins, we think there should be an option for teams to submit a video demo, allowing meetings with the professor or TA to be more focused on the Q&A, or allow teams to play the video in the call in case there are technical difficulties. We do acknowledge that with this option, teams may lose the practice they get from performing these demos that they could use towards the final presentation. As a whole, we do not think there should be any process changes, as it seems to have fit our group well.

### Individual AI / External Resource Reflection

#### Mohammad
Throughout this project, I used AI very differently from how I normally code, and it became a major part of my workflow not as something that wrote code for me, but as a tool to help me understand problems faster and explore solutions I hadn’t considered. I relied on ChatGPT mostly for clarification§, debugging patterns, and architectural guidance, especially when dealing with complex frontend state issues, API routing, and eventually building the Java CLI that communicates with our backend. My main method of problem solving was still hands-on: console logging every suspicious variable, isolating functions, rewriting modules from scratch when things got messy, and incrementally testing endpoints to see how each part behaved. For larger issues, I used my own form of iterative debugging; breaking a problem into tiny reproducible errors, fixing one layer at a time until the system behaved predictably again. While AI helped me understand patterns or generate starting points, the real progress came from deeply examining how components interacted and ensuring the logic stayed consistent across the codebase. Overall, the combination of AI guidance and traditional, methodical debugging helped me contribute meaningfully to the frontend menu system and the fully functional CLI.

#### Matthew

I have never used AI to write code before, and I couldn’t think of a worse time to try it out than in a group project where poor quality code sabotages not just myself, but others too. I have little to no experience in prompt engineering, and am not confident that I could provide sufficient context about TableTrack to allow a LLM to produce correct code, let alone optimal code. Rather than betting on myself learning to “vibe code” in time to contribute to this project, I used the same form of problem solving from my first year, and a few new ones. When it comes to problem solving, printing variables after each line is still the winner when it comes to finding a problem quickly with minimal work. However I did use more intelligent methods too, such as test driven development which proved useful, but when errors still slipped past that I resorted to my own  strategy that I call the “Sticky Note Wall”. My sticky note method includes creating a hierarchy of notes; One note per class or file, and another for each function contained in the class or file. 
When looking at these notes side by side they help me identify missing file imports, overlapping functionality, and inconsistencies between a function's output and the called function’s input, which helps write better input validation. I believed the strategies I’ve learned and created allowed me to write and troubleshoot code better than I could learn to get a LLM to do it within the time constraints of this project.

#### Antoinne

I had minimal use of AI and external references. My use of these tools were mainly to find regex that fit our needs. These can be found in user validation. My reason for not using AI was mainly because I was worried about the consistency with the standards we set up, although this was changed later on as the project evolved. I have a habit of focusing on trying to solve problems by myself, looking at documentation to find out what I can do and then trying to apply what I learned to the problem, leading to me avoiding these tools until I absolutely need them. When I was stuck, I tried to ask my team members for input and we worked on a solution together that would fit our team’s needs. It was a lot of back and forth between the members on what is required and what it needs to output, causing me to rely less on AI and more on teamwork.

#### Braydon

When we first started the project and had an idea of what we wanted to make, I got ChatGPT to create a small test project that matched our requirements. At the time I didn't really know what building a full stack web app looked like and how the different components fit and worked together. It also gave me the chance to try out the deployment services we decided to use. Now onto the downsides. While it did give a fully functional product, the structure ended up causing some issues. The biggest one that comes to mind is that I created the app and server right in the same file. This would be fine if we only used the app code with the server but we also used supertest which imported the app code to make serverless API calls. Even though we had the server starting when we set an env variable, it ended up causing issues with code being called twice, once for test setup and once for server setup. We eventually found a different resource that had a better structure so we could test and start the server separately.

#### Arsalan

One of the things AI was most helpful in was developing the main structure for the floorplan creator/editor engine for the frontend. That being said, the initial product was far from perfect or close to what we currently have in our working model. It required a lot of further back-and-forth and adjusting the end product via prompts, followed by manually modifying the code and restructuring it into reusable components, which eventually became what we have now. It helped getting started quickly, while having no prior background on how konvajs framework works. But the initial response provided was one big html file with a huge script, with a lot of repeated logic. Which then had to be broken up into further relatively smaller components (FloorplanCreator and FloorplanEditor), the layout editor used components that needed to be further abstracted and broken into a class based hierarchy to reduce repeated logic. That being said, AI allowed me to create and design a functional system, without having to do an in depth research on how konvajs works. That being said, there were times where looking up the docs provided helpful information. I still don't think this is the best practice to create something so complex using AI at an industry level. I recognize that a better result would have been achieved by putting in more effort to understand the KonvaJS documentation myself, leading to cleaner, more maintainable code than the AI-generated at starting point, and how it exists currently.

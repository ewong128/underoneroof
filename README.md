# UnderOneRoof

## Project blurb:
Under One Roof is a task-management app designed for roommates who want to organize their living habits efficiently. This tool helps roommates assign and distribute household chores, notify the household of upcoming parties and events, share class schedules and availability, and view all this information on a shared calendar. Additionally, users can create roommate agreement forms and invite others to join their roommate group. Unlike other apps, Under One Roof focuses on promoting a healthier and more organized roommate lifestyle through comprehensive chore management and event coordination.

## UI Prototype:
https://www.figma.com/design/dkUe8wp54yWO3c4DVuejyd/CSC-307?node-id=4-9&t=bTSEoAeRQ9xFRD9x-0 \
Last updated: May 10,2024

## Development environment set up:
To get started, git clone the https link: https://github.com/ewong128/underoneroof.git\
Then you will need to install the following packages to run the application:\
in the packages/react-frontend --> npm start:\
  need to "npm install _______";\
      bootstrap, react-bootstrap bootstrap@5.1.3, react-big-calendar, date-fns\
in the packages/express-backend --> npm run dev;\
  need to "npm install _______";\
      express, moongoose, bcrypt, jsonwebtoken, react-router-dom localforage match-sorter sort-by, dotenv, prettier -D --save-exact\

From here, the collaborator should be able to edit and run the files to view the application. For more information look below.

Note that to run locally (not on Azure) the user needs to "switch" the link in MyApp.jsx to "HTTP://localhost:8000" and subsequently change the port in backend.js to listen at "HTTP://localhost:${8000}." The code required for these changes should be on top of one another, which can be done by commenting out the current code to the ones just mentioned.

Details Regarding MICROSOFT AZURE:
Currently, the MyApp.jsx in the packages/react-frontend/src folder, has two lines of code that state "const link". The main branch has the const link to be the azure link, but can switched back to the locally link. This means that the azure link will let any user with this link https://witty-grass-005ac821e.5.azurestaticapps.net to access the web application. If the user would like to access the web application locally, the collaborator would need to comment out the azure link and uncomment the locally link. Another addition, is in the backend where the "REST API is listening" block of code is needed to be commented out and replace by block of code that has the port "Example app listening". Given that the locally link is uncommented, the collaborator will be able to view the web application locally, by running the npm run dev in the express-backend and npm start in react-frontend.

## Documentation on Prettier and Lint:
This repository utilizes a comprehensive ESLint configuration that extends from eslint:recommended. 
Key enforced rules include error prevention in areas such as async promise executors, class and variable assignments, regular expressions, and various common pitfalls like duplicate keys and unreachable code. This configuration promotes a strict coding standard by enforcing rules for naming conventions, code complexity, consistent returns, and the usage of modern JavaScript features. For a detailed list of all enforced rules, please refer to the configuration file. In terms of the Prettier configurations, we ensured to use double quotes and a do not add trailing commas in object and array literals. This means the last element or property in an object or array will not have a comma after it. The print width limits the line to 64 characters. The "semi" is true adding a semicolon at the end of every statement. 

## UML Diagram:
[UML diagram](docs/UML_Class_Diagram.md)

## Sequence Diagram for User Logins:
![sequence diagram-20](https://github.com/ewong128/underoneroof/assets/102551601/81245196-f17f-4396-bd25-a8b144d8816c)

## Testing:
For testing code we put our tests on a branch called "testing". 

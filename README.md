# MaxFinder Web Application
This web application is to connect pet owners who have lost their pets with people who have found their pets.

[Licences under GNUv3 ](LICENSE.md)

## Release Notes


### Version 0.5.0

#### New Features
* User is able to add images
* User is able to search for a location via a text box
* User can view list of resources and emergency contacts


#### Bug Fixes
* Fixed image insertion bugs
* Fixed post page images
* Fixed post required fields


#### Known Issues
* Merging of lost and found pages has potential glitches


### Version 0.4.0

#### New Features
* User is able to add location of lost/found pet
* User is able to edit location of lost/found pet
* User is able to filter by location of lost/found pet
* User is able to recieve notifications


#### Bug Fixes
* Accepting and saving location data to backend
* Handle submit now stays on correct page


#### Known Issues
* Notification center has limited capabilities


### Version 0.3.0

#### New Features
* User is able to post a report of a pet
* User is able to report lost pets user found
* User is able to report lost pets user lost
* User is able to edit post
* User is able to adopt a pet that was found and hs no owner 
* User is able to serch for a post
* User is able to delete a post
* User is able to add pictures to post

#### Bug Fixes
* Posts and information is centered  

#### Known Issues
* User is not able to change their email once signed up and logged in
* Handle submit after posting to redirect to home page
* Center only certain pages not all








### Version 0.2.0

#### New Features
* Firebase creation and connection
* Lost and found pets page
* User pages
* Authentication for users upon sign in 

#### Bug Fixes
* Connecting to Firebase
* GitHub merge conflicts

#### Known Issues
* Settings page uses JSON local storage instead of Firebase






### Version 0.1.0

#### New Features
* GitHub setup
* Material UI library inclusion

#### Bug Fixes
* Fixed mobile app bugs by transforming our codebase 
* Fixed GitHub access bugs and granted team access as team members 

#### Known Issues
* Small bugs within file structure
* User is able to log in with wrong password
* User is not able to update Email correctly


# Installation Guide 

## Pre-requisites: 

1. Git: You need Git installed on your computer to clone the repository from GitHub. Git is a version control system that allows you to manage and keep track of your source code history. 
2. Node.js and npm: React projects rely on Node.js as the runtime environment. npm (Node Package Manager) is included with Node.js and is used to manage the project's dependencies. Make sure you have both Node.js and npm installed. You can check this by running `node -v` and `npm -v` in your terminal or command prompt. 


## Dependent libraries 

The dependent libraries can be viewed in the `package.json` file in the repository. When you run `npm install` in the project directory, npm looks at the `package.json` file and automatically installs all these dependencies and any others listed. This process ensures that you have all the required libraries and their correct versions to run the project, which can be found in the section after this. However, here are some of the prominent dependencies of the project. For more information on these packages, you can visit the [npm website](https://www.npmjs.com/) and search the name of the package: 

1. React Ecosystem: 
- `react`: The core React library. 
- `react-dom`: Allows React to interact with the DOM.
- `react-router-dom`: Used for routing in React applications. 
2. Material UI: 
- `@mui/material`: Material UI components for React. 
- `@mui/icons-material`: Material UI icons for React. 
- `@mui/styled-engine-sc`: Styled engine for Material UI. 
3. Emotion: 
- `@emotion/react` and `@emotion/styled`: Libraries for styling components in React using the CSS-in-JS approach. 
4. Testing Libraries: 
- `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`: Tools for testing React components. 
5. TypeScript Support: 
- `typescript`: A superset of JavaScript that adds static type definitions. 
- `@types/*`: Type definitions for React, Jest, Node.js, etc. 
6. Styled-Components: 
- `styled-components`: Popular CSS-in-JS library for styling React components. 
7. Utility and Build Tools: 
- `react-scripts`: Scripts and configuration used by Create React App. 
- `web-vitals`: Library for measuring performance metrics. 

## To install the MaxFinder React web application, follow these steps: 

1. Clone the GitHub Repository: First, clone the MaxFinder GitHub repository to your local machine by running the command below in a local directory of your choice:
```
$ git clone https://github.com/MaxFinderOrg/JID-3118-MaxFinder.git
``` 

 This brings all the project's files, including the `package.json` file, which lists all the dependencies of the project.  

2. Run `npm install`: Next, run `npm install` in the project directory. This command reads the `package.json` file and installs all the dependencies listed there, including React itself. React and any other libraries or frameworks the project depends on will be automatically installed in the project's `node_modules` directory. 
3. Run `npm start`: After all dependencies are installed, start the project by running `npm start`. This command is defined in the `package.json` file under the scripts section and runs the local development server, allowing the user to view and interact with the React app in the web browser. 

## Troubleshooting 
1. Node.js or npm Not Installed: 
- Error: Command not found errors for `node` or `npm`. 
- Solution: Ensure Node.js and npm are installed on your system. You can download and install them from the official Node.js website. 
2. Version Incompatibility: 
- Error: Errors related to version incompatibility of Node.js, npm, or project dependencies. 
- Solution: Update Node.js and npm to the latest stable versions. Check the project's documentation for specific version requirements. 
3. Missing node_modules Directory or Dependencies: 
- Error: Module not found or cannot resolve module errors. 
- Solution: Run `npm install` in the project directory to install all dependencies. 
4. Corrupted node_modules Directory: 
- Error: Various errors that don't clearly point to a specific problem. 
- Solution: Delete the `node_modules` directory and the `package-lock.json` file, then run `npm install` again. 



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

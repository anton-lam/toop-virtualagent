# toop-virtualagent

Basic api and server for virtual agent interview. 

Requirements: Current node.js which can be downloaded [here](https://nodejs.org/en/download/current/).
You need to create an `.env` for email verification with [sendGrid](https://sendgrid.com/).

Afterwards, quick set up would be to run the following commands (more detailed information below):
1. Navigate to this directory in your choice of terminal
2. npm i 
3. create `.env` file with sendGrid API key (attached in email). An example can be seen in file `.sample.env`. Be sure it's named `.env` and not `env`!
4. npm run dev
5. run the ui [repository](https://github.com/anton-lam/toop-virtualagent-ui) and access it via the website (the ui accesses this api at localhost:3000)

## features 
So far I have completed
* login/auth POST endpoint with json web tokens with validation
* content GET endpoint with token validation
* registration POST endpoint with validation
* email verification GET endpoint
* emails GET endpoint 
* end to end testing

## testing

End2End testing for the server can be run with
```
npm run test
```

Currently I am sitting on 8 total test passing with over over 84% line code coverage. Make sure the `.env` file is correct before running.

## directory Structure
  - `/src` : The source directory where all source files are stored. This includese all TypeScript and any other files. `/src/front-end` contains the Angular uncompiled app. `/src/server` contains the API webserver. 
  - `/dist` : The distribution directory where all JavaScript files are compiled to for deployment. This is where all files are executed from. Not committed to repo.
  - `/public` : This is the directory where any static files are served from (Angular Application). Note that any path that is not matched by the router will redirect to the public directory.

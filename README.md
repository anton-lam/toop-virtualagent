# toop-virtualagent

Basic api and server for virtual agent interview. 

Requirements: Current node.js which can be downloaded [here](https://nodejs.org/en/download/current/).
Furthermore, you will need to create a `.env` file in the root directory of this repository and add the sendGrid API key in (attached to the email I sent you).
An example `.env` can be seen in the file `.sample.env`

Afterwards, quick set up would be to run the following commands (more detailed information below):
1. Navigate to this directory 
1. npm i 
2. npm run dev
3. run the ui [repository](https://github.com/anton-lam/toop-virtualagent-ui) and access it via the website (the ui accesses this api at localhost:3000)

## features 
So far I have completed
1. login/auth POST endpoint with json web tokens with validation
2. content GET endpoint with token validation
3. registration POST endpoint with validation
4. email verification GET endpoint
5. end to end testing

## testing

End2End testing for the server can be run with
```
npm run test
```

Currently I am sitting on 8 total test passing with over 83.33% line code coverage.

## directory Structure
  - `/src` : The source directory where all source files are stored. This includese all TypeScript and any other files. `/src/front-end` contains the Angular uncompiled app. `/src/server` contains the API webserver. 
  - `/dist` : The distribution directory where all JavaScript files are compiled to for deployment. This is where all files are executed from. Not committed to repo.
  - `/public` : This is the directory where any static files are served from (Angular Application). Note that any path that is not matched by the router will redirect to the public directory.

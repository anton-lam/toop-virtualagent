# toop-virtualagent

Basic api and server for virtual agent interview. 

Requirements: Current node.js which can be downloaded [here](https://nodejs.org/en/download/current/)
Furthermore, you will need to create a .env file in the root directory of this repository and add the sendGrid API key in (attached to the email I sent you).
An example `.env` can be seen in the file `.sample.env`

Afterwards, quick set up would be to run the following commands (more detailed information below):
1. Navigate to this directory 
1. npm i 
2. npm run dev
3. run the ui [repository](https://github.com/anton-lam/toop-virtualagent-ui) and access it via the website (the ui accesses this api at localhost:3000)

## testing

End2End testing for the server can be run with
```
npm run test
```

## directory Structure
  - `/src` : The source directory where all source files are stored. This includese all TypeScript and any other files. `/src/front-end` contains the Angular uncompiled app. `/src/server` contains the API webserver. 
  - `/dist` : The distribution directory where all JavaScript files are compiled to for deployment. This is where all files are executed from. Not committed to repo.
  - `/public` : This is the directory where any static files are served from (Angular Application). Note that any path that is not matched by the router will redirect to the public directory.

## building the server

``` 
npm i
```

Installs the dependant packages necessary to run the server. 

[Gulp](https://www.npmjs.com/package/gulp) is used as the task runner to build server files into the /dist folder, as the server is written in TS and needs to be compiled into JS before being executed. 

This can be run by executing the following command:
```
npm run build
```

Note that Gulp will not exit after it has finsihed building, rather it will watch all source files after comilation for any changes and recompile the files as you save.

## running the server
After the server has been compiled you can run the server by running 'npm run dev'

This runs the node server using a package called `node-dev`. It will restart every time it detects that one of the JS files has changed.
This is perfect for development as the Gulp task will continously build the files as you save them and the node server will automatically restart.
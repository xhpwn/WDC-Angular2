# Introduction to NodeJS

## What is Node?
Node is a JavaScript runtime. Node comes with a built-in package manager called `npm`. `npm` unofficially stands for Node Package Manager.

## Why Node?
Node has become the industry standard for not only backend applications, but front-end as well.

## What are some things you can write in Node.JS?
* Command Line Interfaces
* Servers
* Build Systems
* And more!
So, if there's something you'd like to build, you can probably do it with NodeJS!

## How do install this?
Basically, just follow instructions [here](https://nodejs.org/en/).

## Dependencies
All applications need other packages to work. These packages that are `require`d are called dependencies.
These dependencies are installed using `npm`

## What is npm?
NPM is node's package manager. You can use it to install Node packages.

## Initiating npm
Type `npm init` in your project directory. Answer the questions it asks then type `y` when you're done.

### What does this do?
`npm` is able to track your dependencies and each of their versions for your project. It does this by parsing your `package.json`.

`npm init` creates this `package.json` file and puts all of your dependencies and metadata for your npm project.

**Note: Initially your dependency list will be empty**

### Installing packages
Typically you can install packages using `npm install <package-name>`. But this doesn't add your dependency to your `package.json`.
All it does is it adds your package and installs it to your `node_modules` directory of your project.
**To save your dependencies, type `npm install <package-name> --save` for regular dependencies. For developer dependencies such as build tools and such, type `npm install <package-name> --save-dev`**

### Utilizing dependencies
You can access your dependencies using `require`

For example, if you installed the `http` module/dependency then you can access the installed package by typing:

`let http = require('http');`

The variable `http` is an instance of the `http` module. This module helps you write a server.

## Example Program
We will be writing a quick server for this lesson. It'll be less than 10 lines of code!

First, some background info:

* We will be using a module called `express`
* We will write a static server
    * A static server doesn't authenticate, just serves what is requested

```javascript
let express = require('express');
let app = express();
app.get('/', (req, res) => res.send('hello world'));
app.listen(8000, () => console.log('Running on port 8000'));
```

**Note: Don't Forget to do `npm install express --save`!**

### Explanation
So, the first two lines are to set up express.
Lines 3 and 4 are interesting. Line 4 starts a server on port 8000 and listens to requests. Line 3 has a few parts to it:
* `app.get('/')` basically means, when `/` is requested, do this
* `(req,res) => res.send('hello world')` is called a `callback function`, it's called whenever the HTTP GET / request happens

TL;DR When you open up your browser, you should see 'hello world'

Now, let's create a few files.
`index.html`

```html
<html>
    <head>
        <link href="styles.css" rel="stylesheet">
    </head>
    <body>
        <div class="text-blue"> Hello World! </div>
    </body>
</html>
```

`styles.css`

```css
.text-blue {
    color: blue;
}
```

### Goal
What we want to do is serve index.html and styles.css when the client (your browser) requests it.

There are two options:
* Hard-code your server to send back only those two files `index.html` and `styles.css`
* Serve files statically and respond with any file requested

**Important note: When your `index.html` is requested and received in the browser, the browser looks through the different tags to look for files to request, so when you request and receive index.html, the browser reads through and realizes it needs `styles.css  as well.**

Let's go with option 2, since I hate hardcoding.

Let's modify the script.
Let's add the following line:
```javascript
app.get('/*', (req, res) => res.sendFile(req.params[0], {root: 'dist'}));
```
The line above isn't much different from our previous code.

The `/*` means anything after the `/` is permitted. `res.sendFile` allows you to send files back to your client. The first parameter `req.params[0]` is the file to be returned and the second parameter `{ root: 'dist' }` is the directory to pull the file from.

Also, `req` is the request information and `params` is the array of parameters of the request from the client. The URL can have many parameters.

#### Running the app
To run the server, type `node .` or `node index.js`. Open your browser and type `localhost:8000` `8000` is the port we are running are server on.

You can have many servers on the same machine, but you can only have one server per port.

#### Requesting data from the server
Generally when you're asking about data from the server, you want to get it in `json` format. 

We can request that from the server very easily, just point your browser to `localhost:8000/data.json`.
Didn't work? That's because we haven't added `data.json` yet! Create the data.json in the dist folder, then it should show the data in the browser!
Typically we want to add more, but that's okay!

## More on callbacks

### Example app
Our example app is going to read through a directory and print out every file that has a `.html` extension.

#### Reading the directory
Use the node module `fs` to read the files in your directory.

`let fs = require('fs');`

#### Parsing command-line params
We want to be able to pass in the directory to scan. With node.js that's easy! Just use `process.argv`.

Our usage will be `node {node-file} {directory}` so our directory will be at `process.argv[2]` because 2 is the third index in `process.argv`.
Added code:
```javascript
...
let dir = process.argv[2];
fs.readdir(dir, () => {}); // leave function empty for now.
```

`fs.readdir` let's you read files from a directory asynchronously. Asynchronously means in the background, or parallely. 
The first parameter `dir` is the directory to be read from, the second parameter is the callback function.
Callback functions allow you to tell JavaScript what to do when an event has triggered. For example, for on-click buttons,
you have a callback function. That callback function is what is called when the `click` event is triggered, right?

Similarly, `fs.readdir` has a callback function to call once `fs.readdir` is done retrieving the list of files.
For now, that callback function is empty.

#### Only printing .html files
The callback function takes two parameters `err` and `files`. `err` is the error, if something went wrong. The second parameter is the result from the `readdir`.

If you `console.log(files)` then you should be able to see all the files/directories in the directory you performed `readdir` on.

```javascript
...
fs.readdir(dir, (err, files) => {
    console.log(files);
}):
```

All we have to do now is filter the files! How do we do that? Use the `filter` array function! We just want to make sure the file has a `.html` at the end, right? So that's our filter condition! How do we check that? We can either check if the `indexOf('.html') > -1` or check if the last few characters are `.html`. The latter is probably safer, but let's go with `indexOf` since it's easier.

```javascript
...
fs.readdir(dir, (err, files) => {
    let htmlFiles = files.filter(file => file.indexOf('.html') !== -1);
    console.log(htmlFiles);
});
```

That's it!
You can now run it by typing `node {file-name} {directory}`

## Workshop
TODO

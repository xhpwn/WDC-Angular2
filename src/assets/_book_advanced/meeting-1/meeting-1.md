# Introduction & Build Systems
Welcome to the advanced track! There's a lot of material to cover, but lucky for you, we chopped it up into 7 action-packed lessons!

# Prerequisites
1. Install a code editor i.e. [Visual Studio Code](https://code.visualstudio.com/)
2. Install [Nodejs](https://nodejs.org/en/)
3. Install Google Chrome (if not already installed)

## What will we learn?
Each week is a new set of topics. A large majority will focus on Angular 4.

Though we will focus on Angular, many of these topics will carry on to other large applications as well.

## Why Angular 4?
* Google Community
* TypeScript
* Framework gaining heavy attraction
* Architectural ideas introduced that transcends just one framework.

## What's a Build System?
Sometimes you don't want to directly serve your source code, right? And you want to make sure your source files are packaged in a way so that everything is as small as possible, right? And maybe you need to transpile ES2015 or TypeSCript to ES5 for browser compatibility?

A build system allows you to all of the above. You can make sure your web application converts your raw ES2015 files to ES5, minify (reduce file size) and then spit them out into small files.

Build systems may seem like complex applications, but they are actually quite simple to their core. You'll see that as we go along.

### What are some examples?
* GulpJS
* GruntJS
* WebPack

### How are all of those different?
GulpJS and GruntJS are task runners. As in, you set up some tasks, their build order, then whatever is the end result, gets spit out wherever you'd like.

Webpack is a bit more complex. Webpack is a module-loader. It solves many problems such as:
* What if I don't want to spend 4 days trying to figure out how to get asynchronous tasks to work in Gulp?
* What if I want to use node_module dependencies in my front-end?
* What if I only want to bundle up dependencies that I include?
* What if I want to run specific files through specific plugins?

## GulpJS Example
```javascript
let gulp = require('gulp');
let babel = require('gulp-babel');
let jade = require('gulp-jade');
let del = require('del');
gulp.task('build', ['es6', 'jade']);
gulp.task('dev', ['watch', 'build']);
gulp.task('jade', ['clean'], () => {
    return gulp.src('src/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('dist'));
});
gulp.task('clean', () => {
    return del(['dist']);
})
gulp.task('watch', () => {
    gulp.watch('src/*', ['build']);
})
gulp.task('es6', ['clean'], () => {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});
```
Generally your code goes into `gulpfile.js`. You call different tasks you create by typing `gulp <task-name>`.

Some things to know:
* `gulp.task('name-of-task', ['dependency-list'], 'function-to-call')`
* plugins transform files
* `pipe` is to pipe calls from one plugin to another
* `src` is the starting point
* `dest` is the output point

## WebPack Example
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js"]
    },
    plugins: [new HtmlWebpackPlugin()]
}
```

So, webpack is a bit more complicated. Webpack is based on modules.
In your source files you import any node module dependency, and webpack grabs that and bundles it with your source files.

Webpack traces your starting file and follows your dependency tree. Whatever is found by webpack is added to the bundle file.

So a few things are going on here:
1. plugins are what transform and read your js files
2. entry is where webpack goes to trace your dependencies
3. rules are regex matchers
    i. `use` is the loader that webpack will use to transform your files. Loaders transform files
    ii. `test` is the regex matcher
4. HtmlWebpackPlugin generates the index.html with the script tag injected so I don't have to create one

## Installing Webpack
* `npm install -g webpack` or `sudo npm install -g webpack` on *nix machines
* Create a webpack.config.js
* `npm init # If npm hasn't been initialized yet`
* `npm install --save webpack babel-loader babel-presets-es2015`
* `webpack`


## Workshop
Use the `css-loader` on your project with webpack!

# Introduction to Asynchronous Programming
This arguably the most important lesson, so be sure to pay attention!

## What is Async?
Asynchronous is the opposite of synchronous programming. Synchronous programming is when things happen sequentially.
For example, you have 5 loads of laundry to do. You could either do it synchronously, wash, then dry. This process would take a very long time.
The other option would be to run loads in parallel, or asynchronously.

Asynchronous programming allows you to multiple tasks at once.

## Async and Callbacks
Technically, we've already done some asynchronous programming; when we were reading from the filesystem's directory.

## Example
```javascript
function task1() {
    for(let i = 0; i < 100; i++) {
        console.log("Doing task 1...");
    }
    console.log("Finished task 1");
}

function task2() {
    for(let i = 0; i < 100; i++) {
        console.log("Doing task 2...");
    }
    console.log("Finished task 2");
}
 
function task3() {
    for(let i = 0; i < 100; i++) {
        console.log("Doing task 3...");
    }
    console.log("Finished task 3");
}

function synchronous() {
    task1();
    task2();
    task3();
}

function asynchronous() {
    console.log("Task 1 Test");
    setTimeout(() => { task1(); console.log("Task 1 is Done"); }, 51);
    console.log("Task 1 Test Finished");
    console.log("Task 2 Test");
    setTimeout(() => { task2(); console.log("Task 2 is Done"); }, 50);
    console.log("Task 1 Test Finished");
    console.log("Task 3 Test");
    setTimeout(() => { task3(); console.log("Task 3 is Done"); }, 50);
    console.log("Task 3 Test Finished");
}
synchronous();
asynchronous();
```

Notice how synchronous runs each individually and asynchronous runs task 2 then task 1 then task 3? This is because of the browser running the tasks asynchronously. Rather than Task 2 waiting on task 1 to be finished, all three of the tasks run in parallel!

## Blocking vs non-blocking
Generally, you want all of your programs to be non blocking. 

In our example, we want to `loadUI` and `doLogic`. For now, it doesn't matter what each of the methods do, but the concepts behind them.
We always want things to happen independently of one another.

```javascript
clickMethod() { //while this method is being executed, you can't interact with the UI!
    for(let i = 0; i < 1000; i++) {
        console.log("Doing work...");
    }
}
```
Imagine the above function being called for your `onclick`. If this happened, then your entire application would be `blocked` from doing anything.
Generally, we want things to happen separately.
Here's our solution:
```javascript
function clickFunctionBlocking() { //while this method is being executed, you can't interact with the UI!
    for (let i = 0; i < 2000; i++) {
        console.log("Doing work...");
    }
    for (let i = 0; i < 2000; i++) {
        console.log("Doing work...");
    }
    for (let i = 0; i < 2000; i++) {
        console.log("Doing work...");
    }
}
function clickFunctionNonBlocking() {
    setTimeout(() => {
        for (let i = 0; i < 2000; i++) {
            console.log("Doing work in the background...");
        }
    }, 0);
    setTimeout(() => {
        for (let i = 0; i < 2000; i++) {
            console.log("Doing work in the background...");
        }
    }, 0);
    setTimeout(() => {
        for (let i = 0; i < 2000; i++) {
            console.log("Doing work in the background...");
        }
    }, 0);
}
```
Notice when you click on `BLOCK!` in the example, the user has to wait to perform other operations. That is very frustrating from the user's perspective.
By using non-blocking methods, it's easy to get things done much faster and the user doesn't have to wait for specific tasks to finish.

## Callback Hell
Suppose we have a set of tasks
```javascript
function task4(callback) {
    setTimeout(() => {
        callback();
        console.log('callback 1 done!');
    }, 1000);
}
function task5(callback) {
    setTimeout(() => {
        callback();
        console.log('callback 2 done!');
    }, 500);
}
function task6(callback) {
    setTimeout(() => {
        callback();
        console.log('callback 3 done!');
    }, 800);
}
function sequential() {
    task4(() => {
        task5(() => {
            task6(() => {
                console.log('LAST ONE!');
            });
        });
    });
}
sequential();
```
Callbacks are great, but also suck. If we want to do sequential tasks with asynchronous functions, it's very difficult, and doesn't look like easily followable code. Also, if you'd like to finish one task after another, you have to keep passing new callback functions within other callback functions. This, too is awful.

To fix this, we have `Promises`
```javascript
function promiseTask(task) {
    return new Promise((resolve) => {
        task(resolve);
    }, 200);
}
function sequentialPromises() {
    promiseTask(task4).then(() => promiseTask(task5)).then(() => promiseTask(task6)).then(() => console.log('ALL DONE!'));
}
function qAllExample() {
    Promise.all([promiseTask(task4), promiseTask(task5), promiseTask(task6)]).then(() => console.log("All done!"));
}
sequentialPromises();
qAllExample();
```
`Promises` are concepts that are used in addition to callbacks. Promises `promise` to do something once a task has finished. That `something` is a callback. They are much more useful than callbacks because you are given many extra functions.

For example, it's much easier to follow the sequential example for promises than passing back callback after callback after callback.
Also, there's no way to run callbacks in parallel. You're able to execute them right after another. However, for promises, you can run a set of 
promises together and have it return a promise to tell you when all of the rest have finished.

### then callback
`.then` is the callback that is given if the method has successfully been completed or `resolved`. The callback will be called when the task has completed.

## HTTP Requests
Generally the client asks for a web page and the server responds with the correct information. The information could be data, an html file, or anything else.

The server has endpoints set up that the client can use to request information or files. We already have the calculator's endpoints set up, now all we have to do is call it.

We're going to make an HTTP request to /add and add our two parameters to it.

```javascript
function add() {
    let form = document.forms[0]; //inputs are associated with forms, so you need the form
    let num1 = form.querySelector('input[name="num1"]').value; //get input with name 'num1'
    let num2 = form.querySelector('input[name="num2"]').value; //get input with name 'num2'
    fetch(`add?num1=${num1}&num2=${num2}`).then((result) =>{
        return result.json(); //get the json object from the result
    }).then((data) => console.log(data.result)); //console log the data's result since the server returns { result: num }
}
```

## Workshop
* Call REST API using your calculator web app
* Change request from GET to POST

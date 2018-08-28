# Advanced JavaScript Topics

Today's meeting will cover:
* DOM access
* Onclick events
* Hoisting
* `this` keyword
* Scope of vars
* Lack of constants
* Other ES2015 features


**Note: examples of topics can be found in [example.js](./es5-sucks/example.js) in addition to this document. A running example can be found in the `es5-sucks` folder**


## DOM Access
You can access the model of your page by using javascript.

```html

<!--index.html-->
<div id="outer_container">
    <div id="text1"> I am the text1! </div>
    <div id="text2"> I am the text2! </div>
</div>
```
```javascript

//script.js
var text1 = document.getElementById('text1');
var text2 = document.getElementById('text2');
text1.innerHTML = 'I am the text3!';
text2.innerHTML = 'I am the text4!';
```

## Onclick Listener
```html
<button id="btn1" onclick="log()">Click me!</button>
```
```javascript
var counter = 0;
function log() {
    var button = document.getElementById("btn");
    button.innerHTML = "I have been clicked " + ++counter + " times";
}
```

## Hoisting

In many languages, such as C and C++, your declarations need to be at the top of your scope. This means that you have the following functions:

```javascript
/* Note: this is in JavaScript */
addTwo(number) {
    let plusOne = addOne(number);
    return addOne(plusOne);
}
addOne(number) {
    return number + 1;
}
```

In C++, this wouldn't work because `addOne` was declared before `addTwo` and `addTwo` is dependent on `addOne`.

This works because JavaScript does something called `hoisting`. JavaScript's interpreter looks ahead of time and looks for function calls and declarations. So, JavaScript will automatically move declarations around.

**Note: it depends on how you define your functions**

```javascript
hoisted(); //"Hoisted!"
notHoisted(); //"notHoisted is not a function"
var notHoisted = function() {
    console.log("Not Hoisted");
}

function hoisted() {
    console.log("Hoisted!");
}
```

Not only does this happen with functions, but this happens with variables as well.

```javascript
console.log(helloThere); //logs undefined instead of helloThere not found

var helloThere = "Hello There!";

console.log(helloThere); //logs "Hello There!"
```
**Note: declarations are hoisted, not initializations, which is why instead of console.log printing `Hello There!`, JavaScript just hoisted the declaration of helloThere instead of the full initialized value. Therefore the interpreter logged `undefined`**

TL;DR -- Hoisting is hard, so just try to put your declarations at the top.


### Use Strict

Use Strict is a mode you can tell your compiler to restrict what is interpretted correctly and incorrectly. For example, `use strict` mode disables hoisting.

This is so that as developers, you can set a standard for what is good and passable JavaScript.

## `this` keyword
In C-based languages, `this` generally refers to the current instance of your class. Unfortunately, the idea of `classes` didn't appear until somewhat recently. 

Because of the above, the `this` keyword doesn't have the expected behavior.

```javascript
function ExampleClass() {
    this.exampleVar = "example";
    this.exampleFunction = function() {
        return this.exampleVar;
    }
    /*this.exampleFunction = () => {
        return this.exampleVar;
    }*/
}

var ec = new ExampleClass();
var func = ec.exampleFunction;
console.log("Testing example...");
expect(ec.exampleFunction()).toBe("example");
console.log("Testing func()");
expect(ec.exampleFunction()).toBe(func()); //Throws an error because func calls exampleFunction with the window as the caller
tests.printResults();
```

The above example shows that `this`'s value is based on the execution context. If the context is based on an object, then `this` corresponds to the object's context, which is why `ec.exampleFunction` gives the proper value. 
However, `func()` gives the incorrect value because the execution context belongs to the window, not the `ec` object.

Solution:
```javascript
...
this.exampleFunction = () => {
    return this.exampleVar;
}
...
```
When you use arrow syntax, that tells your browser to use lexical scoping and does what is expected.

TL;DR -- Always use arrow functions as seen above. Also, use classes instead of functions.

## Scope of Vars
```javascript
tests.reset();
function varExample() {
    var example = "HI!";
    if(1) {
        var example = "BYE!";
    }
    return example;
}
expect(varExample()).toBe("HI!"); // Fails because var example changes the previously created example
```
The `var` keyword doesn't necessarily always mean new declarations.
For example, in the above code outside there's the `example` var,
and then in the `if` we have a new variable `example`.
However, instead of creating a new variable on the inner scope, the second `var example` just uses the outer scope's `example` variable instead. 

In ES2015, there's an easy solution for this.

Solution:

```javascript
function letExample() {
    let example = "HI!";
    if(1) {
        let example = "BYE!"; // Creates block scoping
    }
    return example;
}
expect(letExample()).toBe("HI!");
tests.printResults();
```

The `let` keyword allows you to create block scoping. So whereever you use `let`, the variable lives and dies within that scope.

## Lack of Constants

JavaScript doesn't have constants, so ES2015 fixed that.

```javascript
tests.reset();
const abc = "abc";
abc = "ANOTHER"; //ERROR! Can't reassign a constant variable
```

## Fat Arrow syntax

Fat arrow syntax was introduced in ES2015. It allows you to create functions that work as you'd expect and to mimic functionality of Java's Lambda functions.

Before I get into how to use them, let's talk about built-in array functions.

### Filter
Filters based on function given as parameter.

```javascript
let array = [2,4,5,6,7,8,9];

let evens = arr.filter(function(number) {
    return number % 2 === 0; //as long as this is true for the element in the array, the element is added
});
//evens: [2,4,6,8]
```

### Map
Maps every element to a new element based on output of function.
```javascript
let array = [2,4,6,8,10];
let mappedArray = array.map(function(number) {
    return number / 2;
});
//mappedArray: [1,2,3,4,5]
```

**Back to fat arrow.**

Fat Arrow's benefits:
* Short syntax
* Works as expected with variable and `this` scoping.

Let's look back at the evens example:
```javascript
let evens = array.filter(function(number) {
    return number % 2 === 0;
});
//is equivalent to...
let evens2 = array.filter(number => number % 2 === 0);
```

This syntax looks overwhelming at first, but let's take another glance. `number` is your parameter's name for the given function, and everything after the `=>` is what is being returned. So, you know that `number % 2 === 0` is being returned because it's right of the fat arrow.

### Multiple parameters

If you have more than one parameter, make sure to wrap them in parentheses.

```javascript
let array = [2,4,6,8,10];
let evens3 = array.map((number, index) => number1 * number2);
//evens5: [0, 4, 12, 24, 40]
```

## Spread Operator
```javascript
let array = [2,4,5,6,10];
let newArray = [
    ...array,
    12
];
//is an alternative to this:
let array = [2,4,5,6,10];
array.push(12);
```

Above, you can see the Spread Operator. The Spread Operator is a representation of the elements in another array. It's very useful if you'd like a new copy of your array with an element appended to it. 

The use-case that we used is very simple, but is very helpful for more complex arrays.

Generally, if you don't like mutating (changing your original array), the spread operator is a nice alternative.

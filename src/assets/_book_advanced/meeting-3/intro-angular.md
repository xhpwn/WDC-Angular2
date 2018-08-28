# Introduction to Angular 4
This lesson we'll go over Angular 4 basics!

## Why Angular 4?
* Backed by Google
* Trusted by many important and reputable sites
* Latest version of Angular
* Based on TypeScript
* Stable Framework that allows you to do a lot of stuff
* Teaches good architectural lessons every developer should understand
* Introduces great build tools

## What can Angular do?
* Write Complex web apps
* Nested client-side routing
* Template-Driven web apps
* Complex logic built into templates
* Built-In CSRF Support
* Built-In RxJS support
    * Observables
* AND MORE!

## Component-Based Applications
Think of everything as a piece. Angular is made of small moving parts. All you need to do is make them work together.

A `component` is basically a custom HTML element. is A component has two pieces the `template` and the `logic/class`. Each component has a class associated with it, and a template. The template is what is added to the DOM. The template is generally what you use to show things.

### Why Components?
Components are reusable. For example, what if you have a component that you'd like to use in multiple places such as an alert? You wouldn't want to copy and paste a hundred lines of code, would you? Of course not, you'd want to just copy and paste the code in some places.

## Getting Started
Enough Talk. Let's get started!
First, **Create a new project folder!**
Go ahead and use the same webpack config file in the `angular-project` folder [Here](./angular-project/webpack.config.js)

Next, create a `src` folder inside your project. Then, create a `main.ts` file inside and paste this:
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import './polyfills';

platformBrowserDynamic().bootstrapModule(AppModule);
```

Add this to your `polyfills.ts` file:
```typescript
import 'zone.js';
import 'reflect-metadata';
```

We'll come back to this in a second.

Next, create an `app` folder (inside `src`) and create a few files `app.component.ts` and `app.module.ts`

In `app.component.ts`
```typescript
import { Component } from '@angular/core';

@Component({
    template: `<h1> welcome to my angular app! </h1>`, //template to show when using component
    selector: `app-component` //how to use this component in html: <app-component></app-component>
})
export class AppComponent {
}
```

### Modules
Angular is based on a modular system to separate parts of code. 
For example, you can create a new module just for storing common reused components and call the module `CommonModule` and just import it.

Also, Angular deals with a main module and then imports other dependencies for the rest of the app to use.

For example, if you have 5 separate modules, you need to have your main module import the other 5 to make sure your app works properly.

In `app.module.ts` let's add some code:

```typescript
/* Import Statements */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

/* Import Main Component */
import { AppComponent } from './app.component'; //Not written yet

@NgModule({ //Tell Angular to create a module
    imports: [
        BrowserModule, // Module for creating angular web apps
        FormsModule // Module to manipulate template
    ],
    declarations: [ // Components created by us
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { } // Associate module with class
```

### Run the app
To run the application, run webpack-dev-server!

**Note: If you didn't install it already, install webpack-dev-server with `npm install -g webpack-dev-server` on *nix use `sudo npm install -g webpack-dev-server`**

### What just happened?
High Level:
1. We wrote code
2. We ran webpack-dev-server
3. `webpack-dev-server` performs webpack bundling then watches your source files for any changes.

More Specific:
* You have a main module and a main component
* Your main module(`AppModule`) imports your main component (`AppComponent`)
* Angular realizes that you want to use `AppComponent` and adds your component's template to the DOM.
* **Note: Wherever you have your component is where the component's template will be added**
    * Because we added the template to the index.html at the top of the body, the contents of the template were added to the DOM inside the body

### One-Way Bindings
Angular is based on an MVC model. MVC stands for **Model View Controller**. 
The model is your data or the state of your application. View is what the user sees. Controller is what connects the model and view together. It's where most of the logic resides.

In our application, the model would be data retrieved from the server or any information created/maintained by our Component. The controller would be our Component class. The View is your component's template.

Because of this, Angular can have *one-way bindings*. You can reference variables used in your component class inside your template. 

For example, say I had a user's name stored in my `UserComponent` class. 
```typescript
class UserComponent {
    userName = "Bob";
}
```
If you wanted to, you could display that exact name in the template.
```typescript
@Component({
    template: `<h1> {{userName}} </h1>`,
    selector: 'user-component'
})
export class UserComponent {
    userName = "Bob";
}
```
This is helpful for many reasons, but the main one is that you don't need to manually update your template through your TypeScript.

Also, the double curly brace syntax is for binding. This means that that part of the template is *bound to* that variable in the Component class. In other words, when `userName` changes at any point, the header updates.

```typescript
@Component({
    template: `<h1> {{userName}} </h1>`,
    selector: 'user-component'
})
export class UserComponent {
    userName = "Bob";
    constructor() {
        setTimeout(() => this.userName = "Not Bob!", 3000);
    }
}
```
If you try this what happens?
**`Bob` automatically changes to `Not Bob!` in the component class, and therefore the template gets updated along with it!**

## Creating a new component
Go ahead and create a new component inside the `app` directory.

```typescript
import { Component } from '@angular/core';
@Component({
    template: `
        <h1> Inner Component! </h1>
        <h2> My info: </h2>
        <div> {{user.name}} </div>
        <div> {{user.age}} </div>
    `,
    selector: 'inner-component'
})
export class InnerComponent {
    user = {
        name: "John",
        age: 32
    }
}
```
Now, if we wanted to start displaying this, how would we do it?

Let's think about what we've learned.
1. Angular imports main module
2. main module imports dependencies
3. Angular bootstraps main component
4. Component is used in index.html so template is put into the DOM there

So, we want to add our inner component to our already existing app, right? And we want to put it below the template for our AppComponent, right? So why don't we just add the `<inner-component></inner-component>` inside the AppComponent template?

```typescript
@Component({
    template: `
    <h1> {{userName}} </h1>
    <inner-component></inner-component>
    `, //template to show when using component
    ...
})
...
```

Try it!
Wait, it didn't work! Angular didn't recognize the component! Well, that's because the component isn't associated with any module! Let's go add it:
```typescript
...
import { InnerComponent } from './inner.component'; //I named my file inner.component.ts

...
declarations: [
    AppComponent,
    InnerComponent
]
...
```
**DONE!**

Now try it!

**TL;DR If you want to use a component(`Component 2`) inside another one(`Component 1`), add the inner component to the outer component's template (put `Component 2` in `Component 1`'s template)!**

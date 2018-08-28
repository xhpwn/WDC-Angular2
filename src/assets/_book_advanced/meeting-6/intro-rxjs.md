# Observables & HTTP
So, you probably have heard of Promises, right? Well, Observables are kind of like Promises, but on steroids!

## What is an Observable?
An Observable is pretty much an asynchronous stream, and each item in the stream is due to some event emitting some value.

Observables are currently a part of Reactive Extensions (RxJS).

### What is Reactive Programming?
Reactive Programming is event-driven programming. Everything is basically part of a stream.

### Why is it better than a promise?
1. Promises are **not** lazy.
    * In other words, the moment you create a promise, it has started to run. Observables **are** lazy; they only start executing when you tell them to.
2. You can't really retry promises
    * Say your promise fails, you can't just tell it to re-run the promise. You can with Observables
3. Promises are one-and-done
    * Say you're interacting with a click event. With a promise, you wouldn't be able to "listen" on every event.
4. You can't chain `operators` with promises
    * What if you wanted to write an application that only wants to check every two events. You can do that with Observables since they're pretty much streams. You can use operators with these streams such as `filter`, `map`, `flatMap`, etc.

### Example
```typescript
const source = someAsyncTask(); 
/* 
    Let's say this returns:
    {
        empName: "Maneesh",
        role: "Manager"
    },
    {
        empName: "Bob",
        role: "Software Engineer"
    }
*/

const observable = source.filter(employee => employee.role === "Manager");
observable.subscribe(list => console.log(list)); //will fire every time an event goes off.
// The above results in just { empName: "Maneesh", rol: "Manager" }
observable.map(employee => employee.empName); // Returns "Maneesh"
```

Can you do that with promises? Yes, but it's very difficult. 

When would you want to have multiple events? One example would be:
Taken from [Rxjs's GitHub](https://github.com/Reactive-Extensions/RxJS)
```typescript
const $input = $('#input');
const $results = $('#results');

/* Only get the value from each key up */
var keyups = Rx.Observable.fromEvent($input, 'keyup')
  .pluck('target', 'value')
  .filter(text => text.length > 2 );

/* Now debounce the input for 500ms */
var debounced = keyups
  .debounce(500 /* ms */);

/* Now get only distinct values, so we eliminate the arrows and other control characters */
var distinct = debounced
  .distinctUntilChanged();
```

Also, note that the main reason behind observables is the different operations that can be done to observables. This makes life a lot easier than using Promises.

Basically, you're able to do a lot of things to do in asynchronous objects/streams.

### How does this work?
1. Observables are streams
-----1---2----3--------4------5------6----------7-->
2. The stream emits events (events 1-7 above)
3. Perform operations
4. Observables don't work, until you do `subscribe`
`observable.subscribe(event => console.log(event)); // Prints out events emmitted by observable`
**Note: Each operator used on an observable creates a new observable**
Example:
```typescript
let observable1 = httpRequest$;
let observable2 = observable1.filter(data => data.type === 3);
observable1.subscribe(data => console.log(data)); // Has all data
observable2.subscribe(data => console.log(data)); // Has only filtered data
```


## What about Observables and Angular 4?
Well, let's create a new project called `hp-characters`
`ng new hp-characters`

Let's create a new service called `Character`
`ng g service character`

* Add `CharacterService` to your list of `providers`
* Create a getCharacters() method
* Inside add:
```typescript
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
...
constructor(private http: Http) {

}
getCharacters() {
    return this.http.get('http://hp-api.herokuapp.com/api/characters').map(response => response.json()); // Map the payload of the observable to be the actual data
}
```
* Let's use it in our app now!
```typescript
/* AppComponent */
...
import { CharacterService } from './character.service';
...
characters: Observable<any>;
constructor(private characterService: CharacterService) {
    this.characters = this.characterService.getCharacters();
}
```
```html
<!--app.component.html-->
{% raw %}
<pre> {{ characters | async | json }} </pre>
{% endraw %}
```

### The Async Filter/Pipe
In our templates, we can use `pipes/filters` to transform our template to adhere to some standard. For example, if we want to transform our
numbers to be humanly readable, we can use the `currency` pipe.
In our case, we want to use an observable in our template without unwrapping the observable. So, we use the `async` pipe.

**Note: You can use multiple pipes together like the above**
We pipe `async` then `json`. So, first Angular unwraps the observable `characters`, then sends the unwrapped data to the next pipe, `json`.
Pipes always go from left to right.

### Things without the async pipe
```typescript
/* AppComponent */
...
characters: any[];
constructor() {
    ...
    this.characterService.getCharacters().subscribe(characters => this.characters = characters);
}
```
The above gets the observable for the HTTP Request, then when an event has been emitted, it sets the `this.characters` to the result.

```html
<!--app.component.html-->
{% raw %}
<pre> {{characters | json }} </pre>
{% endraw %}
```


### NgClass
We can conditionally apply classes to our elements by using the directive `NgClass`. `NgClass` uses your logic to determine what class to use. 
You just need to make sure you return the right one.
For example, if I had a series of game of thrones characters and I wanted to change the colors of those who are dead, then you would use something like:
`[ngClass]="{ 'dead': !character.alive }`
`dead` is the class name. `!character.alive` is the condition on which to check to determine whether the class should be applied or not.
or, if I had a ternary operator
`[ngClass]="character.alive ? 'alive' : 'dead'"`

**Note how I used quotes around `alive` and `dead`. If I didn't, Angular would have tried to evaluate and find both of those variables and use their result as the class name**


## Using Bootstrap
1. `npm install bootstrap --save`
2. Open styles.css and add `@import '~bootstrap/dist/css/bootstrap.css';`
3. Start using bootstrap!
**Note: I am using bootstrap 4.0.0-beta, to install this use `npm install bootstrap@4.0.0-beta`**
4. To use javascript you can:
```typescript
import 'jquery';
import 'bootstrap'; // import all of bootstrap's js
import 'bootstrap/js/dist/util'; // import a specific util
```
And install jquery `npm install --save jquery`

## Workshop
* Iterate over the list of characters and show each character's name and house
* Display each character's image
* Change the style of each character who is dead vs alive
* BONUS: Change the style of each character to match their house

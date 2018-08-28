# Propagation of data and Intro to Services
So, we've figured out how to propagate data from your parent component to your child component(s)!
What we don't know yet, is how to propagate information from child to your parent component!

## Propagation of child component data to parent component

### Why would you want to send data to the parent?
Remember how the parent component generally is called the "smart" component? Well, the smart component is supposed to take all of the information from different places and distribute that to other places.

### How do we do this?
**Before we get started**

1. Create two components `VillainList` and `AddVillain`
2. Move all of the contents used to create a new villain to `AddVillain`
    * Input box
    * Button
    * Method to add villain
3. Leave `VillainList` empty for now

```typescript
/* add-villain/add-villain.component.ts */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-villain',
  templateUrl: './add-villain.component.html',
  styleUrls: ['./add-villain.component.css']
})
export class AddVillainComponent implements OnInit {
  villainName: string;
  constructor() { }

  ngOnInit() {
  }
  addVillain() {
    this.villains.push(this.villainName); //doesn't work!
    console.log(this.villains); //doesn't work!
  }
}
```
```html
<!-- add-villain/add-villain.component.html -->
<input [(ngModel)]="villainName">
<button (click)="addVillain()">Add Villain</button>
```
```typescript
/* villain-home/villain-home.component.ts */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-villain-home',
  templateUrl: './villain-home.component.html',
  styleUrls: ['./villain-home.component.css']
})
export class VillainHomeComponent implements OnInit {
  @Input() villains: string[];
  constructor() { }

  ngOnInit() {
  }
}
```
```html
<!-- villain-home/villain-home.component.html -->
<h1> Villain Home! </h1>
```

Purpose of each component:
* VillainHome: smart component
    * Gets updated info from AddVillain
* VillainList: list of villains receieved from VillainHome
* AddVillain: Get the next villain and send that to VillainHome

### Sending villains from VillainHome to VillainList
Remember, `@Input() villains: string[];` is a part of `VillainHome`, but this is for the **receiving** component, and since `VillainList` is receiving the list of villains, we need to move the line of code to `VillainList`.

Next, we need to use the `VillainList` component inside the `VillainHome` and send the list of villains to the component as a `villains` attribute.
```typescript
...
export class VillainHomeComponent implements OnInit {
  homeVillains = ["Boba Fett", "Darth Vader"];
  constructor() { }

  ngOnInit() {
  }
}
```
```html
<!-- villain-home/villain-home.component.html -->
<h1> Villain Home! </h1>
<app-villain-list [villains]="homeVillains"></app-villain-list>
```
```typescript
/* villain-list/villain-list.component.ts */
...
export class VillainListComponent implements OnInit {
  @Input() villains: string[];
  constructor() { }

  ngOnInit() {
  }

}
```

```html
<!-- villain-list/villain-list.component.html -->
{% raw %}
<pre>{{villains | json}}</pre>
{% endraw %}
```


**Note: Don't forget to REMOVE this from `app.component.html`**
` [villains]="initialVillains" `

### Passing data from child to parent
We will be passing the event from the child to the parent when the user clicks on the `Add Villain` button in the `AddVillain` component.

Let's add an `EventEmitter` in the `AddVillain` component.
`@Output() add: EventEmitter<String> = new EventEmitter();`

The Type is `String` because we will be sending a string back to the parent. This string is the new villains name.

Next, we alter the click event to `emit` the string back up to the parent component.
Inside your `addVillain` be sure to replace the contents with
`this.add.emit(this.villainName);`

Then, add your `app-add-villain` to your `villain-home.component.html` then make sure to add the attribute `(click)="addVillain($event)"` to the component.

Finally, create the function that will receive the updated name:
```typescript
/* add-villain/add-villain.component.ts */
addVillain(villainName) {
    this.homeVillains.push(villainName);
}
```

## More built-in directives
Remember how we were talking about `NgModel` being a directive? There's more than just that!

We have `*NgFor`, `*NgIf`, and others.

`*NgFor` is like a for loop. It's used on an array and for each element in the array, the element and its children will be copied n number of times.
```html
<!--
If your list is called heroes, and has 4 items, you would have
<div>
    <div> {{heroes[0].name}} </div>
</div>
<div>
    <div> {{heroes[1].name}} </div>
</div>
<div>
    <div> {{heroes[2].name}} </div>
</div>
<div>
    <div> {{heroes[3].name}} </div>
</div>
-->
<div *ngFor="let hero of heroes"> <!--Equivalent to above-->
    <div> {{hero.name}} </div>
</div>
```

`*ngIf` is a conditional. If the condition is met, then the element is kept in the DOM. Otherwise it's removed.

### Applying to VillainList
Let's apply the same to VillainList, shall we?

We have a list of villains, and we want to display each item in the list, so:
```html
<ul>
    <li *ngFor="let villain of villains"> {{ villain }} </li>
</ul>
```
Do you know why we used `NgFor` on the `li` and not the `ul`? It's because if we put `ngFor` on the `ul`, then the `ul` would be copied multiple times, so for each item in the array, we'd have a new list, but we want a list item for each item in the array. That's why we chose to put the `NgFor` on the `li` and not the `ul`

### Brackets vs parentheses
Brackets are used when you'd like to evaluate something. For example, when we pass `characters` or some object, we want to be able to pass in the 
evaluated data, right? Not the actual word `characters`, so when we're passing data, we need to make sure to put `[]` around the attribute name.

Also, `()` means some kind of event being passed or created. For us, we're doing method linking for click events and passing data from child to parent, so we use `()`.

## Services
The purpose of components are to make sure you can reuse UI segments of your web application.
However, it's not a good idea to put large pieces of logic in these components.
Logic should be placed in `Services`

### What is a Service?
A service is a `singleton`. In other words, once a singleton is instantiated, that object is passed around to the entire system.
There is only a "single" instance of the class.

### Where would we want to use a service?
In our Villain Project, we want to move our "state" logic away from the dummy component.
Let's go ahead and move that to a service.

Generate a service:
`ng g service main`
Then, add it to your list of providers:

` providers: [MainService], // don't forget to import MainService!`

Let's write a `getter`, `setter`, an `addVillain`, and `removeVillain`: 
```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class MainService {
  private villains = [
    "Darth Vader",
    "Darth Plagueis"
  ];
  constructor() { }
  getVillains() {
    return Object.assign({}, this.villains);
  }
  addVillain(villain) {
    this.villains.push(villain);
  }
  removeVillain(villain) {
    let index = this.villains.indexOf(villain);
    if(index > -1) {
      this.villains.splice(index, 1);
    }
  }
}
```
Now, all we have to do, is tell our smart component, `VillainHomeComponent` to use the service!

### Dependency Injection
DI is an important concept to understand. Sometimes you can have dependencies, but you're not sure how to instantiate them, or you'd like to obfuscate how to instantiate. 
Or, you don't want to have to write unit tests and have to worry about instantiation of other classes.

In these cases, Dependency Injection is a good solution. To inject your dependency, you can:
```typescript
export class VillainHomeComponent implements OnInit {
  homeVillains = ["Boba Fett", "Darth Vader"];
  constructor(private mainService: MainService) { } // DI happens here

  ngOnInit() {
  }
  addVillain(villain) {
    this.homeVillains.push(villain);
  }

}
```
See? All we had to do was add the `Service` to the constructor, and Angular took care of the instantiation of the Service for us!

Now we can use it like a normal object!

We want to replace all instances of managing the villain with the methods used in the service:
```typescript
...
addVillain(villain) {
    this.homeVillains.push(villain);
}
getVillains() {
    return this.mainService.getVillains();
}
```
```html
<app-villain-list [villains]="getVillains()"></app-villain-list>
```
We need `getVillains` because we need to keep updating the list. Without this method, we'd have no way of getting the list of villains from the service.

## Workshop
* Add a remove button to each villain
* Implement the logic to remove a villain

# Client-Side Routing
There's server-side routing where the server handles endpoints (requests made by the client). 
We wrote some of this before in Node.js. 

You also can have client-side routing.

## What is Client-Side Routing?
Routing that the client handles. Instead of handling API requests, the client will realize the address has changed and change html templates accordingly. 

For example, if you typed in /characters/1, then either your server will realize that's an API request, or it will realize it'll let the client handle the routing. 

## Client-Side Routing vs Server-Side Routing

Client-Side Routing deals with more of changing around HTML templates in the page. You could have a layout that looks like:
```
---------------------------
-HOME--CHARACTERS----------
---------------------------
---------------------------
-------TEMPLATE------------
---------------------------
---------------------------
---------------------------
```
The part where `HOME--CHARACTERS` is, that's where the navbar is. When you have your browser open, that part will not change upon url change.
TEMPLATE will be replaced. 

For example, let's say we have the url's `/characters/1` and `/characters/2`.
We could set up our routing so that the TEMPLATE part of the page would change based on the URL. This allows you to interchange components on URL change.

## Why Client-Side Routing?
* Load resources once only
* Faster web pages and client experience
* Less requests to the server required
* Separation of concerns between server and client

### HOW??
Let's do this the easy way and continue from our last project.

1. Import `RouterModule from '@angular/router';` and add it to your list of module imports
2. Create a `CharactersComponent` and then move all of the data retrieval and template from `AppComponent` to `CharactersComponent`
3. When importing `RouterModule`
```typescript
...
RouterModule.forRoot([
    { path: '', component: CharactersComponent, pathMatch: 'full' }
    /* When the full part of the url matches '', then the CharactersComponent will load in the top level router-outlet */
])
...
```
4. Add a `<router-outlet></router-outlet>` to your app.component.html

This is where your template will be swapped out from.

### Another Route!
What if we wanted to have a detailed view into each character? So when we go to `/character/1` we get `Harry Potter` and then if it's a different url, a different character will be shown?

Let's create a `CharacterDetail` component. `ng g component CharacterDetail`. Then, add it to the list of routes:
```typescript
...
RouterModule.forRoot([
    { path: '', component: CharactersComponent, pathMatch: 'full' },
    { path: 'character/:id', component: CharacterDetailComponent }
    /* When the full part of the url matches '', then the CharactersComponent will load in the top level router-outlet */
])
```

So, we want to get the data based on what id was chosen, right? But there's no way to signify who was chosen except for by the name right? Let's have it so that when you click on the character's image, you direct the user to the detail page of that character.

1. Add a `(click)` attribute to your `<img>` that passes the current character to your method
2. Create a click that lets us redirect the user to `/character/name_of_person_separated_by_`
```typescript
constructor(private characterService: CharacterService, private router: Router) {
    this.characters = this.characterService.getCharacters();
}
selectCharacter(character) {
    this.router.navigate(['/character', character.name.replace(/\s/g, '_')]); // replaces all ' ' with _
  }
```
So, this should redirect you to `/character/harry_potter` if you click on the image of `Harry Potter`.

Let's set up the API to return the specific character you asked for:
1. Create a getCharacter method that accepts a name as a string
2. Add spaces to where the `_` are in the name
3. Make a request to `getCharacters` and filter by only the name that was given


```typescript
getCharacter(id: string) {
    let name = id.replace(/_/g, ' ');
    return this.getCharacters().map(characters => characters.find(character => character.name === name));
}
```
First, we use regex to replace all instances of `_` with spaces.

Then, we map the result of the `getCharacters` observable to the result of `find` on the entire array. If the id is correct, the correct info will be returned.

**Note: `find` returns the first object to match your criteria. We use `find` instead of `filter` because `find` returns an object not an array**

### Adding information to the character
Let's get this info from the method. In `ngOnInit()` let's make a call to the service.

Let's inject `Route` and some other classes into the constructor
```typescript
  constructor(private route: ActivatedRoute, private router: Router, private characterService: CharacterService) { }
```
The `Router` is to navigate to other URL's. `ActivatedRoute` is the current route that we are at. We can use this to get the parameters as well (our id).

`this.route.paramMap` returns the list of parameters as an observable, so all we have to do is resolve that and map the observable to the one that gets the character inside the `CharacterService`

```typescript
this.character = this.route.paramMap.switchMap((params: ParamMap) => this.characterService.getCharacter(params.get('id')));
```

**Note: switchMap switches an observable from one to another**

### Adding to the template
Let's add some info to the detail component.
Before we get started, you need to understand the elvis operator `?`, this is helpful if the object you want isn't available yet. 
This is important to us because we want to get the character's name, but the browser still might be waiting for a response from the server. If we don't use this operator, we'll be asking for a property of `name` from undefined. 

By using the elvis operator, we are able to tell Angular "if this exists, I want the `name` property of the object.

So, let's add the title of the character
```html
    {% raw %}
    <h3 class="card-title"> {{ (character | async)?.name}} </h3>
    {% endraw %}
```
**Note: you need to have parentheses around your expression that you want to get the object from. Because we want `name` from the result of the `async` pipe, we have parentheses around the `character | async`**

## Workshop
* Do the same to fill in the rest of the `Character Detail`

## BONUS - Resolvers

### What is a resolver?
Sometimes you want to get the data before you go to a route. We want this because we get errors that we are trying to get `null.jpg` since there's a delay between us sending the request, and receiving it, and the template rendering.

Essentially, a resolver is basically just a service that gets data before a route loads so you know that when a component is loaded, all the data has been loaded as well.

### Getting started
1. Create a service `CharacterResolverService`
2. `implement` `Resolve<any>`
3. inject `CharacterService`
4. Create a `resolve` method, and add `ActivatedRouteSnapshot` and `RouterStateSnapshot`
4. in resolve, get the id
`let id = route.params['id'];`
5. Return the result of the character service
`return this.characterService.getCharacter(id);`

```typescript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { CharacterService } from '../character.service';
@Injectable()
export class CharacterResolverService implements Resolve<any> {
    constructor(private characterService: CharacterService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        let id = route.params['id'];
        return this.characterService.getCharacter(id);
    }
}
```

Now our data is in the route, so let's 
1. Tell the router to use our resolver
2. Get the data from the router

### Telling router to use our resolver
1. add the service to the `providers` array
2. add `resolver: { character: CharacterResolverService }`

### Getting data from router
1. Change the type of your character member variable to `any[]`
2. Get the data from `this.route.data`

We know that the data is in an object called `data` with the property `character`.
All we have to do is subscribe, get the data, and set our character member variable to that `data.character`
```typescript
export class CharacterDetailComponent implements OnInit {

  character:  any[];
  constructor(private route: ActivatedRoute, private router: Router, private characterService: CharacterService) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.character = data.character);
  }
}
```

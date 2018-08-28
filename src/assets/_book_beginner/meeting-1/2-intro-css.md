# CSS
We are learning about CSS this meeting! **CSS stands for Cascading StyleSheets.**

CSS is for stylizing your websites.

## Setup
1. Create a `styles.css` file
2. Add the following `<head>` tag to your html:
```html
<html>
    <head> <!--Section of HTML to make sure you can add links and references to files-->
        <link href="styles.css" type="text/css" rel="stylesheet"> <!--Links to another css file-->
    </head>
        ...
    <body>
        ...
    </body>
</html>
```

## Selectors
In CSS, you can apply "styling" to different elements, but in order to do that, you need a way to select the different items.

### ID's
To uniquely identify different HTML elements, you need to use ID's. 
```css
/* styles.css */
#div1 { /* # denotes ID, div1 is name of ID*/
    text-align: center; /* text-align is a property, center is a value */
}
```
```html
/* index.html */
<html>
    <body>
        ...
        <div id="div1">
            <!--Content!-->
        </div>
        ...
    </body>
</html>
```

### Classes
Classes are a way to group elements together. If you want to apply a set of styles to multiple elements, you'd want to use Classes vs IDs.

```css
/* styles.css */
.class1 { /* . denotes a class, class1 is the name of the class */
    color: blue;
}
```
```html
/* index.html */
<html>
    <body>
        ...
        <div class="class1">
            <!--Content!-->
            <div>
                <h1> I'm blue! </h1>
                <div> <h1>I'm blue too!</h1> </div>
            </div>
        </div>
        ...
    </body>
</html>
```

### Properties and values
| Property       | Value     | Description |
| -------------- | ----------| -------------- |
| text-align     | `center, left, right` | Align text a certain way |
| color          | `blue, red, #34E3B1`  | Set text color |
| background-color | `any color` | Set background color |
| display        | `inline, block, inline-block, none` | changes wrapping of HTML elements |
| width/height   | `%, px, em ,auto` | changes width/height of element |

## Workshop

### Using CSS for better webpage design
A few of the of the major advantages of using CSS for styling HTML pages are portability and constistency through different webpages. We can see how CSS does that, by linking one single CSS file among multiple HTML pages, while using classes and ids to make sure our webpages look consistent in style and formatting.

### Goal
To make two webpages consistent in style and formatting without having to rewrite style attributes. This will help learning how to link CSS files, using CSS for styling, and eventually building apps with better UI.

### What To Make
For this workshop, create one CSS file with classes and ids, and link the same file to <b>two</b> HTML pages, using the classes and ids normally in both. 

Here is a basic CSS skeleton that contains a class and an id -

```css
// This is a sample id
#heading {
    // Code for id
}

//This is a sample class
.firstparagraph {
    // Code for class
}
```

And here is a basic HTML skeleton - (<b>Note</b> - You will have to specify the name of the CSS file for linking)

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset='UTF-8'>
        <link rel="stylesheet" type="text/css" href="#filename">
        <title><!--Replace with your own title--></title>
    </head>
    <body>
        <!--Your code goes here-->
    </body>
</html>
```

Save the CSS and two HTML files in .css and .html formats respectively. Double click on any of the HTML files and it should open in your browser, with the styles that you specified. As you make changes to the HTML or CSS, reload the page in the browser to see the changes take effect. If no style loads in your webpage, head to the HTML file and check if it has been linked correctly and with the right file name, and that you have used the classes and ids correctly and with their right names.

### Bonus
Attempt to link the two HTML pages using an Anchor (<a>) tag on each page, leading to the other and back.
If you manage to complete this, congratulations, you just made your first website! (The difference between a webpage and a website is the linkage of multiple pages together!)

### Finished Product
We are not looking for something very intricate, but feel free to beautify your HTML as much as you like, using CSS! You can see a sample result for the workshop [here](https://embed.plnkr.co/HrmNx3/).

## Resources
[CSS reference @ MSDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
[Bootstrap](https://getbootstrap.com/css)

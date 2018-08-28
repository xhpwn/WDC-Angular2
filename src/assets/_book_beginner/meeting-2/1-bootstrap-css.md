# Bootstrap

## What is Bootstrap?

Bootstrap is a CSS framework by Twitter. It's a collection of 1 CSS file and 1 JavaScript File. 

You can find the documentation [here](http://getbootstrap.com/css/)

## Why use a framework?

Writing your own CSS is way too much work. Web Development can be difficult to start sometimes, and Bootstrap CSS makes that easier. Why write CSS if you don't need to?

## Features

* Stylized Buttons
* Responsive Navbar
* Responsive Scaffolding System

## How To Install

Using bootstrap on your web page is easy! Its just another style sheet. So in your HTML just include the following

```html
<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    </head>
    <body>
    </body>
</html>
```
Be sure to include the link tag inside your head tags, before your body tags. This is so that bootstrap can load before the content of your webpage loads. 

The url you see in the link tag was obtained from [here](https://www.bootstrapcdn.com/)


## Scaffolding System
Sometimes your websites have somewhat complex UIs where you'd like it to look a specific way on some devices vs other devices. The Scaffolding System lets you do that.

### Rows
The Scaffolding system works based on Rows. Each row has a width of 12. Each row can have multiple columns. The width of each columns is based on how much of the total width(12) is selected. 
For example, if you'd like to have two columns in one specific row, all you have to do is 
```css
.row
    .col-3
    .col-9
```
As long as all of your column's widths add up to 12, you can have as many of your columns together as you'd like.

### Responsive Columns
Now you know about columns and sizes. You can also specify which size of a screen you'd like to apply the division on. 

Sizes:
* xs
* sm
* md
* lg

Example:
```html
<div class="row">
    <div class="col-md-3">
        <!--On medium devices and larger, I take up 25% of the width of the row!-->
    </div>
    <div class="col-md-9">
        <!--On medium devices and larger, I take up 75% of the width of the row!-->
    </div>
</div>
```
Syntax:

       .col-size-width
       
### Responsive Columns With Offset
It is also possible to create an offset for the columns relative to the edge of the screen. 

This is useful for centering and improving general aesthetic appeal. 

Example:
```html
<div class="row">
    <div class="col-md-2 col-md-offset-2">
    </div>
    <div class="col-md-6 col-md-offset-2">
    </div>
</div>
```

This creates a column of width 2, with a margin from the left border. This margin is a whitespace column of width 2. 

The second col div creates a column of width 6, with a margin from the left column. This margin is a whitespace column of width 2. 

Notice how the width of the columns and the width of the offsets all add up to 12. 

**Note: When you specify a width, it applies for that width and larger screen sizes**

## Resources

Link to the bootstrap docs: https://getbootstrap.com/css/

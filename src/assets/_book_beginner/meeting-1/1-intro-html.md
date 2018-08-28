# Introduction to HTML
WDC is here to provide the knowledge to those who are interested. However, some of that work must be taken up from you, as a student. ** As a student we expect you to attend meetings and complete parts of your project.**

## Prerequisites
1. Install a text editor such as [Visual Studio Code](https://code.visualstudio.com/)
2. Install a browser such as [Google Chrome](https://www.google.com/chrome/)

## Why do you need to put in work?
Web Development isn't just writing a few lines of HTML & CSS. It requires a large amount of work, and it's like many skills; you need to practice, practice, practice.

## Who is this for?
This course is for anyone who'd like to learn.

## Development/Setup

All you need is a code editor.
Steps:
1. Go download an editor like [Sublime Text](https://www.sublimetext.com). 
2. Create a folder on your computer for web development
3. Create a folder for each meeting

# What is Web?
Web Development is development that involves a website (also referred to as a ** web app **).
Web Development involves two things: a *client* and a *server*.

## Client/Server Model
Client: Sends requests to your server. 

Server: Accepts requests from client. Most of the security and asset/resource management happens here.

**Context**: When you visit https://google.com, there are a group of computers (DNS - Domain Name Servers) that figure out that google.com refers to a server with a specific internet address. Based on this, it (your browser, the client) talks to the server and tells it you need the route "/". Your server realizes you want index.html and sends that info back to the browser and you're able to search. Most of the security happens at the server-side!

![Client/Server Model](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Client-server-model.svg/1200px-Client-server-model.svg.png)

## HTML

HTML stands for **HyperText Markup Language**. It's basically the skeleton of your website. To further understand what it does, let's write our own site.

## Tags

In HTML you have starting and ending **tags**. Tags are used for indicating where an element starts and ends. **Elements** are basically parts of the page that give different functionalities. 

Create an `index.html` file with the following contents:
```html
<html>
    <body>
        <div> Hello World! </div>
    </body>
</html>
```

Go ahead and open this up in your browser!

### HTML Tag
`<html>` is so that your browser understands that this is where your site will start.
`</html` is so that your browser knows where your site's HTML will end. `<element-name>` indicates the starting `element-name` tag. `</element-name>` indicates the ending `element-name` tag.

```html
<html>
    <!--This is a comment-->
    <!--This is where the code of your webpage goes-->
</html>
```

### Body Tag
`<body>` tag is used so that the browser knows where the main content of your application/website lies. This is where you want to show all of your info.
```html
<html>
    <body>
        <!--This is where the heart of your content goes!-->
    </body>
</html>
```


### Div Tag
`<div>` is a container for other tags or information. 

**Notice: You can have other elements between the starting and ending tags, or text**
```html
<html>
    <body>
        <div>
        <!--Contain elements here!-->
        </div>
    </body>
</html>
```
When would you want to use `div`s?
Good question! A good website is written with proper organization in mind. Your web page is going to be complicated at some points and it's a good idea to divide it up. That's what `div` tags are for. For example, if you have a page with a left column and right column, you would have a setup like this:
```html
<html>
    <body>
        <div> <!--Global container-->
            <div> <!--Left container--> </div>
            <div> <!--Right container--> </div>
        </div>
    </body>
</html>
```

### Header tags
Header tags (`<h1>...<h2>...<h3>...until <h6>`) are to show bolded titles. For example, you need to write a new page and would like to show your name in bold, you would use a header tag. There are multiple different headers ranging from `h1` to `h6`. The larger the number, the smaller the header. For example, `h1` is a lot larger than an `h5`.

#### Example:
```html
<html>
    <body>
        <div>
            <h1> This is large </h1>
            <h2> This is smaller </h2>
            <h3> This is even smaller </h3>
            <h4> This is smaller than that </h4>
            <h5> This is...getting small </h5>
            <h6> Smallest! </h6>
        </div>
    </body>
</html>
```

### Paragraph tag

The paragraph tag is when you'd like to display large blocks of text. 
```html
<p> Lorem ipsum dolor sit amet, his nihil quaestio in. In melius inimicus constituto nam. Ludus voluptua vel ea, agam persius propriae mei ex, nisl esse mucius at vis. Sed delectus ponderum recusabo te.

Sed et erat inani, aperiri vivendo intellegam ea vix. Has minim errem id, eos ei epicurei tacimates voluptatibus. Deserunt quaestio no est, ea nec feugiat instructior. An hinc quaestio per, debet vocent comprehensam est cu. Sit paulo nostro detracto at.

Nihil nostrud assueverit duo ut, est tale definiebas id. Vis utinam patrioque urbanitas ad. Has ad quem ubique veritus. Quod sensibus concludaturque at pri, mea audiam malorum cu. Ei vim quod errem sensibus, per habeo soleat omittam cu.

Quo principes efficiendi ex. Ei qui impetus omnesque, pri ea tota vidit dicant. Nibh debet expetenda nec ex, ad decore reformidans has. Duo lorem delicatissimi ut.

Has te zril voluptatum philosophia, cum velit graeci mnesarchum id, ex his nulla maiestatis. Usu no assum propriae theophrastus. Mazim quidam pri ut, gloriatur concludaturque quo cu. At purto lorem eos. Ne dicunt reprimique usu, mea ea suavitate constituto, sea no essent concludaturque. Melius prodesset nec ne, eu equidem honestatis mea, diam utamur id vim. Postulant contentiones pri no. </p>
```

## Workshop

### Tribute Page
For the very first workshop, create a simple tribute page to any personality of your choice.
The basic requirements for this are that the web page
* Have a title at the top, with the name of the person this is a tribute to and your name next to that.
    * Format it and choose a visually appealing design
* There should be an image of the tributee
    * links the user to a website where they can read more (will most probably be Wikipedia).
* A body of text that is the width of the image should follow containing information about the tributee.

A very basic wireframe of what it should look like can be found [here](http://imgur.com/a/zQvBy)

A sample example can be found [here](https://codepen.io/redixhumayun/pen/pyGByG)

Here is the basic HTML skeleton you will need to get started.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset='UTF-8'>
        <title><!--Replace with your own title--></title>
    </head>
    <body>
        <!--Your code goes here-->
    </body>
</html>
```

Save the above code into an index.html file using your preferred editor. Double click on the file nad it should open a new webpage in your default browser. As you make changes to the HTML, reload the page in the browser to see the changes take effect.

Beyond these requirements, you are free to experiment as you wish. Give the page your own personal touch.

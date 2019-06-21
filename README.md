## A guide to using CSS custom properties

Except for IE 11, all of the major browsers now fully support CSS custom properties. Custom properties are essentially variables you can declare in your CSS. They can dramatically reduce redundancy in your CSS files. Let's take a closer look. 

#### Declaring variables

CSS custom properties are declared in a .CSS file and associated with a scope. The scope is either global, which makes the variables available to all other CSS in your app or scoped to a specific CSS selector, which makes the variables available only for that selector.

For example, the following declares a global CSS property:

    :root {
        --background-color: #004477;
    }

Any other CSS in your project can use this property like this:

    .button {
        ...
        background-color: var(--background-color);
        ...
    }

> :root applies to the document's `html` element.     

Declaring a scoped property is similar:

    .button {
        --background-color: #004477;
    }

The property above applies to elements with that specific CSS selector applied:

    .button {
        ...
        background-color: var(--background-color);
        ...
    }

The scoped property could have also been declared without separating the variable definition from the `.button` class rules like this: 

    .button {
        --background-color: #004477;
        ...
        background-color: var(--background-color);
        ...
    }

Usually, though, it's best to declare all of your CSS custom properties in a one place (often in a separate CSS file dedicated to declaring variables) and then apply them to other CSS rules as needed. There are some sophisticated uses of custom properties that require scoped properties, but you can get a lot of use out of CSS custom properties declaring only global variables. 

#### Putting CSS customer properties to work 

Consider a CSS file with the following rules (where the elipsises are other values as needed.)

    .button {
        ...
        background-color: #004477;
        ...
    }

    .standard-border {
        ...
        border: 1x solid #004477;
        ..
    }

    .menu-text-color {
        ...
        color: #004477;
        ...
    }

The intent here is to have established a primary color and have it be used consistently through the site. However, if you ever need to change this primary color, then you have to use search and replace to carefully swap out the colors. With CSS custom properties, you could do this: 

    :root {
        --primary-color: #004477;
    }

    .button {
        ...
        background-color: var(--primary-color);
        ...
    }

    .standard-border {
        ...
        border: 1x solid var(--primary-color);
        ...
    }

    .menu-text-color {
        ...
        color: var(--primary-color);
        ...
    }

Changing the definition of `--primary-color`, quickly swaps out the primary color throughout the entire site. 

#### CSS custom property considerations

* The double dashes (--) that prefix CSS custom property variables is required. 

* Unlike other parts of CSS, CSS custom properties are _case sensitive_. It's probably best to stick with all lower-case naming.

* With the exception of IE 11, [virtually every major browser fully supports CSS custom properties.](https://caniuse.com/#search=css%20custom%20properties). Don't wait for IE 11 to catch up (it won't). Relegate its use to legacy needs and get your users upgraded to a better browser!  

* CSS custom properties are intepreted at runtime and fully obey [CSS cascading rules.](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Cascade_and_inheritance)

* CSS customer property names can quickly spiral out of control. Give some thought to effective CSS property naming conventions. 

* If the same property name is declared globally and as a scoped property, the scoped property applies (to its given scope). 

#### CSS custom properties and JavaScript 

There is a simple JavaScript interface to get and set CSS custom property values.

##### Set a global property value

    let root = document.documentElement;
    root.style.setProperty('--page-background-color', 'azure');

`document.documentElement` is the `:root` selector.    

##### Get a global property value

    root = getComputedStyle(document.documentElement);
    console.log(root.getPropertyValue('--page-background-color'));

##### Set a scoped property value

The scoped selector used here must match the selector used to define the scoped property.

    root = document.querySelector('.message');
    root.style.setProperty('--background-color', 'purple');    

##### Get a scoped property value

    root = getComputedStyle(document.querySelector('.message'));
    console.log(root.getPropertyValue('--text-color'));

 Although this JavaScript interface exists, it takes a special case for it to truly be useful. The couple of times I've used it ultimately created a bigger problem than the one being solved. Unless you're very careful, you can cause more indirection than its worth. 

#### Further reading:

* [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
* [CSS custom properties W3C spec](https://drafts.csswg.org/css-variables/#intro) 
* [Clever, sophisticated use of CSS custom properties.](https://codyhouse.co/blog/post/css-custom-properties-vs-sass-variables) 
* [A practical guide to CSS custom variables](https://www.sitepoint.com/practical-guide-css-variables-custom-properties/)
* [Using CSS custom properties to define responsive breakpoints](https://css-tricks.com/responsive-designs-and-css-custom-properties-defining-variables-and-breakpoints/)

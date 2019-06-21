

let clicker = document.getElementById('click');

clicker.addEventListener('click', (e) => {

    // Get a value defined in :root
    let styles = window.getComputedStyle(document.documentElement);
    let defaultColor = styles.getPropertyValue('--bg-default-color');
    console.log(defaultColor);

    let newColor = styles.getPropertyValue('--bg-new-color');
    console.log(newColor);

    // Set a root property.
    document.documentElement.style.setProperty('--bg-default-color', newColor);            


    // Work on locally-declared properties.

    // Be sure to use the exact selector used to define the property.
    let ele = document.querySelector('div.test');
    // Get a local property.
    color = getComputedStyle(ele).getPropertyValue('--bg-color');
    // Set a local property. 
    ele.style.setProperty('--bg-color', newColor);
})

function rightJustifyElement() {
    let right = window.innerWidth; // - sel.width - 10 + 'px'                 ;
    console.log(right);
    const ele = document.querySelector('div.test-right');
    const location = elementLocation(ele);

    document.documentElement.style.setProperty('--right', (right - location.width) + 'px');  
}

window.addEventListener('resize', function() {
    rightJustifyElement();    
});            

rightJustifyElement();


function elementLocation(el) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }

    if (!el) {
        throw new Error('Element not found.');
    }

    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset ||
                 document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset ||
                document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        width: el.offsetWidth,
        height: el.offsetHeight
    };
}
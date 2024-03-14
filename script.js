const hoverElements = document.querySelectorAll('.hover')
const hoverBox = document.getElementById('hover-box')
const statBox = document.getElementById('stat-display')
var left
var width
var firstEnter = true;

// hoverElements.forEach(element => {
//     element.addEventListener('mouseover', event => {
//         // `event.currentTarget` refers to the element to which the event handler has been attached, 
//         // as opposed to `event.target`, which is the element that triggered the event.
//         // console.log(event.target)
//         left = event.currentTarget.offsetLeft
//         width = event.currentTarget.offsetWidth
//         hoverBox.style.opacity = 1
//         hoverBox.style.left = left + 'px'
//         hoverBox.style.width = width + 'px'
//     })
// })

// `mouseover` and `mousout` do not stop at the element boundary; instead, they bubble up through the DOM.
// This means that the event will not only be triggered when hovering over (or moving mouse out) that exact element but also when hovering over (or moving mouse out) any of its child element
// Instead, we use `mouseenter` and `mouseleave`, which do not bubble, and are only triggered when hovering over (or moving mouse out) the element to which the event is bound
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', event => {
        left = event.target.offsetLeft
        width = event.target.offsetWidth
        hoverBox.style.opacity = 1
        hoverBox.style.left = left + 'px'
        hoverBox.style.width = width + 'px'
        
        // Check if not the first time enter after mouse leaving 
        if (!firstEnter) {
            hoverBox.style.transition = 'left 0.3s ease-in-out, width 0.3s ease-in-out' // If not the first time, add the transition again after removing it at the event mouseleave
        } else {
            firstEnter = false // If the first time, set firstEnter to false
            hoverBox.style.transition = 'opacity 0.2s ease-in-out' // Make the hover smooth (first time enter)
        }
    })
})

statBox.addEventListener('mouseleave', () => {
    hoverBox.style.opacity = 0
    hoverBox.style.transition = 'unset'
    // Remove the transition so that when the mouse leave the statBox at element A, when hover again, it won't show the effect that the hoverBox move from element A
    // to element B. Instead, the hoverBox just appear at element B.
    firstEnter = true;
})
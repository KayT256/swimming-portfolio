const hoverElements = document.querySelectorAll('.hover')
const hoverBox = document.getElementById('hover-box')
const statBox = document.getElementById('stat-display')
const libraryBox = document.getElementById('library')
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
        // moveHoverBox(event)
        if (document.getElementsByTagName('body')[0].offsetWidth > 900) {
            showInformation(event.target.getAttribute('id'))
            libraryBox.style.opacity = 0
        }
        // If putting moveHoverBox(event) before the conditional (if), it will move the hoverBox first,
        // but hasn't put the transition effect.
        // Therefore, by putting moveHoverBox(event) like this, both (width, left) and transition will be added to the style at the same time
        moveHoverBox(event)
        // Check if not the first time enter after mouse leaving 
        if (!firstEnter) {
            hoverBox.style.transition = 'left 0.3s ease-in-out, width 0.3s ease-in-out' // If not the first time, add the transition again after removing it at the event mouseleave
        } else {
            firstEnter = false // If the first time, set firstEnter to false
            hoverBox.style.transition = 'opacity 0.2s ease-in-out' // Make the hover smooth (first time enter)
        }
    })

    element.addEventListener('mouseleave', event => {
        if (document.getElementsByTagName('body')[0].offsetWidth > 900) {
            hideInformation(event.target.getAttribute('id'))
            libraryBox.style.opacity = 1
        }
    })
})

statBox.addEventListener('mouseleave', () => {
    hoverBox.style.opacity = 0
    hoverBox.style.transition = 'opacity 0.2s ease-in-out'
    // Remove the transition so that when the mouse leave the statBox at element A, when hover again, it won't show the effect that the hoverBox move from element A
    // to element B. Instead, the hoverBox just appear at element B.
    firstEnter = true;
})

// Check if screen width is smaller than 900px initially
if (window.matchMedia("(max-width: 900px)").matches) {
    removeSectionTransition();
} else {
    addSectionTransition();
}

// Add an event listener to check for changes in screen width
window.addEventListener("resize", function() {
    if (window.matchMedia("(max-width: 900px)").matches) {
        removeSectionTransition();
    } else {
        addSectionTransition();
    }
});

function moveHoverBox(event) {
    const left = event.target.offsetLeft
    const width = event.target.offsetWidth
    hoverBox.style.opacity = 1
    hoverBox.style.left = left + 'px'
    hoverBox.style.width = width + 'px'
}

function showInformation(id) {
    element = document.getElementById(id + '-show')
    element.style.opacity = 1
}

function hideInformation(id) {
    element = document.getElementById(id + '-show')
    element.style.opacity = 0
}

function addSectionTransition() {
    document.querySelectorAll('#information section').forEach(section => {
        section.style.transition = 'opacity 0.5s ease-in-out'
    })
}

function removeSectionTransition() {
    document.querySelectorAll('#information section').forEach(section => {
        section.style.transition = 'none'
    })
}

// Change the photos when click #next or #back
document.addEventListener("DOMContentLoaded", () => {
    var photos = document.querySelectorAll(".photo");
    var currentIndex = 0;
  
    function changePhoto(index) {
        photos.forEach((photo, i) => {
            if (i === index) {
                photo.classList.add("active");
            } else {
                photo.classList.remove("active");
            }
        });
    }
  
    document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % photos.length;
        changePhoto(currentIndex);
    });
  
    document.getElementById("back").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        changePhoto(currentIndex);
    });

})
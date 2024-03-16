
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
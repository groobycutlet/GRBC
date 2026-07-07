/*===============================================================
    G.R.B.C. Armory Lightbox
================================================================*/

let galleryImages = [];
let currentImage = 0;

function openGallery(images, index = 0) {

    galleryImages = images;
    currentImage = index;

    document.getElementById("lightbox").style.display = "flex";

    updateGalleryImage();
}

function openLightbox(src) {

    openGallery([src], 0);

}

function updateGalleryImage() {

    document.getElementById("lightbox-img").src =
        galleryImages[currentImage];

    const buttons =
        document.querySelectorAll("#lightbox .lb-btn");

    if (galleryImages.length <= 1) {

        buttons.forEach(btn => btn.style.display = "none");

    } else {

        buttons.forEach(btn => btn.style.display = "block");

    }
}

function nextImage(event) {

    event.stopPropagation();

    currentImage++;

    if (currentImage >= galleryImages.length)
        currentImage = 0;

    updateGalleryImage();
}

function prevImage(event) {

    event.stopPropagation();

    currentImage--;

    if (currentImage < 0)
        currentImage = galleryImages.length - 1;

    updateGalleryImage();
}

function closeLightbox() {

    document.getElementById("lightbox").style.display = "none";

}

document.addEventListener("keydown", function (event) {

    if (document.getElementById("lightbox").style.display !== "flex")
        return;

    if (event.key === "ArrowRight")
        nextImage({ stopPropagation() {} });

    if (event.key === "ArrowLeft")
        prevImage({ stopPropagation() {} });

    if (event.key === "Escape")
        closeLightbox();
});

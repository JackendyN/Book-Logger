"use strict";
const imageInput = document.getElementById("cover");
imageInput.addEventListener("change", () => {
    const imageFile = imageInput.files?.[0];
    if (!imageFile)
        return;
    if (!imageFile.type.startsWith("image/")) {
        imageInput.value = "";
        alert("Please select an image.");
        return;
    }
    const imagePreview = document.getElementById("cover-preview");
    if (!imagePreview)
        return;
    imagePreview.src = URL.createObjectURL(imageFile);
});
document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "home.html";
});

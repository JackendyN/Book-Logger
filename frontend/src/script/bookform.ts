const imageInput = document.getElementById("cover") as HTMLInputElement;
imageInput.addEventListener("change", () => {
    const imageFile = imageInput.files?.[0];
    if(!imageFile) return;
    if(!imageFile.type.startsWith("image/")) {
        imageInput.value = "";
        alert("Please select an image.");
        return;
    }

    const imagePreview = document.getElementById("cover-preview") as HTMLImageElement;
    if(!imagePreview) return;
    imagePreview.src = URL.createObjectURL(imageFile);
    
});

document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "home.html"
});
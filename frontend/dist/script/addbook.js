"use strict";
document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "home.html";
});
const hideInputs = (elements) => {
    elements.forEach((element) => {
        element.hidden = true;
        element.setAttribute("aria-hidden", "true");
        const nextInput = element.querySelector("input");
        if (nextInput) {
            nextInput.disabled = true;
        }
    });
};
const showInputs = (elements) => {
    elements.forEach((element) => {
        element.hidden = false;
        element.setAttribute("aria-hidden", "false");
        const nextInput = element.querySelector("input");
        if (nextInput) {
            nextInput.disabled = false;
        }
    });
};
const obtainSelect = document.getElementById("obtain-select");
const borrowedValues = document.getElementById("borrowed-values");
const boughtValues = document.getElementById("bought-values");
obtainSelect.addEventListener("change", () => {
    if (!borrowedValues || !boughtValues)
        return;
    const borrowElements = borrowedValues.querySelectorAll("label");
    const boughtElements = boughtValues.querySelectorAll("label");
    if (obtainSelect.value === "bought") {
        borrowedValues.setAttribute("aria-hidden", "true");
        boughtValues.setAttribute("aria-hidden", "false");
        hideInputs(Array.from(borrowElements));
        showInputs(Array.from(boughtElements));
    }
    else if (obtainSelect.value === "borrowed") {
        borrowedValues.setAttribute("aria-hidden", "false");
        boughtValues.setAttribute("aria-hidden", "true");
        hideInputs(Array.from(boughtElements));
        showInputs(Array.from(borrowElements));
    }
});
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

// Shared behavior between books.html and wishlist.html
document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "home.html";
});
const showFilterMenu = (elementId) => {
    document.getElementById(elementId)?.classList.toggle("active");
};
const menuButtons = {
    "filter-button": "filter-menu",
    "date-button": "date-submenu",
    "obtained-button": "obtain-submenu",
    "author-button": "author-submenu",
    "order-button": "set-order-form"
};
Object.entries(menuButtons).forEach(([buttonId, menuId]) => {
    document.getElementById(buttonId)?.addEventListener("click", () => {
        showFilterMenu(menuId);
    });
});
export const changeResetVisibility = (status) => {
    const filterResetButton = document.getElementById("reset-filters");
    if (!filterResetButton)
        return;
    if (status === "show") {
        filterResetButton.setAttribute("aria-hidden", "false");
        filterResetButton.style.display = "block";
    }
    else {
        filterResetButton.setAttribute("aria-hidden", "true");
        filterResetButton.style.display = "none";
    }
};

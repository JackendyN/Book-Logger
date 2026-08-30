// Shared behavior between books.html and wishlist.html

document.getElementById("back")?.addEventListener("click", () => {
    window.location.href = "home.html"
});

const showFilterMenu = (elementId: string) => {
    document.getElementById(elementId)?.classList.toggle("active");
};

const menuButtons: Record<string, string> = {
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

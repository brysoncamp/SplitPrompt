const currentTheme = document.documentElement.dataset.theme;
const newTheme = currentTheme === "light" ? "dark" : "light";
const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");

colorPreference.addEventListener("change", (event) => {
    const preferredTheme = event.matches ? "dark" : "light";
    document.documentElement.dataset.theme = preferredTheme;
    localStorage.removeItem("theme");
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
});
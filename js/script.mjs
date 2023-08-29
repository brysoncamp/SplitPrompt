const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");

colorPreference.addEventListener("change", (event) => {
  const theme = event.matches ? "dark" : "light";
  console.log(theme);
  document.documentElement.dataset.theme = theme;
  localStorage.removeItem("theme");
});

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
});


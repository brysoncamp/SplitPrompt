const currentTheme = document.documentElement.dataset.theme;
const newTheme = currentTheme === "light" ? "dark" : "light";
console.log(newTheme);

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

const { encode, decode } = GPTTokenizer_cl100k_base;

const textArea = document.getElementById('textArea');

// Helper function to save the current selection range
function saveSelection() {
  const sel = window.getSelection();
  if (sel.rangeCount > 0) {
      return sel.getRangeAt(0);
  }
  return null;
}
function restoreSelection(range) {
  if (range && document.contains(range.startContainer) && document.contains(range.endContainer)) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  }
}

textArea.addEventListener('input', function() {
  // Save the current selection range
  const savedRange = saveSelection();

  const text = textArea.innerText;
  const encodedTokens = encode(text);

  document.querySelector("#count").innerText = encodedTokens.length;
  /*
  var renderedContent = "";
  encodedTokens.forEach((token, index) => {
      const decodedToken = decode([token]);
      if (index % 2 === 1) { // for every second token
          renderedContent += `<span class="p2">${decodedToken}</span>`;
      } else {
          renderedContent += decodedToken;
      }
  });

  textArea.innerHTML = renderedContent;

  // Restore the saved selection range after a short delay
  setTimeout(() => {
      textArea.focus();
      restoreSelection(savedRange);
  }, 0);*/
});
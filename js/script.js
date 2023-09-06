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

const { encode, decode } = GPTTokenizer_p50k_base; // GPTTokenizer_p50k_base or GPTTokenizer_cl100k_base

const textArea = document.getElementById('textArea');
const clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', function() {
  textArea.value = "";
  clearButton.style.display = "none";
  tokenCount.innerHTML = "0&nbsp;TOKENS";
});``

const tokenCount = document.getElementById("tokenCount");

textArea.addEventListener('input', function() {
  const text = textArea.value;
  const encodedTokens = encode(text);
  const chunkSize = chunkInput.value;
  tokenCount.innerHTML = encodedTokens.length + "&nbsp;TOKENS";
  if (text != "") {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }

  console.log(chunkInput);
  console.log(chunkSize);
  console.log(encodedTokens.length);
  
  if (chunkSize != 0 && encodedTokens.length > chunkSize) {
    console.log("can split");
  }
});

textArea.addEventListener('focus', function() {
  this.parentElement.classList.add('focused');
});

textArea.addEventListener('blur', function() {
  this.parentElement.classList.remove('focused');
});


// Get all prompt options
const prompts = document.querySelectorAll('.prompt-option-unselected, .prompt-option-selected');
const promptContainer = document.querySelector('.prompt-selection');

// Add click event to each prompt option
prompts.forEach((prompt, index) => {
    prompt.addEventListener('click', function() {
        // Find the current selected option and set its class to unselected
        const currentSelected = document.querySelector('.prompt-option-selected');
        if (currentSelected) {
            currentSelected.className = 'prompt-option-unselected';
        }

        // Set the clicked option's class to selected
        this.className = 'prompt-option-selected';

        // Check for edge cases
        const rect = this.getBoundingClientRect();
        const containerRect = promptContainer.getBoundingClientRect();

        // Check if left neighbor is out of view
        if (index > 0) {
            const leftNeighbor = prompts[index - 1].getBoundingClientRect();
            if (leftNeighbor.left < containerRect.left) {
                promptContainer.scrollLeft -= (containerRect.left - leftNeighbor.left + 26); // +10 for a little margin
            }
        }

        // Check if right neighbor is out of view
        if (index < prompts.length - 1) {
            const rightNeighbor = prompts[index + 1].getBoundingClientRect();
            if (rightNeighbor.right > containerRect.right) {
                promptContainer.scrollLeft += (rightNeighbor.right - containerRect.right + 26); // +10 for a little margin
            }
        }
    });
});


if (!('ontouchstart' in window)) {
  promptContainer.addEventListener('wheel', function(event) {
      this.scrollLeft += event.deltaY;
      event.preventDefault();
  }, { passive: false });
}






/*
// Check if the browser supports a particular pseudo-element
function supportsPseudoElement(pseudoEl) {
  const rule = `@supports (${pseudoEl}) { #supports-pseudo-element-check { position: absolute; } }`;
  const style = document.createElement('style');
  style.innerHTML = rule;
  document.head.appendChild(style);
  const supports = !!window.getComputedStyle(document.querySelector('#supports-pseudo-element-check')).position;
  document.head.removeChild(style);
  return supports;
}

// Check if browser supports ::-webkit-scrollbar and add class if true
if (supportsPseudoElement('::-webkit-scrollbar')) {
  textArea  .classList.add('webkit-scrollbar');
}*/
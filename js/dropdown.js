const selectedOption = document.getElementById("selected-option");
const unselectedOption = document.getElementById("unselected-option");
const savedOption = localStorage.getItem("savedOption");
const otherOption = localStorage.getItem("otherOption");
const chunkInput = document.getElementById("chunkInput");
const customChunk = localStorage.getItem("customChunk");

if (savedOption) {
    selectedOption.innerText = savedOption;
    unselectedOption.innerText = otherOption;
}

if (!customChunk) {
    localStorage.setItem("customChunk", 2048);
}

selectedOption.addEventListener("click", function(event) {
    if (unselectedOption.style.display !== "block") {
        unselectedOption.style.display = "block";
        event.stopPropagation();
    } 
});

unselectedOption.addEventListener("click", function(event) {
    localStorage.setItem("savedOption", unselectedOption.innerText);
    localStorage.setItem("otherOption", selectedOption.innerText);
    selectedOption.innerText = localStorage.getItem("savedOption");
    unselectedOption.innerText = localStorage.getItem("otherOption");
    if (selectedOption.innerText === "GPT-3.5/4") {
        chunkInput.value = 4096;
    } else {
        chunkInput.value = localStorage.getItem("customChunk");
    }
});

document.addEventListener("click", function() {
    unselectedOption.style.display = "none";
});

chunkInput.addEventListener("input", function() {
    if (chunkInput.value !== 4096) {
        localStorage.setItem("savedOption", "CUSTOM");
        localStorage.setItem("otherOption", "GPT-3.5/4");
        selectedOption.innerText = "CUSTOM";
        unselectedOption.innerText = "GPT-3.5/4";
        localStorage.setItem("customChunk", chunkInput.value.replace(/^0+/, ''));
    } else {
        localStorage.setItem("savedOption", "GPT-3.5/4");
        localStorage.setItem("otherOption", "CUSTOM");
        selectedOption.innerText = "GPT-3.5/4";
        unselectedOption.innerText = "CUSTOM";
    }
});


chunkInput.addEventListener("blur", function() {
    if (chunkInput.value === "") {
        localStorage.setItem("savedOption", "GPT-3.5/4");
        localStorage.setItem("otherOption", "CUSTOM");
        selectedOption.innerText = "GPT-3.5/4";
        unselectedOption.innerText = "CUSTOM";
        chunkInput.value = "4096";
        localStorage.setItem("customChunk", 2048);
    }
});


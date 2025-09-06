// Insert current year dynamically
document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Insert last modified date dynamically
document.querySelector("#lastModified").textContent = "Last Modified: " + document.lastModified;

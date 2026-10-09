// Get HTML elements
const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const imagePreview = document.getElementById("imagePreview");
const previewContainer = document.getElementById("previewContainer");
const errorMessage = document.getElementById("errorMessage");

// Allowed image types
const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif"
];


// When user selects a file using Browse Files
fileInput.addEventListener("change", function () {

    const file = fileInput.files[0];

    if (file) {
        handleFile(file);
    }

});


// Handle the selected file
function handleFile(file) {

    // Clear previous error
    errorMessage.textContent = "";

    // Check file type
    if (!allowedTypes.includes(file.type)) {

        errorMessage.textContent =
            "Invalid file! Please select a JPG, PNG or GIF image.";

        previewContainer.style.display = "none";

        return;
    }


    // File is valid
    const reader = new FileReader();


    // When FileReader finishes reading the image
   reader.onload = function (event) {

    const imageData = event.target.result;

    imagePreview.src = imageData;

    previewContainer.style.display = "block";

    // Save image to localStorage
    localStorage.setItem("uploadedImage", imageData);

    // Start progress simulation
    startProgress();

};


    // Read image as Data URL
    reader.readAsDataURL(file);
}
// Drag over the drop area
dropArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    dropArea.classList.add("drag-over");

});


// When the file leaves the drop area
dropArea.addEventListener("dragleave", function () {

    dropArea.classList.remove("drag-over");

});


// When the file is dropped
dropArea.addEventListener("drop", function (event) {

    event.preventDefault();

    dropArea.classList.remove("drag-over");

    const file = event.dataTransfer.files[0];

    if (file) {
        handleFile(file);
    }

});
// Simulate upload progress
function startProgress() {

    let progress = 0;

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    // Reset progress
    progressBar.style.width = "0%";
    progressText.textContent = "0%";

    const interval = setInterval(function () {

        progress += 10;

        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";

        // Stop when progress reaches 100%
        if (progress >= 100) {

            clearInterval(interval);

        }

    }, 300);
}
// Load saved image when page opens
window.addEventListener("load", function () {

    const savedImage = localStorage.getItem("uploadedImage");

    if (savedImage) {

        imagePreview.src = savedImage;

        previewContainer.style.display = "block";

    }

});
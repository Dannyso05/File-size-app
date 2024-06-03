document.getElementById('inputImage').addEventListener('change', handleImage);

let originalImage = null;
let compressedImage = null;
let decompressedImage = null;

function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage = e.target.result;
            document.getElementById('originalImage').src = originalImage;
            document.getElementById('originalSize').textContent = `Size: ${file.size} bytes`;
        }
        reader.readAsDataURL(file);
    }
}

function compressImage() {
    if (!originalImage) return;

    const img = new Image();
    img.src = originalImage;
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scale = 0.5; // Compression scale (50%)
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        compressedImage = canvas.toDataURL('image/jpeg', 0.5); // Compress to JPEG with 50% quality
        document.getElementById('compressedImage').src = compressedImage;
        size_in_bytes = window.atob(compressedImage.split(",")[1]).length;
        document.getElementById('compressedSize').textContent = `Size: ${size_in_bytes} bytes`;
    }
}

function decompressImage() {
    if (!compressedImage) return;
    const img = new Image();
    img.src = compressedImage;
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width * 2; // Decompress back to original scale
        canvas.height = img.height * 2;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        decompressedImage = canvas.toDataURL('image/jpeg', 1.0); // Decompress to JPEG with 100% quality
        document.getElementById('decompressedImage').src = decompressedImage;
        document.getElementById('decompressedSize').textContent = `Size: ${size_in_bytes} bytes`;
        }
}
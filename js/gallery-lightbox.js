// --- Calcul couleur moyenne dominante de l'image ---
function getDominantColor(img, callback) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  callback(`rgb(${Math.round(r/count)}, ${Math.round(g/count)}, ${Math.round(b/count)})`);
}

// --- Applique la couleur au fond derrière l'image ---
function updateLightboxBg() {
  const img = document.getElementById('lightbox-img');
  const container = document.querySelector('.lightbox-media');

  if (!img || img.style.display !== 'block') return;

  getDominantColor(img, (color) => {
    container.style.background = color;
  });
}

// --- Hook sur l'image lightbox pour recalculer la couleur ---
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.addEventListener("load", () => {
      setTimeout(updateLightboxBg, 50);
    });
  }





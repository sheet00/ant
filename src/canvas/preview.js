import { getScene, STAGES } from './scenes/index.js';

const grid = document.getElementById('grid');

STAGES.forEach((stageName, idx) => {
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.textContent = `Lv.${idx + 1}: ${stageName}`;
  card.appendChild(title);

  const canvas = document.createElement('canvas');
  // プレビュー用に固定サイズ
  const w = 400;
  const h = 300;
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = '400px';
  canvas.style.height = '300px';
  canvas.style.imageRendering = 'pixelated';
  
  card.appendChild(canvas);
  grid.appendChild(card);

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const PIXEL = 2; // プレビューでの1ピクセルのサイズ
  const pw = Math.floor(w / PIXEL);
  const ph = Math.floor(h / PIXEL);

  const sceneFn = getScene(stageName);
  sceneFn(ctx, pw, ph, PIXEL);
});

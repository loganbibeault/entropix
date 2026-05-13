
// =====================================================
// GLOBAL STATE — MENU
// =====================================================

let appState = 'boot'; // 'boot' | title' | 'options' | 'fading' | 'editor'
let titleFade = 0;
let titleScreenImg = null; // holds the loaded image before committing it


let optionsParticles = 400;
const OPTIONS_PARTICLES_MIN = 1;
const OPTIONS_PARTICLES_MAX = 2500;
let optionsSliderDragging = false;

let lastOptionsParticleCount = -1;

let optionsMenuScale = 1;

let layoutSliderY = 0; // fixed Y position for slider and everything below
// =====================================================
// GLOBAL STATE — SIDEBAR DIMENSIONS
// =====================================================
let hoveringReset;
let hoveringAnyUI = false;
let sevenSegFont;
let dotoFont;
const SIDEBAR_NATURAL_W = 1765;
const SIDEBAR_NATURAL_H = 3275;
// sidebarScale is the single multiplier for ALL positioned elements:
//   screenX = naturalX * sidebarScale
//   screenY = naturalY * sidebarScale
let sidebarDisplayW = 0;
let sidebarScale = 1;
// Helper: convert a natural-space value to screen space
function sx(n) { return n * sidebarScale; }
// =====================================================
// GLOBAL STATE — IMAGE / CANVAS
// =====================================================
let bgColor = [18, 14, 10]; // default near-black matching the UI
let imgOriginal;
let img;
let imageLoaded = false;
let cellSize = 10;
let scaleFactor = 1;
let offsetX = 0;
let offsetY = 0;
let postStatus = '';
let postStatusTimer = 0;
let tintCache = {};
let hoveringParticle = false;
let hoverCheckTimer = 0;
let screenshotMode = false;
let screenshotImgScale = 1;
let cropStart = null;
let cropRect = null;
let screenshotImg = null;

let previewX = 0;
let previewY = 24;
let previewMargin = 32;
let previewW = 0;
let previewH = 0;
// =====================================================
// GLOBAL STATE — UI CONTROL VARIABLES
// =====================================================
let motion = 0.1;
let imgWidth = 20;
let fear = 0;
let boundsOn = false;
let colorLimitOn = true;
let colorCount = 11;
let cursorUsingUI = false;
let colorCountInputOpen = false;
let optionsSwatchX = 0;
let optionsSwatchY = 0;
// =====================================================
// GLOBAL STATE — UI
// =====================================================
let input;
let newBtnImgs = {};
let nbX, nbY, nbW, nbH;
let boundsRects = [];
let boundsDrawStart = null;
let boundsDrawRect = null;
let boundsAnimTimer = 0;
let boundsAnimState = false; // false = black, true = white

// =====================================================
// COLOR PANEL
// =====================================================
const PALETTE_COUNT_NATURAL = { x: 322, y: 2757 }; // adjust to taste
const PALETTE_PAGE_NATURAL  = { x: 676, y: 2893 }; // adjust to taste

let paletteHoldSquare = null;
let paletteHoldTimer = 0;
const PALETTE_HOLD_MS = 1000;

const PAGE_UP_NATURAL   = { x: 677, y: 2800, w: 127, h: 80 };
const PAGE_DOWN_NATURAL = { x: 677, y: 3018, w: 127, h: 80 };
let pageUpImgs = {};
let pageDownImgs = {};
// =====================================================
// ENTROPIX / MAIN PANEL
// =====================================================
let resetImgs = {};
const RESET_BTN = {
  x: 223, y: 1073,
  w: 103, h: 103
};
let thumbImgs = {};
const SLIDER_NATURAL = {
  minX: 520, maxX: 1455, y: 1137,
  w: 145, h: 100
};
let sliderT = 0.08;
let hoveringSlider = false;
let draggingSlider = false;
let sotLightImgs = [];
const SOT_LIGHTS_NATURAL = { x: 450, y: 1200, w: 1072, h: 45 };
const VERSION_STR = "1.01";
const VERSION_NATURAL = { x: 1350, y: 800 };
// =====================================================
// UPLOADER
// =====================================================
let leverImgs = {};
// L-track in natural coords.
// Vertical segment: bottom → top. Horizontal segment: corner → end (left).
const LEVER_NATURAL = {
  bottomX: 537, bottomY: 1890,  // start (default resting position)
  topX:    537, topY:    1745,  // corner of the L
  endX:    350, endY:    1745,  // end of horizontal arm
  w: 96, h: 95                  // sprite size in natural pixels
};
// leverT runs 0→1 along vertical, 1→2 along horizontal
let leverT = 0;
let leverDragging = false;
let leverPosted = false;
let leverSpringTimer = 0;
const LEVER_SPRING_DELAY = 300; // ms before springing back
const LEVER_SPRING_SPEED = 200;  // ms to travel back to 0
let leverVel = 0;
const LEVER_SPRING_STIFFNESS = 0.3;
const LEVER_SPRING_DAMPING = 0.6;
let hoveringLever = false;
let lightState = 'off'; // 'off' | 'yellow' | 'green' | 'red'
let lightTimer = 0;
let lightImgs = {};
const LIGHTS_NATURAL = {
  green:  { x: 110, y: 1715 },
  yellow: { x: 180, y: 1715 },
  red:    { x: 250, y: 1715 },
  w: 60, h: 60
};
let postCooldown = false;
let cooldownStart = 0;
const POST_COOLDOWN_MS = 60000;
let blinkTimer = 0;
const BLINK_INTERVAL = 500;
let greenHoldTimer = 0;
const GREEN_HOLD_MS = 1500;
// =====================================================
// BITS PANEL
// =====================================================
const NEW_BTN_NATURAL = {
  x: 122, y: 2367,   
  w: 207, h: 208
};
let hoveringNewBtn = false;
const BITS_PREVIEW_NATURAL = {
  x: 113, y: 2076,  
  w: 225, h: 225
};
let pieImgs = [];
const PIE_NATURAL = { x: 431, y: 2258, w: 122, h: 122 }; 
let tankImg;
const TANK_NATURAL = { x: 609, y: 2225, w: 137, h: 191 }; 
const TANK_FILL_NATURAL = { x: 23, y: 30, w: -50, h: -60 };
// =====================================================
// GLOBAL STATE — TOOLS
// =====================================================
const TOOLS = [
  { name: 'bounds',  w: 94,  h: 91  },
  { name: 'magnet',  w: 98,  h: 98  },
  { name: 'repulse', w: 98,  h: 99  },
  { name: 'grab',    w: 92,  h: 99  },
  { name: 'vacuum',  w: 117, h: 84  },
  { name: 'spawn',   w: 117, h: 100 },
  { name: 'recolor', w: 99,  h: 97  },
];
let selectedTool = 'grab';
let toolImgs = {};
// positions to fill in once you have your sidebar coords
const TOOL_ICONS_NATURAL = [
  { x: 870, y: 1780 },
  { x: 900, y: 1640 },
  { x: 990, y: 1540 },
  { x: 1130, y: 1510 },
  { x: 1270, y: 1540 },
  { x: 1380, y: 1640 },
  { x: 1410, y: 1780 },
];
let dialImgs = [];
let dialDragging = false;
let dialDragStartX = 0;
let dialDragToolStart = 0;
const DIAL_NATURAL = { x: 1060, y: 1710, w: 250, h: 250 }; 
let strengthDragging = false;
let strengthDragStartX = 0;
let strengthDragStartVal = 0;
let sdX, sdY;
const TOOL_STRENGTHS = {
  bounds:  { value: 0,   min: 0, max: 0,   step: 1 }, // controlled by bounds count
  magnet:  { value: 5,   min: 1, max: 10,   step: 1 },
  repulse: { value: 5,   min: 1, max: 10,   step: 1 },
  grab:    { value: null                              }, // no strength
  vacuum:  { value: 3,   min: 1, max: 20,   step: 1 },
  spawn:   { value: 1,   min: 1, max: 20,   step: 1 },
  recolor: { value: 2,   min: 1, max: 10,   step: 1 },
};
const STRENGTH_DISPLAY_NATURAL = { x: 1000, y: 1900 }; // adjust
const LEFT_ARROW_NATURAL  = { x: 1000, y: 2218, w: 77, h: 125 }; // adjust
const RIGHT_ARROW_NATURAL = { x: 1297, y: 2218, w: 77, h: 125 };
let arrowImgs = {};
function leftArrowDisabled() {
  let tool = TOOL_STRENGTHS[selectedTool];
  if (!tool || tool.value === null) return true;
  if (selectedTool === 'bounds') return boundsRects.length === 0;
  return tool.value <= tool.min;
}
function rightArrowDisabled() {
  let tool = TOOL_STRENGTHS[selectedTool];
  if (!tool || tool.value === null) return true;
  if (selectedTool === 'bounds') return true;
  return tool.value >= tool.max;
}
let arrowHoldTimer = 0;
let arrowHoldActive = null; // 'left' or 'right'
const ARROW_HOLD_DELAY = 500;  // ms before rapid fire starts
const ARROW_HOLD_INTERVAL = 80; // ms between each step during rapid fire
let arrowHoldIntervalTimer = 0;
const TANK_DISPLAY_NATURAL = { x: 456, y: 2470 }; // ← adjust to your layout


let recolorCol = null;      // [r,g,b] or null if none selected
let recolorPaletteIndex = -1; // palette index of selected color, -1 for bg
// =====================================================
// GLOBAL STATE — PARTICLES
// =====================================================
let particles = [];
let draggedParticle = null;
let dragRadiusFactor = 1.2;
let tankCount = 0;
let dustParticles = [];
const VACUUM_RADIUS = 80;
let tankQueue = []; // ordered list of colors waiting to be spawned
let spawnTimer = 0;
const SPAWN_INTERVAL = 10; // ms between placements, will scale with strength later
let tankDisplayCol = [255, 255, 255];
// =====================================================
// GLOBAL STATE — ANIMATION
// =====================================================
let idleFrames = [];
let walkFrames = [];
let titleFrames = [];
let dustFrames = [];
let stage1Frames = [];
let stage2Frames = [];
let dust1Frames = [];
let dust2Frames = [];
const numIdle = 8;
const numWalk = 5;
const frameRateAnim = 8;
const minWalkTime = 0.2;
let idleFrameGlobal = 0;
let walkFrameGlobal = 0;
let idleTimer = 0;
let walkTimer = 0;
let titleFrame = 0;
// =====================================================
// GLOBAL STATE — ASSETS
// =====================================================
let sidebarImg;
let grabSprite;
let logoImg;
// =====================================================
// GLOBAL STATE — PALETTE SYSTEM
// =====================================================
let palette = [];
let paletteSquares = [];
let selectedSquare = null;
// =====================================================
// PRELOAD
// =====================================================
function preload() {
  logoImg = loadImage("assets/title/logo.png");
  tankImg = loadImage("assets/sidebar/bits/tank.png");
  sidebarImg = loadImage("assets/sidebar/base.png");
  grabSprite = loadImage("assets/bit/grab.png");
  for (let i = 0; i < numIdle; i++) {
    idleFrames.push(loadImage("assets/bit/idle/idle" + i + ".png"));
  }
  for (let i = 0; i < numWalk; i++) {
    walkFrames.push(loadImage("assets/bit/walk/walk" + i + ".png"));
  }
  
  for (let i = 0; i < 8; i++) {
  dustFrames.push(loadImage(`assets/bit/dust/dust_${i}.png`));
  }
  
  for (let i = 0; i < 8; i++) {
  stage1Frames.push(loadImage(`assets/bit/stage1/stage1_${i}.png`));
  stage2Frames.push(loadImage(`assets/bit/stage2/stage2_${i}.png`));
}
  for (let i = 0; i < 2; i++) {
  dust1Frames.push(loadImage(`assets/bit/stage1/dust/dust_${i}.png`));
}
for (let i = 0; i < 4; i++) {
  dust2Frames.push(loadImage(`assets/bit/stage2/dust/dust_${i}.png`));
}
  
  
  // UI assets
  resetImgs.default = loadImage("assets/sidebar/entropix/reset/default.png");
  resetImgs.hover   = loadImage("assets/sidebar/entropix/reset/hover.png");
  resetImgs.press   = loadImage("assets/sidebar/entropix/reset/press.png");
  thumbImgs.default = loadImage("assets/sidebar/entropix/thumb/default.png");
  thumbImgs.hover   = loadImage("assets/sidebar/entropix/thumb/hover.png");
  thumbImgs.press   = loadImage("assets/sidebar/entropix/thumb/press.png");
  for (let i = 0; i < 8; i++) {
    sotLightImgs.push(loadImage("assets/sidebar/entropix/scale_of_time/" + i + ".png"));
  }
  leverImgs.default = loadImage("assets/sidebar/uploader/lever/default.png");
  leverImgs.hover   = loadImage("assets/sidebar/uploader/lever/hover.png");
  leverImgs.press   = loadImage("assets/sidebar/uploader/lever/press.png");
  sevenSegFont = loadFont("assets/fonts/7segment.ttf");
  dotoFont = loadFont("assets/fonts/Doto-Bold.ttf");
  
  for (let color of ['green', 'yellow', 'red']) {
  lightImgs[color] = {
    on:  loadImage(`assets/sidebar/uploader/${color}/on.png`),
    off: loadImage(`assets/sidebar/uploader/${color}/off.png`)
  };
}
  
  for (let tool of TOOLS) {
  toolImgs[tool.name] = {
    off:   loadImage(`assets/sidebar/tool/display/${tool.name}/off.png`),
    hover: loadImage(`assets/sidebar/tool/display/${tool.name}/hover.png`),
    on:    loadImage(`assets/sidebar/tool/display/${tool.name}/on.png`),
  };
}
  
  for (let i = 1; i <= 7; i++) {
  dialImgs.push(loadImage(`assets/sidebar/tool/dial/${i}.png`));
}
  
  arrowImgs.left  = { default: loadImage('assets/sidebar/tool/left_arrow/default.png'),
                    hover:   loadImage('assets/sidebar/tool/left_arrow/hover.png'),
                    press:   loadImage('assets/sidebar/tool/left_arrow/press.png') };
arrowImgs.right = { default: loadImage('assets/sidebar/tool/right_arrow/default.png'),
                    hover:   loadImage('assets/sidebar/tool/right_arrow/hover.png'),
                    press:   loadImage('assets/sidebar/tool/right_arrow/press.png') };
  
  newBtnImgs.default = loadImage("assets/sidebar/bits/new/default.png");
newBtnImgs.hover   = loadImage("assets/sidebar/bits/new/hover.png");
newBtnImgs.press   = loadImage("assets/sidebar/bits/new/press.png");
  for (let i = 0; i <= 8; i++) {
  pieImgs.push(loadImage(`assets/sidebar/bits/pie/${i}.png`));
}
  
  pageUpImgs.default   = loadImage('assets/sidebar/color/page_up/default.png');
pageUpImgs.hover     = loadImage('assets/sidebar/color/page_up/hover.png');
pageUpImgs.press     = loadImage('assets/sidebar/color/page_up/press.png');
pageDownImgs.default = loadImage('assets/sidebar/color/page_down/default.png');
pageDownImgs.hover   = loadImage('assets/sidebar/color/page_down/hover.png');
pageDownImgs.press   = loadImage('assets/sidebar/color/page_down/press.png');
  
}
  function getToolIndex() {
  return TOOLS.findIndex(t => t.name === selectedTool);
}
// =====================================================
// SETUP
// =====================================================


function setup() {

  

  appState = 'boot';

  cnv = createCanvas(windowWidth, windowHeight);
  cnv.elt.addEventListener('contextmenu', e => e.preventDefault());
  cnv.drop(handleFile);
  noSmooth();

  sidebarScale = height / SIDEBAR_NATURAL_H;
  sidebarDisplayW = SIDEBAR_NATURAL_W * sidebarScale;

  // post cooldown
  const lastPost = localStorage.getItem('last_post_time');
  if (lastPost) {
    const elapsed = Date.now() - parseInt(lastPost);
    if (elapsed < POST_COOLDOWN_MS) {
      postCooldown = true;
      cooldownStart = millis() - elapsed;
      lightState = 'yellow';
    }
  }

  input = createFileInput(handleFile);
  input.hide();
  input.attribute('accept', 'image/*');

  // Defer initializeApp so width/height are fully settled
setTimeout(initializeApp, 0);
}


function initializeApp() {
  console.log('initializeApp called');
  console.log('URL:', window.location.href);
  console.log('sessionStorage pendingGalleryPost:', sessionStorage.getItem('pendingGalleryPost'));
  if (window._galleryPost) {
    const post = window._galleryPost;
    window._galleryPost = null;
    appState = 'pendingGallery';
    window._pendingPost = post;
    return;
  }
  appState = 'title';
}
// =====================================================
// RESIZE
// =====================================================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sidebarScale = height / SIDEBAR_NATURAL_H;
  sidebarDisplayW = SIDEBAR_NATURAL_W * sidebarScale;
  centerGrid();
  if (appState === 'options') updateOptionsScale();
  if (palette.length) createPaletteSquares(palette);
}
function centerGrid() {
  if (!img) return;
  let gridWidth = img.width * scaleFactor;
  let gridHeight = img.height * scaleFactor;

  if (appState === 'options') {
  computePreviewGeometry();
  offsetX = previewX + previewMargin + scaleFactor / 2;
  offsetY = previewY + previewMargin + scaleFactor / 2;
} else {
    let padding = 20;
    let usableLeft = sidebarDisplayW + padding;
    let usableWidth = width - usableLeft;
    offsetX = usableLeft + (usableWidth - gridWidth) / 2 + scaleFactor / 2;
    offsetY = (height - gridHeight) / 2 + scaleFactor / 2;
  }
}

function updateOptionsScale() {
  computePreviewGeometry();
  layoutSliderY = previewY + previewH + 24; // snapshot at entry time
  let _ctrlY = layoutSliderY + 60;
  let _btnBottom = _ctrlY + 36 + 38 + 50;
  let LAYOUT_H = _btnBottom + 20;
  let LAYOUT_W = min(width * 0.5, 500) + 200;
  optionsMenuScale = min(1, (height - 40) / LAYOUT_H, (width - 40) / LAYOUT_W);
}
// =====================================================
// LEVER HELPERS
// =====================================================
function getLeverPos() {
  let n = LEVER_NATURAL;
  if (leverT <= 1) {
    return {
      x: sx(lerp(n.bottomX, n.topX, leverT)),
      y: sx(lerp(n.bottomY, n.topY, leverT))
    };
  } else {
    let t2 = leverT - 1;
    return {
      x: sx(lerp(n.topX, n.endX, t2)),
      y: sx(lerp(n.topY, n.endY, t2))
    };
  }
}
// =====================================================
// SEVEN SEG TRACKING
// =====================================================
function drawSevenSeg(str, x, y, charW, dotW) {
  let cursor = 0;
  for (let i = 0; i < str.length; i++) {
    let ch = str[i];
    text(ch, x + cursor, y);
    cursor += (ch === '.') ? dotW : charW;
  }
}
// =====================================================
// DRAW LOOP
// =====================================================
function draw() {
  console.log("h");
  if (appState === 'boot') return;

  // Handle gallery post load here, where width/height/sidebarDisplayW are fully ready
  if (appState === 'pendingGallery') {
  const pending = window._pendingPost;
  window._pendingPost = null;
  if (pending) {
    loadPostFromGallery(pending);
  } else {
    appState = 'title';
  }
  return;
}

  background(bgColor[0], bgColor[1], bgColor[2]);
  image(sidebarImg, 0, 0, sidebarDisplayW, height);
  if (appState === 'editor' || appState === 'fading') drawEditor();
  if (appState === 'title' || appState === 'options' || appState === 'fading') drawTitleOverlay();
}
// =====================================================
// EDITOR DRAW
// =====================================================
function drawEditor() {
    // Sidebar
  image(sidebarImg, 0, 0, sidebarDisplayW, height);
  
  // ----- ENTROPIX PANEL -----
  // Reset button — compute hover
  let rbX = sx(RESET_BTN.x), rbY = sx(RESET_BTN.y);
  let rbW = sx(RESET_BTN.w), rbH = sx(RESET_BTN.h);
  hoveringReset = mouseX > rbX && mouseX < rbX + rbW &&
                  mouseY > rbY && mouseY < rbY + rbH;
  // Scale of time lights
  let sotIndex = floor(sliderT * 7 + 0.5);
  let sotImg = sotLightImgs[sotIndex];
  if (sotImg) {
    image(sotImg,
      sx(SOT_LIGHTS_NATURAL.x), sx(SOT_LIGHTS_NATURAL.y),
      sx(SOT_LIGHTS_NATURAL.w), sx(SOT_LIGHTS_NATURAL.h));
  }
  // Scale of time slider
  let sliderMinX = sx(SLIDER_NATURAL.minX);
  let sliderMaxX = sx(SLIDER_NATURAL.maxX);
  let sliderY    = sx(SLIDER_NATURAL.y);
  let thumbW     = sx(SLIDER_NATURAL.w);
  let thumbH     = sx(SLIDER_NATURAL.h);
  let thumbX     = lerp(sliderMinX, sliderMaxX, sliderT);
  hoveringSlider = mouseX > thumbX - thumbW / 2 && mouseX < thumbX + thumbW / 2 &&
                   mouseY > sliderY - thumbH / 2 && mouseY < sliderY + thumbH / 2;
  if (draggingSlider) {
    sliderT = constrain(map(mouseX, sliderMinX, sliderMaxX, 0, 1), 0, 1);
    motion = sliderT * 5;
    cursorUsingUI = true;
  }
  if (appState === 'options') motion = 0;
  let thumbSprite = (draggingSlider || (mouseIsPressed && hoveringSlider)) ? thumbImgs.press
                  : hoveringSlider ? thumbImgs.hover
                  : thumbImgs.default;
  imageMode(CENTER);
  image(thumbSprite, thumbX, sliderY, thumbW, thumbH);
  imageMode(CORNER);
  // Version display
  push();
textFont(sevenSegFont);
textSize(sx(120));
textAlign(LEFT, TOP);
let charW = sx(70); // tracking
fill(color('#602f08'));
drawSevenSeg("8.88", sx(VERSION_NATURAL.x), sx(VERSION_NATURAL.y), sx(67), sx(10));
fill(color('#ff8a00'));
drawSevenSeg(VERSION_STR, sx(VERSION_NATURAL.x), sx(VERSION_NATURAL.y), sx(67), sx(10));
pop();
  // Reset sprite
  let resetSprite = (mouseIsPressed && hoveringReset) ? resetImgs.press
                  : hoveringReset                     ? resetImgs.hover
                  : resetImgs.default;
  image(resetSprite, rbX, rbY, rbW, rbH);
  // ----- UPLOADER — LEVER -----
  // Spring back after posting
  // replace with this
if (!leverDragging) {
  let force = -LEVER_SPRING_STIFFNESS * leverT;
  leverVel += force;
  leverVel *= LEVER_SPRING_DAMPING;
  leverT += leverVel;
  if (abs(leverT) < 0.001 && abs(leverVel) < 0.001) {
    leverT = 0;
    leverVel = 0;
    leverPosted = false;
  }
}
  // Dragging — project mouse onto L-track
  if (leverDragging) {
    let n = LEVER_NATURAL;
    let cornerY = sx(n.topY);
    if (mouseY < cornerY + sx(20)) {
      // in the horizontal zone — map mouseX to 1→2
      let horizFrac = constrain(map(mouseX, sx(n.topX), sx(n.endX), 0, 1), 0, 1);
      leverT = 1 + horizFrac;
    } else {
      // in the vertical zone — map mouseY to 0→1
      let vertFrac = constrain(map(mouseY, sx(n.bottomY), sx(n.topY), 0, 1), 0, 1);
      leverT = vertFrac;
    }
    // Trigger post the moment it reaches the end
    
  }
  // Lever hover & sprite
  let lPos = getLeverPos();
  let lwW = sx(LEVER_NATURAL.w);
  let lwH = sx(LEVER_NATURAL.h);
  hoveringLever = mouseX > lPos.x - lwW / 2 && mouseX < lPos.x + lwW / 2 &&
                  mouseY > lPos.y - lwH / 2 && mouseY < lPos.y + lwH / 2;
  let leverSprite = leverDragging      ? leverImgs.press
                  : hoveringLever      ? leverImgs.hover
                  : leverImgs.default;
  imageMode(CENTER);
  image(leverSprite, lPos.x, lPos.y, lwW, lwH);
  imageMode(CORNER);
  
  // Uploader lights
  
// draw lights
for (let [color, pos] of Object.entries({ green: LIGHTS_NATURAL.green, yellow: LIGHTS_NATURAL.yellow, red: LIGHTS_NATURAL.red })) {
  let on = lightState === color;
  let img = lightImgs[color][on ? 'on' : 'off'];
  if (img) image(img, sx(pos.x), sx(pos.y), sx(LIGHTS_NATURAL.w), sx(LIGHTS_NATURAL.h));
}
  
  if (postCooldown && lightState !== 'red') {
  blinkTimer += deltaTime;
  if (blinkTimer > BLINK_INTERVAL) {
    blinkTimer = 0;
    lightState = lightState === 'yellow' ? 'off' : 'yellow';
  }
  if (millis() - cooldownStart > POST_COOLDOWN_MS) {
    postCooldown = false;
    lightState = 'off';
  }
}
  if (lightState === 'green') {
  greenHoldTimer += deltaTime;
  if (greenHoldTimer > GREEN_HOLD_MS) {
    greenHoldTimer = 0;
    postCooldown = true;
    cooldownStart = millis();
    lightState = 'yellow';
  }
}
  
if (lightState === 'red' && lightTimer > 0 && millis() - lightTimer > 1500) {
  lightState = postCooldown ? 'yellow' : 'off';
  lightTimer = 0;
}
  
  // ----- TOOL ICONS -----
  
  drawToolIcons()
  
  // ----- DIAL -----
  
  let dialIndex = getToolIndex();
let dialX = sx(DIAL_NATURAL.x);
let dialY = sx(DIAL_NATURAL.y);
let dialW = sx(DIAL_NATURAL.w);
let dialH = sx(DIAL_NATURAL.h);
let hoveringDial = mouseX > dialX && mouseX < dialX + dialW &&
                   mouseY > dialY && mouseY < dialY + dialH;
image(dialImgs[dialIndex], dialX, dialY, dialW, dialH);
  
  // ----- TOOL NAME -----
  
push();
textFont(dotoFont);
textSize(sx(110));
textAlign(CENTER, TOP);
fill(color('#f4b900'));
noStroke();
let txX = sx(DIAL_NATURAL.x + DIAL_NATURAL.w / 2 + 12);
let txY = sx(DIAL_NATURAL.y + DIAL_NATURAL.h + 35);
text(selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1), txX, txY);
pop();
  
  // 7-seg
  
  push();
textFont(sevenSegFont);
textSize(sx(120));
textAlign(LEFT, TOP);
let tool = TOOL_STRENGTHS[selectedTool];
let strengthVal = selectedTool === 'bounds' ? boundsRects.length : tool?.value;
let strengthStr = strengthVal != null ? String(strengthVal).padStart(2, '0') : null;
charW = sx(67);
sdX = sx(STRENGTH_DISPLAY_NATURAL.x+122);
sdY = sx(STRENGTH_DISPLAY_NATURAL.y+325);
  
let hoveringStrength = mouseX > sdX && mouseX < sdX + sx(67) * 2 &&
                       mouseY > sdY && mouseY < sdY + sx(120);
if (strengthDragging) {
  let tool = TOOL_STRENGTHS[selectedTool];
  if (tool && tool.value !== null) {
    let dragDelta = mouseX - strengthDragStartX;
    let stepsPerUnit = 20; // px per step, adjust to taste
    let newVal = constrain(
      strengthDragStartVal + round(dragDelta / stepsPerUnit),
      tool.min, tool.max
    );
    tool.value = newVal;
  }
}
if (strengthStr === null) {
  // grab tool — display off, just show dim segments
  fill(color('#095306'));
  drawSevenSeg("88", sdX, sdY, charW);
} else {
  fill(color('#095306'));
  drawSevenSeg("88", sdX, sdY, charW);
  fill(color('#36ff00'));
  drawSevenSeg(strengthStr, sdX, sdY, charW);
}
pop();
  
  // ----- ARROWS -----
  
  // left arrow
let laX = sx(LEFT_ARROW_NATURAL.x), laY = sx(LEFT_ARROW_NATURAL.y);
let laW = sx(LEFT_ARROW_NATURAL.w), laH = sx(LEFT_ARROW_NATURAL.h);
let hoveringLeft = mouseX > laX && mouseX < laX + laW && mouseY > laY && mouseY < laY + laH;
let leftDisabled = leftArrowDisabled();
let leftSprite = leftDisabled                          ? arrowImgs.left.press
               : (mouseIsPressed && hoveringLeft)      ? arrowImgs.left.press
               : hoveringLeft                          ? arrowImgs.left.hover
               : arrowImgs.left.default;
image(leftSprite, laX, laY, laW, laH);
// right arrow
let raX = sx(RIGHT_ARROW_NATURAL.x), raY = sx(RIGHT_ARROW_NATURAL.y);
let raW = sx(RIGHT_ARROW_NATURAL.w), raH = sx(RIGHT_ARROW_NATURAL.h);
let hoveringRight = mouseX > raX && mouseX < raX + raW && mouseY > raY && mouseY < raY + raH;
let rightDisabled = rightArrowDisabled();
let rightSprite = rightDisabled                         ? arrowImgs.right.press
                : (mouseIsPressed && hoveringRight)     ? arrowImgs.right.press
                : hoveringRight                         ? arrowImgs.right.hover
                : arrowImgs.right.default;
image(rightSprite, raX, raY, raW, raH);
if (hoveringLeft || hoveringRight) hoveringAnyUI = true;
  
  if (mouseIsPressed && arrowHoldActive) {
  arrowHoldTimer += deltaTime;
  if (arrowHoldTimer >= ARROW_HOLD_DELAY) {
    arrowHoldIntervalTimer += deltaTime;
    if (arrowHoldIntervalTimer >= ARROW_HOLD_INTERVAL) {
      arrowHoldIntervalTimer = 0;
      if (arrowHoldActive === 'left' && !leftArrowDisabled()) {
        if (selectedTool === 'bounds') boundsRects.pop();
        else TOOL_STRENGTHS[selectedTool].value = constrain(TOOL_STRENGTHS[selectedTool].value - 1, TOOL_STRENGTHS[selectedTool].min, TOOL_STRENGTHS[selectedTool].max);
      } else if (arrowHoldActive === 'right' && !rightArrowDisabled()) {
        TOOL_STRENGTHS[selectedTool].value = constrain(TOOL_STRENGTHS[selectedTool].value + 1, TOOL_STRENGTHS[selectedTool].min, TOOL_STRENGTHS[selectedTool].max);
      }
    }
  }
} else {
  arrowHoldTimer = 0;
  arrowHoldIntervalTimer = 0;
  arrowHoldActive = null;
}
  
  // ----- REPULSE -----
  
  fear = (selectedTool === 'repulse' && mouseIsPressed && mouseX > sidebarDisplayW && !cursorUsingUI)
  ? TOOL_STRENGTHS.repulse.value / 7
  : 0;
  
  // ----- RECOLOR CURSOR -----
  if (selectedTool === 'recolor' && recolorCol !== null && mouseX > sidebarDisplayW && !cursorUsingUI) {
    let vacRadius = TOOL_STRENGTHS.recolor.value === 1
      ? scaleFactor / 2
      : TOOL_STRENGTHS.recolor.value * 15;
    if (mouseIsPressed) {
      for (let p of particles) {
        if (dist(mouseX, mouseY, p.x, p.y) < vacRadius) {
          p.col = [...recolorCol];
          p.paletteIndex = recolorPaletteIndex >= 0 ? recolorPaletteIndex : null;
        }
      }
      // remove palette colors with no remaining canvas particles
      if (colorLimitOn) {
        for (let i = palette.length - 1; i >= 0; i--) {
          if (!particles.some(p => p.paletteIndex === i)) {
            // remap indices above i
            for (let p of particles) {
              if (p.paletteIndex > i) p.paletteIndex--;
            }
            for (let j = 0; j < tankQueue.length; j++) {
              if (tankQueue[j][0] === palette[i][0] &&
                  tankQueue[j][1] === palette[i][1] &&
                  tankQueue[j][2] === palette[i][2]) {
                tankQueue[j] = palette.length > 1
                  ? [...getClosestColor(palette[i], palette.filter((_, idx) => idx !== i))]
                  : [255, 255, 255];
              }
            }
            if (recolorPaletteIndex === i) {
              recolorPaletteIndex = -1;
              recolorCol = null;
            } else if (recolorPaletteIndex > i) {
              recolorPaletteIndex--;
            }
            palette.splice(i, 1);
            colorCount = max(1, colorCount - 1);
          }
        }
        createPaletteSquares(palette);
        clearTintCache();
      }
    }
  }
  // ----- BOUNDS -----
  
  drawBoundsRects()
  
  // ----- BITS PANEL — SOURCE IMAGE PREVIEW -----
if (imgOriginal) {
  let pvX = sx(BITS_PREVIEW_NATURAL.x), pvY = sx(BITS_PREVIEW_NATURAL.y);
  let pvW = sx(BITS_PREVIEW_NATURAL.w), pvH = sx(BITS_PREVIEW_NATURAL.h);
  // fit image into the box without stretching (letter-box)
  let aspect = imgOriginal.width / imgOriginal.height;
  let drawW, drawH;
  if (aspect > 1) {
    drawW = pvW;
    drawH = pvW / aspect;
  } else {
    drawH = pvH;
    drawW = pvH * aspect;
  }
  let drawX = pvX + (pvW - drawW) / 2;
  let drawY = pvY + (pvH - drawH) / 2;
  image(imgOriginal, drawX, drawY, drawW, drawH);
}
  
  // ----- BITS PANEL — NEW BUTTON -----
nbX = sx(NEW_BTN_NATURAL.x);
nbY = sx(NEW_BTN_NATURAL.y);
nbW = sx(NEW_BTN_NATURAL.w)
nbH = sx(NEW_BTN_NATURAL.h);
hoveringNewBtn = mouseX > nbX && mouseX < nbX + nbW &&
                 mouseY > nbY && mouseY < nbY + nbH;
let newBtnSprite = (mouseIsPressed && hoveringNewBtn) ? newBtnImgs.press
                 : hoveringNewBtn                     ? newBtnImgs.hover
                 : newBtnImgs.default;
image(newBtnSprite, nbX, nbY, nbW, nbH);
  
 // ----- BITS PANEL — TANK -----
let tX = sx(TANK_NATURAL.x), tY = sx(TANK_NATURAL.y);
let tW = sx(TANK_NATURAL.w), tH = sx(TANK_NATURAL.h);
if (tankQueue.length > 0) {
  let nextCol = tankDisplayCol;
  let fX = tX + sx(TANK_FILL_NATURAL.x);
  let fY = tY + sx(TANK_FILL_NATURAL.y);
  let fW = tW + sx(TANK_FILL_NATURAL.w);
  let fH = tH + sx(TANK_FILL_NATURAL.h);
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(fX, fY, fW, fH);
  drawingContext.clip();
  fill(nextCol[0], nextCol[1], nextCol[2]);
  noStroke();
  rect(fX, fY, fW, fH);
  drawingContext.restore();
  pop();
}
image(tankImg, tX, tY, tW, tH);
  
  // ----- BITS PANEL — PIE CHART -----
let totalBits = particles.length + tankCount;
let pieIndex = (totalBits === 0) ? 0
             : (tankCount === 0) ? 0
             : (tankCount === totalBits) ? 8
             : constrain(round(constrain(tankCount / totalBits, 0, 1) * 8), 1, 7);
let pieImg = pieImgs[pieIndex];
if (pieImg) {
  image(pieImg, sx(PIE_NATURAL.x), sx(PIE_NATURAL.y), sx(PIE_NATURAL.w), sx(PIE_NATURAL.h));
}
  
  // ----- BITS PANEL — TANK COUNT DISPLAY -----
push();
textFont(sevenSegFont);
textSize(sx(120));
textAlign(LEFT, TOP);
let tankStr = String(min(tankCount, 999)).padStart(3, '0');
let tdX = sx(TANK_DISPLAY_NATURAL.x);
let tdY = sx(TANK_DISPLAY_NATURAL.y);
fill(color('#08565b'));
drawSevenSeg('888', tdX, tdY, sx(67), sx(10));
fill(color('#00ffd2'));
drawSevenSeg(tankStr, tdX, tdY, sx(67), sx(10));
pop();
  // Title animation
  if (titleFrames.length > 0) {
    let titleSpeed = map(motion, 0, 2, 0.05, 12);
    titleFrame += titleSpeed * (deltaTime / 50) + 0.5;
    titleFrame %= titleFrames.length;
    image(titleFrames[floor(titleFrame)], 20, 20, 245, 60);
  }
  textAlign(LEFT, BASELINE);
  fill(0);
  let isActive = motion > 0 || fear > 0;
  // Animation timers
  idleTimer += deltaTime / 1000;
  if (idleTimer > 1 / frameRateAnim) {
    idleFrameGlobal = (idleFrameGlobal + 1) % idleFrames.length;
    idleTimer = 0;
  }
  walkTimer += deltaTime / 1000;
  if (walkTimer > 1 / frameRateAnim) {
    walkFrameGlobal = (walkFrameGlobal + 1) % walkFrames.length;
    walkTimer = 0;
  }
  // Drag detection (particles)
  if (!screenshotMode && selectedTool === 'grab' && appState === 'editor') {
  if (mouseIsPressed && !draggedParticle && !draggingSlider && !leverDragging) {
    let dragRadius = max(dragRadiusFactor * scaleFactor, 4);
    let closest = dragRadius;
    for (let p of particles) {
      let d = dist(mouseX, mouseY, p.x, p.y);
      if (d < closest) {
        draggedParticle = p;
        closest = d;
      }
    }
  }
  if (!mouseIsPressed) draggedParticle = null;
}
if (!mouseIsPressed) draggedParticle = null;
  // Particle physics
  if (appState === 'options') fear = 0;
  for (let p of particles) {
    if (appState === 'editor' && p.x < sidebarDisplayW + 6) {
  p.x = sidebarDisplayW + 6;
  p.vx = 0;
}
    if (p === draggedParticle) {
      let ease = 0.7;
      p.vx = (mouseX - p.x) * ease;
      p.vy = (mouseY - 10 - p.y) * ease;
      p.x += p.vx;
      p.y += p.vy;
    } else {
      let isMagneting = selectedTool === 'magnet' && mouseIsPressed && mouseX > sidebarDisplayW && !cursorUsingUI;
if (!isActive && !isMagneting && p.vx === 0 && p.vy === 0) continue;
      if (p.stage === 1) {
  p.vx = 0;
  p.vy = 0;
} else {
  let stageMotion = p.stage === 2 ? motion * 0.3 : motion;
  if (stageMotion === 0) {
    p.vx = 0;
    p.vy = 0;
  } else if (random() < 0.1 * stageMotion) {
    let a = random(TWO_PI);
    p.vx += cos(a) * stageMotion;
    p.vy += sin(a) * stageMotion;
  }
  p.vx *= 0.9;
  p.vy *= 0.9;
}
      let dx = p.x - mouseX;
      let dy = p.y - mouseY;
      if (fear > 0) {
        let baseRadius = 3 * scaleFactor;
        let repelRadius = baseRadius * (1 + fear * 4);
        let repelRadius2 = repelRadius * repelRadius;
        let d2 = dx * dx + dy * dy;
        if (d2 < repelRadius2 && d2 > 0.000001) {
          let d = sqrt(d2);
          let nx = dx / d;
          let ny = dy / d;
          let falloff = 1 - d / repelRadius;
          let force = falloff * (0.5 + 2 * fear);
          let px = -ny;
          let py = nx;
          let swirl = random(-0.3, 0.3) * falloff * fear;
          p.vx += nx * force + px * swirl;
          p.vy += ny * force + py * swirl;
        }
      }
            // bounds constrain
if (p !== draggedParticle) {
  for (let r of boundsRects) {
  let half = scaleFactor / 2;
  let inX = p.x > r.x + half && p.x < r.x + r.w - half;
  let inY = p.y > r.y + half && p.y < r.y + r.h - half;
  if (inX && inY) {
    if (p.x + p.vx <= r.x + half || p.x + p.vx >= r.x + r.w - half) p.vx = 0;
    if (p.y + p.vy <= r.y + half || p.y + p.vy >= r.y + r.h - half) p.vy = 0;
  }
}
}
      
      p.x += p.vx;
      p.y += p.vy;
      
      // magnet
      
      if (selectedTool === 'magnet' && mouseIsPressed && mouseX > sidebarDisplayW && !cursorUsingUI) {
  let strengthMult = TOOL_STRENGTHS.magnet.value / 5;
  let attractRadius = 3 * scaleFactor * 5 * strengthMult;
  let d2 = dx * dx + dy * dy;
  if (d2 < attractRadius * attractRadius && d2 > 0.000001) {
    let d = sqrt(d2);
    let nx = dx / d;
    let ny = dy / d;
    let falloff = 1 - d / attractRadius;
    let force = falloff * 2 * strengthMult;
    p.vx -= nx * force;
    p.vy -= ny * force;
  }
}
      
if (img) {
  let leftBound = appState === 'editor' ? sidebarDisplayW : 0;
  p.x = constrain(p.x, leftBound, width);
  p.y = constrain(p.y, 0, height);
}
      
if (p.stage < 3) {
  if (motion > 0 && random() < 0.02 * pow(motion / 5, 2)) {
    p.stage++;
  }
} else if (random() < 0.1 * motion) {
  let a = random(TWO_PI);
  p.vx += cos(a) * motion/4;
  p.vy += sin(a) * motion/4;
}
      p.dir = (p.vx > 0.1) ? 1 : (p.vx < -0.1 ? -1 : p.dir);
    }
    let vel2 = p.vx * p.vx + p.vy * p.vy;
    if (vel2 > 0.01) {
      if (!p.walking) { p.walking = true; p.walkTimer = 0; }
      p.walkTimer += deltaTime / 1000;
    } else if (p.walking) {
      if (p.walkTimer >= minWalkTime) { p.walking = false; p.walkTimer = 0; }
      else { p.walkTimer += deltaTime / 1000; }
    }
  }
  // vacuum
  
  if (selectedTool === 'vacuum' && mouseIsPressed && mouseX > sidebarDisplayW && !cursorUsingUI && appState === 'editor') {
  let vacRadius = TOOL_STRENGTHS.vacuum.value === 1
  ? scaleFactor / 2
  : TOOL_STRENGTHS.vacuum.value * 15;
  
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (dist(mouseX, mouseY, p.x, p.y) < vacRadius) {
      tankQueue.push([...p.col]);
      tankDisplayCol = [...p.col];
      dustParticles.push({ x: p.x, y: p.y, frame: 0, timer: 0, col: p.col, stage: p.stage });
      particles.splice(i, 1);
      tankCount++;
    }
  }
}
  
  for (let i = dustParticles.length - 1; i >= 0; i--) {
  let d = dustParticles[i];
  let dustAnim = d.stage === 1 ? dust1Frames
             : d.stage === 2 ? dust2Frames
             : dustFrames;
d.timer += deltaTime;
if (d.timer > 60) {
  d.timer = 0;
  d.frame++;
}
if (d.frame >= dustAnim.length) {
  dustParticles.splice(i, 1);
  continue;
}
let sprite = dustAnim[d.frame];
  if (sprite) {
    let tinted = getTintedSprite(sprite, d.col, `dust${d.stage}_${d.frame}`);
    imageMode(CENTER);
    image(tinted, d.x, d.y, scaleFactor, scaleFactor);
    imageMode(CORNER);
  }
}
  
  // spawn tool
  
  if (selectedTool === 'spawn' && mouseIsPressed && mouseX > sidebarDisplayW && tankCount > 0 && !cursorUsingUI && appState === 'editor') {
  spawnTimer += deltaTime;
  if (spawnTimer >= SPAWN_INTERVAL) {
    spawnTimer = 0;
    let spawnRadius = TOOL_STRENGTHS.spawn.value === 1
  ? 0
  : TOOL_STRENGTHS.spawn.value * 15;
    // collect candidate grid cells within radius
    let candidates = [];
    let steps = ceil(spawnRadius / scaleFactor);
    for (let dx = -steps; dx <= steps; dx++) {
      for (let dy = -steps; dy <= steps; dy++) {
        let gx = round((mouseX - offsetX) / scaleFactor + dx) * scaleFactor + offsetX;
        let gy = round((mouseY - offsetY) / scaleFactor + dy) * scaleFactor + offsetY;
        if (dist(mouseX, mouseY, gx, gy) <= spawnRadius || spawnRadius === 0) {
          let occupied = particles.some(p => abs(p.x - gx) < scaleFactor * 0.5 && abs(p.y - gy) < scaleFactor * 0.5);
          if (!occupied && tankCount > 0) candidates.push({ gx, gy });
        }
      }
    }
    for (let c of candidates) {
      if (tankCount <= 0) break;
      const spawnCol = tankQueue.length > 0 ? tankQueue.shift() : [255, 255, 255];
tankDisplayCol = tankQueue.length > 0 ? [...tankQueue[0]] : [...spawnCol];
const spawnPaletteIndex = palette?.length
  ? palette.findIndex(p => p[0] === spawnCol[0] && p[1] === spawnCol[1] && p[2] === spawnCol[2])
  : null;
particles.push({
  x: c.gx, y: c.gy,
  vx: 0, vy: 0,
  col: [...spawnCol],
  dir: 1, stage: 1,
  idleOffset: floor(random(numIdle)),
  animFrame: 0, animTimer: 0,
  walking: false, walkTimer: 0,
  paletteIndex: spawnPaletteIndex === -1 ? null : spawnPaletteIndex
});
tankCount--;
    }
  }
} else if (selectedTool !== 'spawn') {
  spawnTimer = 0;
}
  
  // Draw particles
  for (let p of particles) {
    if (p !== draggedParticle) drawParticle(p);
  }
  if (draggedParticle) drawParticle(draggedParticle);
  drawPaletteSquares();
  
  // ----- PALETTE HOLD TIMER -----
if (paletteHoldSquare !== null && mouseIsPressed) {
  paletteHoldTimer += deltaTime;
  if (paletteHoldTimer >= PALETTE_HOLD_MS) {
    removePaletteColor(paletteHoldSquare);
    paletteHoldSquare = null;
    paletteHoldTimer = 0;
  }
} else if (!mouseIsPressed) {
  paletteHoldSquare = null;
  paletteHoldTimer = 0;
}
  
  // ----- PALETTE 7-SEG DISPLAYS -----
push();
textFont(sevenSegFont);
textSize(sx(120));
textAlign(LEFT, TOP);
let pcX = sx(PALETTE_COUNT_NATURAL.x);
let pcY = sx(PALETTE_COUNT_NATURAL.y);
let ppX = sx(PALETTE_PAGE_NATURAL.x);
let ppY = sx(PALETTE_PAGE_NATURAL.y);

// color count — 3 digits
let countStr = String(min(palette.length, 999)).padStart(3, '0');
fill(color('#866500'));
drawSevenSeg('888', pcX, pcY, sx(67), sx(10));
fill(color('#fff600'));
drawSevenSeg(countStr, pcX, pcY, sx(67), sx(10));

// page number — 2 digits
let totalPages = max(1, ceil((palette.length) / (PALETTE_NATURAL.cols * PALETTE_NATURAL.rows - 1)));
let pageStr = String(palettePage + 1).padStart(2, '0');
fill(color('#5a000f'));
drawSevenSeg('88', ppX, ppY, sx(67), sx(10));
fill(color('#ff0000'));
drawSevenSeg(pageStr, ppX, ppY, sx(67), sx(10));
pop();
  
  // Hover check (throttled)
  hoverCheckTimer += deltaTime;
  if (hoverCheckTimer > 50) {
    hoverCheckTimer = 0;
    hoveringParticle = false;
    let dragRadius = max(dragRadiusFactor * scaleFactor / 2, 4);
    for (let p of particles) {
      if (dist(mouseX, mouseY, p.x, p.y) < dragRadius) {
        hoveringParticle = true;
        break;
      }
    }
    for (let sq of paletteSquares) {
      if (mouseX >= sq.x && mouseX <= sq.x + sq.size &&
          mouseY >= sq.y && mouseY <= sq.y + sq.size) {
        hoveringParticle = true;
        break;
      }
    }
  }
  
  // ----- PALETTE PAGE BUTTONS -----
  totalPages = max(1, ceil(palette.length / (PALETTE_NATURAL.cols * PALETTE_NATURAL.rows - 1)));
let puX = sx(PAGE_UP_NATURAL.x),   puY = sx(PAGE_UP_NATURAL.y);
let puW = sx(PAGE_UP_NATURAL.w),   puH = sx(PAGE_UP_NATURAL.h);
let pdX = sx(PAGE_DOWN_NATURAL.x), pdY = sx(PAGE_DOWN_NATURAL.y);
let pdW = sx(PAGE_DOWN_NATURAL.w), pdH = sx(PAGE_DOWN_NATURAL.h);

let hoveringPageUp   = mouseX > puX && mouseX < puX + puW && mouseY > puY && mouseY < puY + puH;
let hoveringPageDown = mouseX > pdX && mouseX < pdX + pdW && mouseY > pdY && mouseY < pdY + pdH;
let pageUpDisabled   = palettePage <= 0;
let pageDownDisabled = palettePage >= totalPages - 1;

let puSprite = pageUpDisabled                         ? pageUpImgs.press
             : (mouseIsPressed && hoveringPageUp)     ? pageUpImgs.press
             : hoveringPageUp                         ? pageUpImgs.hover
             : pageUpImgs.default;
let pdSprite = pageDownDisabled                       ? pageDownImgs.press
             : (mouseIsPressed && hoveringPageDown)   ? pageDownImgs.press
             : hoveringPageDown                       ? pageDownImgs.hover
             : pageDownImgs.default;

image(puSprite, puX, puY, puW, puH);
image(pdSprite, pdX, pdY, pdW, pdH);

if ((hoveringPageUp && !pageUpDisabled) || (hoveringPageDown && !pageDownDisabled)) {
  hoveringAnyUI = true;
  cursor('pointer');
}

// hold-to-repeat
if (mouseIsPressed && pageHoldActive) {
  pageHoldTimer += deltaTime;
  if (pageHoldTimer >= ARROW_HOLD_DELAY) {
    pageHoldIntervalTimer += deltaTime;
    if (pageHoldIntervalTimer >= ARROW_HOLD_INTERVAL) {
      pageHoldIntervalTimer = 0;
      if (pageHoldActive === 'up' && palettePage > 0) {
        palettePage--;
        createPaletteSquares(palette);
      } else if (pageHoldActive === 'down' && palettePage < totalPages - 1) {
        palettePage++;
        createPaletteSquares(palette);
      }
    }
  }
} else if (!mouseIsPressed) {
  pageHoldActive = null;
  pageHoldTimer = 0;
  pageHoldIntervalTimer = 0;
}
  
  // Cursor
  hoveringAnyUI = hoveringReset || hoveringNewBtn || hoveringSlider || hoveringLever || leverDragging || hoveringToolIcon || hoveringDial ||
  (hoveringStrength && TOOL_STRENGTHS[selectedTool]?.value !== null && selectedTool !== 'bounds') ||
  (hoveringLeft && !leftDisabled) || (hoveringRight && !rightDisabled) ||
  (hoveringPageUp && !pageUpDisabled) || (hoveringPageDown && !pageDownDisabled) ||
  (mouseX > sx(PALETTE_NATURAL.x) && mouseX < sx(PALETTE_NATURAL.x) + sx(PALETTE_NATURAL.slotW) &&
   mouseY > sx(PALETTE_NATURAL.y) && mouseY < sx(PALETTE_NATURAL.y) + sx(PALETTE_NATURAL.slotW));
  if (screenshotMode || (selectedTool === 'bounds' && mouseX > sidebarDisplayW)) {
  cursor('crosshair');
  } else if (draggedParticle) {
    cursor('grabbing');
  } else if (hoveringParticle && selectedTool === 'grab') {
    cursor('pointer');
  } else if (paletteSquares.some(sq =>
      mouseX >= sq.x && mouseX <= sq.x + sq.size &&
      mouseY >= sq.y && mouseY <= sq.y + sq.size)) {
    cursor('pointer');
  
  } else if (tankCount < 1 && selectedTool === 'spawn' && mouseX > sidebarDisplayW) {
    cursor('not-allowed');
  } else if (dialDragging || draggingSlider || strengthDragging) {
  cursor('ew-resize');
} else if (leverDragging) {
  cursor(leverT <= 1 ? 'ns-resize' : 'ew-resize');
  } else if ((selectedTool === 'vacuum' || selectedTool === 'spawn') && 
           TOOL_STRENGTHS[selectedTool].value === 1 && mouseX > sidebarDisplayW) {
  cursor('crosshair');
  } else if ((selectedTool === 'vacuum' || selectedTool === 'spawn') && 
           TOOL_STRENGTHS[selectedTool].value > 1 && mouseX > sidebarDisplayW) {
  cursor('none');
  } else if (hoveringAnyUI) {
    cursor('pointer');
  } else {
    cursor('default');
  }
  if (screenshotMode) drawCropUI();
  
  drawToolCursor();
}
// =====================================================
// DRAW TITLE
// =====================================================
function drawTitleOverlay() {
  let alpha = appState === 'fading' ? map(titleFade, 0, 255, 255, 0) : 255;
  
 push();
fill(18, 14, 10, alpha);
noStroke();
rect(0, 0, width, height);

// draw particles on top of the solid background
  
  if (appState === 'title') {
    textFont(dotoFont);
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    image(logoImg, width/2, height/2 - 140, 621, 133);
    textSize(18);
    fill(180, 140, 80, alpha);
    text('drop an image or click to upload!', width / 2, height / 2 - 30);
    // Upload button
    let btnW = 240, btnH = 52;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 20;
    let hoverUpload = mouseX > btnX && mouseX < btnX + btnW &&
                      mouseY > btnY && mouseY < btnY + btnH;
    fill(hoverUpload ? 180 : 120, 55, 15, alpha);
    noStroke();
    rect(btnX, btnY, btnW, btnH, 3);
    textSize(20);
    fill(255, 215, 150, alpha);
    text('upload image', width / 2, btnY + btnH / 2);
    // Gallery button
    let gBtnY = btnY + btnH + 14;
    let hoverGallery = mouseX > btnX && mouseX < btnX + btnW &&
                       mouseY > gBtnY && mouseY < gBtnY + btnH;
    fill(hoverGallery ? 55 : 35, 35, 30, alpha);
    stroke(90, 70, 45, alpha);
    strokeWeight(1);
    rect(btnX, gBtnY, btnW, btnH, 3);
    noStroke();
    textSize(20);
    fill(170, 130, 70, alpha);
    text('gallery', width / 2, gBtnY + btnH / 2);
    if (hoverUpload || hoverGallery) cursor('pointer');
    else cursor('default');
  } else if (appState === 'options') {
    computePreviewGeometry();
    let optionsScale = optionsMenuScale;

    let layoutTop = previewY;
    let omx = (mouseX - width / 2) / optionsScale + width / 2;
    let omy = (mouseY - layoutTop)  / optionsScale + layoutTop;

    push();
    translate(width / 2, layoutTop);
    scale(optionsScale);
    translate(-width / 2, -layoutTop);

    let sliderW = min(width * 0.5, 500);
    let sliderX = width / 2 - sliderW / 2;

    let _r = imgOriginal ? imgOriginal.height / imgOriginal.width : 1;
    let _w = max(1, round(sqrt(optionsParticles / _r)));
    let _h = max(1, round(_w * _r));
    let sliderY = layoutSliderY;

    let sliderT = sqrt((optionsParticles - OPTIONS_PARTICLES_MIN) / (OPTIONS_PARTICLES_MAX - OPTIONS_PARTICLES_MIN));
    let thumbX = sliderX + sliderT * sliderW;
    let thumbW = 16, thumbH = 26;
    if (optionsSliderDragging) {
      let newT = constrain((omx - sliderX) / sliderW, 0, 1);
      let newCount = round(OPTIONS_PARTICLES_MIN + (newT * newT) * (OPTIONS_PARTICLES_MAX - OPTIONS_PARTICLES_MIN));
      if (newCount !== optionsParticles) { optionsParticles = newCount; updateImageWidth(); }
    }

    // --- background color preview box ---
    push();
    fill(bgColor[0], bgColor[1], bgColor[2], alpha);
    stroke(180, 140, 80, alpha);
    strokeWeight(1);
    rect(previewX, previewY, previewW, previewH, 12);
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.roundRect(previewX, previewY, previewW, previewH, 12);
    drawingContext.clip();
    for (let p of particles) drawParticle(p);
    drawingContext.restore();
    pop();

    // new img button
    let niBtnH = 28, niBtnW = 90;
    let niBtnX = sliderX - niBtnW - 16;
    let niBtnY = sliderY - niBtnH / 2;
    let hoverNewImg = omx > niBtnX && omx < niBtnX + niBtnW &&
                      omy > niBtnY && omy < niBtnY + niBtnH;
    fill(hoverNewImg ? color(55, 35, 30, alpha) : color(35, 35, 30, alpha));
    stroke(90, 70, 45, alpha); strokeWeight(1);
    rect(niBtnX, niBtnY, niBtnW, niBtnH, 3);
    noStroke(); textSize(13); textAlign(CENTER, CENTER); textFont(dotoFont);
    fill(170, 130, 70, alpha);
    text('new image', niBtnX + niBtnW / 2, niBtnY + niBtnH / 2);

    stroke(244, 185, 0, alpha); strokeWeight(1);
    line(sliderX, sliderY, sliderX + sliderW, sliderY);

    // --- bits per image slider ---
    stroke(244, 185, 0, alpha); strokeWeight(1);
    line(sliderX, sliderY, sliderX + sliderW, sliderY);
    noStroke(); fill(244, 185, 0, alpha);
    rectMode(CENTER); rect(thumbX, sliderY, thumbW, thumbH, 2); rectMode(CORNER);
    textFont(dotoFont); textSize(14); textAlign(CENTER, TOP); noStroke();
    fill(180, 140, 80, alpha);
    text(`${_w * _h} bits`, width / 2, sliderY + 20);

    // --- color mode toggle + count input ---
    let ctrlY = sliderY + 60;
    let toggleW = 160, toggleH = 36;
    let toggleX = width / 2 - toggleW - 10;

    let hoverToggle = omx > toggleX && omx < toggleX + toggleW &&
                      omy > ctrlY && omy < ctrlY + toggleH;
    fill(colorLimitOn ? color(120, 55, 15, alpha) : color(35, 35, 30, alpha));
    stroke(colorLimitOn ? color(244, 185, 0, alpha) : color(90, 70, 45, alpha));
    strokeWeight(1); rect(toggleX, ctrlY, toggleW, toggleH, 3);
    noStroke(); textSize(15); textAlign(CENTER, CENTER);
    fill(colorLimitOn ? color(255,215,150,alpha) : color(255,215,150,alpha));
    text(colorLimitOn ? 'LIMITED' : 'UNIQUE (MAY LAG)', toggleX + toggleW / 2, ctrlY + toggleH / 2);

    let inputX = width / 2 + 10;
    let arrowW = 28, boxW = 80;
    let lax = inputX, rax = inputX + arrowW + boxW;
    let hoverLa = omx > lax && omx < lax + arrowW && omy > ctrlY && omy < ctrlY + toggleH;
    let hoverRa = omx > rax && omx < rax + arrowW && omy > ctrlY && omy < ctrlY + toggleH;
    let inputAlpha = colorLimitOn ? alpha : alpha * 0.35;

    fill(hoverLa && colorLimitOn ? color(120,55,15,inputAlpha) : color(30,30,25,inputAlpha));
    stroke(90,70,45,inputAlpha); strokeWeight(1);
    rect(lax, ctrlY, arrowW, toggleH, 3);
    noStroke(); fill(200,160,80,inputAlpha); textSize(18); textAlign(CENTER,CENTER);
    text('‹', lax + arrowW/2, ctrlY + toggleH/2);

    fill(18,14,10,inputAlpha); stroke(90,70,45,inputAlpha); strokeWeight(1);
    rect(lax + arrowW, ctrlY, boxW, toggleH);
    noStroke();
    let isEditingCount = !!document.querySelector('.colorCountInput');
    fill(isEditingCount
      ? color(80, 50, 20, inputAlpha)
      : colorLimitOn ? color(244, 185, 0, inputAlpha) : color(120, 90, 40, inputAlpha));
    textFont(dotoFont); textSize(18); textAlign(CENTER, CENTER);
    text(String(colorCount), lax + arrowW + boxW/2, ctrlY + toggleH/2);

    fill(hoverRa && colorLimitOn ? color(120,55,15,inputAlpha) : color(30,30,25,inputAlpha));
    stroke(90,70,45,inputAlpha); strokeWeight(1);
    rect(rax, ctrlY, arrowW, toggleH, 3);
    noStroke(); fill(200,160,80,inputAlpha); textSize(18); textAlign(CENTER,CENTER);
    text('›', rax + arrowW/2, ctrlY + toggleH/2);

    textFont(dotoFont); textSize(13); textAlign(CENTER,TOP); noStroke();
    fill(180,140,80,alpha);
    text('colors', lax + arrowW + boxW/2, ctrlY + toggleH + 6);

    // --- bg color swatch ---
    let swatchSize = 28;
    let swatchX = rax + arrowW + 20;
    let swatchY = ctrlY + (toggleH - swatchSize) / 2;
    optionsSwatchX = swatchX;
    optionsSwatchY = swatchY;
    let hoverSwatch = omx > swatchX && omx < swatchX + swatchSize &&
                      omy > swatchY && omy < swatchY + swatchSize;
    stroke(hoverSwatch ? color(244, 185, 0, alpha) : color(180, 140, 80, alpha));
    strokeWeight(1);
    fill(bgColor[0], bgColor[1], bgColor[2], alpha);
    rect(swatchX, swatchY, swatchSize, swatchSize, 4);
    noStroke();
    textFont(dotoFont); textSize(13); textAlign(CENTER, TOP); noStroke();
    fill(180, 140, 80, alpha);
    text('bg', swatchX + swatchSize / 2, ctrlY + toggleH + 6);

    // --- begin button ---
    let btnW = 200, btnH = 50;
    let btnX = width / 2 - btnW / 2;
    let btnY = ctrlY + toggleH + 38;
    let hoverConfirm = omx > btnX && omx < btnX + btnW &&
                       omy > btnY && omy < btnY + btnH;
    fill(hoverConfirm ? 180 : 120, 55, 15, alpha); noStroke();
    rect(btnX, btnY, btnW, btnH, 3);
    textSize(20); textAlign(CENTER,CENTER); fill(255,215,150,alpha);
    text('begin', width/2, btnY + btnH/2);

    let boxX = lax + arrowW;
    let hoverCountBox = colorLimitOn &&
      omx > boxX && omx < boxX + boxW &&
      omy > ctrlY && omy < ctrlY + toggleH;

    if (hoverCountBox)
      cursor('text');
    else if (hoverConfirm || hoverNewImg || hoverToggle || hoverSwatch ||
      (hoverLa && colorLimitOn) || (hoverRa && colorLimitOn) ||
      (omx > sliderX && omx < sliderX + sliderW && omy > sliderY-20 && omy < sliderY+20))
      cursor('pointer');
    else cursor('default');
  }
  pop();
  if (appState === 'fading') {
    titleFade += deltaTime * 0.5;
    if (titleFade >= 255) appState = 'editor';
  }
}
// =====================================================
// DRAW TOOLS
// =====================================================
function drawToolIcons() {
  hoveringToolIcon = false;
  for (let i = 0; i < TOOLS.length; i++) {
    let tool = TOOLS[i];
    let pos = TOOL_ICONS_NATURAL[i];
    let x = sx(pos.x), y = sx(pos.y);
    let w = sx(tool.w), h = sx(tool.h);
    let hovering = mouseX > x && mouseX < x + w &&
                   mouseY > y && mouseY < y + h;
    if (hovering) hoveringToolIcon = true;
    let variant = (selectedTool === tool.name) ? 'on'
                : hovering                     ? 'hover'
                : 'off';
    image(toolImgs[tool.name][variant], x, y, w, h);
  }
}
// =====================================================
// BOUNDS TOOL
// =====================================================
function drawBoundsRects() {
  boundsAnimTimer += deltaTime;
if (boundsAnimTimer > 1000) {
  boundsAnimTimer = 0;
  boundsAnimState = !boundsAnimState;
}
  let t = boundsAnimTimer / 1000;
let eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out
let brightness = boundsAnimState ? lerp(0, 200, eased) : lerp(200, 0, eased);
  push();
  noFill();
  stroke(brightness);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  for (let r of boundsRects) {
    rect(r.x, r.y, r.w, r.h);
  }
  if (boundsDrawRect) {
    stroke(brightness);
    rect(boundsDrawRect.x, boundsDrawRect.y, boundsDrawRect.w, boundsDrawRect.h);
  }
  drawingContext.setLineDash([]);
  pop();
}
// =====================================================
// FILE INPUT
// =====================================================
function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, loadedImg => {
      imgOriginal = loadedImg;
      titleScreenImg = loadedImg;
      if (appState === 'title' || appState === 'options') {
        appState = 'options';
        updateImageWidth();
        updateOptionsScale();
      } else {
        // already in editor — behave as before
        imageLoaded = true;
        updateImageWidth();
        updateOptionsScale();
      }
    });
  }
}
function confirmTitleOptions() {
  imageLoaded = true;
  appState = 'fading';
  titleFade = 0;
  lastOptionsParticleCount = -1;
  sliderT = 0.08;
  motion = sliderT * 5;
  updateImageWidth();
}
// =====================================================
// IMAGE UPDATE PIPELINE
// =====================================================
function updateImageWidth() {
  clearTintCache();
  if (!imgOriginal) return;
  let r = imgOriginal.height / imgOriginal.width;
  let w = max(1, round(sqrt(optionsParticles / r)));
  let h = max(1, round(w * r));
  img = imgOriginal.get();
  img.resize(w, h);
  img.loadPixels();
  cellSize = max(floor(500 / max(w, h)), 2);
  scaleFactor = cellSize;
  centerGrid();
  if (colorLimitOn) {
    palette = generateDitheredPalette(img, max(int(colorCount), 1));
  } else {
    palette = buildUniquePalette(img);
  }
  tankCount = 0;
  tankQueue = [];
  tankDisplayCol = [255, 255, 255];
    lastOptionsParticleCount = optionsParticles;
createParticles(palette);
createPaletteSquares(palette);
}
// =====================================================
// PALETTE HELPER
// =====================================================
function buildUniquePalette(img) {
  img.loadPixels();
  let seen = new Map();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let key = (img.pixels[i] << 16) | (img.pixels[i+1] << 8) | img.pixels[i+2];
    if (!seen.has(key)) seen.set(key, [img.pixels[i], img.pixels[i+1], img.pixels[i+2]]);
  }
  return [...seen.values()];
}
// =====================================================
// OPTIONS MENU: PREV GEOMETRY
// =====================================================
function computePreviewGeometry() {
  if (!imgOriginal) return;
  let _r = imgOriginal.height / imgOriginal.width;
  let _w = max(1, round(sqrt(optionsParticles / _r)));
  let _h = max(1, round(_w * _r));
  let gridW = _w * scaleFactor;
  let gridH = _h * scaleFactor;
  previewMargin = 32;

  // box is always sized exactly around the actual particle grid + margin
  // width adapts to image aspect, height is fixed to the grid height
  previewW = gridW + previewMargin * 2;
  previewH = gridH + previewMargin * 2;
  previewX = width / 2 - previewW / 2;
  previewY = 24;
}
// =====================================================
// SCREENSHOT / CROP
// =====================================================
function startScreenshot() {
  let scale = 3;
  let pg = createGraphics(width * scale, height * scale);
  pg.pixelDensity(1);
  pg.noSmooth();
  pg.background(255);
  pg.drawingContext.imageSmoothingEnabled = false;
  pg.image(sidebarImg, 0, 0, sidebarDisplayW * scale, height * scale);
  for (let p of particles) {
    let vel2 = p.vx * p.vx + p.vy * p.vy;
    let isWalking = vel2 > 0.01;
    let anim = isWalking ? walkFrames : idleFrames;
    let index = isWalking
      ? p.animFrame
      : (idleFrameGlobal + p.idleOffset) % idleFrames.length;
    let sprite = (p === draggedParticle && grabSprite) ? grabSprite : anim[index];
    if (sprite) {
      pg.push();
      pg.translate(p.x * scale, p.y * scale);
      pg.scale(p.dir, 1);
      pg.imageMode(CENTER);
      pg.tint(p.col[0], p.col[1], p.col[2]);
      pg.image(sprite, 0, 0, scaleFactor * scale, scaleFactor * scale);
      pg.pop();
    }
  }
  screenshotImg = pg;
  screenshotImgScale = scale;
  screenshotMode = true;
  cropStart = null;
  cropRect = null;
}
function drawCropUI() {
  if (!screenshotMode) return;
  push();
  noStroke();
  if (cropRect) {
    fill(0, 0, 0, 120);
    rect(0, 0, width, cropRect.y);
    rect(0, cropRect.y + cropRect.h, width, height - cropRect.y - cropRect.h);
    rect(0, cropRect.y, cropRect.x, cropRect.h);
    rect(cropRect.x + cropRect.w, cropRect.y, width - cropRect.x - cropRect.w, cropRect.h);
    noFill();
    stroke(255);
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    rect(cropRect.x, cropRect.y, cropRect.w, cropRect.h);
    drawingContext.setLineDash([]);
    fill(255);
    noStroke();
    textAlign(CENTER, BOTTOM);
    text("press Enter to save  ;  Esc to cancel", width / 2, height - 20);
    text("press P to post to gallery", width / 2, height - 45);
    textAlign(LEFT, BASELINE);
  } else {
    fill(0, 0, 0, 120);
    rect(0, 0, width, height);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text("drag to select crop area", width / 2, height / 2);
    textAlign(LEFT, BASELINE);
  }
  pop();
}
function saveCrop() {
  if (!cropRect || !screenshotImg) return;
  let s = screenshotImgScale;
  let offscreen = document.createElement('canvas');
  offscreen.width = cropRect.w * s;
  offscreen.height = cropRect.h * s;
  let ctx = offscreen.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    screenshotImg.canvas,
    cropRect.x * s, cropRect.y * s,
    cropRect.w * s, cropRect.h * s,
    0, 0,
    cropRect.w * s, cropRect.h * s
  );
  offscreen.toBlob(blob => {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'screenshot.png';
    a.click();
  });
  exitScreenshot();
}
function exitScreenshot() {
  screenshotMode = false;
  if (screenshotImg) {
    screenshotImg.remove();
    screenshotImg = null;
  }
  cropStart = null;
  cropRect = null;
}
// =====================================================
// CUSTOM CURSORS
// =====================================================
function drawToolCursor() {
  if (mouseX <= sidebarDisplayW && selectedTool !== 'recolor') return;
  
  if ((selectedTool === 'vacuum' || (selectedTool === 'spawn' && tankCount > 0)) &&
      TOOL_STRENGTHS[selectedTool].value > 1) {
    let strength = TOOL_STRENGTHS[selectedTool].value;
    cursor('none');
    
    let r = strength * 15;
    push();
    noFill();
    strokeWeight(3);
    stroke(255);
    circle(mouseX, mouseY, r * 2 + 6);
    strokeWeight(1.5);
    stroke(0);
    circle(mouseX, mouseY, r * 2);
    pop();
  } 


  if (selectedTool === 'recolor' && recolorCol !== null) {
    let strength = TOOL_STRENGTHS.recolor.value;
    
    let r = strength * 15;
    if (mouseX >= sidebarDisplayW) cursor('none');
    push();
    noFill();
      strokeWeight(1.5);
      stroke(0);
      circle(mouseX, mouseY, r * 2+9);
    let ringR =  r + 6;
    strokeWeight(3);
    stroke(recolorCol[0], recolorCol[1], recolorCol[2]);
    circle(mouseX, mouseY, ringR * 2 + 2);
    pop();
  }
}
// =====================================================
// PARTICLES
// =====================================================
function createParticles(palette = null) {
  particles = [];
  if (!img) return;
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let i = (x + y * img.width) * 4;
      let col = [img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]];
      let paletteIndex = null;
      if (palette?.length) {
        let closest = getClosestColor(col, palette);
        paletteIndex = palette.indexOf(closest);
        col = closest;
      }
      particles.push({
        x: x * cellSize + offsetX,
        y: y * cellSize + offsetY,
        vx: 0, vy: 0,
        col,
        dir: 1,
        stage: 3,
        idleOffset: floor(random(numIdle)),
        animFrame: 0,
        animTimer: 0,
        paletteIndex
      });
    }
  }
}
// =====================================================
// TINT CACHE
// =====================================================
function getTintedSprite(sprite, col, key) {
  let cacheKey = `${key}_${col[0]}_${col[1]}_${col[2]}`;
  if (tintCache[cacheKey]) return tintCache[cacheKey];
  let g = createGraphics(sprite.width, sprite.height);
  g.pixelDensity(1);
  g.noSmooth();
  g.tint(col[0], col[1], col[2]);
  g.image(sprite, 0, 0);
  tintCache[cacheKey] = g;
  return g;
}
function clearTintCache() {
  for (let key in tintCache) {
    tintCache[key].remove();
  }
  tintCache = {};
}
// =====================================================
// DRAW PARTICLE
// =====================================================
function drawParticle(p) {
  let vel2 = p.vx * p.vx + p.vy * p.vy;
  let isWalking = vel2 > 0.01 && p.stage === 3;
  let sprite;
  if (p.stage === 1) {
    let index = (idleFrameGlobal + p.idleOffset) % stage1Frames.length;
    sprite = stage1Frames[index];
  } else if (p.stage === 2) {
    let index = (idleFrameGlobal + p.idleOffset) % stage2Frames.length;
    sprite = stage2Frames[index];
  } else {
    // existing stage 3 logic
    let anim = isWalking ? walkFrames : idleFrames;
    let index;
    if (isWalking) {
      let vel = sqrt(vel2);
      let speed = map(vel, 0, 3, 2, 12);
      p.animTimer += deltaTime / 1000;
      if (p.animTimer > 1 / speed) {
        p.animFrame = (p.animFrame + 1) % walkFrames.length;
        p.animTimer = 0;
      }
      index = p.animFrame;
    } else {
      index = (idleFrameGlobal + p.idleOffset) % idleFrames.length;
    }
    sprite = (p === draggedParticle && grabSprite) ? grabSprite : anim[index];
  }
  if (sprite) {
    let spriteKey = p.stage === 1 ? `stage1_${(idleFrameGlobal + p.idleOffset) % 8}`
                  : p.stage === 2 ? `stage2_${(idleFrameGlobal + p.idleOffset) % 8}`
                  : (p === draggedParticle && grabSprite) ? 'grab'
                  : (isWalking ? `walk_${p.animFrame}` : `idle_${(idleFrameGlobal + p.idleOffset) % 8}`);
    let tinted = getTintedSprite(sprite, p.col, spriteKey);
    push();
    translate(p.x, p.y);
    scale(p.dir, 1);
    imageMode(CENTER);
    image(tinted, 0, 0, scaleFactor, scaleFactor);
    pop();
  }
}
// =====================================================
// PALETTE SYSTEM
// =====================================================

const PALETTE_NATURAL = {
  x: 910,
  y: 2775,
  cols: 4,
  rows: 3,
  slotW: 105,
  slotH: 105,
  gap: 18,
  radius: 12,
  bgX: 367,   // independent position for bg square
  bgY: 2935,
};
let palettePage = 0;

function createPaletteSquares(palette) {
  paletteSquares = [];
  const { x, y, cols, rows, slotW, slotH, gap } = PALETTE_NATURAL;
  const slotsPerPage = cols * rows - 1;

  // bg square — one slot to the left of slot 0
  paletteSquares.push({
    x:    sx(PALETTE_NATURAL.bgX),
    y:    sx(PALETTE_NATURAL.bgY),
    size: sx(slotW),
    color: bgColor,
    index: -1,
    isBg: true,
  });

  let pageStart = palettePage * slotsPerPage;
  let pageEnd   = min(pageStart + slotsPerPage, palette.length);

  for (let i = pageStart; i < pageEnd; i++) {
    let slot = (i - pageStart) + 1;
    let col  = slot % cols;
    let row  = floor(slot / cols);
    paletteSquares.push({
      x:    sx(x + col * (slotW + gap)),
      y:    sx(y + row * (slotH + gap)),
      size: sx(slotW),
      color: palette[i],
      index: i,
      isBg: false,
    });
  }

  // auto-select first palette color for recolor tool if none selected
  if (selectedTool === 'recolor' && recolorCol === null && palette.length > 0) {
    recolorCol = [...palette[0]];
    recolorPaletteIndex = 0;
  }
}

function isPaletteColorOnCanvas(index) {
  return particles.some(p => p.paletteIndex === index);
}

function drawPaletteSquares() {
  const { x, y, slotW, slotH, gap, cols, radius } = PALETTE_NATURAL;

  // bg square — no border, same size and radius as palette squares
  let bgSq = paletteSquares.find(s => s.isBg);
    if (bgSq) {
    stroke(192, 192, 192);
    strokeWeight(sx(6));
    fill(bgSq.color);
    rect(bgSq.x, bgSq.y, bgSq.size, bgSq.size, sx(radius));
  }

  // slot 0 — "+" add button
  let addX = sx(x), addY = sx(y), addSize = sx(slotW);
  let hoveringAdd = mouseX > addX && mouseX < addX + addSize &&
                    mouseY > addY && mouseY < addY + addSize;
  push();
  stroke(192, 192, 192);
  strokeWeight(sx(6));
  fill(hoveringAdd ? color(192, 192, 192) : color(0, 0, 0, 0));
  rect(addX, addY, addSize, addSize, sx(radius));
  // "+" symbol
  let plusCol = hoveringAdd ? color(0) : color(192, 192, 192);
  stroke(plusCol);
  strokeWeight(sx(8));
  let cx = addX + addSize / 2;
  let cy = addY + addSize / 2;
  let arm = addSize * 0.15;
  line(cx - arm, cy, cx + arm, cy);
  line(cx, cy - arm, cx, cy + arm);
  pop();

  // palette squares
  for (let sq of paletteSquares) {
    if (sq.isBg) continue;
    let slot = (sq.index - palettePage * (cols * 3 - 1)) + 1;
    let col  = slot % cols;
    let row  = floor(slot / cols);
    let sx_ = sx(x + col * (slotW + gap));
    let sy_ = sx(y + row * (slotH + gap));
    let size = sx(slotW);
    noStroke();
    fill(sq.color);
    rect(sx_, sy_, size, size, sx(radius));
    if (!isPaletteColorOnCanvas(sq.index)) {
      // black triangle over top-left half
      fill(0);
      drawingContext.save();
      drawingContext.beginPath();
       drawingContext.moveTo(sx_ - 4, sy_ - 4);
      drawingContext.lineTo(sx_ + size + 4, sy_ - 4);
      drawingContext.lineTo(sx_ - 4, sy_ + size + 4);
      drawingContext.closePath();
      drawingContext.clip();
      rect(sx_, sy_, size, size, sx(radius));
      drawingContext.restore();
    }
  }
  
  if (paletteHoldSquare !== null && paletteHoldTimer > 0) {
    let sq = paletteSquares[paletteHoldSquare];
    if (sq) {
      let slot = (sq.index - palettePage * (cols * 3 - 1)) + 1;
      let c = slot % cols;
      let r = floor(slot / cols);
      let sx_ = sx(x + c * (slotW + gap));
      let sy_ = sx(y + r * (slotH + gap));
      let size = sx(slotW);
      let progress = paletteHoldTimer / PALETTE_HOLD_MS;
      push();
      noFill();
      stroke(255, 255, 255, 180);
      strokeWeight(sx(6));
      arc(sx_ + size / 2, sy_ + size / 2, size * 0.6, size * 0.6,
          -HALF_PI, -HALF_PI + TWO_PI * progress);
      pop();
    }
  }
  
}

function openColorPicker(sq, screenX, screenY) {
  document.querySelectorAll('.tempColorInput').forEach(i => i.remove());
  let canvasRect = cnv.elt.getBoundingClientRect();
  const scaleX = cnv.width / canvasRect.width;
  const scaleY = cnv.height / canvasRect.height;

  // use explicit screen coords if provided, otherwise derive from sq position
  let posX = screenX !== undefined ? screenX : sq.x / scaleX;
  let posY = screenY !== undefined ? screenY : sq.y / scaleY;

  let input = document.createElement('input');
  input.type = 'text';
  input.classList.add('tempColorInput');
  input.setAttribute('data-coloris', '');
  let c = sq.color;
  input.value = `#${((1 << 24) + (c[0] << 16) + (c[1] << 8) + c[2])
    .toString(16).slice(1).toUpperCase()}`;
  input.style.position = 'fixed';
  input.style.left = `${canvasRect.left + posX}px`;
  input.style.top  = `${canvasRect.top  + posY}px`;
  input.style.opacity = '0';
  input.style.width = '1px';
  input.style.height = '1px';
  input.style.border = 'none';
  input.style.padding = '0';
  input.style.margin = '0';
  document.body.appendChild(input);
  Coloris({ el: input });
  input.addEventListener('input', () => {
    let rgb = hexToRgb(input.value);
    const newCol = [rgb.r, rgb.g, rgb.b];
    if (sq.isBg) {
      sq.color = newCol;
      bgColor = newCol;
    } else {
      const oldCol = sq.color;
      sq.color = newCol;
      if (sq.index >= 0 && sq.index < palette.length) {
        palette[sq.index] = newCol;
      }
      for (let p of particles) {
        if (p.paletteIndex === sq.index) p.col = newCol;
      }
      for (let i = 0; i < tankQueue.length; i++) {
        if (tankQueue[i][0] === oldCol[0] &&
            tankQueue[i][1] === oldCol[1] &&
            tankQueue[i][2] === oldCol[2]) {
          tankQueue[i] = [...newCol];
        }
      }
      if (tankDisplayCol[0] === oldCol[0] &&
          tankDisplayCol[1] === oldCol[1] &&
          tankDisplayCol[2] === oldCol[2]) {
        tankDisplayCol = [...newCol];
      }
      clearTintCache();
    }
  });
  input.addEventListener('coloris:close', () => input.remove());
  input.click();
}


function removePaletteColor(index) {
  let sq = paletteSquares[index];
  if (!sq || sq.isBg) return;
  if (palette.length <= 1) return;
  let paletteIdx = sq.index;
  const removedCol = sq.color;
  palette.splice(paletteIdx, 1);
  colorCount = max(1, colorCount - 1);

  for (let p of particles) {
    if (p.paletteIndex === paletteIdx) {
      if (palette.length > 0) {
        const closest = getClosestColor(removedCol, palette);
        const newIdx = palette.findIndex(c =>
          c[0] === closest[0] && c[1] === closest[1] && c[2] === closest[2]);
        p.col = [...closest];
        p.paletteIndex = newIdx;
      } else {
        p.paletteIndex = null;
      }
    } else if (p.paletteIndex > paletteIdx) {
      p.paletteIndex--;
    }
  }

  // remap tank queue entries that used the removed color
  for (let i = 0; i < tankQueue.length; i++) {
    const c = tankQueue[i];
    if (c[0] === removedCol[0] && c[1] === removedCol[1] && c[2] === removedCol[2]) {
      tankQueue[i] = palette.length > 0
        ? [...getClosestColor(removedCol, palette)]
        : [255, 255, 255];
    }
  }
  if (tankDisplayCol[0] === removedCol[0] &&
      tankDisplayCol[1] === removedCol[1] &&
      tankDisplayCol[2] === removedCol[2]) {
    tankDisplayCol = palette.length > 0
      ? [...getClosestColor(removedCol, palette)]
      : [255, 255, 255];
  }

  if (recolorPaletteIndex === paletteIdx) {
    recolorPaletteIndex = -1;
    recolorCol = null;
  } else if (recolorPaletteIndex > paletteIdx) {
    recolorPaletteIndex--;
  }
  clearTintCache();
  createPaletteSquares(palette);
}

//------

function openColorCountInput(x, y, w, h) {
  if (colorCountInputOpen) return;
  document.querySelectorAll('.colorCountInput').forEach(i => i.remove());
  let canvasRect = cnv.elt.getBoundingClientRect();
  let scaleX = cnv.width / canvasRect.width;
  let scaleY = cnv.height / canvasRect.height;
  let inp = document.createElement('input');
  inp.type = 'number';
  inp.min = 1; inp.max = 256;
  inp.value = colorCount;
  let _cleared = false;
  inp.classList.add('colorCountInput');
  Object.assign(inp.style, {
    position: 'fixed',
    left: `${canvasRect.left + x / scaleX}px`,
    top:  `${canvasRect.top  + y / scaleY}px`,
    width: `${w / scaleX}px`,
    height: `${h / scaleY}px`,
    boxSizing: 'border-box',
    background: '#120e0a',
    color: '#f4b900',
    border: '1px solid #5a462d',
    fontFamily: '"Doto", monospace',
    fontSize: `${20 / scaleY}px`,
    textAlign: 'center',
    outline: 'none',
    padding: '0',
    zIndex: '9999',
    caretColor: '#f4b900',
    MozAppearance: 'textfield',
    appearance: 'textfield'
  });
  document.body.appendChild(inp);
  colorCountInputOpen = true;
  inp.addEventListener('mousedown', e => e.stopPropagation());
  inp.addEventListener('pointerdown', e => e.stopPropagation());
  inp.addEventListener('keydown', e => {
    if (!_cleared && e.key !== 'Backspace' && e.key !== 'Tab'
        && e.key !== 'Enter' && e.key !== 'Escape' && !e.ctrlKey) {
      inp.value = '';
      _cleared = true;
    }
    if (e.key === 'Enter' || e.key === 'Escape') inp.blur();
  });
  inp.addEventListener('change', () => {
    let v = constrain(parseInt(inp.value) || 1, 1, 256);
    colorCount = v;
    updateImageWidth();
  });
  inp.addEventListener('input', () => {
  let v = parseInt(inp.value);
  if (!isNaN(v) && v >= 1 && v <= 256) {
    colorCount = v;
    lastOptionsParticleCount = -1;
    updateImageWidth();
  }
});
  inp.addEventListener('blur', () => {
    let v = constrain(parseInt(inp.value) || 1, 1, 256);
    colorCount = v;
    updateImageWidth();
    inp.remove();
    colorCountInputOpen = false;
  });
  // defer focus so the mousedown that opened this doesn't immediately blur it
  setTimeout(() => { inp.focus(); inp.select(); }, 0);
}
// =====================================================
// MOUSE
// =====================================================
function mousePressed() {
  if (colorCountInputOpen) return;
      
  if (appState === 'title') {
    let btnW = 240, btnH = 52;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 20;
    let gBtnY = btnY + btnH + 14;
    if (mouseX > btnX && mouseX < btnX + btnW &&
        mouseY > btnY && mouseY < btnY + btnH) {
      input.elt.click();
      return;
    }
    

    
    if (mouseX > btnX && mouseX < btnX + btnW &&
        mouseY > gBtnY && mouseY < gBtnY + btnH) {
      window.location.href = 'gallery.html';
      return;
    }
    return; // swallow all other clicks
  }
  if (appState === 'options') {
  computePreviewGeometry();           // ensure previewX/Y/W/H are current
  updateOptionsScale();               // ensure optionsMenuScale + layoutSliderY are current
  let optionsScale = optionsMenuScale;
  let layoutTop = previewY;

  // inverse of the draw transform:
  // translate(width/2, layoutTop), scale(optionsScale), translate(-width/2, -layoutTop)
  let omx = (mouseX - width / 2) / optionsScale + width / 2;
  let omy = (mouseY - layoutTop) / optionsScale + layoutTop;

  let sliderW = min(width * 0.5, 500);
  let sliderX = width / 2 - sliderW / 2;
  let _r = imgOriginal ? imgOriginal.height / imgOriginal.width : 1;
  let _w = max(1, round(sqrt(optionsParticles / _r)));
  let _h = max(1, round(_w * _r));

  let sliderY = layoutSliderY;
sliderW = min(width * 0.5, 500);
sliderX = width / 2 - sliderW / 2;

  if (omy > sliderY - 20 && omy < sliderY + 20 &&
      omx > sliderX && omx < sliderX + sliderW) {
    optionsSliderDragging = true; cursorUsingUI = true;
    let newT = constrain((omx - sliderX) / sliderW, 0, 1);
    optionsParticles = round(OPTIONS_PARTICLES_MIN + (newT * newT) * (OPTIONS_PARTICLES_MAX - OPTIONS_PARTICLES_MIN));
    updateImageWidth(); return;
  }

  let swatchSize = 28;
  if (omx > optionsSwatchX && omx < optionsSwatchX + swatchSize &&
      omy > optionsSwatchY && omy < optionsSwatchY + swatchSize) {
    let bgSq = paletteSquares.find(s => s.isBg);
    if (bgSq) {
      let canvasRect = cnv.elt.getBoundingClientRect();
      let scaleX = cnv.width / canvasRect.width;
      let scaleY = cnv.height / canvasRect.height;
      openColorPicker(bgSq, optionsSwatchX / scaleX, optionsSwatchY / scaleY);
    }
    return;
  }

  let ctrlY = sliderY + 60;
  let toggleW = 160, toggleH = 36;
  let toggleX = width / 2 - toggleW - 10;
  let inputX = width / 2 + 10;
  let arrowW = 28, boxW = 80;
  let lax = inputX, rax = inputX + arrowW + boxW;

  if (omx > toggleX && omx < toggleX + toggleW &&
      omy > ctrlY && omy < ctrlY + toggleH) {
    colorLimitOn = !colorLimitOn;
    lastOptionsParticleCount = -1;
    updateImageWidth(); return;
  }
  if (colorLimitOn && omx > lax && omx < lax + arrowW &&
      omy > ctrlY && omy < ctrlY + toggleH) {
    colorCount = max(1, colorCount - 1);
    lastOptionsParticleCount = -1;
    updateImageWidth(); return;
  }
  if (colorLimitOn && omx > rax && omx < rax + arrowW &&
      omy > ctrlY && omy < ctrlY + toggleH) {
    colorCount = min(256, colorCount + 1);
    lastOptionsParticleCount = -1;
    updateImageWidth(); return;
  }
  let boxX = lax + arrowW;
  if (colorLimitOn && omx > boxX && omx < boxX + boxW &&
      omy > ctrlY && omy < ctrlY + toggleH) {
    openColorCountInput(boxX, ctrlY, boxW, toggleH); return;
  }

  let btnW = 200, btnH = 50;
  let btnX = width / 2 - btnW / 2;
  let btnY = ctrlY + toggleH + 38;
  if (omx > btnX && omx < btnX + btnW &&
      omy > btnY && omy < btnY + btnH) {
    confirmTitleOptions();
    return;
  }

  let niBtnW = 90, niBtnH = 28;
  let niBtnX = sliderX - niBtnW - 16;
  let niBtnY = sliderY - niBtnH / 2;
  if (omx > niBtnX && omx < niBtnX + niBtnW &&
      omy > niBtnY && omy < niBtnY + niBtnH) {
    input.elt.click();
    return;
  }
  return;
}
  
  if (hoveringReset) {
  for (let p of particles) {
    let i = particles.indexOf(p);
    let px = (i % img.width) * cellSize + offsetX;
    let py = Math.floor(i / img.width) * cellSize + offsetY;
    p.x = px;
    p.y = py;
    p.vx = 0;
    p.vy = 0;
  }
  return;
}
  if (hoveringSlider) {
    draggingSlider = true;
    return;
  }
  if (hoveringLever && !leverPosted) {
    leverDragging = true;
    leverVel=0;
    return;
  }
  
  let dialX = sx(DIAL_NATURAL.x);
let dialY = sx(DIAL_NATURAL.y);
let dialW = sx(DIAL_NATURAL.w);
let dialH = sx(DIAL_NATURAL.h);
if (mouseX > dialX && mouseX < dialX + dialW &&
    mouseY > dialY && mouseY < dialY + dialH) {
  dialDragging = true;
  cursorUsingUI = true;
  dialDragStartX = mouseX;
  dialDragToolStart = getToolIndex();
  return;
}
  
  if (selectedTool === 'spawn') {
  spawnTimer = SPAWN_INTERVAL;
  }
  if (screenshotMode) {
    cropStart = { x: mouseX, y: mouseY };
    return;
  }
  
  for (let i = 0; i < TOOLS.length; i++) {
  let tool = TOOLS[i];
  let pos = TOOL_ICONS_NATURAL[i];
  let x = sx(pos.x), y = sx(pos.y);
  let w = sx(tool.w), h = sx(tool.h);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (tool.name !== selectedTool) {
    recolorCol = null;
    recolorPaletteIndex = -1;
  }
  selectedTool = tool.name;
  if (tool.name === 'recolor' && recolorCol === null && palette.length > 0) {
    recolorCol = [...palette[0]];
    recolorPaletteIndex = 0;
  }
    return;
  }
}
  
  if (selectedTool === 'bounds' && mouseX > sidebarDisplayW && boundsRects.length < 99) {
  boundsDrawStart = { x: mouseX, y: mouseY };
  return;
}
  
  let laX = sx(LEFT_ARROW_NATURAL.x), laY = sx(LEFT_ARROW_NATURAL.y);
let laW = sx(LEFT_ARROW_NATURAL.w), laH = sx(LEFT_ARROW_NATURAL.h);
if (mouseX > laX && mouseX < laX + laW && mouseY > laY && mouseY < laY + laH) {
  if (!leftArrowDisabled()) {
    if (selectedTool === 'bounds') {
      boundsRects.pop();
    } else {
      let tool = TOOL_STRENGTHS[selectedTool];
      tool.value = constrain(tool.value - tool.step, tool.min, tool.max);
    }
  }
  arrowHoldActive = 'left';
  return;
}
let raX = sx(RIGHT_ARROW_NATURAL.x), raY = sx(RIGHT_ARROW_NATURAL.y);
let raW = sx(RIGHT_ARROW_NATURAL.w), raH = sx(RIGHT_ARROW_NATURAL.h);
if (mouseX > raX && mouseX < raX + raW && mouseY > raY && mouseY < raY + raH) {
  if (!rightArrowDisabled()) {
    let tool = TOOL_STRENGTHS[selectedTool];
    tool.value = constrain(tool.value + tool.step, tool.min, tool.max);
  }
  arrowHoldActive = 'right';
  return;
}
  // BITS NEW BUTTON
  
  if (mouseX > nbX && mouseX < nbX + nbW &&
    mouseY > nbY && mouseY < nbY + nbH) {
  appState = 'options';
    updateOptionsScale();
  updateImageWidth();
  return;
}
  
  // drag on tool strength 7seg
  
  if (mouseX > sdX && mouseX < sdX + sx(67) * 2 &&
    mouseY > sdY && mouseY < sdY + sx(120)) {
  let tool = TOOL_STRENGTHS[selectedTool];
  if (tool && tool.value !== null && selectedTool !== 'bounds') {
    strengthDragging = true;
    cursorUsingUI = true;
    strengthDragStartX = mouseX;
    strengthDragStartVal = tool.value;
    return;
  }
}
  // palette page buttons
  
  // page up
let puX = sx(PAGE_UP_NATURAL.x), puY = sx(PAGE_UP_NATURAL.y);
let puW = sx(PAGE_UP_NATURAL.w), puH = sx(PAGE_UP_NATURAL.h);
if (mouseX > puX && mouseX < puX + puW && mouseY > puY && mouseY < puY + puH) {
  if (palettePage > 0) {
    palettePage--;
    createPaletteSquares(palette);
  }
  pageHoldActive = 'up';
  pageHoldTimer = 0;
  pageHoldIntervalTimer = 0;
  return;
}
// page down
let totalPages = max(1, ceil(palette.length / (PALETTE_NATURAL.cols * PALETTE_NATURAL.rows - 1)));
let pdX = sx(PAGE_DOWN_NATURAL.x), pdY = sx(PAGE_DOWN_NATURAL.y);
let pdW = sx(PAGE_DOWN_NATURAL.w), pdH = sx(PAGE_DOWN_NATURAL.h);
if (mouseX > pdX && mouseX < pdX + pdW && mouseY > pdY && mouseY < pdY + pdH) {
  if (palettePage < totalPages - 1) {
    palettePage++;
    createPaletteSquares(palette);
  }
  pageHoldActive = 'down';
  pageHoldTimer = 0;
  pageHoldIntervalTimer = 0;
  return;
}
  
  let addX = sx(PALETTE_NATURAL.x), addY = sx(PALETTE_NATURAL.y);
  let addSize = sx(PALETTE_NATURAL.slotW);
  if (mouseX > addX && mouseX < addX + addSize &&
      mouseY > addY && mouseY < addY + addSize) {
    const newCol = [255, 255, 255];
    palette.push(newCol);
    colorCount++;
    createPaletteSquares(palette);
    // jump to the page containing the new color
    const slotsPerPage = PALETTE_NATURAL.cols * PALETTE_NATURAL.rows - 1;
    palettePage = floor((palette.length - 1) / slotsPerPage);
    createPaletteSquares(palette);
    // find the new square and open the picker
    const newSq = paletteSquares.find(s => s.index === palette.length - 1);
    if (newSq) openColorPicker(newSq);
    return;
  }
  //------
  for (let i = 0; i < paletteSquares.length; i++) {
  let sq = paletteSquares[i];
  if (mouseX >= sq.x && mouseX <= sq.x + sq.size &&
      mouseY >= sq.y && mouseY <= sq.y + sq.size) {
    if (selectedTool === 'recolor' && mouseButton === LEFT) {
      recolorCol = [...sq.color];
      recolorPaletteIndex = sq.isBg ? -1 : sq.index;
    } else if (mouseButton === RIGHT && !sq.isBg) {
      removePaletteColor(i);
    } else if (mouseButton === LEFT) {
      paletteHoldSquare = i;
      paletteHoldTimer = 0;
      openColorPicker(sq);
    }
    break;
  }
}
}


function mouseReleased() {
  
  arrowHoldActive = null;
  pageHoldActive = null;
  pageHoldTimer = 0;
  pageHoldIntervalTimer = 0;
  arrowHoldTimer = 0;
  arrowHoldIntervalTimer = 0;
  
  cursorUsingUI = false;
  
  draggingSlider = false;
  if (optionsSliderDragging) {
    optionsSliderDragging = false;
    if (appState === 'options') { updateImageWidth(); }
  } else {
    optionsSliderDragging = false;
  }
  strengthDragging = false;
  dialDragging = false;
  if (leverDragging) {
  leverDragging = false;
  if (leverT < 2) {
    lightState = 'red';
    lightTimer = millis();
    return;
  }
  if (!particles.length) {
    lightState = 'red';
    lightTimer = millis();
    return;
  }
  if (postCooldown) {
    lightState = 'red';
    lightTimer = millis();
    return;
  }
  lightState = 'yellow';
  postToGallery();
  }
  
  if (selectedTool === 'bounds' && boundsDrawRect) {
  boundsRects.push({ ...boundsDrawRect });
  boundsDrawStart = null;
  boundsDrawRect = null;
}
}
function mouseDragged() {
  
  if (dialDragging) {
  let dragDelta = mouseX - dialDragStartX;
  let stepsPerTool = 40; // px to drag per tool step, adjust to taste
  let newIndex = constrain(
    dialDragToolStart + round(dragDelta / stepsPerTool),
    0, TOOLS.length - 1
  );
  selectedTool = TOOLS[newIndex].name;
}
  
  if (selectedTool === 'bounds' && boundsDrawStart) {
  boundsDrawRect = {
    x: min(mouseX, boundsDrawStart.x),
    y: min(mouseY, boundsDrawStart.y),
    w: abs(mouseX - boundsDrawStart.x),
    h: abs(mouseY - boundsDrawStart.y)
  };
}
  
  if (!screenshotMode || !cropStart) return;
  cropRect = {
    x: min(mouseX, cropStart.x),
    y: min(mouseY, cropStart.y),
    w: abs(mouseX - cropStart.x),
    h: abs(mouseY - cropStart.y)
  };
}
function keyPressed() {
  if (!screenshotMode) return;
  if (keyCode === ENTER && cropRect) saveCrop();
  if (keyCode === 80 && cropRect) postToGallery();
  if (keyCode === ESCAPE) exitScreenshot();
}
// =====================================================
// GALLERY
// =====================================================
async function postToGallery() {
  if (!img || !particles.length) return;
  let waited = 0;
  while (!window._db && waited < 3000) {
    await new Promise(r => setTimeout(r, 100));
    waited += 100;
  }
  if (!window._db) {
    console.warn('Firebase not initialised — check your config');
    return;
  }
  postStatus = 'posting';
  const normalised = particles.map(p => ({
    gx: (p.x - offsetX) / scaleFactor,
    gy: (p.y - offsetY) / scaleFactor,
    col: { r: p.col[0], g: p.col[1], b: p.col[2] },
    paletteIndex: p.paletteIndex ?? null
  }));
  const postData = {
    particles: normalised,
    palette: palette.map(c => ({ r: c[0], g: c[1], b: c[2] })),
    tankQueue: tankQueue.map(c => ({ r: c[0], g: c[1], b: c[2] })),
    scaleFactor,
    imgWidth: img.width,
    imgHeight: img.height,
    likes: 0,
    timestamp: window._fsTimestamp()
  };
  try {
  await window._fsAddDoc(
    window._fsCollection(window._db, 'posts'),
    postData
  );
  lightState = 'green';
  localStorage.setItem('last_post_time', Date.now());
} catch (err) {
  console.error('Post failed:', err);
  lightState = 'red';
  lightTimer = millis();
}
  setTimeout(() => { postStatus = ''; }, 3000);
}
function loadPostFromGallery(post) {
  const { particles: saved, palette: savedPalette, scaleFactor: sc, imgWidth, imgHeight } = post;
  if (!saved?.length) return;

  img = { width: imgWidth, height: imgHeight };
  scaleFactor = sc;
  palette = (savedPalette || []).map(c => Array.isArray(c) ? c.slice() : [c.r, c.g, c.b]);
  imageLoaded = true;
  appState = 'editor';

  centerGrid(); // now runs with real width/height since setup deferred us

  particles = saved.map(p => ({
    x: p.gx * scaleFactor + offsetX,  // offsetX/Y now correct
    y: p.gy * scaleFactor + offsetY,
    vx: 0, vy: 0,
    col: Array.isArray(p.col) ? p.col.slice() : [p.col.r, p.col.g, p.col.b],
    paletteIndex: p.paletteIndex ?? null,
    dir: 1, stage: 3,
    idleOffset: Math.floor(Math.random() * 8),
    animFrame: 0, animTimer: 0,
    walking: false, walkTimer: 0
  }));

  createPaletteSquares(palette);
  tankQueue = (post.tankQueue || []).map(c => Array.isArray(c) ? c.slice() : [c.r, c.g, c.b]);
  tankCount = tankQueue.length;
  tankDisplayCol = tankQueue.length > 0 ? [...tankQueue[0]] : [255, 255, 255];
  clearTintCache();
}
// =====================================================
// COLOR HELPERS
// =====================================================
function generateDitheredPalette(img, k) {
  let pixels = [];
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    pixels.push([img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]]);
  }
  let centroids = Array.from({ length: k }, () => random(pixels));
  for (let iter = 0; iter < 5; iter++) {
    let groups = Array.from({ length: k }, () => []);
    for (let p of pixels) {
      let best = 0, bestDist = Infinity;
      for (let i = 0; i < k; i++) {
        let dx = p[0] - centroids[i][0];
        let dy = p[1] - centroids[i][1];
        let dz = p[2] - centroids[i][2];
        let d = dx * dx + dy * dy + dz * dz;
        if (d < bestDist) { bestDist = d; best = i; }
      }
      groups[best].push(p);
    }
    for (let i = 0; i < k; i++) {
      if (!groups[i].length) continue;
      let r = 0, g = 0, b = 0;
      for (let p of groups[i]) { r += p[0]; g += p[1]; b += p[2]; }
      centroids[i] = [r / groups[i].length, g / groups[i].length, b / groups[i].length];
    }
  }
  return centroids;
}
function getClosestColor(col, palette) {
  let best = palette[0], bestDist = Infinity;
  for (let c of palette) {
    let dx = col[0] - c[0], dy = col[1] - c[1], dz = col[2] - c[2];
    let d = dx * dx + dy * dy + dz * dz;
    if (d < bestDist) { bestDist = d; best = c; }
  }
  return best;
}
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  let num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}
Coloris({
  theme: 'polaroid',
  themeMode: 'dark',
  alpha: false,
  format: 'hex'
});
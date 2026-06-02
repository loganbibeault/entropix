let optionsMenuScale = 1;

let layoutSliderY = 0; // fixed Y position for slider and everything below

const OPTIONS_PREVIEW_SIZE = 400; // fixed square size in pixels — adjust to taste

const GALLERY_BTN_NATURAL = {
  rightMargin: 80,  // distance from right edge of screen
  y: 80,
  w: 400,
  h: 200,
};
// =====================================================
// GLOBAL STATE — SIDEBAR DIMENSIONS
// =====================================================
let pageHoldActive = null;
let pageHoldTimer = 0;
let pageHoldIntervalTimer = 0;

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

const TITLE_ANIM_NATURAL = { x: 230, y: 360, w: 1300, h: 300 };
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
const OPTIONS_CONTROLS_Y = 0.62; // fraction of screen height — adjust to taste
// =====================================================
// COLOR PANEL
// =====================================================
const PALETTE_COUNT_NATURAL = { x: 322, y: 2757 }; // adjust to taste
const PALETTE_PAGE_NATURAL  = { x: 676, y: 2893 }; // adjust to taste

let paletteHoldSquare = null;
let paletteHoldTimer = 0;
const PALETTE_HOLD_MS = 1000;
let paletteTemp = []; // true for colors not yet used by any particle

const PAGE_UP_NATURAL   = { x: 677, y: 2800, w: 127, h: 80 };
const PAGE_DOWN_NATURAL = { x: 677, y: 3018, w: 127, h: 80 };
let pageUpImgs = {};
let pageDownImgs = {};

let recolorCleanupTimer = 0;
const RECOLOR_CLEANUP_INTERVAL = 500; // ms
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
const TANK_DISPLAY_NATURAL = { x: 456, y: 2470 };


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
// GLOBAL STATE — MENU
// =====================================================



let appState = 'boot'; // 'boot' | title' | 'options' | 'fading' | 'editor'
let titleFade = 0;
let titleScreenImg = null; // holds the loaded image before committing it


let optionsParticles = 400;
const OPTIONS_PARTICLES_MIN = 1;
const OPTIONS_PARTICLES_MAX = 2500;
let optionsSliderDragging = false;

let lastOptionsParticleCount = -1
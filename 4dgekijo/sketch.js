// Global Variables
let gCanvasSize = [1600, 900]; // Canvas size
let gPlayerList = []; // List of players
let PAGE_MAX = 4; // Maximum number of pages
let gPageList = []; // List to store objects for each page
let gPageIndex = 0; // Index of the currently displayed page
let buttonA = 0; // Variable for button A state
let buttonB = 0; // Variable for button B state

// Function to load an image for a given page number
function getImg(page_no){
    // Assuming images are stored in "assets/page_no.jpg"
    let img = loadImage(page_no + ".jpg");
    return img; 
}

// Function to load text for a given page number
function getText(page_no){
    // Assuming texts are stored in "assets/page_no.txt"
    let txt = loadStrings(page_no + ".txt");
    return txt;
}

// Function to load all contents
function loadContents(){
    for(let i = 0; i < PAGE_MAX; i++){
        let page = {}; // Create a new page object
        // Load image
        let img = getImg(i);
        if(img != null){
            page.image = img;
        } else {
            console.log("Image load error. Page =", i);
        }
        // Load text
        let txt = getText(i);
        if(txt != null){
            page.text = txt;
        } else {
            console.log("Text load error. Page =", i);
        }
        gPageList.push(page);
    }
}

// p5.js preload function
function preload() {  
    loadContents(); // Load content for all pages
}

// p5.js setup function
function setup() {
    createCanvas(gCanvasSize[0], gCanvasSize[1]);
    updateTextAndImage(); // Update comic display and play sound
}

// p5.js draw function
function draw() {
    if (buttonB === 1) {
        // Move to the next comic panel
        gPageIndex = (gPageIndex + 1) % PAGE_MAX; 
        updateTextAndImage();
        buttonB = 0;
        //Send bluetooth message only forward move
        sendCmd("", "p", gPageIndex);
    } else if (buttonA === 1) {
        // Move to the previous comic panel
        gPageIndex = (gPageIndex - 1 + PAGE_MAX) % PAGE_MAX; 
        updateTextAndImage();
        buttonA = 0;
    }
}

// Keyboard input handling for comic navigation
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        // Move to the next comic panel
        gPageIndex = (gPageIndex + 1) % PAGE_MAX; 
        updateTextAndImage();
         //Send bluetooth message only forward move
        sendCmd("", "p", gPageIndex);
    } else if (keyCode === LEFT_ARROW) {
        // Move to the previous comic panel
        gPageIndex = (gPageIndex - 1 + PAGE_MAX) % PAGE_MAX; 
        updateTextAndImage();
    }
}

// Function to update the text box and image
function updateTextAndImage() {
    background(240, 240, 200);
    let currentPage = gPageList[gPageIndex]; // Get current page
    let tText = currentPage.text.join('\n'); // Join text with line breaks
    let textPos = [920, 100]; // Text display start position
    let textBoxWidth = 600; // Width of the text box
    let tSize = 40; // Text size

    // Draw text box and image
    drawTextBox(tText, textPos[0], textPos[1], textBoxWidth, tSize);
    image(currentPage.image, 0, 0, 900, 900);
}

// Function to draw a text box with word wrapping
function drawTextBox(txt, x, y, w, tSize) {
    textAlign(LEFT);
    textSize(tSize);
    let lineHeight = tSize; // Line height
    let currentLine = '';
    let currentX = x;

    for (let i = 0; i < txt.length; i++) {
        let char = txt[i];
        if (char === '\n') {
            text(currentLine, x, y); // Draw line at newline character
            currentLine = '';
            y += lineHeight;
            currentX = x;
            continue;
        }
        let charWidth = textWidth(char);
        if (currentX + charWidth > x + w) {
            text(currentLine, x, y); // Draw line when exceeding box width
            currentLine = char;
            y += lineHeight;
            currentX = x + charWidth;
        } else {
            currentLine += char; // Add character to current line
            currentX += charWidth;
        }
    }
    text(currentLine, x, y); // Draw any remaining text
}

document.addEventListener('DOMContentLoaded', function () {
  let dropZone = document.getElementById('drop_zone');

  dropZone.addEventListener('dragover', (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
  });

  dropZone.addEventListener('drop', (e) => {
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files;

      for (let file of files) {
          if (file.type.match('image.*')) {
              let reader = new FileReader();

              reader.onload = ((theFile) => {
                  return (e) => {
                      saveImage(e.target.result, str(gPageIndex) + '.jpg');
                  };
              })(file);

              reader.readAsDataURL(file);
          }
      }
  });
});

function saveImage(dataURL, filename) {
  let link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function saveText() {
  let text = document.getElementById('textInput').value;
  let filename = str(gPageIndex)+'.txt';
  
  let blob = new Blob([text], { type: 'text/plain' });
  let url = window.URL.createObjectURL(blob);

  let link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}


let gCanvasSize = [1600, 1200]; //全体のキャンバスサイズ
let gTextCanvasSize =[600, 600]; //テキストのキャンバスサイズ
let gImgCanvasSize =[600, 600]; //画像のキャンバスサイズ

let gPlayerList = [];//プレイヤーのリスト

let PAGE_MAX = 2; //ページの最大数
let gPageList = []; //ページごとのオブジェクトを格納するリスト
let gPageIndex = 1; //表示するページ番号

let isClicked = false;

//画像を取得する
//page_no:取得するページの番号 1〜
function getImg(page_no){
  //asset/page_noに画像があることとする。
  img = loadImage("assets/"+page_no+"/"+page_no+".png");
  return img; 
}

//テキストを取得する
//page_no:取得するページの番号 1〜
function getText(page_no){
  //asset/page_noに画像があることとする。
  //フォルダの確認
  txt =  loadStrings("assets/"+page_no+"/"+page_no+".txt");
  //txt =  loadStrings("assets/1/1.txt");
  //console.log(txt)
  
  return txt;
}

//データの読み込みを行う
function loadContents(){
  for(let i=1; i<=PAGE_MAX; i++){
    let page = new Page();
    //画像の読み込み
    img = getImg(i);
    if(img!=null){
      page.image = img;
    }else{
      console.log("img load error. page=",i);
    }

    //テキストの読み込み
    let txt = getText(i);
  
    if(txt!=null){
      page.text = txt;
      console.log("text=",page.text);
    }else{
      console.log("text load error. page=",i);
    }
    gPageList.push(page);
  }
}

//アセットの読み込み、各種情報の初期化
function preload() {

  //コンテンツの読み込み
  loadContents();

  //フレームレートの設定
  frameRate(15);
}

//画面関連の初期化
function setup() {
  createCanvas(gCanvasSize[0], gCanvasSize[1]);

  //前ボタン
  let preButton = createButton('前');
  preButton.position(150, 800); // ボタンの位置を指定
  preButton.style('width', '100px');
  preButton.style('height', '50px');
  preButton.style('font-family', 'Arial'); // フォントファミリーをArialに設定
  preButton.style('font-size', '40px'); // フォントサイズを20pxに設定
  preButton.mousePressed(() => {
    if(1<gPageIndex){
      gPageIndex--;
      console.log("page=", gPageIndex);
    }
  });

   //次ボタン
   let nextButton = createButton('次');
   nextButton.position(300, 800); // ボタンの位置を指定
   nextButton.style('width', '100px');
   nextButton.style('height', '50px');
   nextButton.style('font-family', 'Arial'); // フォントファミリーをArialに設定
   nextButton.style('font-size', '40px'); // フォントサイズを20pxに設定
   nextButton.mousePressed(() => {
    if(gPageIndex<PAGE_MAX){
      gPageIndex++;
      console.log("page=", gPageIndex);
    }  
  }); 
}

//描画処理
function draw() {
  background(240, 240, 200);
  
  let tPage = gPageList[gPageIndex-1];
  //現在のページの表示
  textAlign(LEFT);
  textSize(20);
  text("page="+gPageIndex, 100, 100); 

  //文章の表示
  let tText = tPage.text;
  //console.log("tmpTxt=", tText);
  textAlign(LEFT);
  textSize(20);
  let textPos = [100, 200]; 
  //let textBoxSize = [gCanvasSize[0]/2-100, ]
  //テキストをテキストキャンバスで描画する
  let joinedText = tText.join("\n");
  text(joinedText, textPos[0], textPos[1], gTextCanvasSize[0], gTextCanvasSize[1]); 
  
  //画像の表示
  let tImg = tPage.image;
  let imgPos = [gCanvasSize[0]/2, 200]; //imageの表示開始ポジション
  if(tImg!=null){
    image(tImg, imgPos[0], imgPos[1], tImg.width, tImg.height);
  }
}

function keyPressed() {
  console.log("key=", key, keyCode);
  if (key == "Enter") {
    console.log("play current gakki_set");
    //全てロードしているか確認する
    var loadFg = true;
    for (let elem of gGakkiList) {
      if (!elem.sound.isLoaded()) {
        loadFg = false;
      }
    }
  }
  
  //micro:bit通信テスト用
  if (key == "p") {
    console.log("send p");
    //sendCmd("", "p", 0);
    for (const player of gPlayerList) {
      sendCmd(player.devname, "p", 2);  
    }
  }
}

function mouseClicked() {
  console.log("mouseCliced");
}

function isMousePosRange(position, range) {
  if ((mouseX >= (position[0] - range[0] * 0)) && (mouseX <= (position[0] + range[0]))) {
    if ((mouseY >= (position[1] - range[1] * 0)) && (mouseY <= (position[1] + range[1]))) {
      return true;
    }
  }
  return false;
}
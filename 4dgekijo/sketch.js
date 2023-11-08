//let KYOKU = 'BELL';
// let KYOKU = 'CHAIRO';
// let KYOKU = 'SEIJA';
 let KYOKU = 'HOSHI';

// let ONSHITSU = 'NORMAL'; // 通常音質
// let ONSHITSU = 'LIGHT'; // 処理落ちするとき用の音質

let gCoolCount = 0;


let gCanvasSize = [1600, 1200]; //キャンバスサイズ

let gPlayerList = [];//プレイヤーのリスト
let gGakkiList = [];//楽器のリスト
let gOverlayimgList = [];

let gUiImgList = [];// UIイメージオブジェクトを格納するリスト
let gIconImgList = [];// UIイメージオブジェクトを格納するリスト
let gOtherImgList = [];

let gColorCheckActive = false;

let PAGE_MAX = 1; //ページの最大数
let gPageList = []; //ページごとのオブジェクトを格納するリスト
let gPageIndex = 1; //表示するページ番号

let imgTest;
let song;

let isClicked = false;

//楽器種別
const Gakki_Kind = {
  None: 0, Piano: 1, Metallophone0: 2, Saxophone: 3, Triangle0: 4,
  Tambourine0: 5, Drum0: 6, Trumpet0: 7, Trombone0: 8, Violin0: 9, Drumset: 10, Hihat: 11,
  Keyboard: 12, Cello: 13, Base: 14, Clarinet: 15, Cymbal: 16, Guitar: 17, Harp: 18, Horn: 19,
  Mokkin: 20, Tekkin: 21, Tuba: 22, Flote: 23, Timpani: 24, Synthesizer: 25, Tubularbell: 26, Windchime: 27
};

const GAKKI_SET = [
  { "imgDirectory": ["assets/Gakki/drum_gray.png", "assets/Gakki/drum.png"], "gakki": Gakki_Kind.Drum0 },
  { "imgDirectory": ["assets/Gakki/drumset_gray.png", "assets/Gakki/drumset.png"], "gakki": Gakki_Kind.Drumset }
]

const UI_IMG_SET = ['assets/UI/red.png', 'assets/UI/green.png', 'assets/UI/blue.png', 'assets/UI/empty.png', 'assets/UI/dodai.png']
const ICON_IMG_SET = ['assets/UI/player0.png', 'assets/UI/player1.png', 'assets/UI/player2.png', 'assets/UI/player3.png']
const OTHER_IMG_SET = ['assets/backimg.png', 'assets/backimg_merry.png']

//曲のセットを行進する
function updateSoundSet(sound_set) {
  gGakkiList = [];

  for (elem of sound_set) {
    gakki = new Gakki();
    gakki.setKind(elem["gakki"]);
    for (color of elem["color"]) {
      gakki.addColor(color);
    }
    gakki.setSoundName(elem["sound"]);
    gakki.setPos(elem["pos"]);
    gakki.setColorMatched(elem["colorMatched"])
    for (gakki_set of GAKKI_SET) {
      if (elem["gakki"] == gakki_set["gakki"]) {
        gakki.setImgDir(gakki_set["imgDirectory"])
        break;
      }
    }
    // gakki.setImgDir(elem["imgDirectory"])
    gakki.setImg();
    gGakkiList.push(gakki);
  }
}

function updatePlayerSet(player_set) {
  let i = 0;
  let playerSet = [];
  for (p of gPlayerList) {
    playerSet = player_set[i];
    p.updateGakki(playerSet["gakkis"])
    p.setPos([275 + i * 300, 630]);
    i = i + 1;
    i = Math.min(i, 3);
  }

}

//被せる装飾イメージをセットする
function updateOverlayimgSet(img_set) {
  gOverlayimgList = [];

  for (elem of img_set) {
    img = new Overlayimg();
    for (color of elem["color"]) {
      img.addColor(color);
    }
    img.setPos(elem["pos"]);
    img.setColorMatched(elem["colorMatched"])
    img.setImgDir(elem["imgDirectory"])
    img.setImg();
    gOverlayimgList.push(img);
  }
}

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
  //txt =  loadStrings("assets/"+page_no+"/"+page_no+".txt");
  txt =  loadStrings("assets/1/1.txt");
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
  //楽曲を読み込む
  /*for (let elem of gGakkiList) {
    elem.loadSound();
  }*/
}

//描画処理
function draw() {

  background(240, 240, 200);
  //image(gOtherImgList[0], 0, 0, gOtherImgList[0].width, gOtherImgList[0].height);
  //image(gOtherImgList[1], 0, 0, gOtherImgList[1].width / 6, gOtherImgList[1].height / 6);

  //文章の表示
  tPage = gPageList[gPageIndex-1];
  //console.log("show text. index=", gPageIndex);
  tText = tPage.text;
  console.log("tmpTxt=", tText);
  
  textAlign(CENTER);
  tSize = 20;
  textSize(tSize);
  let textPos = [100, 200]; //txtの表示開始ポジション
 
  for (let i = 0; i < tText.length; i++) {
    if(tText[i]=="") continue;
    console.log("text=",tText[i]);
    text(tText[i], textPos[0], textPos[1]+i*tSize); 
  }

  //現在のプレーヤーの状態で音を変える。

  /*
  let volumes = [100, 100, 100, 100];
  if (gColorCheckActive == true) {
    cntrlSoundByPlayer();

    dispParamDebug();

    let volGain = 0;
    if (second() % 2 == 0) {
      volGain = 255;
    }

    volumes = calcAmpOfPlayers();
    dispGakkiStatus(volumes);
    dispOverlayimgStatus();

  }
  onSendVolume("", volumes);
  dispCurrentPlayerColor(volumes);
  if (countBackImg > 11) {
    image(gOtherImgList[1], 0, 0, gOtherImgList[1].width, gOtherImgList[1].height);
  }
  */

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
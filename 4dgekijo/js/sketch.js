
let gCanvasSize = [1600, 1200]; //全体のキャンバスサイズ
let gTextCanvasSize =[600, 600]; //テキストのキャンバスサイズ
let gImgCanvasSize =[600, 600]; //画像のキャンバスサイズ

let gPlayerList = [];//プレイヤー(micro:bit)のリスト

let PAGE_MAX = 2; //ページの最大数
let gPageList = []; //ページごとのオブジェクトを格納するリスト
let gPageIndex = 1; //表示するページ番号
let gCanvas = null; //メインキャンパス
let gTextBox = null; //テキスト編集・表示用のテキストボックス

//画像を取得する
//page_no:取得するページの番号 1〜
function getAIImage(page_no){
  //作業フォルダに1.pngなどの画像があるとする。
  //ToDo ファイル有無チェック
  img = loadImage(page_no+".png");
  return img; 
}

//画像を保存する
//page_no:取得するページの番号 1〜
//img: 保存イメージ
function saveAIImage(page_no, img){
  //作業フォルダに画像を保存する
  save(img, page_no+".png");
 }

//テキストを取得する
//page_no:取得するページの番号 1〜
function getAIText(page_no){
  //作業フォルダの下に画像があることとする。
  //ToDo ファイル有無チェック
  txt =  loadStrings(page_no+".txt");
  
  return txt;
}

//テキストを保存する
function saveAIText(page_no, txt){
  saveStrings(txt, page_no+".txt");
}

//データの読み込みを行う
function loadContents(){
  //ToDo ページデータが欠けている場合の対応  
  for(let i=1; i<=PAGE_MAX; i++){
    let page = new Page();
    //画像の読み込み
    img = getAIImage(i);
    if(img!=null){
      page.image = img;
    }else{
      console.log("img load error. page=",i);
    }

    //テキストの読み込み
    let txt = getAIText(i);
  
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
  //キャンバス
  gCanvas = createCanvas(gCanvasSize[0], gCanvasSize[1]);
  gCanvas.dragOver(highlight);
  gCanvas.dragLeave(unhighlight);
  gCanvas.drop(handleFiles, unhighlight);

  //テキストボックス
  gTextBox = createInput();
  // テキストフィールドの位置を設定
  gTextBox.position(20, gCanvasSize[1]-200);
  // テキストフィールドのサイズを設定（幅は200ピクセル、高さは50ピクセル）
  gTextBox.size(gCanvasSize[0]/2-200, 100);
  // テキストフィールドのスタイルを設定（フォントサイズ、高さなど）
  gTextBox.style('font-size', '22px');
  gTextBox.style('height', '50px'); // 高さを広げる
  gTextBox.input(textFieldInputEvent);

  //テキスト保存ボタン
  let textSaveButton = createButton('保存');
  textSaveButton.position(gCanvasSize[0]/2-200, gCanvasSize[1]-200); // ボタンの位置を指定
  textSaveButton.style('width', '100px');
  textSaveButton.style('height', '50px');
  textSaveButton.style('font-family', 'Arial'); // フォントファミリーをArialに設定
  textSaveButton.style('font-size', '20px'); // フォントサイズを20pxに設定
  textSaveButton.mousePressed(() => {
      //テキストフィールドの内容を保存する
      saveAIText(gPageIndex, gTextBox.value())
      //テキストフィールドの内容をクリアする。
      gTextBox.value("");

      //テキストフィールドの内容をクリアする。
      gTextBox.value("");
  });


  //前ボタン
  let preButton = createButton('前');
  preButton.position(gCanvasSize[0]/4, gCanvasSize[1]-100); // ボタンの位置を指定
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
   nextButton.position(gCanvasSize[0]*3/4, gCanvasSize[1]-100); // ボタンの位置を指定
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
  textAlign(LEFT);
  textSize(20);
  let textPos = [100, 200]; 
  let textBoxSize = [gCanvasSize[0]/2-100, ]
  //テキストをテキストキャンバスで描画する
  let joinedText = tText.join("\n");
  text(joinedText, textPos[0], textPos[1], gTextCanvasSize[0], gTextCanvasSize[1]); 
   
  //画像の表示
  //ToDo 元画像サイズに関係なく表示枠に合わせて表示するようにする(ex.gImgCanvasSizeの大きさに変換して表示)
  let tImg = tPage.image;
  let imgPos = [gCanvasSize[0]/2, 200]; //imageの表示開始ポジション
  if(tImg!=null){
    image(tImg, imgPos[0], imgPos[1], tImg.width, tImg.height);
  }
}

//キャンバスをハイライト表示(ドラッグアンドドロップ)
function highlight() {
  gCanvas.style('background-color', '#AAA');
}

//キャンバスを非ハイライト表示(ドラッグアンドドロップ)
function unhighlight() {
  gCanvas.style('background-color', '#CCC');
}

//画像をキャンバスにドラグアンドドロップした時の処理
function handleFiles(file) {
  // ドロップされたファイルが画像の場合
  if (file.type === 'image') {
    // p5のloadImage関数を使って画像を読み込み
    let img = loadImage(file.data, img => {
      // 読み込んだ画像を保存
      saveAIImage(gPageIndex, img);
    });

  }
}

// テキストフィールドに入力があったときに呼び出される関数
function textFieldInputEvent() {
  console.log('現在のテキストフィールドの値:', gTextBox.value());
  //テキストフィールドをクリアにする。

}

function keyPressed() {
  console.log("key=", key, keyCode);
  if (key == "Enter") {
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
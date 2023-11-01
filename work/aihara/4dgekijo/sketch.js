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

//アセットの読み込み、各種情報の初期化
function preload() {

  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called

  /*updateOverlayimgSet(OVERLAYIMG_SET);
  for (let imgUiDir of UI_IMG_SET) {
    let imgUi = loadImage(imgUiDir);
    gUiImgList.push(imgUi);
  }

  for (let icon of ICON_IMG_SET) {
    let imgIcon = loadImage(icon);
    gIconImgList.push(imgIcon);
  }

  for (let other of OTHER_IMG_SET) {
    let imgOther = loadImage(other);
    gOtherImgList.push(imgOther);
  }
  */
  frameRate(15);
}

//画面関連の初期化
function setup() {
  createCanvas(gCanvasSize[0], gCanvasSize[1]);
  //楽曲を読み込む
  for (let elem of gGakkiList) {
    elem.loadSound();
  }
}

//描画処理
function draw() {

  // background(240, 240, 200);
  //image(gOtherImgList[0], 0, 0, gOtherImgList[0].width, gOtherImgList[0].height);
  // image(gOtherImgList[1], 0, 0, gOtherImgList[1].width / 6, gOtherImgList[1].height / 6);

  let countBackImg = 0;
  for (let gakki of gGakkiList) {
    if (gakki.colorMatched == true) {
      countBackImg = countBackImg + 1;
    }
  }
  for (let overimg of gOverlayimgList) {
    if (overimg.colorMatched == true) {
      countBackImg = countBackImg + 1;
    }
  }

  fill(255);
  textSize(20);

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
   
  if (key == "p") {
    console.log("send p");
    sendCmd("p", 1);
  }
}


function mouseClicked() {

  console.log("mouseCliced");

}

//プレイヤーの現在の色を使って、playerが利用する楽器を行進する。
function updateGakkiofPlayer(player) {
  //楽器リストの中で、プレイヤーの色に一番近い楽器を取得する。
  //一応、該当する色がなかったら、追加しない。
  var hued = 999; //色相の差分
  var hurc = getHue(player.color);
  var gakki = null;
  var hue = 0;

  for (let elem of gGakkiList) {
    for (let color of elem.colors) {
      hue = getHue(color)
      if (Math.abs(hurc - hue) < hued) {
        hued = Math.abs(hurc - hue);
        gakki = elem;
      }
    }
  }

  //色差分が遠かった場合には、楽器を更新しない。
  if (hued > 100) {
    return;
  }
  // player.updateGakki(gakki.kind);
}


//現在のプレーヤーの状態で音を変える。
function cntrlSoundByPlayer() {
  //現在のプレーヤーが担当している音のみを再生する。
  let isGakkiPlaying = 0;

  if (isClicked == true) {
    for (let gakki of gGakkiList) {
      if (gakki.sound.isPlaying()) {
        isGakkiPlaying = 1;
        gCoolCount = 0;
        break;
      }
    }
    if (isGakkiPlaying == 0) {
      gCoolCount = gCoolCount + 1;
      // console.log("gCoolCount", gCoolCount);
      if (gCoolCount > 50) {
        // console.log("sound start ", millis());
        for (let gakki of gGakkiList) {
          gakki.sound.play();
          // console.log("gakki play ", gakki,  millis());
        }
        //  console.log("sound end", millis());
      }
    }
    for (let gakki of gGakkiList) {
      if (gakki.colorMatched == true) {
        gakki.sound.setVolume(1);
      } else {
        gakki.sound.setVolume(0);
      }

    }

  }
}


function isMousePosRange(position, range) {
  if ((mouseX >= (position[0] - range[0] * 0)) && (mouseX <= (position[0] + range[0]))) {
    if ((mouseY >= (position[1] - range[1] * 0)) && (mouseY <= (position[1] + range[1]))) {
      return true;
    }
  }
  return false;

}


function calcAmpOfPlayers() {
  let amp = [];
  let ampPlayers = [0, 0, 0, 0];
  for (let player of gPlayerList) {
    amp = 0;

    let i = 0;
    for (let gakki of gGakkiList) {
      // if (player.gakkis.indexOf(gakki.kind) != -1) {
      if (i < 2) {
        let gain = 1;
        ampPlayers[3] = ampPlayers[3] + gakki.ampAnalyer.getLevel() * 255 * gain;
        ampPlayers[3] = Math.min(ampPlayers[3], 254);
        ampPlayers[3] = Math.max(ampPlayers[3], 0);
        ampPlayers[3] = Math.trunc(ampPlayers[3]);
      } else if (i < 4) {
        let gain = 1;
        ampPlayers[0] = ampPlayers[0] + gakki.ampAnalyer.getLevel() * 255 * gain;
        ampPlayers[0] = Math.min(ampPlayers[0], 254);
        ampPlayers[0] = Math.max(ampPlayers[0], 0);
        ampPlayers[0] = Math.trunc(ampPlayers[0]);
      } else if (i < 6) {
        let gain = 1;
        ampPlayers[1] = ampPlayers[1] + gakki.ampAnalyer.getLevel() * 255 * gain;
        ampPlayers[1] = Math.min(ampPlayers[1], 254);
        ampPlayers[1] = Math.max(ampPlayers[1], 0);
        ampPlayers[1] = Math.trunc(ampPlayers[1]);
      } else if (i < 8) {
        let gain = 1;
        ampPlayers[2] = ampPlayers[2] + gakki.ampAnalyer.getLevel() * 255 * gain;
        ampPlayers[2] = Math.min(ampPlayers[2], 254);
        ampPlayers[2] = Math.max(ampPlayers[2], 0);
        ampPlayers[2] = Math.trunc(ampPlayers[2]);
      }
      i = i + 1;
    }
    if (amp == 0) {
      amp = 200;
    }
    ampPlayers.push(amp);
  }
  // console.log("ampPlayers: " + ampPlayers);
  return ampPlayers;

}

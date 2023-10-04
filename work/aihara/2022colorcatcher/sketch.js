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
  { "imgDirectory": ["assets/Gakki/drumset_gray.png", "assets/Gakki/drumset.png"], "gakki": Gakki_Kind.Drumset },
  { "imgDirectory": ["assets/Gakki/hihat_gray.png", "assets/Gakki/hihat.png"], "gakki": Gakki_Kind.Hihat },
  { "imgDirectory": ["assets/Gakki/keyboard6_purple_gray.png", "assets/Gakki/keyboard6_purple.png"], "gakki": Gakki_Kind.Synthesizer },
  { "imgDirectory": ["assets/Gakki/music_alto_saxophone_gray.png", "assets/Gakki/music_alto_saxophone.png"], "gakki": Gakki_Kind.Saxophone },
  { "imgDirectory": ["assets/Gakki/music_base_gray.png", "assets/Gakki/music_base.png"], "gakki": Gakki_Kind.Base },
  { "imgDirectory": ["assets/Gakki/music_cello_gray.png", "assets/Gakki/music_cello.png"], "gakki": Gakki_Kind.Cello },
  { "imgDirectory": ["assets/Gakki/music_clarinet_gray.png", "assets/Gakki/music_clarinet.png"], "gakki": Gakki_Kind.Clarinet },
  { "imgDirectory": ["assets/Gakki/music_cymbal_gray.png", "assets/Gakki/music_cymbal.png"], "gakki": Gakki_Kind.Cymbal },
  { "imgDirectory": ["assets/Gakki/music_flute_gray.png", "assets/Gakki/music_flute.png"], "gakki": Gakki_Kind.Flote },
  { "imgDirectory": ["assets/Gakki/music_guitar_lespaul_gray.png", "assets/Gakki/music_guitar_lespaul.png"], "gakki": Gakki_Kind.Guitar },
  { "imgDirectory": ["assets/Gakki/music_harp_gray.png", "assets/Gakki/music_harp.png"], "gakki": Gakki_Kind.Harp },
  { "imgDirectory": ["assets/Gakki/music_horn_gray.png", "assets/Gakki/music_horn.png"], "gakki": Gakki_Kind.Horn },
  { "imgDirectory": ["assets/Gakki/music_mokkin_gray.png", "assets/Gakki/music_mokkin.png"], "gakki": Gakki_Kind.Mokkin },
  { "imgDirectory": ["assets/Gakki/music_piano_gray.png", "assets/Gakki/music_piano.png"], "gakki": Gakki_Kind.Piano },
  { "imgDirectory": ["assets/Gakki/music_tambourine_gray.png", "assets/Gakki/music_tambourine.png"], "gakki": Gakki_Kind.Tambourine0 },
  { "imgDirectory": ["assets/Gakki/music_tekkin_gray.png", "assets/Gakki/music_tekkin.png"], "gakki": Gakki_Kind.Tekkin },
  { "imgDirectory": ["assets/Gakki/music_triangle_gray.png", "assets/Gakki/music_triangle.png"], "gakki": Gakki_Kind.Triangle0 },
  { "imgDirectory": ["assets/Gakki/music_trombone_gray.png", "assets/Gakki/music_trombone.png"], "gakki": Gakki_Kind.Trombone0 },
  { "imgDirectory": ["assets/Gakki/music_trumpet_gray.png", "assets/Gakki/music_trumpet.png"], "gakki": Gakki_Kind.Trumpet0 },
  { "imgDirectory": ["assets/Gakki/music_tuba_gray.png", "assets/Gakki/music_tuba.png"], "gakki": Gakki_Kind.Tuba },
  { "imgDirectory": ["assets/Gakki/music_tubular_bells_chimes_gray.png", "assets/Gakki/music_tubular_bells_chimes.png"], "gakki": Gakki_Kind.Tubularbell },
  { "imgDirectory": ["assets/Gakki/music_violin_gray.png", "assets/Gakki/music_violin.png"], "gakki": Gakki_Kind.Violin0 },
  { "imgDirectory": ["assets/Gakki/windchime_gray.png", "assets/Gakki/windchime.png"], "gakki": Gakki_Kind.Windchime },
  { "imgDirectory": ["assets/Gakki/music_tynpani_gray.png", "assets/Gakki/music_tynpani.png"], "gakki": Gakki_Kind.Timpani }
]

const OVERLAYIMG_SET = [
  { "imgDirectory": ["assets/Overlayimg/christmas_bell_gray.png", "assets/Overlayimg/christmas_bell.png", 'assets/backimg_ribbony.png'], "color": [[240, 217, 255]], "pos": [1138, 408], "colorMatched": false },
  { "imgDirectory": ["assets/Overlayimg/kirakira_gray.png", "assets/Overlayimg/kirakira.png", 'assets/backimg_kirakira.png'], "color": [[150, 170, 255]], "pos": [252, 409], "colorMatched": false },
  { "imgDirectory": ["assets/Overlayimg/onpu_gray.png", "assets/Overlayimg/onpu.png", 'assets/backimg_onpu.png'], "color": [[178, 142, 255]], "pos": [535, 333], "colorMatched": false },
  { "imgDirectory": ["assets/Overlayimg/fuwafuwa_gray.png", "assets/Overlayimg/fuwafuwa.png", 'assets/backimg_fuwafuwa.png'], "color": [[189, 255, 154]], "pos": [845, 333], "colorMatched": false }
]


//曲ごとの定義
//ジングルベル
const BELL_SET = [
  { "sound": "assets/ジングルベル/ドラム1.mp3", "gakki": Gakki_Kind.Hihat, "color": [[249, 255, 70]], "pos": [1340, 172], "colorMatched": false },
  { "sound": "assets/ジングルベル/ドラム2_3.mp3", "gakki": Gakki_Kind.Drum0, "color": [[70, 238, 243]], "pos": [1362, 495], "colorMatched": false },
  { "sound": "assets/ジングルベル/アンティークシンバル1.mp3", "gakki": Gakki_Kind.Mokkin, "color": [[240, 72, 70]], "pos": [40, 173], "colorMatched": false },
  { "sound": "assets/ジングルベル/アンティークシンバル2.mp3", "gakki": Gakki_Kind.Mokkin, "color": [[150, 255, 200]], "pos": [17, 495], "colorMatched": false },
  { "sound": "assets/ジングルベル/グロッケン1_2.mp3", "gakki": Gakki_Kind.Tekkin, "color": [[30, 110, 80]], "pos": [317, 69], "colorMatched": false },
  { "sound": "assets/ジングルベル/ホルン1_2.mp3", "gakki": Gakki_Kind.Horn, "color": [[255, 175, 137]], "pos": [554, 9], "colorMatched": false },
  { "sound": "assets/ジングルベル/ハープ.mp3", "gakki": Gakki_Kind.Harp, "color": [[30, 60, 150]], "pos": [825, 9], "colorMatched": false },
  { "sound": "assets/ジングルベル/ピアノ1_2.mp3", "gakki": Gakki_Kind.Piano, "color": [[255, 174, 202]], "pos": [1062, 68], "colorMatched": false },
]
//茶色の小瓶
const CHAIRO_SET = [
  { "sound": "assets/茶色の小瓶/drumset.mp3", "gakki": Gakki_Kind.Drumset, "color": [[249, 255, 70]], "pos": [1340, 172], "colorMatched": false },
  { "sound": "assets/茶色の小瓶/tuba.mp3", "gakki": Gakki_Kind.Tuba, "color": [[70, 238, 243]], "pos": [1362, 495], "colorMatched": false },
 //  { "sound": "assets/茶色の小瓶/chairo12.mp3", "gakki": Gakki_Kind.Drum0, "color": [[240, 217, 255]], "pos": [1362, 495], "colorMatched": false },
  { "sound": "assets/茶色の小瓶/trumpet1.mp3", "gakki": Gakki_Kind.Trumpet0, "color": [[240, 72, 70]], "pos": [40, 173], "colorMatched": false },
  { "sound": "assets/茶色の小瓶/trombone1.mp3", "gakki": Gakki_Kind.Trombone0, "color": [[99, 255, 127]], "pos": [17, 495], "colorMatched": false },
 //  { "sound": "assets/茶色の小瓶/chairo3.mp3", "gakki": Gakki_Kind.Horn, "color": [[122, 114, 255]], "pos": [252, 409], "colorMatched": false },
  { "sound": "assets/茶色の小瓶/trumpet2.mp3", "gakki": Gakki_Kind.Trumpet0, "color": [[30, 188, 90]], "pos": [317, 69], "colorMatched": false },
  { "sound": "assets/茶色の小瓶/trombone2.mp3", "gakki": Gakki_Kind.Trombone0, "color": [[255, 175, 137]], "pos": [554, 9], "colorMatched": false },
//  { "sound": "assets/茶色の小瓶/chairo6.mp3", "gakki": Gakki_Kind.Horn, "color": [[178, 142, 255]], "pos": [535, 333], "colorMatched": false },
  { "sound": "assets/茶色の小瓶/horn.mp3", "gakki": Gakki_Kind.Horn, "color": [[70, 76, 240]], "pos": [825, 9], "colorMatched": false },
  { "sound": "assets/茶色の小瓶/piano8_9.mp3", "gakki": Gakki_Kind.Piano, "color": [[255, 174, 202]], "pos": [1062, 68], "colorMatched": false }
//   { "sound": "assets/茶色の小瓶/chairo9.mp3", "gakki": Gakki_Kind.Piano, "color": [[189, 255, 154]], "pos": [845, 333], "colorMatched": false }
]

const SEIJA_SET = [
  { "sound": "assets/聖者の行進/ドラム1_2_3_ディンパニー.mp3", "gakki": Gakki_Kind.Drumset, "color": [[249, 255, 70]], "pos": [1340, 172], "colorMatched": false },
  { "sound": "assets/聖者の行進/チューバ.mp3", "gakki": Gakki_Kind.Tuba, "color": [[70, 238, 243]], "pos": [1362, 495], "colorMatched": false },
  { "sound": "assets/聖者の行進/ギター1_2.mp3", "gakki": Gakki_Kind.Guitar, "color": [[240, 72, 70]], "pos": [40, 173], "colorMatched": false },
  { "sound": "assets/聖者の行進/サックス.mp3", "gakki": Gakki_Kind.Saxophone, "color": [[99, 255, 127]], "pos": [17, 495], "colorMatched": false },
  { "sound": "assets/聖者の行進/トランペット.mp3", "gakki": Gakki_Kind.Trumpet0, "color": [[30, 188, 90]], "pos": [317, 69], "colorMatched": false },
  { "sound": "assets/聖者の行進/トロンボーン.mp3", "gakki": Gakki_Kind.Trombone0, "color": [[255, 175, 137]], "pos": [554, 9], "colorMatched": false },
  { "sound": "assets/聖者の行進/クラリネット.mp3", "gakki": Gakki_Kind.Clarinet, "color": [[70, 76, 240]], "pos": [825, 9], "colorMatched": false },
  { "sound": "assets/聖者の行進/ピッコロ.mp3", "gakki": Gakki_Kind.Flote, "color": [[255, 174, 202]], "pos": [1062, 68], "colorMatched": false }
]

const HOSHI_SET = [
  { "sound": "assets/星に願いを/ピアノ1_2_3.mp3", "gakki": Gakki_Kind.Piano, "color": [[249, 255, 70]], "pos": [1340, 172], "colorMatched": false },
  { "sound": "assets/星に願いを/パーカッション.mp3", "gakki": Gakki_Kind.Drumset, "color": [[70, 238, 243]], "pos": [1362, 495], "colorMatched": false },
  { "sound": "assets/星に願いを/グロッケン1_シロフォン1.mp3", "gakki": Gakki_Kind.Tekkin, "color": [[240, 72, 70]], "pos": [40, 173], "colorMatched": false },
  { "sound": "assets/星に願いを/シンセ1.mp3", "gakki": Gakki_Kind.Synthesizer, "color": [[99, 255, 127]], "pos": [17, 495], "colorMatched": false },
  { "sound": "assets/星に願いを/グロッケン2_シロフォン2.mp3", "gakki": Gakki_Kind.Mokkin, "color": [[30, 188, 90]], "pos": [317, 69], "colorMatched": false },
  { "sound": "assets/星に願いを/シンセ2.mp3", "gakki": Gakki_Kind.Synthesizer, "color": [[255, 175, 137]], "pos": [554, 9], "colorMatched": false },
  { "sound": "assets/星に願いを/チェロ.mp3", "gakki": Gakki_Kind.Cello, "color": [[70, 76, 240]], "pos": [825, 9], "colorMatched": false },
  { "sound": "assets/星に願いを/トライアングル.mp3", "gakki": Gakki_Kind.Triangle0, "color": [[255, 174, 202]], "pos": [1062, 68], "colorMatched": false }

]


const UI_IMG_SET = ['assets/UI/red.png', 'assets/UI/green.png', 'assets/UI/blue.png', 'assets/UI/empty.png', 'assets/UI/dodai.png']
const ICON_IMG_SET = ['assets/UI/player0.png', 'assets/UI/player1.png', 'assets/UI/player2.png', 'assets/UI/player3.png']
const OTHER_IMG_SET = ['assets/backimg.png', 'assets/backimg_merry.png']

const BELL_PlAYER_SET = [
  { "gakkis": [Gakki_Kind.Mokkin, Gakki_Kind.Mokkin, Gakki_Kind.Tekkin] },
  { "gakkis": [Gakki_Kind.Tekkin, Gakki_Kind.Horn, Gakki_Kind.Horn] },
  { "gakkis": [Gakki_Kind.Harp, Gakki_Kind.Piano, Gakki_Kind.Piano] },
  { "gakkis": [Gakki_Kind.Hihat, Gakki_Kind.Drum0, Gakki_Kind.Drum0] }
]
const SEIJA_PlAYER_SET = [
  { "gakkis": [Gakki_Kind.Guitar, Gakki_Kind.Guitar, Gakki_Kind.Clarinet] },
  { "gakkis": [Gakki_Kind.Xylophone0, Gakki_Kind.Tuba, Gakki_Kind.Trumpet0] },
  { "gakkis": [Gakki_Kind.Trombone0, Gakki_Kind.Flote, Gakki_Kind.Timpani] },
  { "gakkis": [Gakki_Kind.Hihat, Gakki_Kind.Drum0, Gakki_Kind.Drum0] }
]
const HOSHI_PlAYER_SET = [
  { "gakkis": [Gakki_Kind.Tekkin, Gakki_Kind.Tekkin, Gakki_Kind.Mokkin] },
  { "gakkis": [Gakki_Kind.Mokkin, Gakki_Kind.Synthesizer, Gakki_Kind.Synthesizer] },
  { "gakkis": [Gakki_Kind.Cello, Gakki_Kind.Triangle0, Gakki_Kind.Drumset] },
  { "gakkis": [Gakki_Kind.Piano, Gakki_Kind.Piano, Gakki_Kind.Piano] }
]
const CHAIRO_PlAYER_SET = [
  { "gakkis": [Gakki_Kind.Trumpet0, Gakki_Kind.Trombone0, Gakki_Kind.Horn] },
  { "gakkis": [Gakki_Kind.Trumpet0, Gakki_Kind.Trombone0, Gakki_Kind.Horn] },
  { "gakkis": [Gakki_Kind.Tuba, Gakki_Kind.Piano, Gakki_Kind.Piano] },
  { "gakkis": [Gakki_Kind.Hihat, Gakki_Kind.Drum0, Gakki_Kind.Drum0] }
]

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

  if (KYOKU == 'BELL') {
    updateSoundSet(BELL_SET);
    updatePlayerSet(BELL_PlAYER_SET);
  } else if (KYOKU == 'SEIJA') {
    updateSoundSet(SEIJA_SET);
    updatePlayerSet(SEIJA_PlAYER_SET);
  } else if (KYOKU == 'HOSHI') {
    updateSoundSet(HOSHI_SET);
    updatePlayerSet(HOSHI_PlAYER_SET);
  } else {
    updateSoundSet(CHAIRO_SET);
    updatePlayerSet(CHAIRO_PlAYER_SET);
  }
  updateOverlayimgSet(OVERLAYIMG_SET);

  //最初は聖者の行進を読んでおく
  // updateSoundSet(CHAIRO_SET);
  // 

  // updateSoundSet(HOSHI_SET);




  /*
  for (let i = 0; i < 4; i++) {
    let player = new Player();
    player.setDevame("player" + i);
    // player.setPos([20 + i*300, 500])
    // updateGakkiofPlayer(player);
    gPlayerList.push(player);
  }
  */


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

  //背景の塗りつぶし
  /*
  for(i = 0;i<4;i++){
    let player = new Player();
    player.setDevame("player" + str(i));
    player.setColor([1,2,3]);
    player.setPos([20 + i * 100, 220]);
    // player.setKind(Gakki_Kind.Piano)
    // player.updateGakki(gakki.kind);
    //  updateGakkiofPlayer(player);
    // player.gakkis = [Piano]
    gPlayerList.push(player);
  }*/
  

  // background(240, 240, 200);
  image(gOtherImgList[0], 0, 0, gOtherImgList[0].width, gOtherImgList[0].height);
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
    if (!loadFg) {
      console.log("not loaded.")
      return;
    }

    for (let elem of gGakkiList) {
      if (!elem.sound.isPlaying()) {
        elem.sound.play();
        elem.sound.setVolume(1);
        console.log("elem play", elem)
      }
    }
  } else if (key == "s") {
    console.log("stop sound");
    for (let elem of gGakkiList) {
      if (elem.sound.isPlaying()) {
        elem.sound.stop();
      }
    }
  } else if (key == "m") {
    console.log("mute");
    for (let elem of gGakkiList) {
      if (elem.sound.isPlaying()) {
        elem.sound.setVolume(0);
      }
    }
  } else if (key == "u") {
    console.log("unmute");
    for (let elem of gGakkiList) {
      if (elem.sound.isPlaying()) {
        elem.sound.setVolume(1);
      }
    }
  } else if (key == "1" || key == "2" || key == "3" || key == "4") {
    //プレイヤー1がいない場合には、追加する。いた場合には、削除する。
    var findFg = false;
    for (let i in gPlayerList) {
      if (gPlayerList[i].devname == "player" + key) {
        // findFg = true;
        //リストから削除
        // gPlayerList.splice(i, 1);
        // console.log("remove "+key+" gakki user");
        break;
      }
    }
    //追加する。
    if (!findFg) {
      console.log("add " + key + " gakki user");
      let player = new Player();
      player.setDevame("player" + key);
      if (key == "1") {
        player.setColor([240, 72, 70]);
        // player.setPos([20, 220])
      } else if (key == "2") {
        player.setColor([1, 200, 2]);
        // player.setPos([120, 220])
      } else if (key == "3") {
        player.setColor([1, 2, 200]);
        // player.setPos([220, 220])
      } else if (key == "4") {
        player.setColor([200, 200, 1]);
        // player.setPos([320, 220])
      }
      //プレイヤーの楽器を行進する。
      // updateGakkiofPlayer(player);
      gPlayerList.push(player);
    }
    if (KYOKU == 'BELL') {
      updatePlayerSet(BELL_PlAYER_SET);
    } else if (KYOKU == 'SEIJA') {
      updatePlayerSet(SEIJA_PlAYER_SET);
    } else if (KYOKU == 'HOSHI') {
      updatePlayerSet(HOSHI_PlAYER_SET);
    } else {
      updatePlayerSet(CHAIRO_PlAYER_SET);
    }
  } else if (key == "z") {
    gColorCheckActive = true;
  } else if (key == "x") {
    for (let player of gPlayerList) {
      player.color = [200, 1, 2];
    }
  } else if (key == "c") {
    for (let player of gPlayerList) {
      player.color = [1, 200, 2];
    }
  } else if (key == "v") {
    for (let player of gPlayerList) {
      player.color = [1, 2, 200];
    }
  } else if (key == "b") {
    for (let player of gPlayerList) {
      player.color = [200, 200, 1];
    }
  } else if (key == "n") {
    for (let player of gPlayerList) {
      player.color = [150, 200, 255];
    }
    //vの場合には、繋がっているplayerにvolumeを送付する。
    //テストとして、player登録されている全てのmicro:bitに送付する。
  } else if (key == "v") {
    console.log("send vol");
    for (player of gPlayerList) {
      for (elem of player.gakkis) {
        onSendVolume(elem, 255)
      }
    }
  }

}


function mouseClicked() {

  console.log("mouseCliced");
  isClicked = true; // ユーザ操作が入らないと音楽が再生許可されない問題の解決のため
  if (gColorCheckActive == true) {
    checkPlayerColorMatched();
  }
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



function dispGakkiStatus() {

  for (let gakki of gGakkiList) {
    var i = 0;
    var isColorMatched = 0;

    for (let gakkiColor of gakki.colors) {
      if (gakki.colorMatched == true) {
        isColorMatched = 1;
        let baias = 0.9;
        let gainAmp = 1.2;
        let amp = Math.min(gakki.ampAnalyer.getLevel() * gainAmp + baias, 1.2);

        fill([gakkiColor[0] * amp, gakkiColor[1] * amp, gakkiColor[2] * amp,]);
        circle(gakki.pos[0] + gakki.dispSize[0] / 2, gakki.pos[1] + gakki.dispSize[0] / 2, gakki.dispSize[0]);
        image(gakki.img[1], gakki.pos[0] + 10, gakki.pos[1] + 20, (gakki.dispSize[0] / 900) * gakki.img[1].width, (gakki.dispSize[1] / 900) * gakki.img[1].height)
      } else {

        fill([150, 150, 150]);
        rect(gakki.pos[0], gakki.pos[1], gakki.dispSize[0], gakki.dispSize[1]);

        let isMatched = false;
        let dispColor = [];
        for (let player of gPlayerList) {
          if (checkColorMatched(player.color, gakkiColor)) {
            isMatched = true;
          }
        }
        if (isMatched == true) {
          let f = 15;
          let g = 2;

          for (let i = 0; i < 3; i++) {
            if (gakki.count >= 0) {
              dispColor.push(150 + (gakkiColor[i] - 150) * gakki.count / f);
            } else {
              dispColor.push(gakkiColor[i] - (gakkiColor[i] - 150) * (f + gakki.count * g) / f);
            }

          }
          fill(dispColor);
          rect(gakki.pos[0], gakki.pos[1], gakki.dispSize[0], gakki.dispSize[1]);
          gakki.setCount(gakki.count + 1);
          if (gakki.count > f) {
            gakki.setCount(-f / g);
          }

        }
        image(gakki.img[0], gakki.pos[0] + 10, gakki.pos[1] + 20, (gakki.dispSize[0] / 900) * gakki.img[0].width, (gakki.dispSize[1] / 900) * gakki.img[0].height);
        fill(gakkiColor);
        circle(gakki.pos[0] + gakki.dispSize[0], gakki.pos[1] + gakki.dispSize[1] / 10, gakki.dispSize[0] / 3);
      }

      i = i + 1;
      i = Math.min(i, 3);
    }

  }

}



function dispOverlayimgStatus() {

  for (let overimg of gOverlayimgList) {
    var i = 0;
  
    for (let imgcolor of overimg.colors) {
      if (overimg.colorMatched == true) {
  
        fill([imgcolor[0], imgcolor[1], imgcolor[2],]);
        circle(overimg.pos[0] + overimg.dispSize[0] / 2, overimg.pos[1] + overimg.dispSize[0] / 2, overimg.dispSize[0]);
        image(overimg.img[1], overimg.pos[0] + 10, overimg.pos[1] + 20, (overimg.dispSize[0] / 900) * overimg.img[1].width, (overimg.dispSize[1] / 900) * overimg.img[1].height)
        image(overimg.img[2], 0, 0, overimg.img[2].width, overimg.img[2].height);
      } else {

        fill([150, 150, 150]);
        rect(overimg.pos[0], overimg.pos[1], overimg.dispSize[0], overimg.dispSize[1]);

        let isMatched = false;
        let dispColor = [];
        for (let player of gPlayerList) {
          if (checkColorMatched(player.color, imgcolor)) {
            isMatched = true;
          }
        }
        if (isMatched == true) {
          let f = 15;
          let g = 2;

          for (let i = 0; i < 3; i++) {
            if (overimg.count >= 0) {
              dispColor.push(150 + (imgcolor[i] - 150) * gakki.count / f);
            } else {
              dispColor.push(imgcolor[i] - (imgcolor[i] - 150) * (f + gakki.count * g) / f);
            }

          }
          fill(dispColor);
          rect(overimg.pos[0], overimg.pos[1], overimg.dispSize[0], overimg.dispSize[1]);
          overimg.setCount(gakki.count + 1);
          if (overimg.count > f) {
            overimg.setCount(-f / g);
          }

        }
        image(overimg.img[0], overimg.pos[0] + 10, overimg.pos[1] + 20, (overimg.dispSize[0] / 900) * overimg.img[0].width, (overimg.dispSize[1] / 900) * overimg.img[0].height);
        fill(imgcolor);
        circle(overimg.pos[0] + overimg.dispSize[0], overimg.pos[1] + overimg.dispSize[1] / 10, overimg.dispSize[0] / 3);
      }

      i = i + 1;
      i = Math.min(i, 3);
    }

  }

}


function checkPlayerColorMatched() {

  for (let gakki of gGakkiList) {
    if (isMousePosRange(gakki.pos, gakki.dispSize)) {
      for (let gakkiColor of gakki.colors) {
        for (let player of gPlayerList) {

          if (checkColorMatched(player.color, gakkiColor)) {
            console.log("color matched!");
            gakki.setColorMatched(true);
          }

        }

      }
    }
  }
  for (let overimg of gOverlayimgList) {
    if (isMousePosRange(overimg.pos, overimg.dispSize)) {
      for (let imgColor of overimg.colors) {
        for (let player of gPlayerList) {

          if (checkColorMatched(player.color, imgColor)) {
            console.log("color matched!");
            overimg.setColorMatched(true);
          }

        }

      }
    }
  }
}


function dispParamDebug() {

}


function isMousePosRange(position, range) {
  if ((mouseX >= (position[0] - range[0] * 0)) && (mouseX <= (position[0] + range[0]))) {
    if ((mouseY >= (position[1] - range[1] * 0)) && (mouseY <= (position[1] + range[1]))) {
      return true;
    }
  }

  return false;

}


function dispCurrentPlayerColor(volumes) {
  var i = 0;
  for (let player of gPlayerList) {

    let baias = 0.9;
    let gainAmp = 1.4;
    let amp = Math.min(volumes[i] / 255 * gainAmp + baias, 1.5);
    var gain = 1 / 130;
    image(gUiImgList[4], player.pos[0] - 90, player.pos[1] + 120, gUiImgList[4].width * player.dispSize[0] * gain, gUiImgList[4].height * player.dispSize[0] * gain);
    var gain = 1 / 300;

    fill([player.color[0] * amp, player.color[1] * amp, player.color[2] * amp]);
    circle(player.pos[0] + player.dispSize[0] / 2, player.pos[1] + player.dispSize[0] / 2, player.dispSize[0]);
    image(gIconImgList[i], player.pos[0] + 5, player.pos[1] + 90, gIconImgList[i].width * player.dispSize[0] * gain, gIconImgList[i].height * player.dispSize[0] * gain);

    for (let i = 0; i < 3; i++) {
      for (let j = 1; j <= 5; j++) {
        image(gUiImgList[3], player.pos[0] + i * 50 + 10, player.pos[1] + 200 + (50 - j * 20), gUiImgList[3].width, gUiImgList[3].height);
      }
    }
    for (let i = 0; i < 3; i++) {
      numDisp = player.color[i] / 50;
      for (let j = 1; j <= numDisp; j++) {
        image(gUiImgList[i], player.pos[0] + i * 50 + 10, player.pos[1] + 200 + (50 - j * 20), gUiImgList[i].width, gUiImgList[i].height);
      }
    }
    i = i + 1;
    i = Math.min(i, 3);
  }
}


function checkColorMatched(colorPlayer, colorGakki) {

  var score = 0;
  var machedThreshold = 83;
  if (key == "p") {
    machedThreshold = 0;
  }

  score = 100 - (Math.abs(colorGakki[0] - colorPlayer[0]) + Math.abs(colorGakki[1] - colorPlayer[1]) + Math.abs(colorGakki[2] - colorPlayer[2])) * 100 / 765;
  if (score > machedThreshold) {
    return true;
  } else {
    return false;
  }

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


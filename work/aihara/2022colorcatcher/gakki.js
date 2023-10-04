
//Metallophone:鉄琴
//Xylophone；木琴

class Gakki {
    constructor() {
        this.kind = Gakki_Kind.None; //楽器の種類
        this.colors = []; //音に対応する色 [0,0,200],[200,0,10]のようにカラーを複数もつ
        this.sound_name = null; //該当の音の名前
        this.sound = null;//該当の音。これは一つ
        this.enableFg = false; //有効か否か。
        this.pos = [20, 20]; // // 楽器の画面表示位置
        this.dispSize = [200, 200]; // 楽器のマウス選択用表示範囲
        this.colorMatched = false; // カラーがマッチしてるか 
        this.img = [];
        this.imgOnpu = [];
        this.imgDirectory = [];
        this.ampAnalyer = null;
        this.count = 0;
    }
    
    //種別を追加する
    setKind(kind){
        this.kind = kind;
    }

    //色を追加する
    addColor(color){
        this.colors.push(color);
    }

    //該当色の情報をクリアする
    clearColor(){
        this.color = []
    }

    //該当の曲を設定する
    setSoundName(name){
        this.sound_name = name;
    }

    //該当の曲を設定する
    setSound(sound){
        this.sound = sound;
    }

    //曲をロードする。
    loadSound(){
        this.sound = loadSound(this.sound_name);
        this.ampAnalyer = new p5.Amplitude();
        this.ampAnalyer.setInput(this.sound);
    }

    setEnable(fg){
        this.enableFg = fg;
    }

    isEnable(){
        return this.enableFg ;
    }

    setPos(position){
        this.pos = position;
    }

    setColorMatched(result){
        this.colorMatched = result;
        /*
        for(let myResult of result){
            this.colorMatched.push(myResult);
        }
        */
    }

    setImgDir(dir){
        for (let myDir of dir){
            this.imgDirectory.push(myDir);
        }
    }

    setImg(){
        for (let imgDir of this.imgDirectory){
            // console.log(this.imgDirectory);
            console.log(imgDir);
            let myimg = loadImage((imgDir));
            this.img.push(myimg);
        }
    }

    setCount(cnt){
        this.count = cnt;
    }

/*
    //曲のロード状態を確認する。
    isLoaded(){
        return this.sound.isLoaded();
    }

    //再生しながら曲の音量を低くする
    muteWithPlaying(){
        return this.sound.setVolume(0);
    }

    //再生しながら曲の音量を普通にする
    normalWithPlaying(){
        return this.sound.setVolume(1);
    }*/

}

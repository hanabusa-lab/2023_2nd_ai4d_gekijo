
class Overlayimg {
    constructor() {
        this.colors = []; //音に対応する色 [0,0,200],[200,0,10]のようにカラーを複数もつ
        this.enableFg = false; //有効か否か。
        this.pos = [20, 20]; // // 楽器の画面表示位置
        this.dispSize = [200, 200]; // 楽器のマウス選択用表示範囲
        this.colorMatched = false; // カラーがマッチしてるか 
        this.img = [];
        this.imgOnpu = [];
        this.imgDirectory = [];
        this.count = 0;
    }
    

    //色を追加する
    addColor(color){
        this.colors.push(color);
    }

    //該当色の情報をクリアする
    clearColor(){
        this.color = []
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

}

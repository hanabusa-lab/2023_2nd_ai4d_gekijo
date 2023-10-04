class Player {
    constructor() {
        this.devname = ""; //bluetoothデバイス名称
        this.color = [0,0,0]; //r,g,b
        this.gakkis = []; //演奏対象の楽器リスト 楽器の種類を管理する。
        this.pos = [200, 200];
        this.dispSize = [150, 150]; // 表示範囲
        this.img = [];
    }

    setDevame(devname){
        this.devname = devname;
    }
    
    //色情報を設定する
    setColor(color){
        this.color = color;
    }

    //楽器の有無を確認する
    hasGakki(gakki){
        if(this.gakkis.length>0){
            return true;
        }else{
            return false;
        }
    }

    //楽器を追加する
    addGakki(gakki){
        this.gakkis.push(gakki);
    }

    //楽器を行進する
    updateGakki(gakkis){
        this.gakkis = gakkis
    }

    //楽器を削除する
    deleteGakki(gakki){
        this.gakkis = []
    }

    setPos(pos){
        this.pos = pos;
    }

}

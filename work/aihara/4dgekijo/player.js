class Player {
    constructor() {
        this.devname = ""; //bluetoothデバイス名称
        this.rxchara=""; //bluetooth受信サービス
        this.txchara="";//bluetooth送信サービス
    }

    setDevame(devname){
        this.devname = devname;
    }
}

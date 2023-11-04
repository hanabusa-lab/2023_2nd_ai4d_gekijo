// 参考URL: https://qiita.com/youtoy/items/c98c0996458a21fc1e67
const UUID_UART_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UUID_TX_CHAR_CHARACTERISTIC = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const UUID_RX_CHAR_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
//let gTXCharaList = []; bluetooth接続ごとに更新されるためplayerの属性に追加
//var gRXCharaList = []; bluetooth接続ごとに更新されるためplayerの属性に追加
//デバイスと音のパートの関連付
//var gPartList = [];

async function onStartButtonClick() {
  try {
    console.log("Requesting Bluetooth Device...");
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        { services: [UUID_UART_SERVICE] },
        { namePrefix: "BBC micro:bit" },
      ],
    });

    console.log("Connecting to GATT Server...");
    const server = await device.gatt.connect();
    console.log("Getting Service...");
    const service = await server.getPrimaryService(UUID_UART_SERVICE);
    console.log("Getting Characteristic...");
    tcharacteristic = await service.getCharacteristic(UUID_TX_CHAR_CHARACTERISTIC);
    tcharacteristic.startNotifications();
    tcharacteristic.addEventListener("characteristicvaluechanged", handleNotifications);
    console.log("Notifications started");
    //送信サービスリストに追加
    //gTXCharaList.push(tcharacteristic);

    rcharacteristic = await service.getCharacteristic(UUID_RX_CHAR_CHARACTERISTIC);
    console.log("rcharacteristic", rcharacteristic);

    //受信サービスに追加
    //gRXCharaList.push(rcharacteristic);
    //接続した時点でプレイヤーリストに追加する。
    devname = device["name"];
    console.log("device=", devname)

    //プレーヤーが既に存在している場合には一旦削除する。
    //bluetooth再接続をするとrcharasticやtcharasticというbluetoothサービス名称が更新されるため
    gPlayerList.forEach((player, index) => {
        if(player.devname==devname){
          gPlayerList.splice(index, 1)
        }
    });

    //プレイヤーを追加する。
    player = new Player();
    player.devname = devname;
    player.rxchara = rcharacteristic;
    player.txchara = tcharacteristic;
    gPlayerList.push(player);
    
    //プレイヤーを表示する
    gPlayerList.forEach((player, index) => {
      console.log("index:",index,"player:",player.devname);
    });
    console.log()
  } catch (error) {
    console.log("Argh! " + error);
  }
}

//bluetooth通知を受け取った場合
async function handleNotifications(event) {
  try {
    //入力確認
    const value = event.target.value;
    const inputValue = new TextDecoder().decode(value).replace(/\r?\n/g, '');
    switch (inputValue) {
      default:
        inputStr = inputValue;
        var val = inputStr.slice(0, 1);
        let recieveData;
        if (val == "b") {
          recieveData = inputStr.split(':');
          console.log(recieveData);
          console.log(recieveData[0]);
          console.log('ボタン種別: ' + recieveData[1]);
          
          console.log("event=", event)
          devname = event["srcElement"]["service"]["device"]["name"];
          console.log("device=", devname)     
      }
    }
  } catch (error) {
    console.log("Argh! " + error);
  }
}

/* micro:bitに対してコマンドを送信する
  devname　プレイヤーの名称(""が指定されている場合には接続している全員に送信する)
  kind コマンド種類(p:ページ、v:振動, l:led, s:音)
  val 値
*/
async function sendCmd(devname, kind, val) {
  try {
    //接続しているplayserを特定して対応するデバイス名称を取得する。
    //複数のデバイスに対応すること。
    pname = "";
    for (const player of gPlayerList) {
      // console.log("elem=",player.devname);
      pname = player.devname;
      if(devname=="" || devname==pname){
        let data = kind +":"+ val.toString(10) + '\n'
        console.log("write cmd", kind, val);  
        await player.rxchara.writeValue(new TextEncoder().encode(data))
      }
    }
  } catch (error) {
    console.log("Argh! " + error);
  }
}
// 参考URL: https://qiita.com/youtoy/items/c98c0996458a21fc1e67
const UUID_UART_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UUID_TX_CHAR_CHARACTERISTIC = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const UUID_RX_CHAR_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
let gTXCharaList = [];
var gRXCharaList = [];
//デバイスと音のパートの関連付
var gPartList = [];

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
    gTXCharaList.push(tcharacteristic);

    rcharacteristic = await service.getCharacteristic(UUID_RX_CHAR_CHARACTERISTIC);
    console.log("rcharacteristic", rcharacteristic);

    //受信サービスに追加
    gRXCharaList.push(rcharacteristic);

    //接続した時点でプレイヤーリストに追加する。
    devname = device["name"];
    console.log("device=", devname)

    //プレーヤーリストの確認を行う
    let findFg = false;
    let player = null;
    for (p of gPlayerList) {
      if (p.devname == devname) {
        findFg = true;
        break;
      }
    }
    //プレーヤーがいない場合には、追加する。
    if (!findFg) {
      player = new Player();
      player.devname = devname;
      gPlayerList.push(player);
    }
    //let index = gPlayerList.indexOf(player);
    //let data = "p:" + index.toString(10) + '\n'
    //console.log("write volume", data);
    //await rcharacteristic.writeValue(new TextEncoder().encode(data))

  } catch (error) {
    console.log("Argh! " + error);
  }
}

//bluetooth通知を受け取った場合
async function handleNotifications(event) {
  try {
    if (gTXCharaList.length == 0) {
      return;
    }
    const value = event.target.value;
    const inputValue = new TextDecoder().decode(value).replace(/\r?\n/g, '');
    switch (inputValue) {
      default:
        inputStr = inputValue;
        var val = inputStr.slice(0, 1);
        let recieveData;
        if (val == "b") {
          recieveData = inputStr.split(' ');
          console.log(recieveData);
          console.log(recieveData[0]);
          console.log('ボタン種別: ' + recieveData[1]);
          
          console.log("event=", event)
          devname = event["srcElement"]["service"]["device"]["name"];
          console.log("device=", devname)

          //プレーヤーリストの確認を行う
          let findFg = false;
          let player = null;
          for (p of gPlayerList) {
            if (p.devname == devname) {
              //p.color = [recieveData[1],recieveData[2],recieveData[3]];
              player = p;
              findFg = true;
              break;
            }
          }
          //プレーヤーがいない場合には、追加する。
          if (!findFg) {
            player = new Player();
            gPlayerList.push(player);
          }

          player.setDevame(devname);
          player.color = [recieveData[1], recieveData[2], recieveData[3]];
          //プレイヤーの楽器を更新する。
          // updateGakkiofPlayer(player);         
        }
    }
  } catch (error) {
    console.log("Argh! " + error);
  }
}

/* micro:bitに対してコマンドを送信する
  kind コマンド種類(p:ページ、v:振動, l:led, s:音)
  val 値
*/
async function onSendCmd(kind, val) {
  try {
    // console.log("len=", gRXCharaList.length);
    if (gRXCharaList.length == 0) {
      return;
    }

    //接続しているplayserを特定して対応するデバイス名称を取得する。
    //複数のデバイスに対応すること。
    var chara = null;
    dname = "";
    // console.log("playerlist=",gPlayerList);
    for (const player of gPlayerList) {
      // console.log("elem=",player.devname);
      dname = player.devname;

      //該当デバイスに対してvolを送付する。
      for (const element of gRXCharaList) {
        //該当のデバイスのみ送付する。
        if (element["service"]["device"]["name"] != dname) {
          continue;
        }
        let data = kind + val.toString(10) + '\n'
        // console.log("write volume", data);  
        await element.writeValue(new TextEncoder().encode(data))
        }
    }
  } catch (error) {
    console.log("Argh! " + error);
  }
}
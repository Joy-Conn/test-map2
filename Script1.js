//Geolocation APIを利用できる実行環境かを判断
if (navigator.geolocation) {
    //.getCurrentPosition()で位置情報を一度取得
    navigator.geolocation.getCurrentPosition(test2);
} else {
    alert("利用できない実行環境です");
}


//上記の判断でtrueだった場合に現在の情報を取得する関数を実行
function test2(position) {
    //.latitudeで現在地の緯度を取得
    var lat = position.coords.latitude;
    //document.getElementById('LAT').innerHTML = lat;
    //.longitudeで現在地の経度を取得
    var lon = position.coords.longitude;
    //document.getElementById('LON').innerHTML = lon;
    //.accuracyで緯度、経度の精度を取得
    var acc = position.coords.accuracy;

    //現在時刻を year/month/day/time で取得
    var date = new Date(position.timestamp);
    var time = date.toLocaleString();

    //見やすさの工夫 <dt>改行
    document.getElementById("result").innerHTML = '緯度<dt>' + lat + '</dt>緯度<dt>' + lon + '</dt>現在時刻<dt>' + time + '</dt>精度<dt>' + acc;

    //mapの宣言
    var ymap = new Y.Map("map", {
        configure: {
            //マウスホイールで拡大縮小できるようにする
            scrollWheelZoom: true,
            //ドラッグで移動できるようにする
            dragging: true
        }
    });
    //地図のレイヤセットを切り替えるためのボタンを表示
    var control_1 = new Y.LayerSetControl();
    //地図検索のユーザーインターフェースを表示
    var control_2 = new Y.SearchControl();
    //地図上の距離の目安となるスケールバーを表示
    var control_3 = new Y.ScaleControl();
    //地図の縮尺を変更するための横長スライダー形式のユーザーインターフェースを表示
    var control_4 = new Y.SliderZoomControlHorizontal();
    //コントロールの追加
    ymap.addControl(control_1);
    ymap.addControl(control_2);
    ymap.addControl(control_3);
    ymap.addControl(control_4);

    var p = new Y.LatLng(lat, lon);
    //.drawMap((緯度、経度),倍率,.NORMALなら標準地図,.PHOTOなら航空写真)
    ymap.drawMap(p, 22, Y.LayerSetId.NORMAL);


    //ダブルclickした場所にマーカーを立てる
    Y.Event.addListener(ymap, 'dblclick', pin);
    // マーク用の変数
    var mark = [];
    function pin(latlng) {
        // マークを新規に生成
        mark.push(new Y.Label(new Y.LatLng(latlng.lat(), latlng.lng()), latlng.toString()));
        ymap.addFeatures(mark);
    }

}

//課題点　取得した現在地の情報と実際の緯度経度が異なるので、取得した精度をもとに地図上で正しい位置が表示されるようにしたい。
//いつもYahoo! Open Local Platform（YOLP）をご利用いただきありがとうございます。
//この度誠に勝手ながら、2020年10月31日（土）をもちまして、以下のWeb API、SDKの提供を終了いたします。

//


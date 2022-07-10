window.onload = function () {
  var cart_btns = document.querySelectorAll('.js_cart_btn'),//カートボタン
  cart_cnt_icon = document.getElementById('js_cart_cnt'),//カートの個数アイコン
  cart_cnt = 0,//カートのアイテム数
  clicked = [],//クリックされたカートアイコンのインデックス
  save_items = [],//ローカルストレージ保存用の配列
  items = JSON.parse(localStorage.getItem("items"));//ローカルストレージの商品データ配列
  
  var items = JSON.parse(localStorage.getItem("items")),//ローカルストレージの商品データの配列
  mainname,//ローカルストレージの商品名
  mainprice,//ローカルストレージの商品金額
  save_items = [],//ローカルストレージ保存用の配列
  ele = document.getElementById('js_shopping_list'),//カートの商品を追加する要素
  fragment = document.createDocumentFragment(),//DOMの追加処理用のフラグメント
  total = 0,//商品の合計金額
  total_ele = document.getElementById('js_total'),//商品の合計金額表示用の要素
  confirm_btn = document.getElementById('js_confirm');//購入確定ボタン

  // すでにカートに商品が入っている場合、カートアイコンのカウント表示とカートボタンをアクティブにする
  if (items) {
    var id;
    for (var i = 0; i < items.length; i++) {
      id = items[i].id;
      save_items.push(items[i]);
      clicked.push(id);
      activate_btn(id);
    }

    if(items.length != 0){
      cart_cnt_icon.parentNode.classList.remove('hidden');
      cart_cnt_icon.innerHTML = cart_cnt;
    }
    
    //order
      if (items) {
    // カート商品の数分、要素を作成
    for (var i = 0; i < items.length; i++) {
      var li = document.createElement('li'),
      h2 = document.createElement('h2'),
      price = document.createElement('div');

      price.classList.add('price');
      
      h2.appendChild(document.createTextNode(items[i].name));
      price.appendChild(document.createTextNode(items[i].price));
      li.appendChild(h2);
      li.appendChild(price);
      fragment.appendChild(li);
      
      // 合計金額を加算
      total = total + items[i].price;
    }
  }

  // カートボタンを押した際の処理
  cart_btns.forEach(function (cart_btn,index) {
    cart_btn.addEventListener('click',function () {

      // カートボタンがすでに押されているかの判定
      if (clicked.indexOf(index) >= 0) {

        for (var i = 0; i < clicked.length; i++) {
          if(clicked[i] == index){
            clicked.splice(i, 1);
            save_items.splice(i, 1);
          }
        }

        inactivate_btn(index);

      }else if(clicked.indexOf(index) == -1){

        var name = cart_btn.dataset.name,//商品の名前を取得
        price = Number(cart_btn.dataset.price);//商品の値段を取得

        clicked.push(index);
        var now= new Date();
        var Year = now.getFullYear();
        var Month = now.getMonth()+1;
        var Day = now.getDate();
        var Hour = now.getHours();
      var Min = now.getMinutes();
        var today = Year + "年" + Month + "月" +Day+ "日"+ Hour + ":" + Min;

        save_items.push({
          id: index,
          name: name,
          price: price,
          Day: today
                  });

        activate_btn(index);

      }

      // ローカルストレージに商品データを保管
      localStorage.setItem("items",JSON.stringify(save_items));
      localStorage.setItem("buys",JSON.stringify(save_items));

    });
  });

  function activate_btn(index) {
    cart_cnt++;
    if( cart_cnt >= 1 ){
      cart_cnt_icon.parentNode.classList.remove('hidden');
    }
    cart_cnt_icon.innerHTML = cart_cnt;
    cart_btns[index].classList.add('item_cart_btn_active');
  }

  function inactivate_btn(index) {
    cart_cnt--;
    if(cart_cnt == 0){
      cart_cnt_icon.parentNode.classList.add('hidden');
    }
    cart_cnt_icon.innerHTML = cart_cnt;
    cart_btns[index].classList.remove('item_cart_btn_active');
  }

};

  // 作成した要素の追加
  ele.appendChild(fragment);
  // 合計金額の表示
  total_ele.innerHTML = total;

  confirm_btn.addEventListener('click',function () {
    for (var i = 0; i < items.length; i++) {
      
      mainname = document.createTextNode(items[i].name);
      mainprice = document.createTextNode(items[i].price);

    }
    window.alert('購入が確定しました。');
    
    //購入履歴に設定
    //時刻データを取得して変数jikanに格納する
    
        var now= new Date();
        var Year = now.getFullYear();
        var Month = now.getMonth()+1;
        var aa = now.getDate();
        var today = Year + "年" + Month + "月" +aa+ "日";

        save_items.push({
          name: mainname,
          price: mainprice,
          date: today
        });

        activate_btn(index);
      // ローカルストレージに商品データを保管
      localStorage.setItem("buys",JSON.stringify(save_items));
      


  });

};



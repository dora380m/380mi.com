(function(){
    // 定数を取得
    var navSlideTime          = 500;   // スライドタイミング
    var contentBorderViewTime = 2000;  // ボーター出現タイミング
    var navAnimationTiming    = 1300;  // ナビアニメーションタイミング
    var siteTitle = '380 WORKS';       // ページタイトル
    var pageType;                      // ページの種類

    // ナビの色を取得
    var navColorArray = ['#FF7676', '#99FFAE', '#F8F140', '#ABA0FF', '#FF9E67'];

    // ページタイトルを取得
    var pageTitleArray = [siteTitle + ' | プロフィール', siteTitle + ' | 制作実績', siteTitle + ' | 研究開発', siteTitle + ' | ブログ', siteTitle + ' | お問い合わせ'];

    // ページURLを取得
    var pageUrlArray = ['profile', 'works', 'labo', 'blog', 'contact'];

    // DOMを取得
    var Body        = document.getElementsByTagName('body')[0];  // bodyタグ
    var title       = document.getElementById('title');          // タイトル
    var catchp      = document.getElementById('catchp');         // キャッチ
    var menu        = document.getElementById('menu');           // メニュー
    var contentView = document.getElementById('contentView');    // コンテンツ領域
    var sideNav     = menu.children;                             // ナビゲーションリスト

    // ナビテキストのを取得
    var navArrayText = [];
    for (var i = 0; i < 5; i++) {
        navArrayText[i] = sideNav[i].childNodes[0];
    }

    // XMLHttpRequestオブジェクトを生成
    var xmlHttp;
    var time = new Date();
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = checkStatus;

    // タイトルを表示
    title.className += ' ' + 'from-left-slide-ttl';
    title.style.left = '40px';

    // キャッチを表示
    setTimeout(function(){catchp.className += ' ' + 'from-left-slide-cth';catchp.style.left = '100px';},200);

    // ナビゲーションをスライド
    var navSliding = function(domElement) {
        setTimeout(function(){domElement.className += ' ' + 'from-right-slide-nav';domElement.style.left = '40px';}, navSlideTime);
    };
    for (var i = 0; i < 5; i++) {navSliding(sideNav[i]);navSlideTime += 150;}

    // ナビをアニメーション
    var navAnimation = function(navElement, navColor){
        setTimeout(function(){navElement.style.borderLeft = '8px solid ' + navColor;navElement.style.color = navColor;}, navAnimationTiming);
        setTimeout(function(){navElement.style.borderLeft = null;navElement.style.color = 'inherit';}, navAnimationTiming + 350);
    };
    for (var i = 0; i < sideNav.length; i++) {navAnimation(sideNav[i], navColorArray[i]);navAnimationTiming += 100;}

    // 表示領域の確定
    setTimeout(function(){Body.style.overflow = 'auto';}, 1101);

    // ボーダーを表示
    setTimeout(function(){contentView.style.borderLeft = '1px solid navy';}, contentBorderViewTime);
    setTimeout(function(){contentView.style.borderBottom = '1px solid navy';}, contentBorderViewTime + 100);
    setTimeout(function(){contentView.style.borderRight = '1px solid navy';}, contentBorderViewTime + 300);
    setTimeout(function(){contentView.style.borderTop = '1px solid navy';}, contentBorderViewTime + 500);

    // インデックスコンテンツを表示
    setTimeout(function(){contentView.style.opacity = '1';}, 2500);

    // ページを切り替え
    // プロフィールページ表示
    sideNav[0].onclick = function(){
        if (pageType != 'p') {
            pageChange(this, 0);
        }
        pageType = 'p';
    };

    // 制作実績ページ表示
    sideNav[1].onclick = function(){
        if (pageType != 'w') {
            pageChange(this, 1);
        }
        pageType = 'w';
    };

    // 開発ページ表示
    sideNav[2].onclick = function(){
        if (pageType != 'l') {
            pageChange(this, 2);
        }
        pageType = 'l';
    };

    // お問い合わせページ表示
    sideNav[4].onclick = function(){
        if (pageType != 'c') {
            pageChange(this, 4);
        }
        pageType = 'c';
    };

    /**
     * ページ変更アニメーション
     * @param docTitle ページタイトル
     * @param sideNavElem クリックされたDOM
     * @param colorType 色
     * @param pageURL 指定ページのディレクトリ名
     * @return ページ
     * */
    function pageChange(sideNavElem, navArrIndex) {
        // ページタイトルを変更
        document.title = pageTitleArray[navArrIndex];
        // 表示領域を閉じる
        contentView.style.height = '7%';
        // ナビのボーダーを消す
        for (var i = 0; i < sideNav.length; i++) {
            if (sideNav[i].className.match(/side-nav/)) {
                sideNav[i].style.borderLeftWidth = null;
                sideNav[i].style.borderLeftColor = null;
                sideNav[i].style.borderBottom = null;
                sideNav[i].childNodes[0].style.color = null;
            }
            document.getElementsByTagName('li')[i].lastElementChild.style.color = null;
        }
        // ナビの表示をスタイル
        sideNavElem.style.borderLeftWidth = '15px';
        sideNavElem.style.borderLeftColor = navColorArray[navArrIndex];
        sideNavElem.style.borderBottom = '1px solid ' + navColorArray[navArrIndex];
        sideNavElem.childNodes[0].style.color = navColorArray[navArrIndex];
        // ajaxによって取得
        var refPage = setTimeout(function(){
            xmlHttp.open('POST', 'http://dev.380mi.com/' + pageUrlArray[navArrIndex] + '/index.html');
            xmlHttp.send(null);
        },200);
    }

    /**
     * Ajax通信完了チェック
     **/
    function checkStatus(navArrIndex){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // 取得したHTMLを表示
            contentView.innerHTML = xmlHttp.responseText;
            // 画面を表示
            contentView.style.height = '100%';
        }
    }

})();
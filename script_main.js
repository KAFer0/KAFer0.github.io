/*
  script_main.js
  ---
  サイト全体のJavaScript動作の起点（エントリーポイント）となるファイル。
  各機能の初期化や、共通のヘルパー関数などを定義する。
  ページ遷移アニメーションの制御もここで行う。
*/


'use strict';


// DOMContentLoaded イベントは、HTMLの構造が完全に読み込まれ、
// 解析が終わった時点で発生する。
document.addEventListener('DOMContentLoaded', function() {

    console.log('観測開始: DOMの準備が完了しました。');
    
    // ==========================================================
    // ページ遷移アニメーションの初期化
    // ==========================================================
    initializePageTransition();

    // ==========================================================
    // bodyにページロード時のフェードインクラスを付与
    // (ローディング画面消去後、ページ全体がフワッと現れるための設定)
    // ==========================================================
    document.body.classList.add('fade-in-on-load');


    // 例：
    // handleSmoothScroll();       // ページ内リンクをスムーズにスクロールさせる関数
    // handleExternalLinks();      // 外部リンクを新しいタブで開くように設定する関数
    // initializeAnimationControl(); // スクロールに応じたアニメーションを初期化する関数


});


// ページ遷移アニメーションを制御する関数
function initializePageTransition() {
    // HTML内に遷移用オーバーレイを挿入 (DOM要素を動的に作成)
    const overlay = document.createElement('div');
    overlay.id = 'transition-overlay';
    document.body.appendChild(overlay);

    // 全ての内部リンクを取得
    // target="_blank" (外部リンク) や href^="#" (アンカーリンク) は除外
    const internalLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');

    internalLinks.forEach(link => {
        // 同じドメイン内か相対パスのリンクのみ対象とする
        if (link.hostname === location.hostname || link.hostname === '') {
            link.addEventListener('click', function(event) {
                const targetUrl = this.href;

                // デフォルトのリンク動作をキャンセル
                event.preventDefault();

                // オーバーレイをアクティブにしてフェードインを開始
                overlay.classList.add('is-active');

                // アニメーション完了後にページを遷移
                // style.cssで定義した transition の duration (0.4s) に合わせて調整
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400); // 400ミリ秒 = 0.4秒後に遷移
            });
        }
    });
}
/*
  script_loader.js
  ---
  ローディング画面の制御に特化したスクリプト。
  ページの全リソース読み込み完了を監視し、
  完了後にローディング画面をフェードアウトさせるクラスを付与する。
*/

// ローディング画面制御のロジックを関数としてカプセル化（包み込む）
function handleLoader() {

    // HTMLから id="loader" を持つ要素を探す
    const loaderElement = document.getElementById('loader');

    // loader要素が見つからなければ、何もしない（安全対策）
    if (!loaderElement) {
        return;
    }

    // window.onload は、画像やCSSを含む全てのコンテンツが
    // 完全に読み込まれたときに一度だけ発生するイベント
    window.onload = function() {
        
        // setTimeoutを使い、処理を少しだけ（500ミリ秒 = 0.5秒）遅らせる。
        // これにより、読み込み完了直後にパッと消えるのではなく、
        // 訪問者に「間」を感じさせる、より洗練された演出になる。
        setTimeout(function() {
            
            // loader要素のクラスリストに 'loaded' を追加する。
            // これが引き金となり、style.css で定義された
            // フェードアウトのアニメーションが開始される。
            loaderElement.classList.add('loaded');

        }, 500);
    };
}

// 作成した関数を実行
handleLoader();
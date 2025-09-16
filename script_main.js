/*
  script_main.js
  ---
  サイト全体のJavaScript動作の起点（エントリーポイント）となるファイル。
  各機能の初期化や、共通のヘルパー関数などを定義する。
  ページ遷移アニメーションの制御、今日の観測曲、YouTubeランキングなどをここで行う。
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

    // ==========================================================
    // 「今日の観測曲」機能の初期化
    // ==========================================================
    displayTodaysFeaturedSong();

    // ==========================================================
    // 新規追加: 「YouTube人気ランキング」機能の初期化
    // (※手動更新版)
    // ==========================================================
    displayYoutubeRanking();

    // ==========================================================
    // 新規追加: YouTube登録者数カウンターの表示 (手動更新版)
    // ==========================================================
    displayYoutubeSubscriberCounter();


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


// 「今日の観測曲」を表示する関数
function displayTodaysFeaturedSong() {
    const featuredSongArea = document.getElementById('featured-song-area');
    if (!featuredSongArea) {
        console.warn('今日の観測曲を表示するエリアが見つかりません。');
        return;
    }

    // --- おすすめ曲のリスト ---
    const kafSongs = [
        { title: "過去を喰らう", artist: "花譜", youtubeId: "3xS-jC-g9sY" },
        { title: "不可解", artist: "花譜", youtubeId: "c_jE177b8bM" },
        { title: "トウキョウ・シャンディ・ランデヴ", artist: "花譜 feat. ツミキ", youtubeId: "N_a_k3L3N6A" },
        { title: "心臓と口", artist: "花譜", youtubeId: "3bF3b8pXk7Q" },
        { title: "戸惑いテレパシー", artist: "花譜", youtubeId: "Qp489c7484w" },
        { title: "魔女", artist: "V.W.P", youtubeId: "d1sN3G_CsqM" },
        { title: "流動", artist: "花譜", youtubeId: "3m0VvIe47dM" },
        { title: "祭壇", artist: "花譜", youtubeId: "V5l9TqE9Pj4" }
        // さらにここに多くの曲を追加できます！
    ];

    // 今日の日付に基づいて、毎日同じ曲が選ばれるようにする
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const randomIndex = dayOfYear % kafSongs.length;
    
    const todaysSong = kafSongs[randomIndex];

    // HTMLを生成して挿入
    featuredSongArea.innerHTML = `
        <div class="featured-song-content">
            <div class="featured-song-video">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/${todaysSong.youtubeId}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="featured-song-info">
                <h3>${todaysSong.title}</h3>
                <p>${todaysSong.artist}</p>
                <a href="https://www.youtube.com/watch?v=${todaysSong.youtubeId}" target="_blank" class="view-on-youtube-button">YouTubeで観測</a>
            </div>
        </div>
    `;
}


// 「YouTube人気ランキング」を表示する関数 (手動更新版)
function displayYoutubeRanking() {
    const rankingArea = document.getElementById('youtube-ranking-area');
    if (!rankingArea) {
        console.warn('YouTubeランキングを表示するエリアが見つかりません。');
        return;
    }

    // --- ここに、YouTubeの人気曲ランキングデータを手動で定義します ---
    // (※YouTube APIの利用はセキュリティ上の制約が厳しいため、手動更新を推奨)
    const youtubeRanking = [
        // サムネイル画像は 'maxresdefault.jpg' を優先。存在しない場合は 'hqdefault.jpg' なども試す
        { rank: 1, title: "過去を喰らう", views: "3,000万+", youtubeId: "3xS-jC-g9sY", thumbnail: "https://img.youtube.com/vi/3xS-jC-g9sY/maxresdefault.jpg" },
        { rank: 2, title: "トウキョウ・シャンディ・ランデヴ", views: "2,500万+", youtubeId: "N_a_k3L3N6A", thumbnail: "https://img.youtube.com/vi/N_a_k3L3N6A/maxresdefault.jpg" },
        { rank: 3, title: "不可解", views: "2,000万+", youtubeId: "c_jE177b8bM", thumbnail: "https://img.youtube.com/vi/c_jE177b8bM/maxresdefault.jpg" },
        { rank: 4, title: "食虫植物", views: "1,800万+", youtubeId: "k_Q_XgY7B-0", thumbnail: "https://img.youtube.com/vi/k_Q_XgY7B-0/maxresdefault.jpg" },
        { rank: 5, title: "心臓と口", views: "1,500万+", youtubeId: "3bF3b8pXk7Q", thumbnail: "https://img.youtube.com/vi/3bF3b8pXk7Q/maxresdefault.jpg" }
        // 再生数（views）は手動で更新してください。
    ];

    let rankingHtml = '<ul class="youtube-ranking-list">';
    youtubeRanking.forEach(song => {
        rankingHtml += `
            <li class="ranking-item fade-in">
                <a href="https://www.youtube.com/watch?v=${song.youtubeId}" target="_blank">
                    <span class="ranking-number">#${song.rank}</span>
                    <div class="ranking-thumbnail">
                        <img src="${song.thumbnail}" alt="${song.title} サムネイル">
                    </div>
                    <div class="ranking-info">
                        <h4>${song.title}</h4>
                        <p>${song.views} views</p>
                    </div>
                </a>
            </li>
        `;
    });
    rankingHtml += '</ul>';

    rankingArea.innerHTML = rankingHtml;
}


// ==========================================================
// 新規追加: YouTube登録者数カウンターの表示 (手動更新版)
// ==========================================================
function displayYoutubeSubscriberCounter() {
    const counterElement = document.getElementById('youtube-subscriber-counter');
    if (!counterElement) {
        console.warn('YouTube登録者数カウンターの表示エリアが見つかりません。');
        return;
    }

    // --- ここに、YouTubeチャンネル登録者数を手動で入力してください ---
    // 例: "1,000,000" のようにカンマ区切りで入力
    const subscriberCount = "1,140,000"; // ★★★★★ ここを最新の登録者数に手動で更新 ★★★★★

    // カウンターを更新
    counterElement.querySelector('.current-count').textContent = subscriberCount;
}
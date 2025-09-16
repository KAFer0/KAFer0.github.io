/*
  script_animation_control.js
  ---
  スクロールイベントを監視し、特定の要素が画面内に入った際に
  アニメーション（フェードインなど）を適用するためのスクリプト。
  style.css と連携して動作する。
*/

'use strict';

function initializeScrollAnimations() {
    // アニメーションを適用する要素を全て取得
    const fadeElements = document.querySelectorAll('.fade-in');

    // Intersection Observer API を使用して、要素の表示を効率的に監視する
    // Intersection Observerは、要素がビューポート（画面）に
    // 入ったかどうかを非同期に監視するためのモダンなWeb API。
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 要素が画面内に入ったら
            if (entry.isIntersecting) {
                // 'is-visible' クラスを付与してアニメーションを開始
                entry.target.classList.add('is-visible');
                // 一度アニメーションしたら、それ以上監視する必要はないので解除
                observer.unobserve(entry.target);
            }
        });
    }, {
        // オプション：ビューポートのどの位置でアニメーションをトリガーするか
        // rootMargin: '0px' は、要素の開始地点でトリガー
        // threshold: 0.2 は、要素が20%画面に入ったらトリガー
        threshold: 0.2 
    });

    // 取得した全ての .fade-in 要素を監視対象に追加
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// DOMが完全に読み込まれた後にアニメーションの初期化を行う
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);
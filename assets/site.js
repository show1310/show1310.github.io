/* Apps by SHOICHI SATO - developer site script
   役割は補助のみ。アプリ一覧は HTML に静的に埋め込まれているため、JS が動かなくても表示は成立する。
   1. アイコン画像の読み込み失敗時に頭文字のプレースホルダへ戻す
   2. 外部リンクに target=_blank / rel=noopener を付ける(同一サイト内リンクはそのまま) */
(function () {
  "use strict";

  function fallbackIcon(img) {
    var box = img.parentNode;
    if (!box) { return; }
    var initial = box.getAttribute("data-initial") || "";
    box.removeChild(img);
    box.textContent = initial;
  }

  function setupIcons() {
    var imgs = document.querySelectorAll(".app-icon img");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.complete && img.naturalWidth === 0) {
        fallbackIcon(img);
      } else {
        img.addEventListener("error", function (ev) { fallbackIcon(ev.target); });
      }
    }
  }

  function setupExternalLinks() {
    var here = window.location.host;
    var links = document.querySelectorAll("a[href^='http']");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.host && a.host !== here) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    }
  }

  setupIcons();
  setupExternalLinks();
})();

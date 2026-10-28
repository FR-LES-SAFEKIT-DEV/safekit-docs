---
title: "SafeKit 사용자 가이드 8.2"
canonical: "https://safekit.eviden.com/ko/resources/safekit-user-guide-82/"
description: "이 문서에서는 SafeKit 구현의 모든 단계(아키텍처, 설치, 테스트, 관리 및 문제 해결, 지원, 명령줄 인터페이스)를 다룹니다."
category: "resources"
lang: "ko"
layout: userguide
---

<div class="userguide-container">
  <div class="index-container">
    <iframe id="index-frame" name="index" src="/wp-content/uploads/downloads_safekit/version-82/safekituserguidehtml-github/userguide/indexsafekituserguideen.htm"> </iframe>
  </div>
  <div class="doc-container">
    <iframe id="doc-frame" name="doc" src="/wp-content/uploads/downloads_safekit/version-82/safekituserguidehtml-github/userguide/safekituserguideen.htm"> </iframe>
  </div>
</div>

<script>
  const docFrame = document.getElementById('doc-frame');
  const docBaseSrc = docFrame.getAttribute('src');

  function loadDocumentWithHash() {
    const hash = window.location.hash;
    docFrame.src = docBaseSrc + hash;
  }

  function enhanceFrame(frameName) {
    const frame = document.getElementById(frameName);
    if (!frame) return;
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument || frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, user-scalable=yes';
      doc.head.appendChild(meta);
    });
  }

  function handleClickMessage(event) {
    if (event.data.type === "hashClicked") {
      if (history.pushState) {
        window.history.pushState("", "Title", window.location.href.split('#')[0] + event.data.toc);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadDocumentWithHash();
    enhanceFrame('index-frame');
    enhanceFrame('doc-frame');
    window.addEventListener("message", handleClickMessage);
  });

  window.addEventListener('hashchange', loadDocumentWithHash);
</script>
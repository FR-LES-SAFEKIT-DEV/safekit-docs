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
    docFrame.src = docBaseSrc + 해시;
  }

  함수 enhanceFrame(frameName) {
    const frame = document.getElementById(frameName);
    프레임이 아니면 반환;
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument | | frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = '뷰포트';
      meta.content = 'width=device-width, initial-scale=1, user-scalable=yes';
      doc.head.appendChild(meta);
    });
  }

  function handleClickMessage(event) {
    이벤트의 데이터 유형이 "hashClicked"인 경우
      만약 (history.pushState)가 있다면 {
        window.history.pushState("", "Title", window.location.href.split('#') [ 0] + event.data.toc);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadDocumentWithHash();
    enhanceFrame('인덱스 프레임');
    enhanceFrame('doc-frame');
    window.addEventListener("message", handleClickMessage);
  });

  window.addEventListener('hashchange', loadDocumentWithHash);
</script>
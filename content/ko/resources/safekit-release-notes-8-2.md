---
title: "SafeKit 릴리스 노트 8.2"
canonical: "https://safekit.eviden.com/ko/resources/safekit-release-notes-8-2/"
description: "이 문서에서는 SafeKit 릴리스에 대한 정보(주요 변경 사항, 제한 사항 및 알려진 문제, 마이그레이션 지침)를 제공합니다."
category: "resources"
lang: "ko"
layout: userguide
---

<div class="userguide-container">
  <div class="index-container">
    <iframe id="index-frame" name="index" src="/wp-content/uploads/downloads_safekit/version-82/safekitreleasenoteshtml-github/releasenotes/indexsafekitreleasenotes.htm"> </iframe>
  </div>
  <div class="doc-container">
    <iframe id="doc-frame" name="doc" src="/wp-content/uploads/downloads_safekit/version-82/safekitreleasenoteshtml-github/releasenotes/safekitreleasenotes.htm"> </iframe>
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
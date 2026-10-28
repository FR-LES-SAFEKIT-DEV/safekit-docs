---
title: "SafeKit版本说明 8.2"
canonical: "https://safekit.eviden.com/zh-hans/resources/safekit-release-notes-8-2/"
description: "本文档提供有关SafeKit版本的信息：主要变更、限制和已知问题、迁移说明。"
category: "resources"
lang: "zh-hans"
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
    docFrame.src = docBaseSrc + 哈希；
  }

  function enhanceFrame(frameName) {
    const frame = document.getElementById(frameName);
    如果 (!frame) 返回；
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument | | frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = '视口';
      meta.content = 'width=device-width, initial-scale=1, user-scalable=yes';
      doc.head.appendChild(meta);
    });
  }

  function handleClickMessage(event) {
    如果 (event.data.type === "hashClicked") {
      如果 (history.pushState) {
        window.history.pushState("", "标题", window.location.href.split('#') [ 0] + event.data.toc);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadDocumentWithHash();
    增强帧('index-frame');
    增强框架('doc-frame');
    window.addEventListener("message", handleClickMessage);
  });

  window.addEventListener('hashchange', loadDocumentWithHash);
</script>
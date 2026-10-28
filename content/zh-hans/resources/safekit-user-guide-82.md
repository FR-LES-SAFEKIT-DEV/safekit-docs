---
title: "SafeKit用户指南 8.2"
canonical: "https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/"
description: "本文档涵盖了SafeKit实现的各个阶段：架构、安装、测试、管理和故障排除、支持以及命令行界面。"
category: "resources"
lang: "zh-hans"
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
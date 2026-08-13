---
title: "SafeKit Release Notes 8.2"
slug: "safekit-release-notes-8-2"
canonical: "https://safekit.eviden.com/resources/safekit-release-notes-8-2/"
description: "This document provides information about SafeKit releases: major changes, restrictions and known problems, migration instructions."
category: "resources"
lang: "en"
layout: userguide
---

<div class="userguide-container single-frame">
  <div class="doc-container">
    <iframe id="doc-frame" name="doc" src="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/safekit82releasenotes.htm"></iframe>
  </div>
</div>

<script>
  const docFrame = document.getElementById('doc-frame');

  function loadDocumentWithHash() {
    const hash = window.location.hash;
    docFrame.src = '/safekit-docs/wp-content/uploads/downloads_safekit/version-82/safekit82releasenotes.htm' + hash;
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
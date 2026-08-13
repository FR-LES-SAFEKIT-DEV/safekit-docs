---
title: "SafeKit User's Guide 8.2"
slug: "safekit-user-guide-82"
canonical: "https://safekit.eviden.com/resources/safekit-user-guide-82/"
description: "This document covers all the phases of the SafeKit implementation: architecture, installation, tests, administration & troubleshooting, support, and command line interface."
category: "resources"
lang: "en"
layout: userguide
---

<div class="userguide-container">
  <div class="index-container">
    <iframe id="index-frame" name="index" src="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/safekituserguidehtml/documentation/indexsafekituserguideen.htm"></iframe>
  </div>
  <div class="doc-container">
    <iframe id="doc-frame" name="doc" src="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/safekituserguidehtml/documentation/safekituserguideen.htm"></iframe>
  </div>
</div>

<script>
  const docFrame = document.getElementById('doc-frame');

  function loadDocumentWithHash() {
    const hash = window.location.hash;
    docFrame.src = '/safekit-docs/wp-content/uploads/downloads_safekit/version-82/safekituserguidehtml/documentation/safekituserguideen.htm' + hash;
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
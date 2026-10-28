---
title: "Note di rilascio SafeKit 8.2"
canonical: "https://safekit.eviden.com/it/resources/safekit-release-notes-8-2/"
description: "Questo documento fornisce informazioni sulle versioni di SafeKit : modifiche principali, limitazioni e problemi noti, nonché istruzioni per la migrazione."
category: "resources"
lang: "it"
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

  funzione loadDocumentWithHash() {
    const hash = window.location.hash;
    docFrame.src = docBaseSrc + hash;
  }

  funzione enhanceFrame(frameName) {
    const frame = document.getElementById(frameName);
    se (!frame) restituisci;
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument | | frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, user-scalable=yes';
      doc.head.appendChild(meta);
    });
  }

  funzione handleClickMessage(evento) {
    se (event.data.type === "hashClicked") {
      se (history.pushState) {
        window.history.pushState("", "Titolo", window.location.href.split('#') [ 0] + event.data.toc);
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
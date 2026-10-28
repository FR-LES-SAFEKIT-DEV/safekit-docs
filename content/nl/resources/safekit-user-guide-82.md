---
title: "Gebruikershandleiding SafeKit 8.2"
canonical: "https://safekit.eviden.com/nl/resources/safekit-user-guide-82/"
description: "Dit document beschrijft alle fasen van de SafeKit -implementatie: architectuur, installatie, testen, beheer en probleemoplossing, ondersteuning en de commandoregelinterface."
category: "resources"
lang: "nl"
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

  functie loadDocumentWithHash() {
    const hash = window.location.hash;
    docFrame.src = docBaseSrc + hash;
  }

  functie enhanceFrame(frameName) {
    const frame = document.getElementById(frameName);
    als (!frame) terugkeren;
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument | | frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, user-scalable=yes';
      doc.head.appendChild(meta);
    });
  }

  functie handleClickMessage(event) {
    als (event.data.type === "hashClicked") {
      als (geschiedenis.pushState) {
        window.history.pushState("", "Titel", window.location.href.split('#') [ 0] + event.data.toc);
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
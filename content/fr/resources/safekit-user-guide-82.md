---
title: "Guide de l'utilisateur de SafeKit 8.2"
slug: "safekit-user-guide-82"
canonical: "https://safekit.eviden.com/fr/resources/safekit-user-guide-82/"
description: "Ce document couvre toutes les phases de mise en œuvre de SafeKit : architecture, installation, tests, administration, résolution de problèmes, support, interface ligne de commande"
category: "resources"
lang: "fr"
layout: userguide
---

<div class="userguide-container">
  <div class="index-container">
    <iframe id="index-frame" name="index" src="/wp-content/uploads/downloads_safekit/version-82/safekituserguidehtml/documentation/indexsafekituserguidefr.htm"></iframe>
  </div>
  <div class="doc-container">
    <iframe id="doc-frame" name="doc" src="/wp-content/uploads/downloads_safekit/version-82/safekituserguidehtml/documentation/safekituserguidefr.htm"></iframe>
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
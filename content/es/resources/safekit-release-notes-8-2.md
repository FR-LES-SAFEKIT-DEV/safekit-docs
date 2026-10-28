---
title: "Notas de la versión 8.2 SafeKit"
canonical: "https://safekit.eviden.com/es/resources/safekit-release-notes-8-2/"
description: "Este documento proporciona información sobre las versiones SafeKit : cambios importantes, restricciones y problemas conocidos, e instrucciones de migración."
category: "resources"
lang: "es"
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

  función cargarDocumentoConHash() {
    const hash = window.location.hash;
    docFrame.src = docBaseSrc + hash;
  }

  función enhanceFrame(frameName) {
    const frame = document.getElementById(frameName);
    si (!frame) regresar;
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument | | frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, user-scalable=yes';
      doc.head.appendChild(meta);
    });
  }

  función handleClickMessage(evento) {
    si (event.data.type === "hashClicked") {
      si (history.pushState) {
        window.history.pushState("", "Título", window.location.href.split('#') [ 0] + event.data.toc);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    cargarDocumentoConHash();
    mejorarFrame('index-frame');
    mejorarFrame('doc-frame');
    window.addEventListener("mensaje", handleClickMessage);
  });

  window.addEventListener('hashchange', loadDocumentWithHash);
</script>
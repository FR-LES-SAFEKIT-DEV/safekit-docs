---
title: "Guía del usuario SafeKit 8.2"
canonical: "https://safekit.eviden.com/es/resources/safekit-user-guide-82/"
description: "Este documento abarca todas las fases de la implementación de SafeKit : arquitectura, instalación, pruebas, administración y resolución de problemas, soporte e interfaz de línea de comandos."
category: "resources"
lang: "es"
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
---
title: "Notas de versão SafeKit 8.2"
canonical: "https://safekit.eviden.com/pt-pt/resources/safekit-release-notes-8-2/"
description: "Este documento fornece informações sobre as versões do SafeKit : principais alterações, restrições e problemas conhecidos, além de instruções de migração."
category: "resources"
lang: "pt-pt"
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

  função carregarDocumentoComHash() {
    const hash = window.location.hash;
    docFrame.src = docBaseSrc + hash;
  }

  função enhanceFrame(frameName) {
    const frame = document.getElementById(frameName);
    se (!frame) retornar;
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument | | frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, user-scalable=yes';
      doc.head.appendChild(meta);
    });
  }

  função handleClickMessage(evento) {
    se (event.data.type === "hashClicked") {
      se (history.pushState) {
        window.history.pushState("", "Título", window.location.href.split('#') [ 0] + event.data.toc);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    carregarDocumentoComHash();
    aprimorarFrame('index-frame');
    aprimorarFrame('doc-frame');
    janela.adicionarOuvinteDeEventos("mensagem", manipularMensagemDeClique);
  });

  janela.adicionarOuvinteDeEvento('hashchange', carregarDocumentoComHash);
</script>
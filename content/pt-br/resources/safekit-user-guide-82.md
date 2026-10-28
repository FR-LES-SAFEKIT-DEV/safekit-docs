---
title: "Guia do Usuário SafeKit 8.2"
canonical: "https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/"
description: "Este documento abrange todas as fases da implementação do SafeKit : arquitetura, instalação, testes, administração e resolução de problemas, suporte e interface de linha de comando."
category: "resources"
lang: "pt-br"
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
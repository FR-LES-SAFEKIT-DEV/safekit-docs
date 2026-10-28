---
title: "Notes de version 8.2 de SafeKit"
canonical: "https://safekit.eviden.com/fr/resources/safekit-release-notes-8-2/"
description: "Ce document fournit des informations sur les versions SafeKit : changements majeurs, restrictions et problèmes connus, instructions de migration."
category: "resources"
lang: "fr"
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

  fonction chargerDocumentAvecHash() {
    const hash = window.location.hash;
    docFrame.src = docBaseSrc + hachage ;
  }

  fonction améliorerFrame(nom_du_cadre) {
    const frame = document.getElementById(frameName);
    si (!frame) retourner;
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument | | frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=largeur-de-l'appareil, échelle-initiale=1, mise-à-l'échelle-utilisateur=oui';
      doc.head.appendChild(meta);
    });
  }

  fonction handleClickMessage(événement) {
    si (event.data.type === "hashClicked") {
      si (history.pushState) {
        window.history.pushState("", "Titre", window.location.href.split('#') [ 0] + event.data.toc);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    chargerDocumentAvecHash();
    améliorerFrame('index-frame');
    améliorerFrame('doc-frame');
    fenêtre.addEventListener("message", handleClickMessage);
  });

  fenêtre.addEventListener('hashchange', loadDocumentWithHash);
</script>
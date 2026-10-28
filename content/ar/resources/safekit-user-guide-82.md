---
title: "دليل المستخدم SafeKit 8.2"
canonical: "https://safekit.eviden.com/ar/resources/safekit-user-guide-82/"
description: "تغطي هذه الوثيقة جميع مراحل تنفيذ SafeKit : البنية، والتثبيت، والاختبارات، والإدارة واستكشاف الأخطاء وإصلاحها، والدعم، وواجهة سطر الأوامر."
category: "resources"
lang: "ar"
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

  دالة تحميل المستند باستخدام التجزئة () {
    const hash = window.location.hash;
    docFrame.src = docBaseSrc + hash;
  }

  دالة تحسين الإطار (اسم الإطار) {
    const frame = document.getElementById(frameName);
    إذا لم يكن الإطار موجودًا، فقم بالخروج.
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument | | frame.contentWindow.document;
      const meta = doc.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, user-scalable=yes';
      doc.head.appendChild(meta);
    });
  }

  دالة معالجة رسالة النقر (حدث) {
    إذا كان نوع بيانات الحدث هو "hashClicked" {
      إذا كان (history.pushState) {
        window.history.pushState("", "العنوان", window.location.href.split('#') [ 0] + event.data.toc);
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
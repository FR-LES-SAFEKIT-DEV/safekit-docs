---
title: "التوفر العالي Hyper-V باستخدام SafeKit: تثبيت وحدة hyperv.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit hyperv.safe للتوفر العالي على مستوى الأجهزة الافتراضية، مع نسخ أجهزة Hyper-V الافتراضية وتجاوز فشلها بين خادمين."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع Hyper-V عالي التوفر, قيود التوافر العالي SafeKit, نظرة عامة على حل SafeKit/Hyper-V, تثبيت حل SafeKit/Hyper-V على Windows (hyperv.safe), إعداد حل SafeKit/Hyper-V خطوة بخطوة, عرض توضيحي لحل SafeKit/Hyper-V"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--hyper-v-solution, installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe, step-by-step-configuration-of-the-safekit--hyper-v-solution, demonstration-of-the-safekit--hyper-v-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# التوفر العالي Hyper-V باستخدام SafeKit: تثبيت وحدة hyperv.safe للتحويل التلقائي عند الفشل {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Hyper-V" mod="hyperv"  %}}
 

## نظرة عامة على حل SafeKit/Hyper-V {#overview-of-the-safekit--hyper-v-solution}

الحل موضح هنا: **💡 [توفر عالٍ بسيط Hyper-V بدون تخزين مشترك (SAN)](</ar/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## تثبيت حل SafeKit/Hyper-V على Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### المتطلبات الأساسية {#prerequisites}

  * تم تثبيت دور Hyper-V على عقدتي Windows (مدمج مجانًا في جميع إصدارات Windows بما في ذلك Windows للكمبيوتر الشخصي).
  * التطبيقات الهامة المثبتة داخل جهاز افتراضي واحد أو أكثر.
  * الحد الأقصى 32 جهازًا افتراضيًا لكل مضيف Hyper-V.
  * يقتصر إجمالي البيانات المكررة على بضعة تيرابايتات — فإذا تجاوزت ذلك، يصبح وقت إعادة المزامنة كبيرًا.
  * الحد الأدنى لسرعة الاتصال البيني بين العُقد هو 1 جيجابت/ثانية (يوصى بسرعة 10 جيجابت/ثانية لإعادة مزامنة أسرع).
  * يتطلب تجاوز فشل بروتوكول الإنترنت (IP) وجود كلتا العقدتين على نفس LAN) أو LAN الموسعة (L2) — لا تدعم الشبكات الموجهة من الطبقة الثالثة (L3) (باستثناء [موازنات التحميل السحابية](</ar/resources/safekit-user-guide-82/#Cloud>) 🛠️).



{{%  insert-safekit-siemens-license-ar  %}}

{{%  insert-safekit-installation-package-windows-ar app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Hyper-V" mod="hyperv"  %}}
 

## إعداد حل SafeKit/Hyper-V خطوة بخطوة {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-ar app="Hyper-V" mod="hyperv"  %}}
 

## عرض توضيحي لحل SafeKit/Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
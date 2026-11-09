---
title: "التوافر العالي KVM باستخدام SafeKit: تثبيت وحدة kvm.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "تعرّف على كيفية تهيئة kvm.safe لمجموعة KVM نشطة/نشطة باستخدام SafeKit. حقق توافرًا عاليًا على مستوى الجهاز الظاهري باستخدام البنية من عقدتين بدون مشاركة. انسخ العديد من الأجهزة الظاهرية بشكل متزامن عبر العقد لإجراء تجاوز تلقائي للفشل دون تكلفة شبكة منطقة التخزين SAN أو التخزين المشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع عالي التوافر لـ KVM، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/KVM، تثبيت حل SafeKit/KVM على Linux (kvm.safe)، إعداد حل SafeKit/KVM خطوة بخطوة، عرض حل عالي التوافر على مستوى الجهاز الظاهري، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوافر العالي KVM باستخدام SafeKit: تثبيت وحدة kvm.safe للتحويل التلقائي عند الفشل {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="KVM" mod="kvm"  %}}
 

## نظرة عامة على حل SafeKit/KVM {#overview-of-the-safekit--kvm-solution}

الحل موضح هنا: **💡 [توفير توافر عالٍ بسيط Linux KVM بدون تخزين مشترك](</ar/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## تثبيت حل SafeKit/KVM على Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### المتطلبات الأساسية {#prerequisites}

  * تم تثبيت KVM على عقدتي Linux.
  * التطبيقات الهامة المثبتة داخل جهاز افتراضي واحد أو أكثر.
  * الحد الأقصى 32 جهازًا افتراضيًا لكل مضيف KVM.
  * يقتصر إجمالي البيانات المكررة على بضعة تيرابايتات — فإذا تجاوزت ذلك، يصبح وقت إعادة المزامنة كبيرًا.
  * الحد الأدنى لسرعة الاتصال البيني بين العُقد هو 1 جيجابت/ثانية (يوصى بسرعة 10 جيجابت/ثانية لإعادة مزامنة أسرع).
  * يتطلب تجاوز فشل بروتوكول الإنترنت (IP) وجود كلتا العقدتين على نفس LAN) أو LAN الموسعة (L2) — لا تدعم الشبكات الموجهة من الطبقة الثالثة (L3) (باستثناء [موازنات التحميل السحابية](</ar/resources/safekit-user-guide-82/#Cloud>) 🛠️).



{{%  insert-safekit-installation-package-linux-ar app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="KVM" mod="kvm"  %}}
 

## إعداد حل SafeKit/KVM خطوة بخطوة {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-ar app="KVM" mod="kvm"  %}}
 

## عرض حل عالي التوافر على مستوى الجهاز الظاهري {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
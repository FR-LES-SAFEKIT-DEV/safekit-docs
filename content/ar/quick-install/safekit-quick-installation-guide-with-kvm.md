---
title: "KVM High Availability with SafeKit: قم بتثبيت وحدة kvm.safe لتجاوز الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "تعرف على تكوين kvm.safe لمجموعة KVM نشطة/نشطة باستخدام SafeKit. حقق توافرًا عاليًا على مستوى الجهاز الافتراضي من خلال بنية لا شيء مشتركة ثنائية العقد. نسخ العديد من الأجهزة الافتراضية بشكل متزامن عبر العقد للتجاوز التلقائي للفشل دون تكلفة شبكة منطقة التخزين (SAN) أو التخزين المشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع عالي التوافر لـ KVM، قيود التوافر العالي لـ SafeKit، نظرة عامة على حل SafeKit/ KVM، تثبيت حل SafeKit/ KVM على Linux (kvm.safe)، تكوين حل SafeKit/ KVM خطوة بخطوة، عرض حل التوافر العالي على مستوى VM، مركز 🔍 التنقل عالي التوافر لـ SafeKit"
---

# توافر KVM عالٍ مع SafeKit: تثبيت وحدة kvm.safe لتجاوز الفشل {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="KVM" mod="kvm"  %}}
 

## نظرة عامة على حل SafeKit / KVM {#overview-of-the-safekit--kvm-solution}

الحل موضح هنا: **💡[توفر عالٍ بسيط لـ Linux KVM دون تخزين مشترك](</ar/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## تثبيت حل SafeKit / KVM على Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### المتطلبات الأساسية {#prerequisites}

  * تم تثبيت KVM على عقدتي Linux.
  * التطبيقات الهامة المثبتة داخل جهاز ظاهري واحد أو أكثر.
  * حد أقصى 32 آلة افتراضية لكل مضيف KVM.
  * يقتصر إجمالي البيانات المنسوخة على بضعة تيرابايت - وبعد ذلك، يصبح وقت إعادة المزامنة كبيرًا.
  * الحد الأدنى من الاتصال البيني 1 جيجابت/ثانية بين العقد (يوصى بسرعة 10 جيجابت/ثانية لإعادة المزامنة بشكل أسرع).
  * يتطلب تجاوز عنوان IP أن تكون العقدتان على شبكة LAN نفسها أو LAN موسعة (L2) — لا تُدعم شبكات L3 الموجّهة (إلا باستخدام 🛠️ [موازنات التحميل السحابية](</ar/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-ar app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="KVM" mod="kvm"  %}}
 

## خطوة بخطوة تكوين حل SafeKit/ KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-ar app="KVM" mod="kvm"  %}}
 

## عرض توضيحي لحل التوافر العالي على مستوى VM {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
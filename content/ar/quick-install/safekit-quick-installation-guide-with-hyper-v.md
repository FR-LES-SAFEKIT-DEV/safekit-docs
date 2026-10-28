---
title: "التوفر العالي لـ Hyper-V مع SafeKit: قم بتثبيت وحدة Hyperv.safe لتجاوز الفشل"
canonical: https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: تعرف على تكوين Hyperv.safe لمجموعة Hyper-V النشطة/النشيطة باستخدام
  SafeKit. حقق التوفر العالي على مستوى الأجهزة الافتراضية (VM) من خلال بنية
  ثنائية العقدة لا شيء مشترك. نسخ العديد من الأجهزة الافتراضية بشكل متزامن عبر
  العقد لتجاوز الفشل التلقائي دون تكلفة شبكة SAN أو التخزين المشترك.
category: quick-install
lang: ar
topics: دليل التثبيت السريع للتوافر العالي لـ Hyper-V، قيود التوفر العالي لـ
  SafeKit، نظرة عامة على حل SafeKit / Hyper-V، تثبيت حل SafeKit / Hyper-V على
  Windows (hyperv.safe)، التكوين خطوة بخطوة لحل SafeKit / Hyper-V، عرض توضيحي
  لحل SafeKit / Hyper-V، 🔍 مركز التنقل عالي التوفر SafeKit
---

# Hyper-V التوفر العالي مع SafeKit: تثبيت وحدة Hyperv.safe لتجاوز الفشل {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Hyper-V" mod="hyperv"  %}}
 

## نظرة عامة على حل SafeKit / Hyper-V {#overview-of-the-safekit--hyper-v-solution}

الحل موضح هنا: **💡[Hyper-V بسيط توفر عالي بدون تخزين مشترك (SAN)](</ar/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## تثبيت الحل SafeKit / Hyper-V على Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### المتطلبات الأساسية {#prerequisites}

  * تم تثبيت دور Hyper-V على عقدتين Windows (مضمنة مجانًا في جميع إصدارات Windows بما في ذلك Windows للكمبيوتر الشخصي).
  * التطبيقات الهامة المثبتة داخل جهاز ظاهري واحد أو أكثر.
  * الحد الأقصى 32 جهازًا افتراضيًا لكل مضيف Hyper-V.
  * يقتصر إجمالي البيانات المنسوخة على بضعة تيرابايت - وبعد ذلك، يصبح وقت إعادة المزامنة كبيرًا.
  * الحد الأدنى من الاتصال البيني 1 جيجابت/ثانية بين العقد (يوصى بسرعة 10 جيجابت/ثانية لإعادة المزامنة بشكل أسرع).
  * يتطلب تجاوز فشل IP كلتا العقدتين على نفس LAN أو LAN الموسعة (L2) - شبكات L3 الموجهة غير مدعومة (باستثناء 🛠️ [موازنات التحميل السحابي](</ar/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-ar  %}}

{{%  insert-safekit-installation-package-windows-ar app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Hyper-V" mod="hyperv"  %}}
 

## تكوين حل SafeKit / Hyper-V خطوة بخطوة {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-ar app="Hyper-V" mod="hyperv"  %}}
 

## عرض الحل SafeKit / Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
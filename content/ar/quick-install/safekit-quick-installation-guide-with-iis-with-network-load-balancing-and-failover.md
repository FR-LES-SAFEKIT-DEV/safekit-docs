---
title: "موازنة أحمال الشبكة والتحويل التلقائي في حالة الفشل IIS : قم بتثبيت وحدة SafeKit iis_farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة iis_farm.safe على Windows لموازنة أحمال الشبكة والتحويل التلقائي في حالة الأعطال لـ IIS . يُوضح لك هذا الدليل كيفية إنشاء مجموعة عالية التوفر لخدمات الويب والتطبيقات باستخدام عنوان IP افتراضي، دون الحاجة إلى موازنات أحمال خارجية أو إعدادات معقدة."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ IIS ، قيود التوافر العالي لـ SafeKit ، نظرة عامة على حل SafeKit / IIS ، تثبيت حل SafeKit / IIS على Windows ( iis_farm.safe )، التكوين خطوة بخطوة لحل SafeKit / IIS ، عرض توضيحي لحل SafeKit `farm` ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# موازنة أحمال الشبكة والتحويل التلقائي في حالة الفشل IIS : قم بتثبيت الوحدات النمطية SafeKit iis_farm.safe {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="IIS" mod="iis_farm"  %}}
 

## نظرة عامة على حل SafeKit / IIS {#overview-of-the-safekit--iis-solution}

الحل موضح هنا: **💡 [ SafeKit : برنامج موازنة الأحمال والتوافر العالي المتكامل IIS ](</ar/solutions/iis-load-balancing-failover/>)** .

## تثبيت حل SafeKit / IIS على Windows ( iis_farm.safe ) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت IIS على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="IIS" mod="iis_farm"  %}}
 

## خطوات تكوين حل SafeKit / IIS {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-ar app="IIS" mod="iis_farm"  %}}
 

## عرض توضيحي لحل SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}
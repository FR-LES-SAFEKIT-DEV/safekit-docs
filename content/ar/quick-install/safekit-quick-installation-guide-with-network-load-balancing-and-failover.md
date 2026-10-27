---
title: "موازنة الأحمال والتحويل التلقائي في شبكة أباتشي: تثبيت وحدة SafeKit apache_farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة apache_farm.safe على نظامي التشغيل ويندوز ولينكس لموازنة أحمال شبكة أباتشي والتحويل التلقائي في حالة الأعطال. يُوضح لك هذا الدليل كيفية إنشاء مجموعة عالية التوفر لخدمات وتطبيقات الويب باستخدام عنوان IP افتراضي، دون الحاجة إلى موازنات أحمال خارجية أو إعدادات معقدة."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع لتوافر Apache العالي، قيود التوافر العالي لـ SafeKit، نظرة عامة على حل SafeKit / Apache، تثبيت حل SafeKit / Apache على نظامي التشغيل Windows وLinux (apache_farm.safe)، تهيئة حل SafeKit / Apache خطوة بخطوة، عرض توضيحي لحل SafeKit farm، 🔍 مركز التنقل للتوافر العالي لـ SafeKit"
---

# موازنة الأحمال والتحويل التلقائي في شبكة أباتشي: قم بتثبيت وحدة SafeKit apache_farm.safe {#apache-network-load-balancing--failover-install-the-safekit-apache_farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="Apache" mod="apache_farm"  %}}
 

## نظرة عامة على حل SafeKit / Apache {#overview-of-the-safekit--apache-solution}

الحل موضح هنا: **💡[SafeKit: برنامج Apache المتكامل لموازنة الأحمال والتوافر العالي](</ar/solutions/apache-load-balancing-failover-2/>)**.

## تثبيت حل SafeKit / Apache على نظامي التشغيل Windows و Linux (apache_farm.safe) {#installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت Apache على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-installation-package-linux-ar app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="Apache" mod="apache_farm"  %}}
 

## خطوات تكوين حل SafeKit / Apache {#step-by-step-configuration-of-the-safekit--apache-solution}


{{%  insert-safekit-82-farm-configuration-ar app="Apache" mod="apache_farm"  %}}
 

## عرض توضيحي لحل المزرعة SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}
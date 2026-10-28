---
title: "التوافر العالي Firebird مع SafeKit : قم بتثبيت وحدة firebird.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "قم بتثبيت وحدة firebird.safe لـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل لـ Firebird على Windows و Linux . يرشدك هذا الدليل خلال إعداد مجموعة SAN ثنائية العقد للتطبيقات الحيوية التي لا تستخدم تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Firebird و SafeKit ، قيود التوافر العالي، نظرة عامة على حل SafeKit / Firebird ، تثبيت حل SafeKit / Firebird على Windows و Linux ( firebird.safe )، التكوين خطوة بخطوة لحل SafeKit / Firebird ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# Firebird توفر إمكانية عالية مع SafeKit : قم بتثبيت وحدة firebird.safe للتحويل التلقائي في حالة الفشل {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Firebird" mod="firebird"  %}}
 

## نظرة عامة على حل SafeKit / Firebird {#overview-of-the-safekit--firebird-solution}

الحل موضح هنا: **💡 [ أبسط Firebird التوافر العالي: النسخ المتماثل المتزامن والتحويل التلقائي في حالة الفشل لعقدتين ](</ar/solutions/firebird-high-availability-synchronous-replication-failover/>)** .

## تثبيت حل SafeKit / Firebird على Windows و Linux ( firebird.safe ) و {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت Firebird على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="Firebird" mod="firebird"  %}}
 

## خطوات تكوين حل SafeKit / Firebird {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-ar app="Firebird" mod="firebird"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
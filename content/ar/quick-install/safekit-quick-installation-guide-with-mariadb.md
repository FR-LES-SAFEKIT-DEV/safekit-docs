---
title: "التوافر العالي MariaDB مع SafeKit : قم بتثبيت وحدة mysql.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "قم بتثبيت وحدة mysql.safe لـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل لـ MariaDB على Windows و Linux . يرشدك هذا الدليل خلال إعداد مجموعة SAN ثنائية العقد للتطبيقات الحيوية التي لا تستخدم تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ MariaDB و SafeKit ، قيود التوافر العالي، نظرة عامة على حل SafeKit / MariaDB ، تثبيت حل SafeKit / MariaDB على Windows و Linux ( mysql.safe )، التكوين خطوة بخطوة لحل SafeKit / MariaDB ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# MariaDB توفر إمكانية عالية مع SafeKit : قم بتثبيت وحدة mysql.safe للتحويل التلقائي في حالة الفشل {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="MariaDB" mod="mysql"  %}}
 

## نظرة عامة على حل SafeKit / MariaDB {#overview-of-the-safekit--mariadb-solution}

الحل موضح هنا: ** 💡 [ أبسط MariaDB التوافر العالي: النسخ المتماثل المتزامن والتحويل التلقائي في حالة الفشل لعقدتين ](</ar/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>) ** .

## تثبيت حل SafeKit / MariaDB على Windows و Linux ( mysql.safe ) و {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت MariaDB على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ar app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="MariaDB" mod="mysql"  %}}
 

## خطوات تكوين حل SafeKit / MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-ar app="MariaDB" mod="mysql"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
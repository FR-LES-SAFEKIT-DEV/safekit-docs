---
title: "تثبيت SafeKit للتوافر العالي لـ MariaDB (mysql.safe)"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit mysql.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لـ MariaDB على Windows أو Linux."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع MariaDB عالي التوفر, قيود التوافر العالي SafeKit, نظرة عامة على حل SafeKit/MariaDB, تثبيت حل SafeKit/MariaDB على نظامي التشغيل Windows و Linux (mysql.safe), إعداد حل SafeKit/MariaDB خطوة بخطوة, عرض حل mirror من SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--mariadb-solution, installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe, step-by-step-configuration-of-the-safekit--mariadb-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# تثبيت SafeKit للتوافر العالي لـ MariaDB (mysql.safe) {#install-safekit-for-mariadb-high-availability-mysqlsafe}


{{%  insert-safekit-mirror-guide-ar app="MariaDB" mod="mysql"  %}}
 

## نظرة عامة على حل SafeKit/MariaDB {#overview-of-the-safekit--mariadb-solution}

الحل موضح هنا: **💡 [أبسط طريقة لتحقيق التوافر العالي MariaDB: النسخ المتزامن وإعادة توجيه الأخطاء بعقدتين](</ar/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## تثبيت حل SafeKit/MariaDB على نظامي التشغيل Windows و Linux (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### المتطلبات الأساسية {#prerequisites}

  * تحتاج إلى تثبيت MariaDB على عقدتين (جهازين افتراضيين أو خادمين فعليين).



{{%  insert-safekit-installation-package-windows-ar app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ar app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="MariaDB" mod="mysql"  %}}
 

## إعداد حل SafeKit/MariaDB خطوة بخطوة {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-ar app="MariaDB" mod="mysql"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
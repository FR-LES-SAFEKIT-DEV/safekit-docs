---
title: "التوفر العالي لـ PostgreSQL مع SafeKit: قم بتثبيت وحدة postgresql.safe لتجاوز الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "انشر وحدة postgresql.safe لـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الحقيقي وتجاوز الفشل التلقائي لـ PostgreSQL على نظامي التشغيل Windows وLinux. يرشدك هذا الدليل خلال عملية إعداد مجموعة SANless ذات عقدتين للتطبيقات الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع لـ PostgreSQL، قيود التوفر العالية لـ SafeKit، نظرة عامة على حل SafeKit / PostgreSQL، تثبيت حل SafeKit / PostgreSQL على نظامي التشغيل Windows وLinux (postgresql.safe)، التكوين خطوة بخطوة لحل SafeKit / PostgreSQL، عرض توضيحي لحل مرآة SafeKit، 🔍 مركز التنقل عالي التوفر من SafeKit"
---

# التوفر العالي لـ PostgreSQL مع SafeKit: تثبيت وحدة postgresql.safe لتجاوز الفشل {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="PostgreSQL" mod="postgresql.safe"  %}}
 

## نظرة عامة على حل SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

الحل موصوف هنا: **💡[أبسط توفر عالي لـ PostgreSQL: النسخ المتماثل المتزامن للعقدتين وتجاوز الفشل](</ar/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit / PostgreSQL على نظامي التشغيل Windows وLinux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت PostgreSQL على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-ar app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="PostgreSQL" mod="postgresql"  %}}
 

## تكوين حل SafeKit / PostgreSQL خطوة بخطوة {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-ar app="PostgreSQL" mod="postgresql"  %}}
 

## عرض حل المرآة SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
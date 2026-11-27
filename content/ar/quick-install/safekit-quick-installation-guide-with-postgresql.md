---
title: "التوفر العالي PostgreSQL باستخدام SafeKit: تثبيت وحدة postgresql.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit postgresql.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لـ PostgreSQL على Windows أو Linux."
category: "quick-install"
lang: "ar"
topics: "نظرة عامة على حل SafeKit/PostgreSQL, تثبيت حل SafeKit/PostgreSQL على نظامي التشغيل Windows و Linux (postgresql.safe), إعداد حل SafeKit/PostgreSQL خطوة بخطوة, عرض حل mirror من SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# التوفر العالي PostgreSQL باستخدام SafeKit: تثبيت وحدة postgresql.safe للتحويل التلقائي عند الفشل {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="PostgreSQL" mod="postgresql.safe"  %}}
 

## نظرة عامة على حل SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

الحل موضح هنا: **💡 [أبسط طريقة لتحقيق التوافر العالي PostgreSQL: النسخ المتماثل المتزامن بين عقدتين وتجاوز الأعطال](</ar/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit/PostgreSQL على نظامي التشغيل Windows و Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### المتطلبات الأساسية {#prerequisites}

  * تحتاج إلى تثبيت PostgreSQL على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-ar app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="PostgreSQL" mod="postgresql"  %}}
 

## إعداد حل SafeKit/PostgreSQL خطوة بخطوة {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-ar app="PostgreSQL" mod="postgresql"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
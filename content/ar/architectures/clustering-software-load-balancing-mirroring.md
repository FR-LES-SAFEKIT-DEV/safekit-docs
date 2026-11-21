---
title: "برنامج التجميع مع موازنة التحميل والنسخ المتطابق: التوافر العالي وقابلية التوسع"
canonical: "https://safekit.eviden.com/ar/architectures/clustering-software-load-balancing-mirroring/"
description: "قم ببناء بنى متقدمة من خلال الجمع بين وحدات SafeKit farm ووحدات mirror. يوسع موازن تحميل الشبكة الواجهة الأمامية، ويحمي النسخ المتماثل المتزامن في الوقت الفعلي بيانات الواجهة الخلفية. تجميع بسيط بدون شبكة منطقة تخزين (SAN) لأنظمة Windows و Linux، دون الحاجة إلى مهارات تكنولوجيا معلومات متخصصة. قم بتنزيل نسختك التجريبية المجانية."
category: "architectures"
lang: "ar"
topics: "التوافر العالي وقابلية التوسع لتطبيقات الويب وقواعد البيانات الهامة باستخدام برنامج SafeKit للتجميع، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 44 expressions"
---

# برنامج التجميع مع موازنة التحميل والنسخ المتطابق: التوافر العالي وقابلية التوسع {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## التوافر العالي وقابلية التوسع لتطبيقات الويب وقواعد البيانات الهامة باستخدام برنامج SafeKit للتجميع {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### موازنة التحميل، والنسخ المتطابق، وتجاوز الفشل {#load-balancing-mirroring-and-failover}


![تجميع SafeKit مع موازنة التحميل والنسخ المتطابق](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### مثال باستخدام برنامج SafeKit للتجميع {#example-with-the-safekit-clustering-software}

على سبيل المثال، باستخدام برنامج SafeKit للتجميع، يمكنك تطبيق موازنة التحميل لـ IIS والنسخ المتطابق لـ Microsoft SQL Server.

للقيام بذلك، قم بنشر وحدة <span class="notranslate farm-term" translate="no">farm</span> لـ IIS ووحدة mirror لـ Microsoft SQL Server. يتم تكوين كل وحدة بعنوان IP ظاهري خاص بها ونصوص إعادة التشغيل الخاصة بها.

يمكن نشر الوحدتين على مجموعة واحدة من خادمين، حيث يعمل كل من IIS وMicrosoft SQL Server. بدلاً من ذلك، يمكن نشر الوحدتين على مجموعتين منفصلتين بخوادم مختلفة.

باستخدام برنامج SafeKit للتجميع، يعمل النشر على نفس الخوادم أو على خوادم مختلفة بنفس الطريقة تمامًا.

### حلول عالية التوافر وقابلة للتوسع {#high-availability-and-scalability-solution}

يوفر برنامج SafeKit للتجميع حلاً بسيطًا عالي التوافر وقابلًا للتوسع لتطبيقات الويب وقواعد البيانات الهامة.

تتم إدارة موازنة تحميل الشبكة، ونسخ البيانات في الوقت الفعلي، وتجاوز الأعطال في التطبيقات بشكل متسق في منتج واحد.

على عكس تجميع الأجهزة، لا يتطلب برنامج تجميع SafeKit أقراصًا مشتركة أو شبكات SAN مكررة أو موازنات تحميل للأجهزة أو إصدارات مؤسسية من أنظمة التشغيل أو قواعد البيانات.


{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
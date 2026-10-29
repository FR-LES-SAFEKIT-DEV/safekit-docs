---
title: "برامج تجميع البيانات للمزارع والخوادم المتطابقة: التوافر العالي وموازنة الأحمال"
canonical: "https://safekit.eviden.com/ar/architectures/clustering-software-load-balancing-mirroring/"
description: "انشر بنىً متقدمةً من خلال دمج وحدات SafeKit و Farm و Mirror . اجمع بين موازنة أحمال الشبكة لتوسيع نطاق الواجهة الأمامية، والنسخ المتزامن في الوقت الفعلي لحماية بيانات الواجهة الخلفية. نظام تجميع بسيط بدون شبكة تخزين (SAN) لوحدات Windows و Linux دون الحاجة إلى مهارات تقنية معلومات متخصصة. حمّل نسختك التجريبية المجانية."
category: "architectures"
lang: "ar"
topics: "توفر برامج التجميع SafeKit إمكانية عالية للتوافر وقابلية التوسع لتطبيقات الويب وقواعد البيانات الحيوية، 🔍 SafeKit مركز التنقل عالي التوافر"
---

# برنامج تجميع البيانات للمزارع والخوادم المتطابقة: توافر عالٍ وموازنة الأحمال {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## توفر برامج التجميع SafeKit إمكانية عالية للتوافر وقابلية التوسع لتطبيقات الويب وقواعد البيانات الحيوية {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### موازنة الأحمال، والنسخ المتطابق، والتحويل التلقائي في حالة الفشل {#load-balancing-mirroring-and-failover}


![ SafeKit التجميع مع موازنة الأحمال والنسخ المتطابق ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### مثال باستخدام برنامج التجميع SafeKit {#example-with-the-safekit-clustering-software}

على سبيل المثال، باستخدام برنامج التجميع SafeKit ، يمكنك تنفيذ موازنة التحميل IIS والنسخ المتطابق Microsoft SQL Server .

لذلك، عليك تثبيت وحدة <span class="notranslate farm-term" translate="no">farm</span> لخادم SQL IIS ووحدة mirror لخادم SQL Microsoft . يتم تكوين كل وحدة من وحدات <span class="notranslate farm-term" translate="no">farm</span> و mirror بعنوان IP افتراضي خاص بها ونصوص إعادة تشغيل خاصة بها.

يمكن نشر كل من وحدتي mirror و <span class="notranslate farm-term" translate="no">farm</span> على مجموعة واحدة من خادمين. ستعمل وحدات IIS و Microsoft SQL Server على هذين الخادمين. أو يمكن نشر الوحدتين على مجموعتين مختلفتين من الخوادم.

باستخدام برنامج التجميع SafeKit ، لا يوجد فرق بين النشر على نفس الخوادم أو على خوادم مختلفة.

### حل عالي التوافر وقابل للتوسع {#high-availability-and-scalability-solution}

يوفر برنامج التجميع SafeKit حلاً بسيطاً عالي التوافر وقابلية التوسع لتطبيقات الويب وقواعد البيانات الهامة.

ونتيجة لذلك، تتم إدارة موازنة تحميل الشبكة، ونسخ البيانات في الوقت الفعلي، وتجاوز فشل التطبيق بشكل متماسك في منتج واحد.

عند مقارنة برنامج التجميع SafeKit مع التجميع باستخدام الأجهزة، لن تحتاج إلى قرص مشترك، أو شبكة تخزين مكررة، أو موازنات تحميل، أو إصدارات المؤسسات من نظام التشغيل أو قاعدة البيانات.


{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
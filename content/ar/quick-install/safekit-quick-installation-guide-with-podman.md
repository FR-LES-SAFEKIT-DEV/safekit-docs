---
title: "التوافر العالي Podman باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-podman/"
description: "انشر وحدة mirror.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الأعطال التلقائي لحاويات Podman على Linux. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون شبكة منطقة تخزين (SANless) للتطبيقات الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Podman، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Podman، تثبيت حل SafeKit/Podman على Linux (mirror.safe)، إعداد حل SafeKit/Podman خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوافر العالي Podman باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Podman" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit/Podman {#overview-of-the-safekit--podman-solution}

يُوصَف الحل هنا: **💡 [SafeKit: برنامج Podman لضمان التوافر العالي وتكرار البيانات في الوقت الفعلي](</ar/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## تثبيت حل SafeKit/Podman على Linux (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب تثبيت تطبيق Podman الذي تريد إعادة تشغيله في SafeKit على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

### مثال على صورة حاوية بسيطة {#example-with-a-simple-container-image}

في هذا المثال، سنوضح كيف يمكن لـ SafeKit إدارة حاوية nginx (خادم ويب)، أي: نسخ دليل يتم الوصول إليه في الحاوية وإعادة تشغيل الحاوية على عقدة أخرى في حالة حدوث عطل.

#### المتطلبات الأساسية {#prerequisites-1}

  * إنشاء دليل مكرر **على كلا العقدتين**  
أنشئ دليلاً **/replicated_dir_path** سيتم نسخه بواسطة SafeKit وسيحتوي على صفحات HTML التي يخدمها nginx
  * املأ هذا الدليل بملف HTML أولي **على كلا العقدتين**
        
        cp index.html /replicated_dir_path

  * إنشاء حاوية **على كلتا العقدتين**  
أنشئ حاوية nginx على كلا العقدتين تربط الدليل **/replicated_dir_path** بـ **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### تكوين SafeKit {#safekit-configuration}

  * انتقل إلى قسم **الإعداد خطوة بخطوة**
  * إنشاء وحدة **mirror.safe** وتهيئتها
  * قم بتعيين **عنوان IP ظاهري** سيتم تبديله في حالة حدوث عطل
  * تعيين **/replicated_dir_path** كدليل متكرر
  * ضع على التوالي في برنامجي start_prim و stop_prim النصين التاليين: **podman start mynginx** و **podman stop mynginx**  
ملاحظة: قد تضطر إلى استخدام الأمر "podman start --security-opt label=disable mynginx" مع Linux SE.
  * نشر وبدء تشغيل وحدة SafeKit mirror


#### الاختبارات {#tests}

  * اختبر الوصول إلى nginx على **http://vitual-ip:9011/index.html**
  * تكرار الاختبار:  
في العقدة التي توجد في حالة SafeKit PRIM، أضف بعض ملفات HTML الأخرى إلى الدليل المنسوخ: 
        
        cp page.html /replicated_dir_path

  * إيقاف وحدة mirror على العقدة في حالة SafeKit PRIM
  * اختبر ما إذا كانت الحاوية قد أُعيد تشغيلها على العقدة الثانوية
  * اختبار الوصول إلى **http://vitual-ip:9011/index.html** وإلى** http://vitual-ip:9011/page.html**


## إعداد حل SafeKit/Podman خطوة بخطوة {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-ar app="Podman" mod="mirror"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
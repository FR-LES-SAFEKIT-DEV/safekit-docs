---
title: "التوافر العالي Podman مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-podman/"
description: "قم بتثبيت وحدة mirror.safe على SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل لحاويات Podman على Linux . يرشدك هذا الدليل خلال إعداد مجموعة خوادم ثنائية العقدة بدون شبكة تخزين (SAN) للتطبيقات الحيوية التي لا تتطلب تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Podman ، قيود التوافر العالي لـ SafeKit ، نظرة عامة على حل SafeKit / Podman ، تثبيت حل SafeKit / Podman على Linux ( mirror.safe )، التكوين خطوة بخطوة لحل SafeKit / Podman ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# Podman توفر إمكانية عالية مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Podman" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit / Podman {#overview-of-the-safekit--podman-solution}

الحل موضح هنا: **💡 [ SafeKit : Podman برنامج عالي التوافر ونسخ البيانات في الوقت الحقيقي ](</ar/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)** .

## تثبيت حل SafeKit / Podman على Linux ( mirror.safe ) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تطبيق Podman الذي تريد إعادة تشغيله في SafeKit مثبتًا على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

### مثال مع صورة حاوية بسيطة {#example-with-a-simple-container-image}

في هذا المثال، سنوضح كيف يمكن لـ SafeKit إدارة حاوية nginx (خادم الويب)، أي: نسخ دليل يتم الوصول إليه في الحاوية وإعادة تشغيل الحاوية على عقدة أخرى في حالة الفشل.

#### المتطلبات الأساسية {#prerequisites-1}

  * أنشئ مجلدًا مُكررًا **على كلا العقدتين**  
أنشئ مجلدًا **/replicated_dir_path** سيتم نسخه بواسطة SafeKit وسيحتوي على صفحات HTML يتم عرضها بواسطة nginx
  * قم بتعبئة هذا المجلد بملف HTML أولي **على كلا العقدتين**
        
        cp index.html /replicated_dir_path

  * أنشئ حاوية **على كلا العقدتين**  
قم بإنشاء حاوية nginx على كلا العقدتين بحيث تربط الدليل **/replicated_dir_path** بالدليل **/usr/share/nginx/html** : 
        
        إنشاء حاوية Podman باسم mynginx وإصدار /replicated_dir_path ، وعنوان IP /usr/share/nginx/html ، وعنوان IP 9011:80، nginx


#### تكوين SafeKit تكوين {#safekit-configuration}

  * انتقل إلى قسم **الخاص بتكوين** خطوة بخطوة
  * قم بإنشاء وتكوين وحدة **mirror.safe**
  * قم بتعيين **عنوان IP افتراضي** سيتم التبديل إليه في حالة حدوث عطل
  * قم بتعيين **/replicated_dir_path** كدليل مُكرر
  * ضع على التوالي في البرامج النصية start_prim و stop_prim : **podman start mynginx** و **podman stop mynginx**  
ملاحظة: قد تحتاج إلى استخدام "podman start --security-opt label=disable mynginx " مع SE Linux .
  * قم بنشر وتشغيل وحدة SafeKit mirror


#### اختبارات {#tests}

  * اختبار الوصول إلى nginx على **http://vitual-ip:9011/index.html**
  * تكرار الاختبار:  
على العقدة في حالة SafeKit PRIM، أضف بعض ملفات HTML الأخرى إلى الدليل المنسوخ: 
        
        cp page.html /replicated_dir_path

  * أوقف وحدة mirror على العقدة في حالة SafeKit PRIM
  * اختبر إعادة تشغيل الحاوية على العقدة الثانوية
  * اختبار الوصول إلى **http://vitual-ip:9011/index.html** و **http://vitual-ip:9011/page.html**


## خطوات تكوين حل SafeKit / Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-ar app="Podman" mod="mirror"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
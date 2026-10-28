---
title: "التوافر العالي Docker مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-docker/"
description: "قم بتثبيت وحدة mirror.safe على SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل لحاويات Docker على Linux . يرشدك هذا الدليل خلال عملية إعداد مجموعة من عقدتين لا تستخدم التخزين المشترك للتطبيقات الحيوية التي لا تتطلب تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Docker ، قيود التوافر العالي لـ SafeKit ، نظرة عامة على حل SafeKit / Docker ، تثبيت حل SafeKit / Docker على Linux ( mirror.safe )، التكوين خطوة بخطوة لحل SafeKit / Docker ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# Docker توفر إمكانية عالية مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Docker" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit / Docker {#overview-of-the-safekit--docker-solution}

الحل موضح هنا: ** 💡 [ SafeKit : Docker برنامج عالي التوافر ونسخ البيانات في الوقت الفعلي ](</ar/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## تثبيت حل SafeKit / Docker على Linux ( mirror.safe ) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تطبيق Docker الذي تريد إعادة تشغيله في SafeKit مثبتًا على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

### مثال 1 مع تطبيق Docker compose {#example-1-with-a-docker-compose-application}

باستخدام تطبيق Docker compose، لديك ملف **docker-compose.yml** يصف التطبيق وجميع حاوياته.

  * أولاً، على كلا الخادمين، قم بتثبيت تطبيق Docker Compose دون تشغيله: **docker-compose -f docker-compose.yml up --no-start**
  * على خادم واحد، لكل وحدة تخزين في docker-compose.yml ، قم بتشغيل هذا الأمر: **docker volume inspect volume_name**  
سوف يعيد **host directories of the docker volumes** (هذه المسارات غير موجودة في docker-compose.yml ).  
ستحصل على قائمة بالمسارات على النحو التالي: **/var/lib/docker/volumes/ <volume_name>/_data**
  * انتقل إلى قسم **الخاص بتكوين** خطوة بخطوة و 
    * قم بنشر وحدة **mirror.safe**
    * قم بتعيين **عنوان IP افتراضي** سيتم التبديل إليه في حالة الفشل
    * قم بتعيين قائمة **/var/lib/docker/volumes/ <volume_name>/_data** كدليل **المنسوخ**
    * ضع على التوالي في البرامج النصية start_prim و stop_prim : **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** و **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### مثال 2 مع تطبيق Docker يبدأ مجموعة من الحاويات {#example-2-with-a-docker-application-starting-a-set-of-containers}

نفترض هنا تطبيق Docker **myappli** يبدأ مجموعة من الحاويات.

  * أولاً، على كلا الخادمين، قم بتثبيت **myappli** دون تشغيلها
  * على أحد الخوادم، اعرض قائمة وحدات التخزين المستخدمة بواسطة myapply : **ls /var/lib/docker/volumes**  
وبالتالي، ستحصل على قائمة بالمسارات على النحو التالي: **/var/lib/docker/volumes/ <volume_name>/_data**
  * انتقل إلى قسم **الخاص بتكوين** خطوة بخطوة و 
    * قم بنشر وحدة **mirror.safe**
    * قم بتعيين **عنوان IP افتراضي** سيتم التبديل إليه في حالة الفشل
    * قم بتعيين قائمة **/var/lib/docker/volumes/ <volume_name>/_data** كدليل **المنسوخ**
    * ضع على التوالي في البرامج النصية start_prim و stop_prim ما يلي: **/.../myappli بدء** و **و /.../myappli إيقاف**


### مثال 3 مع صورة بسيطة Docker {#example-3-with-a-simple-docker-image}

يتم عرض التكوين على مثال صورة nginx Docker (خادم الويب).

  * إنشاء وحدة تخزين Docker  
أنشئ وحدة تخزين Docker على كلا الخادمين بنفس الاسم: **docker volume create replicated_vol**  
احصل على مسار الدليل حيث يتم تخزين وحدة التخزين على المضيف: **docker volume inspect replicated_vol**  
(على سبيل المثال: **/var/lib/docker/storage/replicated_vol/_data** )
  * إنشاء حاوية Docker  
على كلا الخادمين، أنشئ حاوية Docker باسم nginx مرتبطة بوحدة التخزين السابقة: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
قم بتعبئة وحدة التخزين بملف index.html : **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * انتقل إلى قسم **الخاص بتكوين** خطوة بخطوة و 
    * قم بنشر وحدة **mirror.safe**
    * قم بتعيين **عنوان IP افتراضي** سيتم التبديل إليه في حالة الفشل
    * قم بتعيين **/var/lib/docker/storage/replicated_vol/_data** كدليل مُكرر
    * ضع على التوالي في البرامج النصية start_prim و stop_prim : **docker start mynginx** و **docker stop mynginx**
    * بعد تهيئة SafeKit ، اختبر الوصول إلى index.html باستخدام **و http://vitual-ip:9011**


## خطوات تكوين حل SafeKit / Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-ar app="Docker" mod="mirror"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
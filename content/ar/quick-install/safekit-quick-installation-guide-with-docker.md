---
title: "التوفر العالي Docker باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-docker/"
description: "انشر وحدة mirror.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الأعطال التلقائي لحاويات Docker على Linux. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون مشاركة للتطبيقات الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Docker، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Docker، تثبيت حل SafeKit/Docker على Linux (mirror.safe)، إعداد حل SafeKit/Docker خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوفر العالي Docker باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Docker" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit/Docker {#overview-of-the-safekit--docker-solution}

يُوصَف الحل هنا: **💡 [SafeKit: برنامج Docker عالي التوافر ونسخ البيانات في الوقت الفعلي](</ar/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## تثبيت حل SafeKit/Docker على Linux (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * تحتاج إلى تثبيت تطبيق Docker الذي تريد إعادة تشغيله في SafeKit على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

### مثال 1 مع تطبيق Docker Compose {#example-1-with-a-docker-compose-application}

مع تطبيق Docker Compose، يكون لديك ملف **docker-compose.yml** يصف التطبيق وجميع حاوياته.

  * أولاً، على كلا الخادمين، قم بتثبيت تطبيق docker compose دون تشغيله: **docker-compose -f docker-compose.yml up --no-start**
  * على أحد الخوادم، لكل وحدة تخزين في docker-compose.yml، قم بتشغيل هذا الأمر: **docker volume inspect volume_name**  
سيعرض **مسارات المجلدات المضيفة لأحجام دوكر** (هذه المسارات غير موجودة في docker-compose.yml).  
ستحصل على قائمة بالمسارات مثل **/var/lib/docker/volumes/ <volume_name> /_data**
  * انتقل إلى قسم **التهيئة خطوة بخطوة** و 
    * نشر وحدة **mirror.safe**
    * تعيين **عنوان IP ظاهري** سيتم تبديله في حالة حدوث عطل
    * تعيين قائمة **/var/lib/docker/volumes/ <volume_name> /_data** **كأدلة مكررة**
    * ضع كلًا من الأمرين التاليين على التوالي في برنامجي start_prim و stop_prim: **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** و **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### المثال 2: تطبيق Docker يبدأ مجموعة من الحاويات {#example-2-with-a-docker-application-starting-a-set-of-containers}

نفترض هنا وجود تطبيق Docker يسمى **myappli** يبدأ مجموعة من الحاويات.

  * أولاً، قم بتثبيت **myappli** على كلا الخادمين دون تشغيله
  * على أحد الخوادم، اعرض وحدات التخزين التي يستخدمها myapply: **ls /var/lib/docker/volumes**  
وبالتالي، ستحصل على قائمة بالمسارات مثل **/var/lib/docker/volumes/ <volume_name> /_data**
  * انتقل إلى قسم **التهيئة خطوة بخطوة** و 
    * نشر وحدة **mirror.safe**
    * تعيين **عنوان IP ظاهري** سيتم تبديله في حالة حدوث عطل
    * تعيين قائمة **/var/lib/docker/volumes/ <volume_name> /_data** **كأدلة مكررة**
    * ضع على التوالي في برنامجي start_prim و stop_prim: **/.../myappli start** و **/.../myappli stop**


### مثال 3 باستخدام صورة Docker بسيطة {#example-3-with-a-simple-docker-image}

يُعرض التكوين على سبيل المثال باستخدام صورة nginx Docker (خادم الويب).

  * إنشاء وحدات تخزين Docker  
على كلا الخادمين، أنشئ وحدة تخزين Docker بنفس الاسم: **docker volume create replicated_vol**  
احصل على مسار الدليل حيث يتم تخزين وحدة التخزين على المضيف: **docker volume inspect replicated_vol**  
(على سبيل المثال: **/var/lib/docker/storage/replicated_vol/_data**)
  * إنشاء حاوية Docker  
على كلا الخادمين، أنشئ حاوية nginx docker ترتبط بالمجلد السابق: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
املأ المجلد ببعض ملفات index.html: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * انتقل إلى قسم **التهيئة خطوة بخطوة** و 
    * نشر وحدة **mirror.safe**
    * تعيين **عنوان IP ظاهري** سيتم تبديله في حالة حدوث عطل
    * تعيين **/var/lib/docker/storage/replicated_vol/_data** كدليل مكرر
    * ضع على التوالي في برنامجي start_prim و stop_prim النصين التاليين: **docker start mynginx** و **docker stop mynginx**
    * بعد تكوين SafeKit، اختبر الوصول إلى index.html باستخدام **http://vitual-ip:9011**


## إعداد حل SafeKit/Docker خطوة بخطوة {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-ar app="Docker" mod="mirror"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
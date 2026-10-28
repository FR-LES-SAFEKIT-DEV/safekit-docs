---
title: "التوافر العالي لـ K3S مع SafeKit : قم بتثبيت وحدة k3s.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "قم بتثبيت وحدة k3s.safe لـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل لـ Kubernetes على Linux . يرشدك هذا الدليل خلال إعداد مجموعة SAN ثنائية العقد لتطبيقات Linux الحيوية التي لا تستخدم وحدة تخزين مشتركة."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Kubernetes ، قيود التوافر العالي لـ SafeKit ، نظرة عامة على حل SafeKit / Kubernetes ، تثبيت وتكوين حل SafeKit / Kubernetes على Linux ( k3s.safe )، ما هي السيناريوهات المختلفة في حالة عزل الشبكة في مجموعة؟، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# توفير إمكانية التوافر العالي لـ K3S مع SafeKit : قم بتثبيت وحدة k3s.safe للتحويل التلقائي في حالة الفشل {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Kubernetes" mod="k3s"  %}}
 

## نظرة عامة على حل SafeKit / Kubernetes {#overview-of-the-safekit--kubernetes-solution}

الحل موضح هنا: ** 💡 [ Kubernetes التوافر العالي لـ K3s: النسخ المتماثل المتزامن والتحويل التلقائي في حالة الفشل على عقدتين ](</solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>) **

## تثبيت وتكوين حل SafeKit / Kubernetes على Linux ( k3s.safe ) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. قم بتنزيل الحزمة {#1-download-packages}

  * قم بتنزيل النسخة المجانية من SafeKit 8.2 على Linux (safekitlinux_xx.bin)
  * قم بتنزيل وحدة k3s.safe Linux
  * قم بتنزيل البرنامج النصي k3sconfig.sh
  * الوثائق (pptx)


ملاحظة: يقوم البرنامج النصي k3sconfig.sh بتثبيت K3S و MariaDB و NFS و SafeKit على عقدتين من نوع Linux Ubuntu 24.04.

تنزيل [ تنزيل SafeKit ( Linux ) > ](</ar/resources/safekit-free-trial/>)

تنزيل <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe"> تنزيل k3s.safe ( Linux ) > </a> 

تنزيل [ > k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

وثائق [ (ملف PDF) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. أولاً على كلا العقدتين {#2-first-on-both-nodes}

على عقدتين من نوع Linux Ubuntu 24.04، بصلاحيات المستخدم الجذر:

  * تأكد من أن العقدة لديها إمكانية الوصول إلى الإنترنت (قد يكون ذلك من خلال خادم وكيل).
  * انسخ الملفات k3sconfig.sh و k3s.safe وحزمة safekit_xx.bin إلى مجلد، ثم انتقل إليه باستخدام الأمر cd.
  * أعد تسمية ملف .bin إلى "safekit.bin"
  * تأكد من أن k3sconfig.sh و safekit.bin قابلان للتنفيذ.
  * قم بتحرير البرنامج النصي k3sconfig.sh وقم بتخصيص متغيرات البيئة وفقًا لبيئتك (بما في ذلك عنوان IP افتراضي).
  * نفّذ الأمر التالي على كلا العقدتين: `./k3sconfig.sh prereq`


سيقوم البرنامج النصي بما يلي:

  * قم بتثبيت حزم دبيان المطلوبة: alien، nfs-kernel-server، nfs-common، mariadb-server
  * تثبيت آمن لقاعدة بيانات MariaDB
  * أنشئ مجلدات لنسخ الملفات
  * قم بإعداد خادم NFS لمشاركة الدلائل المنسوخة
  * قم بتثبيت SafeKit


### 3. على العقدة الأولى {#3-on-the-first-node}

نفّذ على العقدة الأولى: `./k3sconfig.sh first`

سيقوم البرنامج النصي بما يلي:

  * أنشئ قاعدة بيانات تكوين K3S ومستخدم k3s
  * أنشئ ملف وحدة التخزين المنسوخة (ملف متفرق) وقم بتهيئته كنظام ملفات xfs
  * قم بإنشاء تكوين مجموعة Safekit وتطبيقه
  * قم بتثبيت وتكوين وحدة k3s.safe على المجموعة
  * ابدأ تشغيل وحدة k3s كـ "prim" على العقدة الأولى
  * قم بتنزيل وتثبيت وتشغيل k3s
  * قم بتنزيل وتثبيت مخطط Helm الخاص بـ nfs-subdir-external-provisioner
  * عرض رمز K3S (يُستخدم أثناء مرحلة تثبيت العقدة الثانية)


### 4. على العقدة الثانية {#4-on-the-second-node}

نفّذ على العقدة الثانية: `./k3sconfig.sh second <token>`

  * <token> هي السلسلة النصية التي تظهر في نهاية تنفيذ " k3sconfig.sh first" على العقدة الأولى


سيقوم البرنامج النصي بما يلي:

  * تأكد من تشغيل وحدة k3s كوحدة أساسية على العقدة الأولى
  * قم بتثبيت k3s على العقدة الثانية
  * ابدأ تشغيل وحدة k3s


### 5. تأكد من تشغيل وحدة k3s SafeKit على كلا العقدتين {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

تحقق باستخدام هذا الأمر على كلا العقدتين: `/opt/safekit/safekit –H "*" state`

يجب أن يكون الرد مشابهاً للصورة.
    
    
    /opt/safekit/safekit –H " * " حالة
    ---------------- الخادم= http://10.0.0.20:9010 ----------------
    إجراء المسؤول = تنفيذ
    --------------------- حالة k3s ---------------------
    
      محلي (127.0.0.1): أساسي (الخدمة: متوفرة) (اللون: أخضر)
    نجاح
    ---------------- الخادم= http://10.0.0.21:9010 ----------------
    إجراء المسؤول = تنفيذ
    --------------------- حالة k3s ---------------------
    
      محلي (127.0.0.1): ثانية (الخدمة: متوفرة) (اللون: أخضر)
    نجاح
    

### 6. ابدأ تشغيل وحدة تحكم الويب SafeKit لإدارة المجموعة {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * قم بتوصيل متصفح بعنوان URL الخاص بوحدة تحكم الويب SafeKit `http://server0-IP:9010` .
  * يجب أن ترى صفحة مشابهة للصورة.
  * تحقق باستخدام أوامر Linux من أن K3S قد بدأ على كلا العقدتين (بدأ في `start_prim` و `start_second` ) وأن MariaDB قد بدأ على العقدة الأساسية (بدأ في `start_prim` ).


تم تشغيل مجموعة ![ Kubernetes في وحدة تحكم الويب SafeKit ](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. اختبار {#7-testing}

  * أوقف عقدة PRIM عن طريق التمرير لأسفل في القائمة السياقية الخاصة بها والنقر فوق `Stop` .
  * تحقق من وجود عملية تجاوز الفشل على العقدة الثانية والتي يجب أن تصبح وحيدة (خضراء).
  * وباستخدام أوامر سطر الأوامر على Linux ، تحقق من عملية تجاوز الفشل للخدمات (المتوقفة على العقدة 1 في البرنامج النصي `stop_prim` والمُشغّلة على العقدة 2 في البرنامج النصي `start_prim` ). يجب أن يعمل كل MariaDB وK3S على العقدة 2.


تحذير ![ ](/wp-content/uploads/2022/07/warning-small.png)


إذا لم يتم الوصول إلى ALONE (باللون الأخضر) على العقدة 2، فقم بتحليل السبب باستخدام سجل الوحدة النمطية للعقدة 2.

  * انقر على `node2` لعرض سجل الوحدة.
  * مثال على سجل وحدة [ SQL Server ](</wp-content/uploads/2024/03/24-module-log-script.png>) حيث يكون اسم الخدمة في `start_prim` غير صالح. تتم مراقبة عملية sqlserver.exe ، ولكن نظرًا لعدم بدء تشغيلها، تتوقف الوحدة في النهاية.


تحذير ![ ](/wp-content/uploads/2022/07/warning-small.png)


إذا كان كل شيء على ما يرام، فقم ببدء التشغيل على العقدة 1، مما سيؤدي إلى إعادة مزامنة الدلائل المنسوخة من العقدة 2.

إذا ساءت الأمور، أوقف العقدة 2 وقم بإجبار [ على البدء كـ ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) الأساسي للعقدة 1، والتي ستعيد التشغيل ببياناتها السليمة محليًا في وقت الإيقاف.


![ ملاحظة ](/wp-content/uploads/2022/07/note.png)


🛠️ [ للمزيد من المعلومات حول الاختبارات، راجع دليل المستخدم. ](</resources/safekit-user-guide-82/#tests>)


![ أوقف الوحدة النمطية على خادم PRIM ](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. جرّب المجموعة مع تطبيق Kubernetes مثل WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

لديك مثال على تثبيت ووردبريس في الصورة: بوابة ويب مع قاعدة بيانات خلفية يتم تنفيذها بواسطة وحدات pods.

يمكنك نشر تطبيقك الخاص بنفس الطريقة.

يتميز ووردبريس بتوافر عالٍ تلقائياً:

  * مع بياناتها (php + قاعدة البيانات) في وحدات تخزين دائمة يتم نسخها في الوقت الفعلي بواسطة SafeKit
  * باستخدام عنوان IP افتراضي للوصول إلى موقع WordPress للمستخدمين
  * مع خاصية التبديل التلقائي في حالة الفشل والعودة التلقائية إلى الوضع السابق


ملحوظات:

  * يحدد مخطط ووردبريس خدمة متوازنة الأحمال تستمع على منفذي <service.port> و <service.httpsport> .
  * يمكن الوصول إلى ووردبريس عبر الرابط التالي: `http://<virtual-ip>:<service.port>.`
  * تتم إدارة عنوان IP الظاهري بواسطة SafeKit ويتم تبديله تلقائيًا في حالة الفشل.
  * بشكل افتراضي، يقوم K3S بتنفيذ موازنات الأحمال باستخدام Klipper.
  * يستمع Klipper على <virtual ip> : <service.port> ويقوم بتوجيه حزم TCP/IP إلى عنوان IP ومنفذ وحدة WordPress التي اختارها.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

يجب أن يقوم أمر Helm السابق بتنزيل صورة WordPress من `registry-1.docker.io` . قد تواجه مشكلات في المصادقة على `registry-1.docker.io` . في هذه الحالة، يجب عليك:

  * أنشئ `/etc/rancher/k3s/registries.yaml` على كلا العقدتين مع ما يلي: 
        
        الإعدادات:
          "registry-1.docker.io":
            المصادقة:
              اسم المستخدم: اسم_المستخدم_الخاص_بك
              كلمة المرور: كلمة_مراحل_المرور
            tls:
              insecure_skip_verify: true
        

  * أوقف وابدأ k3s لأخذ ذلك في الاعتبار، مع `systemctl stop k3s` و `systemctl start k3s` .
  * نفّذ الأمر `helm registry login -u your_user_name docker.io` ، ثم أدخل كلمة المرور الخاصة بك.


### 9. دعم {#9-support}

  * للحصول على الدعم، خذ ملفين SafeKit `Snapshots` (ملفين مضغوطين بصيغة .zip)، واحد لكل عقدة.


![ ملاحظة ](/wp-content/uploads/2022/07/note.png)


🛠️ [ استكشاف الأخطاء وإصلاحها في دليل المستخدم. ](</resources/safekit-user-guide-82/#Troubleshooting>)


![ التقط لقطات شاشة للدعم ](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. إذا لزم الأمر، قم بتكوين مدقق انقسام الدماغ {#10-if-necessary-configure-a-splitbrain-checker}

  * انظر أدناه [ "ما هي السيناريوهات المختلفة في حالة عزل الشبكة في مجموعة؟" ](#isolation) لمعرفة ما إذا كنت بحاجة إلى تكوين مدقق انقسام الدماغ.
  * في إعدادات الوحدة، انقر على `Advanced Configuration` (انظر الصورة) لتحرير `userconfig.xml` .
  * قم بتعريف مدقق الانقسام الدماغي عن طريق إضافته في قسم `<check>` من `userconfig.xml` : 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` التكوين الجديد لإعادة نشر ملف userconfig.xml المعدل على كلا العقدتين (يجب إيقاف الوحدة النمطية على كلا العقدتين للحفظ والتطبيق).


معلمات ** ** :

  * يُعرّف `ident="witness"` الشاهد باسم المورد: `splitbrain.witness` . يمكنك تغيير هذه القيمة لتعريف الشاهد.
  * يشير `exec="ping"` إلى رمز اختبار الاتصال المراد تنفيذه. لا تقم بتغيير هذه القيمة.
  * `arg="witness IP"` هو وسيط لأمر ping. قم بتغيير هذه القيمة إلى عنوان IP الخاص بالشاهد (عنصر قوي، عادةً ما يكون جهاز توجيه).


أدخل المعلمات ![ ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-ar  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
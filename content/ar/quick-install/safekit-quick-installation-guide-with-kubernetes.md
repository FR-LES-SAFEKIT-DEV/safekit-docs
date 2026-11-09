---
title: "التوفر العالي K3S باستخدام SafeKit: تثبيت وحدة k3s.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "انشر وحدة k3s.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الأعطال التلقائي لـ Kubernetes على Linux. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون شبكة منطقة تخزين (SANless) لتطبيقات Linux الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Kubernetes، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Kubernetes، تثبيت وتهيئة حل SafeKit/Kubernetes على Linux (k3s.safe)، ما هي السيناريوهات المختلفة في حالة عزل الشبكة في مجموعة؟، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوفر العالي K3S باستخدام SafeKit: تثبيت وحدة k3s.safe للتحويل التلقائي عند الفشل {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Kubernetes" mod="k3s"  %}}
 

## نظرة عامة على حل SafeKit/Kubernetes {#overview-of-the-safekit--kubernetes-solution}

الحل موضح هنا: **💡 [توفر عالي Kubernetes K3s: نسخ متماثل متزامن وتجاوز الفشل لعقدتين](</ar/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## تثبيت وتهيئة حل SafeKit/Kubernetes على Linux (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. تنزيل الحزم {#1-download-packages}

  * قم بتنزيل الإصدار المجاني من SafeKit 8.2 على Linux (safekitlinux_xx.bin)
  * تنزيل وحدة k3s.safe Linux
  * تنزيل البرنامج النصي k3sconfig.sh
  * الوثائق (pptx)


ملاحظة: يقوم البرنامج النصي k3sconfig.sh بتثبيت K3S و MariaDB وNFS و SafeKit على عقدتين من Linux Ubuntu 24.04.

[تنزيل SafeKit (Linux) >](</ar/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">تنزيل k3s.safe (Linux) ></a> 

[تنزيل k3sconfig.sh >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[الوثائق (pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. أولاً على كلتا العقدتين {#2-first-on-both-nodes}

على عقدتين من Linux أوبونتو 24.04، بصلاحيات الجذر:

  * تأكد من أن العقدة لديها إمكانية الوصول إلى الإنترنت (يمكن أن يكون ذلك من خلال وكيل)
  * انسخ ملفات k3sconfig.sh و k3s.safe وحزمة safekit_xx.bin إلى دليل ثم انتقل إليه باستخدام الأمر cd
  * أعد تسمية ملف .bin إلى "safekit.bin"
  * تأكد من أن k3sconfig.sh و safekit.bin قابلان للتنفيذ.
  * حرر البرنامج النصي k3sconfig.sh وخصص متغيرات البيئة وفقًا لبيئتك (بما في ذلك عنوان IP ظاهري)
  * نفّذ الأمر على كلا العقدتين: `./k3sconfig.sh prereq`


سيقوم البرنامج النصي بما يلي:

  * تثبيت حزم دبيان المطلوبة: alien, nfs-kernel-server, nfs-common, mariadb-server
  * تأمين تثبيت MariaDB
  * إنشاء أدلة لتكرار الملفات
  * إعداد خادم NFS لمشاركة الدلائل المكررة
  * تثبيت SafeKit


### 3. على العقدة الأولى {#3-on-the-first-node}

نفّذ الأمر على العقدة الأولى: `./k3sconfig.sh first`

سيقوم البرنامج النصي بما يلي:

  * إنشاء قاعدة بيانات تكوين K3S ومستخدم k3s
  * إنشاء ملف وحدة تخزين التخزين المكرر (ملف متفرق) وتنسيقه كنظام ملفات xfs
  * إنشاء تكوين مجموعة safekit وتطبيقه
  * تثبيت وتكوين وحدة k3s.safe على المجموعة
  * ابدأ تشغيل وحدة k3s كـ "prim" على العقدة الأولى
  * تنزيل k3s وتثبيته وتشغيله
  * تنزيل وتثبيت مخطط Helm الخاص بـ nfs-subdir-external-provisioner
  * عرض رمز K3S (لاستخدامه أثناء مرحلة تثبيت العقدة الثانية)


### 4. على العقدة الثانية {#4-on-the-second-node}

نفّذ الأمر على العقدة الثانية: `./k3sconfig.sh second <token>`

  * <token> هي السلسلة النصية التي تظهر في نهاية تنفيذ " k3sconfig.sh first" على العقدة الأولى


سيقوم البرنامج النصي بما يلي:

  * تأكد من بدء تشغيل وحدة k3s كـ prim على العقدة الأولى
  * تثبيت k3s على العقدة الثانية
  * ابدأ وحدة k3s


### 5. تحقق من أن وحدة k3s SafeKit قيد التشغيل على كلتا العقدتين {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

تحقق باستخدام هذا الأمر على كلا العقدتين: `/opt/safekit/safekit –H "*" state`

يجب أن يكون الرد مشابهاً للصورة.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- الخادم = http://10.0.0.20:9010 ----------------
    إجراء admin = تنفيذ
    --------------------- حالة k3s ---------------------
    
      محلي (127.0.0.1): PRIM (الخدمة: متوفرة) (اللون: أخضر)
    نجاح
    ---------------- الخادم = http://10.0.0.21:9010 ----------------
    إجراء admin = تنفيذ
    --------------------- حالة k3s ---------------------
    
      محلي (127.0.0.1): SECOND (الخدمة: متوفرة) (اللون: أخضر)
    نجاح
    

### 6. ابدأ تشغيل وحدة تحكم الويب SafeKit لإدارة المجموعة {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * قم بتوصيل متصفح بعنوان URL لوحدة تحكم الويب SafeKit `http://server0-IP:9010`.
  * يجب أن ترى صفحة مشابهة للصورة.
  * تحقق باستخدام أسطر أوامر Linux من أن K3S قد بدأ تشغيله على كلا العقدتين (بدأ في `start_prim` و `start_second`) وأن MariaDB قد بدأ تشغيله على العقدة الأساسية (بدأ في `start_prim`).


![بدء تشغيل مجموعة Kubernetes في وحدة تحكم الويب SafeKit](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. الاختبار {#7-testing}

  * أوقف عقدة PRIM بالتمرير لأسفل في قائمتها السياقية والنقر على `Stop`.
  * تحقق من وجود تجاوز الفشل على العقدة SECOND التي يجب أن تصبح ALONE (باللون الأخضر).
  * وباستخدام أسطر الأوامر في Linux، تحقق من تجاوز الفشل للخدمات (توقفت على العقدة 1 في البرنامج النصي `stop_prim` وبدأت على العقدة 2 في البرنامج النصي `start_prim`). يجب أن يعمل MariaDB و K3S على node2.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا لم يتم الوصول إلى ALONE " (باللون الأخضر) على node2، فحلل السبب باستخدام سجل وحدة العقدة 2.

  * انقر على `node2` لعرض سجل الوحدة.
  * [مثال على سجل وحدة SQL Server](</wp-content/uploads/2024/03/24-module-log-script.png>) حيث يكون اسم الخدمة في `start_prim` غير صالح. تتم مراقبة عملية sqlserver.exe ولكن نظرًا لعدم بدء تشغيلها، تتوقف الوحدة في النهاية.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا كان كل شيء على ما يرام، فابدأ التشغيل على node1، والتي ستعيد مزامنة الدلائل المكررة من node2.

إذا ساءت الأمور، أوقف node2 [وافرض بدء تشغيل](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) node1 أساسية، والتي ستتم إعادة تشغيلها ببياناتها السليمة محليًا في وقت الإيقاف.


![ملاحظة](/wp-content/uploads/2022/07/note.png)


🛠️ [مزيد من المعلومات حول الاختبارات في دليل المستخدم.](</ar/resources/safekit-user-guide-82/#tests>)


![إيقاف الوحدة النمطية على خادم PRIM](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. جرّب المجموعة باستخدام تطبيق Kubernetes مثل WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

لديك مثال على تثبيت ووردبريس في الصورة: بوابة ويب مع قاعدة بيانات خلفية تم تنفيذها بواسطة البودات.

يمكنك نشر تطبيقك الخاص بنفس الطريقة.

يتمتع ووردبريس بتوافر عالٍ تلقائيًا:

  * مع بياناتها (PHP + قاعدة البيانات) في وحدات تخزين دائمة يتم تكرارها في الوقت الفعلي بواسطة SafeKit
  * مع عنوان IP ظاهري للوصول إلى موقع ووردبريس للمستخدمين
  * مع ميزة تجاوز الفشل التلقائي الاسترجاع التلقائي (failback)


ملاحظات:

  * يُعرّف مخطط WordPress خدمة موازنة التحميل التي تستمع على المنفذين <service.port> و <service.httpsport>.
  * يمكن الوصول إلى ووردبريس عبر عنوان URL التالي: `http://<virtual-ip>:<service.port>.`
  * تتم إدارة عنوان IP الظاهري بواسطة SafeKit ويتم تبديله تلقائيًا في حالة حدوث تجاوز للفشل.
  * بشكل افتراضي، تُنفّذ K3S موازنات التحميل باستخدام Klipper.
  * يستمع Klipper على <virtual ip>: <service.port> ويوجه حزم TCP/IP إلى عنوان IP ومنفذ حاوية WordPress التي اختارها.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

يجب أن يقوم أمر helm السابق بتنزيل صورة WordPress من `registry-1.docker.io`. قد تواجه مشكلات في المصادقة على `registry-1.docker.io`. في هذه الحالة، يجب عليك:

  * أنشئ `/etc/rancher/k3s/registries.yaml` على كلا العقدتين بالمحتوى التالي: 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * أوقف تشغيل k3s ثم أعد تشغيله لأخذ ذلك في الاعتبار، باستخدام `systemctl stop k3s` و `systemctl start k3s`.
  * نفّذ الأمر `helm registry login -u your_user_name docker.io`، ثم أدخل كلمة المرور الخاصة بك


### 9. الدعم {#9-support}

  * للحصول على الدعم، التقط `Snapshots` SafeKit (ملفان مضغوطان)، واحدة لكل عقدة.


![ملاحظة](/wp-content/uploads/2022/07/note.png)


🛠️ [استكشاف الأخطاء وإصلاحها في دليل المستخدم.](</ar/resources/safekit-user-guide-82/#Troubleshooting>)


![التقط لقطات شاشة للدعم](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. إذا لزم الأمر، قم بتهيئة مدقق split-brain {#10-if-necessary-configure-a-splitbrain-checker}

  * راجع قسم ["ما هي السيناريوهات المختلفة في حالة عزل الشبكة في مجموعة؟"](#isolation) أدناه لمعرفة ما إذا كنت بحاجة إلى تكوين أداة مدقق split-brain.
  * في إعدادات الوحدة النمطية، انقر على `Advanced Configuration` " (انظر الصورة) لتعديل `userconfig.xml`.
  * أعلن عن مدقق split-brain بإضافتها في قسم `<check>` من `userconfig.xml` : 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` لإعادة نشر ملف userconfig.xml المعدل على كلتا العقدتين (يجب إيقاف الوحدة على كلتا العقدتين للحفظ والتطبيق).


**المعلمات** :

  * يحدد `ident="witness"` الشاهد باسم المورد: `splitbrain.witness`. يمكنك تغيير هذه القيمة لتحديد الشاهد.
  * يشير `exec="ping"` إلى رمز ping المراد تنفيذه. لا تقم بتغيير هذه القيمة.
  * `arg="witness IP"` هي وسيطة لأمر ping. قم بتغيير هذه القيمة إلى عنوان IP الخاص بالشاهد (عنصر قوي، عادةً ما يكون جهاز توجيه).


![أدخل المعلمات](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-ar  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
---
title: "تكوين SafeKit Milestone القديم"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "ar"
topics: "الإعداد القديم خطوة بخطوة لحل SafeKit/Milestone XProtect"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# تكوين SafeKit Milestone القديم {#old-safekit-milestone-configuration}

## الإعداد القديم خطوة بخطوة لحل SafeKit/Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


كن حذرًا، فبعض الخطوات المحددة مطلوبة للتكوين على عنوان IP الظاهري وإلا فلن يعمل تجاوز الفشل.

### 1. قم بتشغيل وحدة تحكم SafeKit {#1-launch-the-safekit-console}

  * شغّل وحدة التحكم بالويب في متصفح على إحدى عُقد المجموعة من خلال الاتصال بـ `http://localhost:9010`.
  * أدخل `admin` كاسم مستخدم وكلمة المرور المحددة أثناء التثبيت.


يمكنك أيضًا تشغيل وحدة التحكم في متصفح على محطة عمل خارجية خارج المجموعة.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


يتم تكوين SafeKit على كلا العقدتين من متصفح واحد.


![ملاحظة](/wp-content/uploads/2022/07/note.png)


لتأمين وحدة التحكم على الويب، راجع قسم "تأمين وحدة التحكم على الويب في SafeKit في دليل المستخدم.


![ابدأ تشغيل وحدة التحكم الويب SafeKit لتهيئة المجموعة](/wp-content/uploads/2023/01/appli-1.png)


### 2. تكوين عناوين العقد {#2-configure-node-addresses}

  * أدخل عناوين IP للعقدة.
  * ثم انقر على `Apply` لحفظ الإعدادات.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا كان لون خلفية node1 أو node2 أحمر، فتحقق من اتصال المتصفح بكلتا العقدتين وتحقق من جدار الحماية في كلتا العقدتين لاستكشاف الأخطاء وإصلاحها.


![ملاحظة](/wp-content/uploads/2022/07/note.png)


ستؤدي هذه العملية إلى وضع عناوين IP في ملف `cluster.xml` على كلا العقدتين (مزيد من المعلومات في التدريب باستخدام سطر الأوامر).


![أدخل عُقد المجموعة](/wp-content/uploads/2023/01/appli-3.png)


### 3. اختر الوحدة {#3-choose-the-module}

  * في علامة التبويب "التكوين"، انقر على الوحدة النمطية .safe.


![ملاحظة](/wp-content/uploads/2022/07/note.png)


يعثر الكونسول على xxx.safe في دليل 'Application_Modules/demo/' على جانب الخادم إذا قمت بوضع وحدة هناك أثناء التثبيت.


![اختر الوحدة الخاصة بـ](/wp-content/uploads/2023/01/appli-4.png)


### 4. تكوين الوحدة {#4-configure-the-module}

  * اختر بدء تشغيل الوحدة تلقائيًا عند الإقلاع دون تأخير.
  * عادةً، يكون لديك شبكة نبضة heartbeat واحدة يتم عليها النسخ المتماثل. ولكن، يمكنك تعريف شبكة خاصة إذا لزم الأمر.
  * تحقق من تثبيت الدلائل المنسوخة على كلتا العقدتين وأنها تحتوي على بيانات التطبيق.  
تُعدّ عملية تكرار البيانات والسجلات ضرورية لقاعدة البيانات.  
يمكنك إضافة أدلة جديدة منسوخة حسب الحاجة.
  * أدخل عنوان IP ظاهري. عنوان IP الظاهري هو عنوان IP قياسي في نفس شبكة IP (نفس الشبكة الفرعية) مثل عناوين IP لكلتا العقدتين.  
يجب تكوين عملاء التطبيق باستخدام عنوان IP الظاهري (أو اسم DNS المرتبط بعنوان IP الظاهري).  
يتم تبديل عنوان IP الظاهري تلقائيًا في حالة حدوث عطل.
  * يجب أن تتضمن الدالتان `start_prim` و `stop_prim` بدء التطبيق وإيقافه.  
يمكنك إضافة خدمات جديدة في هذه البرامج النصية.  
تحقق من أن أسماء الخدمات في هذه البرامج النصية هي تلك المثبتة على كلتا العقدتين، وإلا فقم بتعديلها في البرامج النصية.
  * أوقف الخدمات التي تم تكوينها في `start_prim` على كلا العقدتين.
  * على Windows وعلى كلتا العقدتين، باستخدام مدير خدمات Windows، اضبط `Boot Startup Type = Manual` لجميع الخدمات المسجلة في `start_prim` (يتحكم SafeKit في بدء تشغيل الخدمات في `start_prim`).


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا كان SQL موجودًا على خادم الإدارة:

  * يجب أن توجد [قواعد بيانات نظام SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (مثل master.mdf وmastlog.ldf) في نفس الدلائل على كلتا العقدتين. ويجب تكوين الدلائل على أنها مكررة.
  * يجب أيضًا تثبيت SQL في نفس الموقع في نظام الملفات على كلتا العقدتين لأن [قاعدة بيانات موارد SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) للقراءة فقط موجودة في الملف الثنائي وهي مطلوبة للتحويل التلقائي. لا تحتاج قاعدة البيانات هذه إلى النسخ المتماثل.
  * يجب أن توجد قواعد بيانات SQL Milestone (ملفات .mdf و .ldf) في نفس الدلائل على كلتا العقدتين. يجب تكوين الدلائل على أنها مكررة. قواعد بيانات Milestone هي كما يلي وفقًا لهذه [المقالة](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>).


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


لاحظ أنه إذا تم عرض اسم العملية في مدقق العمليات، فسيتم مراقبتها بإجراء إعادة تشغيل في حالة الفشل. سيؤدي تكوين اسم عملية غير صحيح إلى توقف الوحدة بعد بدء تشغيلها مباشرة.


![ملاحظة](/wp-content/uploads/2022/07/note.png)


سيقوم زر "تطبيق" بالإبلاغ عن التكوين في ملفات `userconfig.xml` و `start_prim` و `stop_prim` على كلتا العقدتين (مزيد من المعلومات في التدريب باستخدام سطر الأوامر).


![أدخل إعدادات الوحدة](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. التحقق من نجاح التهيئة {#5-verify-successful-configuration}

  * تحقق من رسالة النجاح (الخضراء) على كلتا العقدتين، ثم انقر فوق "التالي".


![تحقق من نجاح تكوين الوحدة](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. لا تبدأ أي شيء وانقر على زر إغلاق {#6-do-not-start-anything-and-click-on-the-close-button}


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


لا تبدأ أي شيء وانقر على زر إغلاق لأنه يلزم إجراء تكوين خاص على عنوان IP الظاهري قبل البدء


![حدد العقدة التي تحتوي على أحدث البيانات](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. انتقل إلى سطح مكتب العقدة 1 وقم بتعيين عنوان IP الظاهري في ملفات Milestone الداخلية {#milestone-files}


![ملاحظة](/wp-content/uploads/2022/07/note.png)


منذ Milestone 2022 R3، لم تعد هذه الخطوة مفيدة وسيتم تنفيذها تلقائيًا باستخدام " Server Configurator - Registering servers - http://virtual-IP" في الخطوة التالية.

في سطر أوامر Powershell بصفة مسؤول، قم بتنفيذ هذا البرنامج النصي على العقدة 1:
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![ملاحظة](/wp-content/uploads/2022/07/note.png)


يحدد هذا البرنامج النصي عنوان IP الظاهري في ملفين داخليين Milestone :
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< عنوان IP ظاهري>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtual-ip>**/IDP"


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


نفترض في هذه الخطوة أن عنوان IP الظاهري قد تم تكوينه بشكل صحيح في الخطوات السابقة (يستخدم البرنامج النصي عنوان IP الظاهري الذي تم إدخاله في وحدة تحكم SafeKit والمخزن في `userconfig.xml`).


![ملاحظة](/wp-content/uploads/2022/07/note.png)


### 8. ابدأ تشغيل العقدة 1 كعقدة أساسية في وحدة التحكم، وهي العقدة التي تحتوي على أحدث البيانات {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

نفترض منذ الخطوة 7 أن العقدة 1 تحتوي على الدلائل المكررة المحدّثة.

فرض بدء تشغيل العقدة 1 كعقدة أساسية. عند بدء تشغيل العقدة 2، سيتم نسخ جميع البيانات من العقدة 1 إلى العقدة 2.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا اتخذت الخيار الخاطئ، فإنك تخاطر بمزامنة بيانات قديمة على كلا العقدتين.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


يُفترض أيضًا أن التطبيق متوقف على العقدة 1 حتى يقوم SafeKit بتثبيت آليات النسخ المتماثل ثم يبدأ التطبيق في البرنامج النصي `start_prim`.


![فرض بدء تشغيل العقدة ذات البيانات المحدثة كعقدة أساسية](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. انتظر حتى يتم الانتقال إلى ALONE (باللون الأخضر) {#9-wait-for-the-transition-to-alone-green}

  * يجب أن يصل العقدة 1 إلى حالة ALONE (خضراء)، مما يعني أن البرنامج النصي `start_prim` قد تم تنفيذه على العقدة 1.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا كان الوضع ALONE (أخضر) ولم يتم بدء التطبيق، فتحقق من رسائل الإخراج الخاصة بـ `start_prim` في سجل التطبيق الخاص بالعقدة 1.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا لم يصل العقدة 1 إلى حالة ALONE (باللون الأخضر)، فحلل السبب باستخدام سجل الوحدة الخاص بالعقدة 1.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا كانت المجموعة في `WAIT (red) not uptodate - STOP (red) not uptodate`، أوقف عقدة WAIT وأجبر بدء تشغيلها كعقدة أساسية.


![تبدأ العقدة الأولى كعقدة أساسية وتصبح ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. في سطح مكتب العقدة 1، أوقف تشغيل خادم إدارة Milestone، ثم سجّله على عنوان IP الظاهري وأعد تشغيله {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

نفّذ النقاط التالية على العقدة 1 وفقًا للقائمة الموجودة في الصورة:

  * انقر بزر الماوس الأيمن على أيقونة **خادم إدارة Milestone** في شريط المهام.
  * **إيقاف خدمة خادم الإدارة**
  * ثم اختر **Server Configurator " ...** وقم بتسجيل عنوان IP الظاهري.
  * **بدء خدمة خادم الإدارة**


![ملاحظة](/wp-content/uploads/2022/07/note.png)


يسجل هذا الإجراء خادم إدارة العقدة 1 في قاعدة بيانات SQL (التي تعمل على العقدة 1) من خلال اتصال بالعنوان الافتراضي.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


قبل إصدار Milestone 2022 R3، ربما يكون التسجيل قد حذف تكوين عنوان IP الظاهري في ملفات Milestone الداخلية. في هذه الحالة، كرر [الخطوة 7](#milestone-files).


![ملاحظة](/wp-content/uploads/2022/07/note.png)


ملاحظة: لتسجيل إصدار أقدم من Milestone 2020 R2، استخدم **"تغيير إعدادات التشفير...".**


![تسجيل خادم الإدارة في Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. في سطح مكتب العقدة 1 باستخدام Management Client Milestone، قم بتعيين عنوان IP الظاهري في عناوين URL للخدمات والشبكة {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![ملاحظة](/wp-content/uploads/2022/07/note.png)


منذ Milestone 2022 R3، لم تعد هذه الخطوة مفيدة، وأصبحت تتم تلقائيًا باستخدام " Server Configurator - تسجيل الخوادم - http://virtual-IP".

وفقًا للصورة:

  1. شغّل **Management Client Milestone XProtect** على العقدة 1.
  2. في قائمة **الأدوات**، حدد **الخدمات المسجلة**. 
     * في نافذة **إضافة/إزالة الخدمات المسجلة**، حدد خدمة من القائمة وانقر على **تحرير**.
     * في نافذة **"تحرير الخدمة المسجلة"**، قم بتغيير عنوان URL الخاص بالخدمة إلى عنوان URL نفسه ولكن مع تضمين عنوان IP الظاهري.
     * كرر هذه الخطوات لجميع الخدمات المدرجة في النافذة.
  3. في النافذة نفسها، انقر على **الشبكة**. 
     * في نافذة **تكوين الشبكة**، قم بتغيير عنوان URL الخاص بالخادم إلى عنوان URL نفسه ولكن مع تضمين عنوان IP الظاهري.


![اضبط عنوان IP الظاهري في عناوين URL وفي Management Client Milestone](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. في سطح مكتب العقدة 1 باستخدام Management Client Milestone، اضبط أدوار المسؤول لضمان تجاوز الفشل بشكل صحيح {#role}


![ملاحظة](/wp-content/uploads/2022/07/note.png)


إذا تم تكوين "مصادقة Windows " في Milestone باستخدام Active Directory، فسيتم استرداد اسم المستخدم/كلمة المرور من Active Directory الخارجي على العقدة الثانوية بعد تجاوز الفشل، لذلك لا يوجد تكوين خاص.

عند بدء تشغيل Management Client Milestone XProtect، يجب عليك المصادقة إما باستخدام "مصادقة Windows " أو "المصادقة الأساسية" ([انقر هنا لمشاهدة لقطة الشاشة](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

افتح **Management Client Milestone XProtect** ثم انتقل إلى **الأمان/الأدوار** (انظر الصورة)

  * اضبط مجموعة Windows **BUILTIN\Administrators**. وبالتالي، سيتمكن مستخدم المسؤول على الخادم الثانوي من الاتصال بـ Milestone على الخادم الثانوي باستخدام "مصادقة Windows ".
  * أنشئ مستخدمًا باستخدام "المصادقة الأساسية" (**Admin** في الصورة) للتأكد من إعادة المصادقة على العقدة الثانوية بعد تجاوز الفشل. بالنسبة لـ "المصادقة الأساسية"، يتم تخزين اسم المستخدم/كلمة المرور في قاعدة بيانات SQL وسيتم استردادها على العقدة الثانوية بعد تجاوز الفشل.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


من خلال تعيين مجموعة BUILTIN\Administrators، ستتمكن من المصادقة على العقدة الثانوية باستخدام مسؤول Windows محلي.

وإلا فلن يكون من الممكن المصادقة باستخدام حساب Windows محلي على الخادم الثانوي بعد تجاوز الفشل.

ذلك لأن مجموعة BUILTIN\Administrators لها نفس معرّف الأمان (SID) على كلا العقدتين. أما بالنسبة للمجموعات المحلية الأخرى أو المستخدمين المحليين، فلن يكون المصادقة ممكنة على العقدة الثانوية لأن معرّفات الأمان مختلفة بين العقدتين حتى لو كان لهما نفس الاسم.


![تعيين الأدوار في Management Client Milestone](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. انتقل إلى سطح مكتب العقدة 2 وقم بتعيين عنوان IP الظاهري في ملفات Milestone الداخلية {#milestone-files-2}


![ملاحظة](/wp-content/uploads/2022/07/note.png)


منذ Milestone 2022 R3، لم تعد هذه الخطوة مفيدة وسيتم تنفيذها تلقائيًا باستخدام " Server Configurator - Registering servers - http://virtual-IP" في الخطوة التالية.

في سطر أوامر Powershell بصفة مسؤول، قم بتنفيذ هذا البرنامج النصي على العقدة 2:
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![ملاحظة](/wp-content/uploads/2022/07/note.png)


يحدد هذا البرنامج النصي عنوان IP الظاهري في ملفين داخليين Milestone :
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< عنوان IP ظاهري>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtual-ip>**/IDP"

### 14. في سطح مكتب العقدة 2، سجّل خادم الإدارة على عنوان IP الظاهري {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * اختر **Server Configurator** في شريط مهام العقدة 2 وسجلها على عنوان IP الظاهري (انظر الصورة).
  * ثم **أوقف خدمة خادم الإدارة**.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


يجب أن يكون لحساب المستخدم الذي ينفذ التسجيل على العقدة 2 دور المسؤول في Milestone على العقدة 1.

إذا كان المسؤول المحلي على العقدة 2 هو من يقوم بالتسجيل، فيجب أن تكون مجموعة Windows المضمنة `BUILTIN\Administrators` قد تم تعيينها في Management Client / Security / Roles في [الخطوة 12](#role) وإلا فلن يعمل التسجيل.


![ملاحظة](/wp-content/uploads/2022/07/note.png)


يسجل هذا الإجراء خادم إدارة العقدة 2 في قاعدة بيانات SQL (التي تعمل على العقدة 1) من خلال اتصال بالعنوان الافتراضي.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


مع إصدار من Milestone قبل 2022 R3، ربما يكون التسجيل قد حذف تكوين عنوان IP الظاهري في ملفات Milestone الداخلية. في هذه الحالة، كرر [الخطوة 13](#milestone-files-2).


![تسجيل خادم الإدارة في Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. ابدأ العقدة 2 {#15-start-node-2}

  * ابدأ العقدة 2 مع قائمتها السياقية.
  * انتظر الحالة SECOND (الخضراء).


![ملاحظة](/wp-content/uploads/2022/07/note.png)


تظل العقدة 2 في الحالة SECOND (الأرجوانية) أثناء إعادة مزامنة الدلائل المكررة (النسخ من العقدة 1 إلى العقدة 2).

قد يستغرق هذا بعض الوقت اعتمادًا على حجم الملفات التي ستتم إعادة مزامنتها في الدلائل المكررة وعرض النطاق الترددي للشبكة.

لمعرفة تقدم عملية النسخ، راجع سجل الوحدة النمطية للعقدة 2 مع تمكين خيار التفاصيل دون نسيان تحديث النافذة.


![تبدأ العقدة الأولى كعقدة أساسية وتصبح ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. التحقق من أن المجموعة تعمل {#16-verify-that-the-cluster-is-operational}

  * تحقق من أن المجموعة خضراء/خضراء مع تشغيل الخدمات على العقدة PRIM وعدم تشغيلها على العقدة SECOND.


في هذه الحالة، يتم تكرار التغييرات داخل الملفات فقط في الوقت الفعلي.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


يجب تكوين المكونات التي هي عملاء للخدمات باستخدام عنوان IP الظاهري. يمكن إجراء التكوين باستخدام اسم DNS (إذا تم إنشاء اسم DNS وربطه بعنوان IP الظاهري).


![تبدأ العقدة الثانية بـ SECOND](/wp-content/uploads/2022/07/appli-12.png)


### 17. تكوين عنوان IP الظاهري في خوادم التسجيل {#17-configure-the-virtual-ip-address-in-recording-servers}

  * إما تثبيت خوادم التسجيل، مع تحديد عنوان IP الظاهري في عنوان URL الخاص بالتثبيت.
  * أو، على جانب خوادم التسجيل، قم بتعيين عنوان IP الظاهري في الحقول التالية من 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * قم بتوصيل Management Client Milestone وبرنامج Milestone Smart Client على عنوان IP الظاهري.


### 18. لا يعمل Management Client وبرنامج Smart Client بشكل صحيح بعد تبديل العقدة {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

في إعداد خادم إدارة XProtect المجمّع، يُظهر Smart Client و Management Client مشكلات متنوعة بعد تبديل العقدة. وتتعلق المشكلة بالرموز المميزة التي يتم إنشاؤها على عقد مختلفة قبل وبعد تبديل العقدة، وبمشكلات الوصول إلى شهادات معينة ضرورية للتحقق من صحة الرمز المميز. يتوفر حل (للإصدارات من 2022 R3 إلى 2023 R2، راجع قاعدة معارف Milestone).

تم حل المشكلة في Milestone 2023 R3.

### ١٨. الاختبار {#18-testing}

  * أوقف عقدة PRIM بالتمرير لأسفل في قائمتها السياقية والنقر على إيقاف. **لا تستخدم التبديل للاختبار الأول** (انظر السبب أدناه).
  * تحقق من وجود تجاوز الفشل على العقدة SECOND التي يجب أن تصبح ALONE (باللون الأخضر).
  * وباستخدام وحدة تحكم إدارة Microsoft (MMC)، تحقق من تجاوز الفشل للخدمات (توقفت على العقدة 1 في البرنامج النصي `stop_prim` وبدأت على العقدة 2 في البرنامج النصي `start_prim`).


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا كان نظامك هو PRIM-SECOND وكل شيء يعمل بشكل صحيح، قم بإيقاف تشغيل PRIM وتحقق من أن كل شيء يعمل بشكل صحيح على node2، والتي تصبح ALONE. إذا كان كل شيء على ما يرام، ابدأ تشغيل node1، والتي ستعيد مزامنة الدلائل المكررة من node2.

إذا ساءت الأمور، أوقف node2 وافرض بدء تشغيل node1 أساسية، والتي ستتم إعادة تشغيلها ببياناتها السليمة محليًا في وقت الإيقاف.

تتضمن عملية التبديل إيقافًا وتشغيلًا لـ PRIM، مما سيعيد مزامنة البيانات من node2 فور إيقافها، دون ترك أي فرصة لإعادة التشغيل على بيانات سليمة في حال وجود مشكلة في تكوين النسخ المتماثل.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا لم يبدأ التطبيق على العقدة 2 بينما تكون الحالة ALONE (خضراء)، فتحقق من رسائل الإخراج الخاصة بسكربت `start_prim` في سجل التطبيق الخاص بالعقدة 2.


![تحذير](/wp-content/uploads/2022/07/warning-small.png)


إذا لم يتم الوصول إلى ALONE (باللون الأخضر)، فحلل السبب باستخدام سجل الوحدة النمطية للعقدة 2.


![ملاحظة](/wp-content/uploads/2022/07/note.png)


مزيد من المعلومات حول الاختبارات في دليل المستخدم


![إيقاف الوحدة النمطية على خادم PRIM](/wp-content/uploads/2022/07/appli-19.png)
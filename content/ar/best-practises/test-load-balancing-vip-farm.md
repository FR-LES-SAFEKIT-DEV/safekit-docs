---
title: "اختبار عنوان IP الظاهري لموازنة التحميل في مجموعة farm SafeKit"
canonical: "https://safekit.eviden.com/ar/best-practises/test-load-balancing-vip-farm/"
description: "تعرّف على كيفية اختبار موازنة تحميل SafeKit عبر عُقد المجموعة والتحقق من تجاوز فشل عنوان IP الظاهري، وإعادة توجيه بروتوكول GARP ، وسلوك الشبكة."
category: "best-practises"
lang: "ar"
topics: "المبادئ الأساسية، المتطلب الأساسي: فسيفساء SafeKit (mosaic) ، الاختبار 1 – توزيع الاتصالات، الاختبار 2 – تغيير خادم الإرسال، الاختبار 3 – التحقق من إعادة توجيه GARP باستخدام arp -a، الاختبار 4 – التحقق من طرف إلى طرف باستخدام Wireshark (Windows) أو tcpdump (Linux)، محطات العمل التي سيتم الاختبار منها، ملخص النتائج المتوقعة، استكشاف الأخطاء وإصلاحها، عرض توضيحي لحل farm SafeKit"
translation: "translate_md 2026-11-05.13 | glossaire 2026-11-05.16 | Translation LLM | 16 expressions"
---

# اختبار عنوان IP الظاهري لموازنة التحميل في مجموعة <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

يصف هذا الدليل كيفية التحقق من أن <span class="notranslate farm-term" translate="no">Farm</span> SafeKit (وحدة <span class="notranslate farm-term" translate="no">Farm</span> ، موازنة التحميل على عنوان IP ظاهري) تعمل بشكل صحيح في شبكتك: توزيع الاتصالات عبر العقد، وإعادة توجيه عنوان IP الظاهري (VIP) عند توقف عقدة التوزيع.

## 1. المبادئ الأساسية {#1-key-principles}

**شرط أساسي:** يجب أن تكون جميع عُقد <span class="notranslate farm-term" translate="no">Farm</span> في نفس الشبكة الفرعية من الطبقة الثانية: شبكة محلية (LAN)، أو شبكة محلية افتراضية (VLAN) ممتدة بين مواقع بعيدة.

- يتم تكوين عنوان IP الظاهري (VIP) محليًا على كل عقدة من <span class="notranslate farm-term" translate="no">Farm</span> : ويتم تعيينه كاسم مستعار لعنوان IP الفعلي، على بطاقة الشبكة لهذا العنوان، عند بدء تشغيل <span class="notranslate farm-term" translate="no">Farm</span> على العقدة.
- تستقبل عقدة واحدة، وهي **خادم الإرسال** ، حركة مرور الشبكة لعنوان IP الظاهري (VIP) (تكوين `vmac_directed` ، وهو الإعداد الافتراضي لـ SafeKit): وعنوان MAC الخاص بها هو العنوان المرتبط بعنوان IP الظاهري (VIP) في جداول ARP (الموجه، البوابة، العملاء في نفس الشبكة الفرعية).
- يقوم مرشح النواة الخاص بهذه العقدة بعد ذلك بتوزيع اتصالات TCP عبر عُقد <span class="notranslate farm-term" translate="no">Farm</span> ، عن طريق **إعادة كتابة عنوان MAC الوجهة** للحزم إلى عنوان عقدة المعالجة (يظل عنوان IP الوجهة هو عنوان IP الظاهري (VIP)). يتم إرسال الردود مباشرة من العقدة التي تعالج الاتصال إلى العميل.
- التوزيع الذي يقوم به المرشح هو **توزيع حتمي** : يتم حساب عقدة المعالجة من هوية العميل، وفقًا لقاعدة موازنة التحميل المكونة:
  - على **عنوان IP الخاص بالعميل** (`filter="on_addr"`): يتم دائمًا خدمة عميل معين بواسطة نفس العقدة، مما يضمن تقارب الجلسة؛
  - على **منفذ TCP الخاص بالعميل** (`filter="on_port"`): يمكن خدمة كل اتصال TCP من نفس العميل بواسطة عقدة مختلفة. هذه هي القاعدة المستخدمة الفسيفساء (mosaic) (القسم 2)، والتي بالتالي تعرض جميع العقد من محطة عمل واحدة.
- إذا توقف خادم الإرسال، فإن عقدة أخرى تتولى هذا الدور وترسل **GARPs** ARP المجاني (GARP) بحيث تربط الشبكة عنوان IP الظاهري (VIP) بعنوان MAC الخاص بها.

لذلك، ما تحتاج إلى اختباره هو:

1. أن يتم توزيع الاتصالات بشكل صحيح عبر جميع العُقد؛
2. أن تأخذ الشبكة (الموجه، البوابة، المحاكاة الافتراضية) بروتوكول GARP في الاعتبار عند تغيير خادم الإرسال.

## 2. المتطلب السابق: فسيفساء SafeKit (mosaic) {#2-prerequisite-the-safekit-mosaic}

الفسيفساء (mosaic) هي صفحة اختبار مقدمة من SafeKit. تفتح العديد من اتصالات TCP إلى عنوان IP الظاهري (VIP) وتعرض، لكل منها، اسم العقدة التي استجابت. وهذا يوضح التوزيع في لمحة سريعة.

1. في ملف `userconfig.xml` الخاص بوحدة <span class="notranslate farm-term" translate="no">Farm</span> ، وفي قسم `<vip>` ، أضف قاعدة موازنة التحميل على منفذ خادم الويب SafeKit. مثال مع خادم الويب SafeKit في HTTP على المنفذ 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   إذا تم تحويل خادم الويب ووحدة التحكم في SafeKit إلى بروتوكول HTTPS، فاستبدل 9010 بـ 9453.

2. طبّق الإعدادات على جميع العُقد.
3. من متصفح على محطة عمل عميل **خارج <span class="notranslate farm-term" translate="no">Farm</span>** ، اتصل بـ:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   ثم أدخل **اسم وحدة** <span class="notranslate farm-term" translate="no">Farm</span> وقم بتشغيل الاختبار. تعرض كل خلية من الفسيفساء (mosaic) اسم العقدة التي استجابت لاتصال TCP، ويتم ربط لون بكل عقدة لإظهار كتل الفسيفساء (mosaic) التي تخدمها نفس العقدة بوضوح.

   في بروتوكول HTTPS، استخدم `https://<VIP>:9453/safekit/mosaic.html` ، مع قاعدة موازنة التحميل على المنفذ 9453.

![اختبار عنوان IP الظاهري <span class="notranslate farm-term" translate="no">farm</span> SafeKit باستخدام الفسيفساء (mosaic)](/wp-content/uploads/2024/03/appli-19.png)

شاهد فيديو اختبار الفسيفساء (mosaic) في قسم " [عرض توضيحي لحل <span class="notranslate farm-term" translate="no">farm</span> SafeKit](/ar/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ".

## 3. الاختبار الأول – توزيع الاتصالات {#3-test-1--distribution-of-connections}

**الخطوات**

1. ابدأ تشغيل <span class="notranslate farm-term" translate="no">Farm</span> على جميع العُقد (في حالة UP).
2. افتح الفسيفساء (mosaic) من محطة عمل العميل.

**النتيجة المتوقعة:** تعرض الفسيفساء (mosaic) أسماء **جميع عُقد** <span class="notranslate farm-term" translate="no">Farm</span> ، مع لون مختلف لكل عقدة معالجة.

يثبت هذا أن الموجه أو البوابة الأصلية تصل إلى إحدى العُقد من خلال عنوان MAC الخاص بها، وأن هذه العقدة توزع الاتصالات بشكل صحيح.

## 4. الاختبار الثاني – تغيير خادم الإرسال {#4-test-2--change-of-dispatching-server}

يتحقق هذا الاختبار من أن <span class="notranslate farm-term" translate="no">Farm</span> تستمر في الاستجابة عند توقف خادم الإرسال.

**الخطوات**

1. إيقاف <span class="notranslate farm-term" translate="no">Farm</span> ، أي جميع العُقد في SafeKit.
2. ابدأ **عقدة واحدة**. تصبح هذه العقدة هي خادم الإرسال.
   → **النتيجة المتوقعة:** تعرض الفسيفساء (mosaic) هذه العقدة فقط.
3. ابدأ تشغيل العُقد الأخرى.
   → **النتيجة المتوقعة:** تعرض الفسيفساء (mosaic) جميع العُقد.
4. أوقف **العقدة الأولى** ، وهي العقدة التي تعمل كخادم إرسال.
   → **النتيجة المتوقعة:** تعرض الفسيفساء (mosaic) العُقد المتبقية.

> **قيود هذا الاختبار:** لا تثبت النتيجة الصحيحة في الخطوة 4 أن GARP يعمل. عند بدء تشغيل وحدة <span class="notranslate farm-term" translate="no">Farm</span> على العُقد الأخرى (الخطوة 3)، يتم تكوين عنوان IP الظاهري على هذه العُقد، مما يولد رسائل على الشبكة قد تعيد توجيه ارتباط عنوان IP الظاهري/عنوان MAC بالفعل. الاختباران 3 و 4 فقط هما اللذان يختبران بروتوكول GARP حقًا.

> يؤدي إيقاف أي عقدة أخرى في <span class="notranslate farm-term" translate="no">Farm</span> (ليست خادم الإرسال) إلى اختبار إعادة تكوين التوزيع فقط.

## 5. الاختبار 3 – التحقق من إعادة توجيه GARP باستخدام `arp -a` {#5-test-3--checking-garp-rerouting-with-arp--a}

بالإضافة إلى الاختبار 4، يتحقق هذا الاختبار حقًا من بروتوكول GARP : حيث تقوم بتدوين عنوان MAC لخادم التوزيع قبل إيقافه، ثم تتحقق من أن ارتباط عنوان IP الظاهري (VIP)/MAC قد تغير بعد ذلك.

لا يمكن إجراء هذا الاختبار إلا إذا كانت محطة عمل العميل التي تعرض الفسيفساء (mosaic) موجودة في **نفس الشبكة الفرعية لبروتوكول الإنترنت** مثل <span class="notranslate farm-term" translate="no">Farm</span>.

إذا كان هناك جهاز توجيه بين العميل <span class="notranslate farm-term" translate="no">Farm</span> ، فإن جدول ARP الخاص بالعميل لا يحتوي على عنوان IP الظاهري (VIP)، بل يحتوي على عنوان البوابة المستخدمة للوصول إلى شبكة <span class="notranslate farm-term" translate="no">Farm</span>. في هذه الحالة، تحقق من جدول ARP الخاص بجهاز التوجيه أو البوابة مع فريق الشبكة.

**الخطوات**

1. ابدأ تشغيل <span class="notranslate farm-term" translate="no">Farm</span> على جميع العُقد.
2. على محطة عمل العميل، قم بتشغيل الأمر `arp -a` ولاحظ عنوان MAC المرتبط بعنوان IP الظاهري (VIP). فهو يحدد خادم الإرسال.
3. أوقف عقدة <span class="notranslate farm-term" translate="no">Farm</span> التي تحمل عنوان MAC هذا.
4. تحقق من أن الفسيفساء (mosaic) لا تزال تعمل مع العُقد المتبقية.
5. شغّل الأمر `arp -a` مرة أخرى لقراءة ارتباط عنوان IP الظاهري (VIP) / عنوان MAC الجديد وتحديد خادم الإرسال الجديد.

## 6. الاختبار 4 – فحص شامل باستخدام Wireshark (نظام التشغيل Windows) أو tcpdump (نظام التشغيل Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

يمكنك تتبع اتصال TCP إلى عنوان IP الظاهري (VIP) عن طريق التقاط الحزم على العميل وعلى عقد <span class="notranslate farm-term" translate="no">Farm</span> : باستخدام Wireshark على أجهزة Windows، وباستخدام tcpdump على أجهزة Linux.

يجب عليك إلقاء نظرة على **ترويسات MAC (إيثرنت) للحزم** ، وليس فقط عناوين IP: يقوم مرشح النواة الخاص بخادم التوزيع بتوزيع الاتصالات عن طريق **إعادة كتابة عنوان MAC الوجهة** للحزم إلى عنوان عقدة المعالجة. يظل عنوان IP الوجهة هو عنوان IP الظاهري (VIP) على طول المسار بأكمله.

**ما يجب ملاحظته في حزمة SYN نفسها:**

| خطوة | مكان التقاط الحزم | عناوين MAC التي تم رصدها |
|---|---|---|
| 1. يرسل العميل إلى عنوان IP الظاهري (VIP) | العميل | عنوان MAC للعميل ← عنوان MAC **لخادم الإرسال** |
| 2. يقوم خادم الإرسال بإعادة توجيه الاتصال | خادم الإرسال | إرسال عنوان MAC الخاص بالخادم ← عنوان MAC الخاص **بعقدة المعالجة** |
| 3. تستقبل عقدة المعالجة | عقدة المعالجة | إرسال عنوان MAC الخاص بالخادم ← عنوان MAC الخاص بالعقدة |
| 4. تستجيب العقدة مباشرةً للعميل. | عقدة المعالجة | عنوان MAC الخاص بالعقدة ← عنوان MAC الخاص بالعميل |
| 5. يتلقى العميل الرد. | العميل | عنوان MAC الخاص بالعقدة ← عنوان MAC الخاص بالعميل |

> إذا كانت محطة عمل العميل في شبكة فرعية مختلفة عن <span class="notranslate farm-term" translate="no">Farm</span> ، فإن "عنوان MAC للعميل" الذي يظهر على عقد <span class="notranslate farm-term" translate="no">Farm</span> هو عنوان MAC **للبوابة** (الموجه) التي تربط الشبكتين الفرعيتين، وليس عنوان محطة عمل العميل.

كرر عملية الالتقاط بعد إيقاف خادم الإرسال (الاختبار 2، الخطوة 4): يجب أن تعرض الخطوة 1 الآن عنوان MAC لخادم الإرسال **الجديد**.

## 7. محطات العمل التي سيتم الاختبار منها {#7-which-workstations-to-test-from}

يعتمد السلوك على مسار الشبكة بين العميل <span class="notranslate farm-term" translate="no">Farm</span>. قم بتشغيل الاختبارين 1 و 2 من كل نوع من أنواع العملاء ذات الصلة بالبنية الخاصة بك:

| موقع العميل | ما الذي يتحقق منه الاختبار؟ |
|---|---|
| العميل في **نفس الشبكة الفرعية** الخاصة <span class="notranslate farm-term" translate="no">Farm</span> | تحديث جداول ARP الخاصة بالعملاء بواسطة GARP (اختبار 3 ممكن) |
| العميل في **شبكة فرعية مختلفة** (جهاز توجيه، بوابة، شبكة افتراضية للمشرف) | معالجة بروتوكول GARP بواسطة جهاز التوجيه أو البوابة |
| جهاز افتراضي للعميل **على مضيف افتراضي يستضيف أيضًا جهازًا افتراضيًا <span class="notranslate farm-term" translate="no">Farm</span>** | سلوك المحول الافتراضي للمشرف، والذي يتعامل أيضًا مع التبديل والتوجيه الداخليين. |

## 8. ملخص النتائج المتوقعة {#8-summary-of-expected-results}

| اختبار | إجراء | النتيجة المتوقعة |
|---|---|---|
| 1 | جميع العُقد UP ، الفسيفساء (mosaic) | تظهر جميع العُقد |
| 2.2 | بدء تشغيل عقدة واحدة | تظهر هذه العقدة فقط. |
| 2.3 | تم بدء تشغيل جميع العُقد | تظهر جميع العُقد |
| 2.4 | توقف خادم الإرسال | تظهر العُقد المتبقية دون أي انقطاع دائم. |
| 3 | `arp -a` قبل وبعد الإيقاف | يتغير عنوان MAC المرتبط بعنوان IP الظاهري (VIP). |
| 4 | التقاط بيانات Wireshark أو tcpdump قبل وبعد الإيقاف | يرسل العميل إلى عنوان MAC الخاص بخادم الإرسال الجديد |

## 9. استكشاف الأخطاء وإصلاحها {#9-troubleshooting}

- **خرائط بتات موازنة التحميل:** للحصول على تفاصيل حول الاختبار وخرائط بتات موازنة التحميل، راجع دليل مستخدم SafeKit 8.2، القسم 4.3.5 " [اختبار موازنة تحميل TCP على عنوان IP ظاهري](https://safekit.eviden.com/ar/resources/safekit-user-guide-82/#Mosaic) ".
- **لم يعد الفسيفساء (mosaic) يستجيب بعد توقف خادم الإرسال:** لا يأخذ الجهاز الموجود على المسار (الموجه، البوابة، المحول الافتراضي) GARP في الاعتبار. تحقق من معالجة بروتوكول GARP مع فريق الشبكة لديك.
- **الإرسال الدوري لبروتوكول GARP :** ترسل السمة `arpreroute="on"` الخاصة بالقسم `<vip>` (مع `arpinterval` و `arpelapse`) GARPs بانتظام على عناوين VIP. راجع دليل المستخدم، القسم 13.6.4 " [صيغة `<vip>`](https://safekit.eviden.com/ar/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **تشخيص حل عنوان IP الظاهري (VIP) ↔ عنوان MAC:** راجع دليل المستخدم، القسم 7.24 " [استكشاف أخطاء حل عنوان IP الظاهري (VIP) ↔ عنوان MAC وإصلاحها](https://safekit.eviden.com/ar/resources/safekit-user-guide-82/#_Issue_with_VIP) "، والقسم 7.15 " [وحدة <span class="notranslate farm-term" translate="no">Farm</span> UP (Ready) ولكن مشكلة موازنة التحميل في <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/ar/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

لمزيد من المعلومات:
- [كيف يعمل عنوان IP الظاهري في تجميعات التوافر العالي؟](/ar/best-practises/how-a-virtual-ip-address-works/)
- للحصول على تجاوز الفشل الأساسي/الاحتياطي باستخدام عنوان IP ظاهري، راجع [اختبار عنوان IP الظاهري مجموعة mirror](/ar/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-ar  %}}

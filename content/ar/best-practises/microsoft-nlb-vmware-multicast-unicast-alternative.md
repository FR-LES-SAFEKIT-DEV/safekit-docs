---
title: "Microsoft بديل NLB لـ VMware: تم حل مشكلات البث المتعدد والبث الأحادي"
canonical: "https://safekit.eviden.com/ar/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "هل تواجه صعوبة في استخدام خاصية البث المتعدد أو البث الأحادي مع موازنة الأحمال (NLB) في بيئة VMware مع Microsoft ؟ يقترح SafeKit مجموعة farm بدون شبكة تخزين (SAN) كبديل بسيط. احصل على موازنة أحمال تلقائية وتجاوز الأعطال على Windows و Linux بدون الحاجة إلى إدخالات ARP ثابتة أو انتحال عناوين MAC أو تكوين شبكة متخصص."
category: "best-practises"
lang: "ar"
topics: "وضع البث المتعدد لـ NLB لـ Microsoft ، وضع البث الأحادي لـ NLB Microsoft ، بديل مع SafeKit ، كيف تعمل مجموعة SafeKit في وضع farm مع Windows ؟، 🔍 مركز التنقل عالي التوفر SafeKit"
---

# Microsoft بديل VMware لموازنة تحميل الشبكة: تم حل مشكلات البث المتعدد والبث الأحادي {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## وضع البث المتعدد لـ NLB Microsoft {#microsoft-nlb-multicast-mode}

كما هو موضح في قاعدة معارف VMware الخاصة بـ [ حول تكوين وضع البث المتعدد لموازنة تحميل الشبكة (NLB) ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) ، ستحتاج إلى تكوين حل ARP الثابت يدويًا على المحول أو الموجه لكل منفذ متصل بالمجموعة. قد يكون نشر وضع البث المتعدد لموازنة تحميل الشبكة (NLB) Microsoft في بيئة شبكة غير معروفة مهمة معقدة وشاقة.

## Microsoft وضع البث الأحادي NLB {#microsoft-nlb-unicast-mode}

في وضع البث الأحادي لـ NLB Microsoft ، يجب عليك ضبط مضيف ESXi/ESX بحيث لا يرسل حزم RARP عند تشغيل أي من أجهزته الافتراضية. ولهذا السبب، لا يعمل وضع البث الأحادي لـ NLB [ Microsoft بشكل صحيح مع VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>) .

## بديل مع SafeKit {#alternative-with-safekit}

لا يتطلب تكوين عنوان IP الظاهري [ SafeKit ](</ar/best-practises/how-a-virtual-ip-address-works/>) أي إعدادات خاصة للشبكة، ويمكن تشغيل موازنة أحمال الشبكة في أي بيئة. تُعد هذه ميزة مهمة عند نشر الحل في بنية تحتية غير معروفة: مثل المحولات أو أجهزة التوجيه أو الخوادم الفعلية أو الافتراضية غير المعروفة.


{{%  insert-safekit-farm-ar app="Windows"  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
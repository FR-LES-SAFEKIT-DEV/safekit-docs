---
title: "بديل Microsoft NLB VMware: حل مشكلات البث المتعدد والبث الأحادي"
canonical: "https://safekit.eviden.com/ar/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "بديل لـ Microsoft NLB على VMware: توازن مجموعات farm في SafeKit الأحمال وتتجاوز الفشل دون بث متعدد أو إدخالات ARP ثابتة أو انتحال MAC."
category: "best-practises"
lang: "ar"
topics: "وضع البث المتعدد Microsoft NLB، وضع البث الأحادي Microsoft NLB، بديل باستخدام SafeKit، كيف تعمل مجموعة SafeKit في وضع farm مع Windows؟، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 44 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# بديل Microsoft NLB VMware: حل مشكلات البث المتعدد والبث الأحادي {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## وضع البث المتعدد Microsoft NLB {#microsoft-nlb-multicast-mode}

في وضع البث المتعدد، يجب عليك تكوين دقة ARP ثابتة يدويًا على المحول أو الموجه. وهذا مطلوب لكل منفذ متصل بالمجموعة. للحصول على التفاصيل، راجع مقالة قاعدة معارف VMware [حول تكوين وضع البث المتعدد لموازنة تحميل الشبكة (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). في بيئة شبكة غير معروفة، يمكن أن يكون نشر Microsoft NLB في وضع البث المتعدد معقدًا ومتطلبًا.

## وضع البث الأحادي Microsoft NLB {#microsoft-nlb-unicast-mode}

في وضع البث الأحادي، يجب عليك تكوين مضيف ESXi/ESX بحيث لا يرسل حزم RARP عند تشغيل إحدى أجهزته الافتراضية. وإلا، فلن يعمل Microsoft NLB بشكل صحيح مع VMware. للحصول على التفاصيل، راجع مقالة قاعدة معارف VMware [Microsoft NLB لا يعمل بشكل صحيح في وضع البث الأحادي](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## بديل باستخدام SafeKit {#alternative-with-safekit}

يستخدم SafeKit [عنوان IP ظاهريًا](</ar/best-practises/how-a-virtual-ip-address-works/>) لا يتطلب أي تهيئة خاصة للشبكة. ويعمل موازن تحميل الشبكة الخاص به في أي بيئة. وهذا أمر مهم عند نشر الحل في بنية تحتية غير معروفة: مثل المحولات أو الموجهات غير المعروفة، أو الخوادم المادية أو الخوادم الافتراضية.


{{%  insert-safekit-farm-ar app="Windows"  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
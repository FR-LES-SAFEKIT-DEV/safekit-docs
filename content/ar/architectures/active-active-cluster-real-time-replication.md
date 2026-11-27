---
title: "برنامج التجميع النشط-النشط مع النسخ المتماثل في الوقت الفعلي وتجاوز الفشل المتبادل"
canonical: "https://safekit.eviden.com/ar/architectures/active-active-cluster-real-time-replication/"
description: "مجموعة SafeKit نشط-نشط: خادمان يدعم كل منهما الآخر بعدة وحدات mirror، مع نسخ متزامن وتجاوز فشل متبادل على Windows و Linux."
category: "architectures"
lang: "ar"
topics: "كيف تعمل مجموعة نشطة-نشطة ذات النسخ المتماثل في الوقت الفعلي؟"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 44 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
schemaType: "TechArticle"
---

# برنامج التجميع النشط-النشط مع النسخ المتماثل في الوقت الفعلي وتجاوز الفشل المتبادل {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## كيف تعمل مجموعة نشطة-نشطة ذات النسخ المتماثل في الوقت الفعلي؟ {#how-the-active-active-cluster-with-real-time-replication-works}

### مجموعة نشطة-نشطة مع النسخ المتماثل في الوقت الفعلي {#active--active-cluster-with-real-time-replication}

يقوم خادمان بتشغيل التطبيقات ويدعمان بعضهما البعض. ويُطلق على هذا الأمر اسم تجاوز الفشل المتبادل: حيث يكون كل خادم بمثابة نسخة احتياطية للخادم الآخر. ويستخدم كل تطبيق أدلة الملفات المكررة الخاصة به.


![مجموعة SafeKit النشطة مع النسخ المتماثل في الوقت الفعلي](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


إذا تعطل أحد الخوادم في مجموعة نشطة-نشطة، فستعمل جميع التطبيقات على الخادم المتبقي. وعندما تتم إعادة تشغيل الخادم المتعطل، يعود كل تطبيق إلى خادمه الأساسي الافتراضي.

### كيف يعمل؟ {#how-it-works}

لتكوين مجموعة نشطة-نشطة باستخدام SafeKit، ما عليك سوى نشر وحدتي mirror مع نسخ متماثل في الوقت الفعلي. لكل وحدة mirror تكوينها الخاص: عنوان IP ظاهري، ودلائل منسوخة في الوقت الفعلي، ونصوص برمجية لإعادة التشغيل.

ملاحظات:

  * يجب تثبيت كلا التطبيقين (Appli1 وAppli2) على كل خادم لإجراء تحويل التطبيق عند الفشل.
  * لا تقتصر هذه البنية على تطبيقين. يمكنك نشر ما يصل إلى 25 وحدة تطبيق على نفس الخادمين.
  * لكل وحدة mirror عنوان IP ظاهري خاص بها، ودلائل ملفات مكررة خاصة بها، ونصوص استرداد خاصة بها.


### مثال على مجموعة نشطة-نشطة {#example-of-an-active-active-cluster}

يُعد حل 💡 [Hyper-V](</ar/solutions/hyper-v-replication-automatic-failover-load-balancing/>) أو 💡 [KVM](</ar/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) مثالًا على مجموعة نشطة-نشطة. يوفر هذا الحل النسخ المتماثل، وتجاوز الفشل التلقائي، وموازنة تحميل الأجهزة الافتراضية. في هذه المجموعة، تقوم N من وحدات mirror بنسخ N أجهزة افتراضية بين خادمين ماديين.

في هذا التكوين، تقوم كل وحدة mirror بنسخ جهاز افتراضي كامل وإعادة تشغيله في حالة حدوث عطل.

لا يحتاج هذا النوع من الوحدات إلى عنوان IP ظاهري. فعندما تتم إعادة تشغيل الجهاز الظاهري على الخادم الآخر، ينتقل عنوان IP الخاص به معه تلقائيًا.

في هذه البنية، يتم تثبيت التطبيق الحرج داخل جهاز افتراضي.


{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
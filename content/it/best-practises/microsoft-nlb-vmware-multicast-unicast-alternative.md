---
title: "Microsoft NLB Alternativa VMware: problemi di multicast e unicast risolti"
canonical: "https://safekit.eviden.com/it/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Hai difficoltà con il multicast o l'unicast NLB Microsoft in VMware? SafeKit propone un cluster farm senza SAN come semplice alternativa. Ottieni bilanciamento del carico e failover automatici su Windows e Linux senza voci ARP statiche, spoofing MAC o configurazioni di rete specializzate."
category: "best-practises"
lang: "it"
topics: "Modalità multicast NLB Microsoft , modalità unicast NLB Microsoft , alternativa con SafeKit , come funziona il cluster SafeKit in modalità `farm` con Windows ?, 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Microsoft Alternativa NLB VMware: problemi multicast e unicast risolti {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft Modalità multicast NLB {#microsoft-nlb-multicast-mode}

Come spiegato nella knowledge base di VMware relativa alla configurazione della modalità multicast di bilanciamento del carico di rete (NLB) [ ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) , è necessario configurare manualmente la risoluzione ARP statica sullo switch o sul router per ogni porta connessa al cluster. L'implementazione della modalità multicast NLB Microsoft in un ambiente di rete sconosciuto può rivelarsi un'operazione complessa e impegnativa.

## Microsoft Modalità unicast NLB {#microsoft-nlb-unicast-mode}

Con la modalità unicast NLB Microsoft , è necessario configurare l'host ESXi/ESX in modo che non invii pacchetti RARP quando una delle sue macchine virtuali è accesa. Ecco perché [ Microsoft NLB non funzionano correttamente in modalità unicast con VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>) .

## Alternativa con SafeKit {#alternative-with-safekit}

La configurazione degli indirizzi IP virtuali [ SafeKit ](</it/best-practises/how-a-virtual-ip-address-works/>) non richiede alcuna configurazione di rete particolare e il bilanciamento del carico di rete può funzionare in qualsiasi ambiente. Una caratteristica importante quando la soluzione deve essere implementata in un'infrastruttura sconosciuta: switch o router, server fisici o virtuali non noti.


{{%  insert-safekit-farm-it app="Windows"  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
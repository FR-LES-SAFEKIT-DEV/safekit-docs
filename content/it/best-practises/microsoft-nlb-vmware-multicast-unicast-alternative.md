---
title: "Alternativa VMware Microsoft NLB: problemi di multicast e unicast risolti"
canonical: "https://safekit.eviden.com/it/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Un’alternativa a Microsoft NLB su VMware: i cluster farm SafeKit bilanciano il carico ed eseguono il failover senza multicast, voci ARP statiche o MAC spoofing."
category: "best-practises"
lang: "it"
topics: "Modalità multicast Microsoft NLB, Modalità unicast Microsoft NLB, Alternativa con SafeKit"
hashpart: "microsoft-nlb-multicast-mode, microsoft-nlb-unicast-mode, alternative-with-safekit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Alternativa VMware Microsoft NLB: problemi di multicast e unicast risolti {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Modalità multicast Microsoft NLB {#microsoft-nlb-multicast-mode}

In modalità multicast, è necessario configurare manualmente la risoluzione ARP statica sullo switch o sul router. Ciò è necessario per ogni porta connessa al cluster. Per i dettagli, consultare l’articolo della Knowledge Base VMware [Configurazione della modalità multicast di Network Load Balancing (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). In un ambiente di rete sconosciuto, la distribuzione di Microsoft NLB in modalità multicast può essere complessa e impegnativa.

## Modalità unicast Microsoft NLB {#microsoft-nlb-unicast-mode}

In modalità unicast, è necessario configurare l’host ESXi/ESX in modo che non invii pacchetti RARP quando una delle sue macchine virtuali viene accesa. In caso contrario, Microsoft NLB non funziona correttamente con VMware. Per maggiori dettagli, consultare l’articolo della Knowledge Base VMware [Microsoft NLB non funziona correttamente in modalità Unicast](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternativa con SafeKit {#alternative-with-safekit}

SafeKit utilizza un [indirizzo IP virtuale](</it/best-practises/how-a-virtual-ip-address-works/>) che non richiede alcuna configurazione di rete speciale. Il suo bilanciamento del carico di rete funziona in qualsiasi ambiente. Questo è importante quando si implementa la soluzione in un’infrastruttura sconosciuta: switch o router sconosciuti, server fisici o server virtuali.


{{%  insert-safekit-farm-it app="Windows"  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
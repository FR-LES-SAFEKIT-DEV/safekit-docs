---
title: "Software voor bedrijfscontinuïteit en noodherstel voor clusters met 2 knooppunten met SafeKit"
canonical: "https://safekit.eviden.com/nl/use-cases/business-continuity-and-disaster-recovery-software/"
description: "Bedrijfscontinuïteit en disaster recovery met SafeKit: een cluster met twee nodes verdeeld over twee serverruimtes, met synchrone replicatie en automatische failover."
category: "use-cases"
lang: "nl"
topics: "Software voor bedrijfscontinuïteit en noodherstel"
hashpart: "business-continuity-and-disaster-recovery-software"
translation: "translate_md 2026-11-16.4 | glossaire 2026-11-16.12 | Translation LLM | 49 expressions"
image: "/wp-content/uploads/2023/02/remote-datacenters.png"
schemaType: "Article"
---

# Software voor bedrijfscontinuïteit en noodherstel voor clusters met 2 knooppunten met SafeKit {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## Software voor bedrijfscontinuïteit en noodherstel {#business-continuity-and-disaster-recovery-software}

### Redenen om voor de SafeKit-software te kiezen voor bedrijfscontinuïteit en noodherstel {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![Eenvoudige software voor bedrijfscontinuïteit en noodherstel met SafeKit](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


De configuratie is hetzelfde, of u nu een SafeKit-cluster in één serverruimte of in twee externe serverruimtes implementeert. De enige vereiste is een uitgebreid LAN of een stretched VLAN tussen de externe locaties.

### Hoe implementeer je een eenvoudige hoge beschikbaarheidsoplossing tussen twee externe serverruimtes? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

Met SafeKit kunt u de mirror-module en de <span class="notranslate farm-term" translate="no">farm</span>-module eenvoudig implementeren op servers in externe serverruimtes. Er is geen speciale clusterconfiguratie nodig. SafeKit combineert daarom bedrijfscontinuïteit en noodherstel in één eenvoudige architectuur. SafeKit regelt ook netwerkisolatie zonder een derde server of een speciale quorumschijf. Lees meer over [split-brainbeheer](</nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Bedrijfscontinuïteit versus back-upoplossingen {#business-continuity-vs-backup-solutions}

Oplossingen voor bedrijfscontinuïteit en back-up zijn bedoeld voor verschillende storingsscenario's. Ze vullen elkaar aan en zijn niet uitwisselbaar. SafeKit-clustering voor hoge beschikbaarheid zorgt voor bedrijfscontinuïteit. Het zorgt ervoor dat applicaties met minimale onderbreking blijven draaien wanneer een server of een applicatie uitvalt, dankzij realtime replicatie en automatische failover. Back-upoplossingen beschermen tegen bredere verliezen, zoals ransomware-aanvallen of bedieningsfouten. Ze zijn meestal gebaseerd op externe kopieën van gegevens die u achteraf herstelt. Herstel duurt langer en er is geen automatische failover.

Lees meer over [het combineren van SafeKit hoge beschikbaarheid met back-ups voor noodherstel](</nl/best-practises/high-availability-disaster-recovery-hadr/>).


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
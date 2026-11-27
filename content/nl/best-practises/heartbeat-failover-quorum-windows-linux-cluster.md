---
title: "Heartbeat, failover en quorum in Windows- en Linux-clusters"
canonical: "https://safekit.eviden.com/nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Hoe heartbeat, failover en quorum werken in Windows- en Linux-clusters, en hoe SafeKit split brain voorkomt zonder quorumschijf of derde server."
category: "best-practises"
lang: "nl"
topics: "Hoe werken heartbeats en failover in een Windows- of Linux-cluster?, Split brain en quorum met servers in twee externe computerruimtes, Eenvoudig clusterquorum met de SafeKit split-brain-checker"
hashpart: "how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster, split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms, simple-cluster-quorum-with-the-safekit-split-brain-checker"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Heartbeat, failover en quorum in Windows- en Linux-clusters {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-nl  %}}
 

## Hoe werken heartbeats en failover in een Windows- of Linux-cluster? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### Wat is een heartbeat? {#what-is-a-heartbeat}

Het basismechanisme om twee servers te synchroniseren en serverstoringen te detecteren is de **heartbeat**. Het is een monitoringgegevensstroom op een netwerk dat door de twee servers wordt gedeeld.

De SafeKit-software ondersteunt meerdere heartbeats. Elk netwerk dat door de twee servers wordt gedeeld, kan één heartbeat dragen.

Het heartbeatmechanisme wordt gebruikt om Windows- en Linux-clusters te implementeren. Het is geïntegreerd in het SafeKit mirror-cluster met real-time bestandsreplicatie en failover.

### SafeKit heartbeats {#safekit-heartbeats}

Tijdens normale werking wisselen de twee servers hun statussen uit via de heartbeat-kanalen. Deze statussen zijn PRIM, SECOND en de resourcestatussen. Ze synchroniseren ook de start- en stop-procedures van de applicatie.

Tijdens een geplande failover wordt bijvoorbeeld eerst het stop-script van de toepassing uitgevoerd op de primaire server. Vervolgens wordt het start-script uitgevoerd op de secundaire server. De gerepliceerde gegevens op de secundaire server bevinden zich dan in een veilige toestand. Deze toestand komt overeen met een schone stop van de toepassing.

### Wat gebeurt er als alle heartbeats verloren gaan? {#loss-of-all-heartbeats}

Wanneer een server alle heartbeats verliest, beschouwt deze de andere server als uitgevallen. De server gaat dan naar de ALONE-status.

Als de server in de SECOND-status naar de ALONE-status gaat, wordt de toepassing opnieuw gestart op deze server. Dit is een failover van de toepassing.

Twee heartbeatkanalen op twee verschillende netwerken worden aanbevolen, maar zijn niet verplicht. Met twee netwerken wordt een netwerkstoring niet verward met een serverstoring.

## Split brain en quorum met servers in twee externe computerruimtes {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Heartbeat, failover en quorum in een Windows- of Linux-cluster](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Twee externe computerruimtes {#remote-computer-rooms}

Met twee servers in twee externe computerruimtes kan een high-availabilitycluster een bedrijfskritieke toepassing beschermen.

De applicatie blijft dus beschikbaar, zelfs als een ramp een hele computerruimte verwoest.

### Split brain {#split-brain}

Als het netwerk tussen de twee computerruimtes is geïsoleerd, gaan alle heartbeats verloren. Dit is het split-brainprobleem: beide servers starten de kritieke applicatie.

### Complexiteit van de gebruikelijke oplossingen {#complexity-of-solutions}

Meestal wordt een quorum gebruikt om het split brain op te lossen. Het quorum maakt gebruik van een derde quorumserver of een speciale quorumschijf. Het voorkomt dat er twee primaire servers tegelijkertijd zijn.

Helaas voegen deze quorumapparaten kosten en complexiteit toe aan de clusterarchitectuur.

## Eenvoudig clusterquorum met de SafeKit split-brain-checker {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit split-brain-checker {#safekit-split-brain-checker}

Met de SafeKit high-availability software heeft het quorum van een Windows- of Linux-cluster geen derde quorumsamenwerkingsserver en geen quorumdisk nodig. Een eenvoudige 🛠️ [split-brain-checker](</nl/resources/safekit-user-guide-82/#check_splitbrain>) is voldoende om te voorkomen dat de applicatie op beide servers draait.

Wanneer alle heartbeats tussen de servers verloren gaan, selecteert de split-brain-checker slechts één server om de primaire server te worden. De andere server gaat naar de WAIT-status. Deze wacht totdat hij de heartbeats van de andere server weer ontvangt. Vervolgens synchroniseert hij de gerepliceerde gegevens van de primaire server en gaat terug naar de secundaire status.

### Hoe werkt de split-brain-checker? {#how-the-split-brain-checker-works}

De primaire server wordt gekozen met een ping naar een IP-adres, de zogenoemde witness. De witness is meestal een router die altijd beschikbaar is. In geval van netwerkisolatie wordt alleen de server die de witness kan bereiken primair in de ALONE-status. De andere server gaat naar de WAIT-status.

De witness wordt niet permanent getest. Er wordt alleen getest wanneer alle heartbeats verloren zijn gegaan. Als de witness op dat moment uitvalt, gaat het cluster in de WAIT-WAIT-status. Een beheerder kan dan een van de servers opnieuw opstarten als primair met de SafeKit webconsole.

### Wat gebeurt er zonder een split-brain-checker? {#what-happens-without-a-split-brain-checker}

In geval van netwerkisolatie gaan beide servers naar de ALONE-status en voeren ze de kritieke toepassing uit. De gerepliceerde mappen worden geïsoleerd. Elke toepassing werkt met zijn eigen gegevens in zijn eigen map.

Wanneer de verbinding met het netwerk is hersteld, kiest SafeKit standaard de server die vóór de isolatie PRIM was als de nieuwe primaire server. De andere server wordt gedwongen naar de SECOND-status. Al zijn gegevens worden opnieuw gesynchroniseerd vanaf de PRIM server.

Opmerking: op Windows kan een server een dubbel IP-adres detecteren en zijn virtuele IP-adres verwijderen. In dat geval dwingt een SafeKit checker een herstart af.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}

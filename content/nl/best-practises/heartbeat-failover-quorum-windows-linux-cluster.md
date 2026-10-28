---
title: "Heartbeat, failover en quorum in Windows en Linux -clusters"
canonical: "https://safekit.eviden.com/nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Leer hoe heartbeats, failover en quorum werken in een cluster. SafeKit biedt een SAN-loze architectuur die de noodzaak voor een derde quorumserver of speciale quorumschijf elimineert. Bereik hoge beschikbaarheid op Windows en Linux met een eenvoudige split-brain checker."
category: "best-practises"
lang: "nl"
topics: "Wat zijn de verschillende scenario's bij netwerkisolatie in een cluster? Hoe werken heartbeats en failover in een Windows of Linux -cluster? Het split-brain-probleem en quorum wanneer servers zich in twee externe computerruimtes bevinden. Eenvoudig clusterquorum met de SafeKit split-brain checker. 🔍 SafeKit High Availability Navigation Hub"
---

# Heartbeat, failover en quorum in Windows en Linux clusters {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-nl  %}}
 

## Hoe werken heartbeats en failover in een Windows of Linux -cluster? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### Wat is een hartslag? {#what-is-a-heartbeat}

Het basismechanisme voor het synchroniseren van twee servers en het detecteren van serverstoringen is de ** heartbeat ** , die de gegevensstroom bewaakt op een netwerk dat door twee servers wordt gedeeld.

De SafeKit -software ondersteunt evenveel heartbeats als er netwerken zijn die door twee servers worden gedeeld. 

Het heartbeat-mechanisme wordt gebruikt voor de implementatie van Windows en Linux -clusters. Het is geïntegreerd in de SafeKit mirror -clusters met realtime bestandsreplicatie en failover.

### SafeKit hartslagen {#safekit-heartbeats}

Tijdens normaal gebruik wisselen de twee servers hun status (PRIM, SECOND, de status van de resources) uit via de heartbeat-kanalen en synchroniseren ze hun procedures voor het starten en stoppen van de applicatie.

In het bijzonder wordt bij een geplande failover het stopscript dat de applicatie stopt, eerst op de primaire server uitgevoerd, voordat het startscript op de secundaire server wordt uitgevoerd. Hierdoor bevinden de gerepliceerde gegevens op de secundaire server zich in een veilige staat, wat overeenkomt met een correcte stop van de applicatie.

### Verlies van alle hartslagen {#loss-of-all-heartbeats}

Wanneer alle hartslagen op één server wegvallen, beschouwt deze server de andere server als niet beschikbaar en schakelt over naar de ALONE-status.

Als de TWEEDE server in de ALONE-status terechtkomt, vindt er een failover plaats waarbij de applicatie op de secundaire server opnieuw wordt opgestart.

Hoewel niet verplicht, is het beter om twee heartbeat-kanalen op twee verschillende netwerken te hebben voor het synchroniseren van de twee servers. Zo kan een netwerkstoring worden gescheiden van een serverstoring.

## Split-brainprobleem en quorum wanneer servers zich in twee externe computerruimtes bevinden {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![ Heartbeat, failover en quorum in een Windows of Linux -cluster ](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Externe computerruimtes {#remote-computer-rooms}

Een cluster met hoge beschikbaarheid dat een kritieke applicatie beveiligt, kan worden geïmplementeerd met twee servers in twee geografisch gescheiden computerruimtes.

De oplossing ondersteunt dus de rampzalige situatie van een volle kamer.

### Gespleten hersenen {#split-brain}

In een situatie waarin de twee computerruimtes van elkaar gescheiden zijn, gaat alle communicatie verloren en ontstaat het split-brain-probleem.

Beide servers starten de kritieke applicatie.

### Complexiteit van oplossingen {#complexity-of-solutions}

Meestal wordt, om het split-brain-probleem op te lossen, een quorum geïmplementeerd met een derde quorumserver of een speciale quorumschijf om dubbele masters te voorkomen. 

Helaas brengen deze nieuwe quorumapparaten extra kosten en complexiteit met zich mee voor de algehele clusterarchitectuur.

## Eenvoudig clusterquorum met de SafeKit split-brain checker {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit split brain checker {#safekit-split-brain-checker}

Met de SafeKit -software voor hoge beschikbaarheid is er binnen een Windows of Linux cluster geen derde quorumserver en geen quorumschijf nodig voor het quorum. Een eenvoudige split-brain checker ](</nl/resources/safekit-user-guide-82/#check_splitbrain>) [ voldoende om te voorkomen dat een applicatie dubbel wordt uitgevoerd.

Bij het uitvallen van alle heartbeats tussen de servers selecteert de split-brain checker slechts één server als primaire server. De andere server gaat naar de wachtstand (WAIT) totdat deze de heartbeats van de primaire server weer ontvangt. Vervolgens keert deze terug naar de secundaire status nadat de gerepliceerde gegevens van de primaire server zijn gesynchroniseerd.

### Hoe werkt de split-brain checker? {#how-the-split-brain-checker-works}

De verkiezing van de primaire server is gebaseerd op de ping van een IP-adres, de zogenaamde witness. De witness is doorgaans een router die altijd beschikbaar is. In geval van netwerkisolatie is alleen de server met toegang tot de witness de primaire server (ALONE), de andere servers gaan in de wachtstand (WAIT).

De witness-server wordt niet permanent getest, maar alleen wanneer alle heartbeats verloren gaan. Als de witness-server op dat moment niet beschikbaar is, gaat het cluster naar de WAIT-WAIT-status en kan een beheerder ervoor kiezen om een van de servers opnieuw op te starten als primaire server via de SafeKit -webconsole.

### Wat gebeurt er zonder een split-brain checker? {#what-happens-without-a-split-brain-checker}

In geval van netwerkisolatie zullen beide servers in de ALONE-status gaan en de kritieke applicatie uitvoeren. De gerepliceerde mappen zijn geïsoleerd en elke applicatie werkt met zijn eigen gegevens in zijn eigen map.

Wanneer het netwerk opnieuw is verbonden, kiest SafeKit standaard de server die vóór de isolatie de primaire server was als de nieuwe primaire server en dwingt de andere server als secundaire server, waarbij alle gegevens van die server opnieuw worden gesynchroniseerd met de primaire server.

Opmerking: Windows kan een dubbel IP-adres op een server detecteren en het virtuele IP-adres op die server verwijderen. SafeKit heeft een controlemechanisme om in dat geval een herstart af te dwingen.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
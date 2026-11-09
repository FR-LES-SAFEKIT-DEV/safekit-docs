---
title: "Milestone XProtect High Availability met SafeKit: Installeer de milestone.safe-module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implementeer de milestone.safe module voor SafeKit om synchrone real-time replicatie en automatische failover van Milestone XProtect op Windows mogelijk te maken. Deze handleiding begeleidt u bij het instellen van een SANless-cluster met 2 knooppunten voor bedrijfskritieke toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Milestone XProtect, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Milestone XProtect oplossing, Installatie van de SafeKit/Milestone XProtect oplossing op Windows (milestone.safe), Stapsgewijze configuratie van de SafeKit/Milestone XProtect oplossing, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Milestone XProtect High Availability met SafeKit: Installeer de milestone.safe-module voor failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Milestone XProtect" mod="milestone"  %}}
 

## Overzicht van de SafeKit/Milestone XProtect oplossing {#overview-of-the-safekit--milestone-xprotect-solution}

De oplossing wordt hier beschreven: **💡 [De eenvoudigste Milestone XProtect High Availability: synchrone replicatie en failover met 2 knooppunten](</nl/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installatie van de SafeKit/Milestone XProtect oplossing op Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Vereisten {#prerequisites}

  * U moet Milestone XProtect Management en SQL installeren op 2 nodes (virtuele machines of fysieke servers). SQL Server en Event Server kunnen extern zijn, zie de onderstaande opmerkingen.


ℹ️ Opmerking: SQL Server kan extern zijn. In dit geval, bij stap 4 tijdens de stapsgewijze configuratie van milestone.safe:

  * de replicatie van de SQL-gegevens- en logmappen verwijderen,
  * Verwijder de procescontrole op sqlservr.exe
  * Verwijder MSSQLServer uit de macro SERVICES.


U kunt redundantie van de externe SQL Server implementeren met 💡 [SafeKit en de sqlserver.safe-module](</nl/solutions/sql-server-high-availability-synchronous-replication-failover/>).

Configureer in dit geval op beide beheerknooppunten de [verbinding van Milestone Management met SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) met het virtuele IP-adres van de sqlserver.safe-module (registersleutel HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Opmerking: de evenementenserver kan extern zijn ten opzichte van de beheerserver.

In dit geval hebt u 2 clusters met 2 installaties van milestone.safe: één voor het Managementcluster, de andere voor het Eventcluster.

Voor het Managementcluster, in stap 4 tijdens de stapsgewijze configuratie van milestone.safe:

  * Verwijder MilestoneEventServerService uit de macro SERVICES.


En voor de Event-cluster, in stap 4 tijdens de stapsgewijze configuratie van milestone.safe:

  * Verwijder uit de macro SERVICES: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * de replicatie van de SQL-gegevens- en logmappen verwijderen,
  * Verwijder de procescontrole op sqlservr.exe
  * [registreer](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) tijdens de stapsgewijze configuratie de Event Server met het virtuele IP-adres van het **Management Cluster** (of installeer de Event Server vanuit de Download Manager en stel het virtuele IP-adres van het **Management Cluster** in tijdens de installatie),
  * Stel in de Milestone-beheerclient de Event Server in met het virtuele IP-adres van het **Event-cluster** in de [geregistreerde services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redundantie van de recorder {#ℹ-recorder-redundancy}

  * Replicatie van recorders is niet geschikt voor SafeKit vanwege het datavolume.
  * De in Milestone geïntegreerde oplossing kan worden gebruikt (failover-opnameserver zonder realtime replicatie).
  * Twee recorders kunnen ook in een actieve/actieve configuratie draaien en de camera's zijn zo verdeeld dat bij een storing niet alle camera's in hetzelfde gebied verloren gaan.
  * Met de [Vega/RMF](<https://vega25.com/>) -oplossing kan de stream van elke camera ook naar twee recorders worden gestuurd.


ℹ️ Lees dit artikel in geval van migratie van Milestone van versie N naar versie N+1 in een SafeKit cluster: 🛠️ [Milestone Management-migratie met SafeKit](</nl/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-nl app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Stapsgewijze configuratie van de SafeKit/Milestone XProtect oplossing {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-nl app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
---
title: "Hoge beschikbaarheid van Milestone XProtect met SafeKit: installeer de milestone.safe-module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implementeer de milestone.safe-module van SafeKit om synchrone replicatie in realtime en automatische failover voor Milestone XProtect op Windows mogelijk te maken. Deze handleiding beschrijft hoe u een SANless-cluster met 2 knooppunten instelt voor kritieke toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiehandleiding voor hoge beschikbaarheid van Milestone XProtect, beperkingen van SafeKit-hoge beschikbaarheid, overzicht van de SafeKit / Milestone XProtect-oplossing, installatie van de SafeKit / Milestone XProtect-oplossing op Windows (milestone.safe), stapsgewijze configuratie van de SafeKit / Milestone XProtect-oplossing, demonstratie van de SafeKit-mirror-oplossing, 🔍 SafeKit-navigatiecentrum voor hoge beschikbaarheid"
---

# Hoge beschikbaarheid van Milestone XProtect met SafeKit: installeer de milestone.safe-module voor failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Milestone XProtect" mod="milestone"  %}}


## Overzicht van de SafeKit / Milestone XProtect-oplossing {#overview-of-the-safekit--milestone-xprotect-solution}

De oplossing wordt hier beschreven: **💡[De eenvoudigste hoge beschikbaarheid voor Milestone XProtect: synchrone replicatie en failover met 2 knooppunten](</nl/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installatie van de SafeKit / Milestone XProtect-oplossing op Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Vereisten {#prerequisites}

  * Milestone XProtect Management en SQL moeten op 2 knooppunten (virtuele machines of fysieke servers) zijn geïnstalleerd. SQL Server en Event Server kunnen extern zijn; zie de opmerkingen hieronder.


ℹ️ Opmerking: SQL Server kan extern zijn. Voer in dat geval bij stap 4 van de stapsgewijze configuratie van milestone.safe de volgende handelingen uit:

  * verwijder de replicatie van de mappen SQL Data en Log,
  * verwijder de procescontrole voor sqlservr.exe,
  * verwijder MSSQLServer uit de macro SERVICES.


U kunt de externe SQL Server redundant uitvoeren met **💡[SafeKit en de sqlserver.safe-module](</nl/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

Configureer in dat geval op beide Management-knooppunten de [verbinding van Milestone Management met SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) met het virtuele IP-adres van de sqlserver.safe-module (registersleutel HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Opmerking: Event Server kan extern van Management Server zijn.

In dat geval zijn er 2 clusters met 2 installaties van milestone.safe: één voor het Management-cluster en één voor het Event-cluster.

Verwijder voor het Management-cluster bij stap 4 van de stapsgewijze configuratie van milestone.safe:

  * MilestoneEventServerService uit de macro SERVICES.


Verwijder voor het Event-cluster bij stap 4 van de stapsgewijze configuratie van milestone.safe:

  * uit de macro SERVICES: MSSQLServer, Milestone XProtect Management Server en Milestone XProtect Log Server,
  * de replicatie van de mappen SQL Data en Log,
  * de procescontrole voor sqlservr.exe,
  * [registreer](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) tijdens de stapsgewijze configuratie Event Server met het virtuele IP-adres van het **Management-cluster** (of installeer Event Server via Download Manager en stel tijdens de installatie het virtuele IP-adres van het **Management-cluster** in),
  * stel in Milestone management client voor Event Server het virtuele IP-adres van het **Event-cluster** in bij [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redundantie van recorders {#ℹ-recorder-redundancy}

  * Replicatie van recorders is vanwege de hoeveelheid gegevens niet geschikt voor SafeKit.
  * De in Milestone geïntegreerde oplossing kan worden gebruikt (failover-opnameserver zonder realtime replicatie).
  * Twee recorders kunnen ook in een active/active-configuratie werken; verdeel de camera's zodat bij een storing niet alle camera's in hetzelfde gebied uitvallen.
  * De stream van elke camera kan ook met de oplossing [Vega / RMF](<https://vega25.com/>) naar twee recorders worden gestuurd.


ℹ️ Lees bij een migratie van Milestone van versie N naar versie N+1 in een SafeKit-cluster dit artikel: 🛠️ [Milestone Management migreren met SafeKit](</nl/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-nl app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="Milestone XProtect and SQL" mod="milestone"  %}}


## Stapsgewijze configuratie van de SafeKit / Milestone XProtect-oplossing {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-nl app="Milestone XProtect and SQL" mod="milestone"  %}}


## Demonstratie van de SafeKit-mirror-oplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}

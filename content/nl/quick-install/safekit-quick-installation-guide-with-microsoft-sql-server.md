---
title: "Microsoft SQL Server hoge beschikbaarheid met SafeKit: Installeer de sqlserver.safe-module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Implementeer de sqlserver.safe module voor SafeKit om synchrone real-time replicatie en automatische failover voor Microsoft SQL Server mogelijk te maken. Deze handleiding begeleidt u bij het opzetten van een SANless-cluster met 2 knooppunten voor bedrijfskritieke toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Microsoft SQL Server, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Microsoft SQL Server oplossing, Installatie van de SafeKit/Microsoft SQL Server-oplossing op Windows (sqlserver.safe), Stapsgewijze configuratie van de SafeKit/Microsoft SQL Server oplossing, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Microsoft SQL Server hoge beschikbaarheid met SafeKit: Installeer de sqlserver.safe-module voor failover {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Overzicht van de SafeKit/Microsoft SQL Server oplossing {#overview-of-the-safekit--microsoft-sql-server-solution}

Voor een gedetailleerd overzicht van de oplossing, zie **💡 [De eenvoudigste hoge beschikbaarheid Microsoft SQL Server: synchrone replicatie en failover met 2 knooppunten](</nl/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## Installatie van de SafeKit/Microsoft SQL Server-oplossing op Windows (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Vereisten {#prerequisites}

  * U moet Microsoft SQL Server op 2 knooppunten (virtuele machines of fysieke servers) hebben geïnstalleerd.
  * SafeKit werkt met alle versies van SQL, inclusief SQL Express.


  * De [SQL-systeemdatabases](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (zoals master.mdf en mastlog.ldf) moeten zich in dezelfde mappen op beide knooppunten bevinden. De mappen worden geconfigureerd als gerepliceerd in stap 4 van de stapsgewijze configuratie.
  * SQL moet ook op dezelfde locatie in het bestandssysteem op beide knooppunten worden geïnstalleerd, omdat de alleen-lezen [SQL-resource database](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) zich in het binaire bestand bevindt en vereist is voor de failover. Deze database hoeft niet te worden gerepliceerd.
  * De SQL-gebruikersdatabases (.mdf en .ldf) moeten zich in dezelfde mappen op beide knooppunten bevinden. De mappen worden geconfigureerd als gerepliceerd in stap 4 van de stapsgewijze configuratie.



{{%  insert-safekit-installation-package-windows-nl app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Stapsgewijze configuratie van de SafeKit/Microsoft SQL Server oplossing {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-nl app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
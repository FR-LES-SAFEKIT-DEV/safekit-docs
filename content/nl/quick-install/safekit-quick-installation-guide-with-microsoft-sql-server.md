---
title: "Microsoft SQL Server Hoge beschikbaarheid met SafeKit : Installeer de sqlserver.safe -module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Implementeer de sqlserver.safe module voor SafeKit om synchrone realtime-replicatie en automatische failover voor Microsoft SQL Server mogelijk te maken. Deze handleiding beschrijft hoe u een SANless-cluster met twee knooppunten opzet voor kritieke applicaties zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor High Availability voor Microsoft SQL Server , Beperkingen van High Availability SafeKit , Overzicht van de SafeKit / Microsoft SQL Server oplossing, Installatie van de SafeKit / Microsoft SQL Server oplossing op Windows ( sqlserver.safe ), Stapsgewijze configuratie van de SafeKit / Microsoft SQL Server oplossing, Demonstratie van de SafeKit mirror -oplossing, 🔍 SafeKit High Availability Navigation Hub"
---

# Microsoft SQL Server Hoge beschikbaarheid met SafeKit : Installeer de sqlserver.safe module voor failover {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Overzicht van de SafeKit / Microsoft SQL Server oplossing {#overview-of-the-safekit--microsoft-sql-server-solution}

Voor een gedetailleerd overzicht van de oplossing, zie **💡 [ De eenvoudigste Microsoft SQL Server Hoge beschikbaarheid: synchrone replicatie en failover met 2 knooppunten ](</nl/solutions/sql-server-high-availability-synchronous-replication-failover/>)** .

## Installatie van de SafeKit / Microsoft SQL Server oplossing op Windows ( sqlserver.safe ) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Vereisten {#prerequisites}

  * Je hebt Microsoft SQL Server nodig, geïnstalleerd op 2 knooppunten (virtuele machines of fysieke servers).
  * SafeKit werkt met alle versies van SQL, inclusief SQL Express.


  * De SQL-systeemdatabases [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (zoals master.mdf en mastlog.ldf) moeten zich in dezelfde mappen op beide knooppunten bevinden. De mappen worden in stap 4 van de stapsgewijze configuratie geconfigureerd als gerepliceerd.
  * SQL moet op beide knooppunten op dezelfde locatie in het bestandssysteem worden geïnstalleerd, omdat de alleen-lezen SQL-resourcedatabase [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) zich in het binaire bestand bevindt en nodig is voor de failover. Deze database hoeft niet te worden gerepliceerd.
  * De SQL-gebruikersdatabases (.mdf en .ldf) moeten zich in dezelfde mappen op beide knooppunten bevinden. De mappen worden in stap 4 van de stapsgewijze configuratie geconfigureerd als gerepliceerd.



{{%  insert-safekit-installation-package-windows-nl app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Stapsgewijze configuratie van de SafeKit / Microsoft SQL Server oplossing {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-nl app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demonstratie van de SafeKit mirror oplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
---
title: "Nedap Hoge beschikbaarheid met SafeKit : Installeer de nedap.safe -module voor failover."
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Implementeer de nedap.safe module voor SafeKit om synchrone realtime-replicatie en automatische failover van Nedap op Windows mogelijk te maken. Deze handleiding beschrijft hoe u een SANless-cluster met twee knooppunten opzet voor kritieke applicaties zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor High Availability Nedap , Beperkingen van High Availability SafeKit , Overzicht van de SafeKit / Nedap -oplossing, Installatie van de SafeKit / Nedap oplossing op Windows ( nedap.safe ), Stapsgewijze configuratie van de SafeKit / Nedap oplossing, Demonstratie van de SafeKit mirror -oplossing, 🔍 SafeKit High Availability Navigation Hub"
---

# Nedap Hoge beschikbaarheid met SafeKit : Installeer de nedap.safe module voor failover {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Nedap" mod="nedap"  %}}
 

**📘 [ Configuratie van Nedap AOES met SafeKit (PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)** : alle details staan in dit document.

## Overzicht van de SafeKit / Nedap -oplossing {#overview-of-the-safekit--nedap-solution}

De oplossing wordt hier beschreven: **💡 [ De eenvoudigste Nedap Hoge beschikbaarheid: synchrone replicatie en failover met 2 knooppunten ](</nl/solutions/nedap-high-availability-synchronous-replication-failover/>)** .

## Installatie van de SafeKit / Nedap oplossing op Windows ( nedap.safe ) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Vereisten {#prerequisites}

  * Je hebt Nedap AEOS en SQL nodig, geïnstalleerd op 2 knooppunten (virtuele machines of fysieke servers).
  * Als SQL Server op hetzelfde knooppunt bevindt als Nedap AEOS, configureer dan de verbinding van Nedap AEOS met SQL met het virtuele IP-adres en niet met het fysieke IP-adres van de server. Anders werkt de failover niet. SQL Server kan extern zijn, zie de onderstaande opmerking.


ℹ️ Opmerking: SQL Server kan extern zijn. In dat geval, bij stap 4 tijdens de stapsgewijze configuratie:

  * Verwijder de duplicatie van SQL-gegevens- en logmappen.
  * Verwijder de procescontrole op sqlservr.exe .
  * Verwijder MSSQLServer uit de SERVICES-macro.


U kunt redundantie van de externe SQL Server implementeren met 💡 [ SafeKit en de sqlserver.safe -module ](</nl/solutions/sql-server-high-availability-synchronous-replication-failover/>) . Configureer in dit geval de verbinding van Nedap AEOS met SQL met het virtuele IP-adres van de sqlserver.safe -module.


{{%  insert-safekit-installation-package-windows-nl app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Stapsgewijze configuratie van de SafeKit / Nedap -oplossing {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-nl app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Demonstratie van de SafeKit mirror oplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
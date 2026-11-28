---
title: "Nedap AEOS: SafeKit installeren voor hoge beschikbaarheid"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Stapsgewijze handleiding: installeer de SafeKit-module nedap.safe voor realtime replicatie en automatische failover van Nedap AEOS-toegangscontrole op Windows."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Nedap, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Nedap-oplossing, Installatie van de SafeKit/Nedap-oplossing op Windows (nedap.safe), Stapsgewijze configuratie van de SafeKit/Nedap-oplossing, Demonstratie van de SafeKit mirror"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--nedap-solution, installation-of-the-safekit--nedap-solution-on-windows-nedapsafe, step-by-step-configuration-of-the-safekit--nedap-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Nedap AEOS: SafeKit installeren voor hoge beschikbaarheid {#install-safekit-for-nedap-aeos-high-availability}


{{%  insert-safekit-mirror-guide-nl app="Nedap" mod="nedap"  %}}
 

**📘 [Configuratie van Nedap AOES met SafeKit (PDF)](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)**: alle details staan in dit document.

## Overzicht van de SafeKit/Nedap-oplossing {#overview-of-the-safekit--nedap-solution}

De oplossing wordt hier beschreven: **💡 [De eenvoudigste Nedap High Availability: synchrone replicatie en failover met 2 knooppunten](</nl/solutions/nedap-high-availability-synchronous-replication-failover/>)**.

## Installatie van de SafeKit/Nedap-oplossing op Windows (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Vereisten {#prerequisites}

  * U hebt Nedap AEOS en SQL nodig die op 2 knooppunten (virtuele machines of fysieke servers) zijn geïnstalleerd.
  * Als SQL Server zich op hetzelfde knooppunt bevindt als Nedap AEOS, configureer dan de verbinding van Nedap AEOS met SQL met het virtuele IP-adres en niet met het fysieke IP-adres van de server. Anders werkt de failover niet. SQL Server kan extern zijn, zie de onderstaande opmerking.


ℹ️ Opmerking: SQL Server kan extern zijn. In dat geval, bij stap 4 tijdens de stapsgewijze configuratie:

  * de replicatie van de SQL-gegevens- en logmappen verwijderen,
  * Verwijder de procescontrole op sqlservr.exe
  * Verwijder MSSQLServer uit de macro SERVICES.


U kunt redundantie van de externe SQL Server implementeren met 💡 [SafeKit en de sqlserver.safe-module](</nl/solutions/sql-server-high-availability-synchronous-replication-failover/>). Configureer in dit geval de verbinding van Nedap AEOS met SQL met het virtuele IP-adres van de sqlserver.safe-module.


{{%  insert-safekit-installation-package-windows-nl app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Stapsgewijze configuratie van de SafeKit/Nedap-oplossing {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-nl app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
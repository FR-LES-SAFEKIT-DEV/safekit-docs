---
title: "Clusteringsoftware met taakverdeling en spiegeling: hoge beschikbaarheid en schaalbaarheid"
canonical: "https://safekit.eviden.com/nl/architectures/clustering-software-load-balancing-mirroring/"
description: "Combineer SafeKit farm- en mirror-modules: loadbalancing schaalt de front-end, terwijl synchrone replicatie de back-endgegevens beschermt, op Windows en Linux."
category: "architectures"
lang: "nl"
topics: "Hoge beschikbaarheid en schaalbaarheid van bedrijfskritische web- en databaseapplicaties met de SafeKit-clusteringsoftware"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png"
schemaType: "TechArticle"
---

# Clusteringsoftware met taakverdeling en spiegeling: hoge beschikbaarheid en schaalbaarheid {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Hoge beschikbaarheid en schaalbaarheid van bedrijfskritische web- en databaseapplicaties met de SafeKit-clusteringsoftware {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Taakverdeling, spiegeling en failover {#load-balancing-mirroring-and-failover}


![SafeKit clustering met taakverdeling en mirroring](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Voorbeeld met de SafeKit-clusteringsoftware {#example-with-the-safekit-clustering-software}

Met de SafeKit-clusteringsoftware kunt u bijvoorbeeld loadbalancing voor IIS en mirroring voor Microsoft SQL Server implementeren.

Implementeer hiervoor een <span class="notranslate farm-term" translate="no">farm</span>-module voor IIS en een mirror-module voor Microsoft SQL Server. Elke module wordt geconfigureerd met een eigen virtueel IP-adres en eigen herstartscripts.

De twee modules kunnen worden geïmplementeerd op een enkel cluster van twee servers, waar zowel IIS als Microsoft SQL Server worden uitgevoerd. Als alternatief kunnen de twee modules worden geïmplementeerd op twee afzonderlijke clusters met verschillende servers.

Met de SafeKit-clusteringsoftware werkt de implementatie op dezelfde servers of op verschillende servers precies op dezelfde manier.

### Oplossing voor hoge beschikbaarheid en schaalbaarheid {#high-availability-and-scalability-solution}

De SafeKit-clusteringsoftware biedt een eenvoudige oplossing voor hoge beschikbaarheid en schaalbaarheid voor bedrijfskritische web- en databaseapplicaties.

Netwerkbelastingsverdeling, real-time gegevensspiegeling en applicatie-failover worden consistent beheerd in één enkel product.

In tegenstelling tot hardwareclustering vereist de SafeKit-clusteringsoftware geen gedeelde schijven, gerepliceerde SAN's, hardwarematige load balancers of Enterprise-edities van besturingssystemen of databases.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
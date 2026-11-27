---
title: "MariaDB High Availability met SafeKit: Installeer de mysql.safe-module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Stapsgewijze handleiding: installeer de SafeKit-module mysql.safe voor realtime replicatie en automatische failover van MariaDB op Windows of Linux."
category: "quick-install"
lang: "nl"
topics: "Overzicht van de SafeKit/MariaDB-oplossing, Installatie van de SafeKit/MariaDB-oplossing op Windows en Linux (mysql.safe), Stapsgewijze configuratie van de SafeKit/MariaDB-oplossing, Demonstratie van de SafeKit mirror"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# MariaDB High Availability met SafeKit: Installeer de mysql.safe-module voor failover {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="MariaDB" mod="mysql"  %}}
 

## Overzicht van de SafeKit/MariaDB-oplossing {#overview-of-the-safekit--mariadb-solution}

De oplossing wordt hier beschreven: **💡 [De eenvoudigste MariaDB High Availability: 2-Node Synchronous Replication & Failover](</nl/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Installatie van de SafeKit/MariaDB-oplossing op Windows en Linux (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Vereisten {#prerequisites}

  * U moet MariaDB op 2 knooppunten (virtuele machines of fysieke servers) hebben geïnstalleerd.



{{%  insert-safekit-installation-package-windows-nl app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-nl app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-nl app="MariaDB" mod="mysql"  %}}
 

## Stapsgewijze configuratie van de SafeKit/MariaDB-oplossing {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-nl app="MariaDB" mod="mysql"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
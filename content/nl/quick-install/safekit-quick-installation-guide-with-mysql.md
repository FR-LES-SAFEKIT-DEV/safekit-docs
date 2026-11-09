---
title: "MySQL High Availability met SafeKit: Installeer de mysql.safe-module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "Implementeer de mysql.safe module voor SafeKit om synchrone real-time replicatie en automatische failover van MySQL op Windows en Linux mogelijk te maken. Deze handleiding begeleidt u bij het opzetten van een SANless-cluster met 2 knooppunten voor bedrijfskritische toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor MySQL, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/MySQL-oplossing, Installatie van de SafeKit/MySQL-oplossing op Windows en Linux (mysql.safe), Stapsgewijze configuratie van de SafeKit/MySQL Server-oplossing, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# MySQL High Availability met SafeKit: Installeer de mysql.safe-module voor failover {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="MySQL" mod="mysql"  %}}
 

## Overzicht van de SafeKit/MySQL-oplossing {#overview-of-the-safekit--mysql-solution}

De oplossing wordt hier beschreven: **💡 [De eenvoudigste MySQL High Availability: 2-node synchrone replicatie en failover](</nl/solutions/mysql-high-availability-synchronous-replication-failover/>)**.

## Installatie van de SafeKit/MySQL-oplossing op Windows en Linux (mysql.safe) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### Vereisten {#prerequisites}

  * U moet MySQL op 2 knooppunten (virtuele machines of fysieke servers) hebben geïnstalleerd.



{{%  insert-safekit-installation-package-windows-nl app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-nl app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-nl app="MySQL" mod="mysql"  %}}
 

## Stapsgewijze configuratie van de SafeKit/MySQL Server-oplossing {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-nl app="MySQL" mod="mysql"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
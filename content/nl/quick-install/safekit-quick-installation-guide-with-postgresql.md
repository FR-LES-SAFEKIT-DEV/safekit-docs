---
title: "PostgreSQL hoge beschikbaarheid met SafeKit: Installeer de postgresql.safe-module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Implementeer de postgresql.safe module voor SafeKit om synchrone real-time replicatie en automatische failover van PostgreSQL op Windows en Linux mogelijk te maken. Deze handleiding begeleidt u bij het opzetten van een SANless-cluster met 2 knooppunten voor bedrijfskritieke toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor PostgreSQL, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/PostgreSQL-oplossing, Installatie van de SafeKit/PostgreSQL-oplossing op Windows en Linux (postgresql.safe), Stapsgewijze configuratie van de SafeKit/PostgreSQL-oplossing, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# PostgreSQL hoge beschikbaarheid met SafeKit: Installeer de postgresql.safe-module voor failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Overzicht van de SafeKit/PostgreSQL-oplossing {#overview-of-the-safekit--postgresql-solution}

De oplossing wordt hier beschreven: **💡 [De eenvoudigste PostgreSQL hoge beschikbaarheid: synchrone replicatie en failover met 2 knooppunten](</nl/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installatie van de SafeKit/PostgreSQL-oplossing op Windows en Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Vereisten {#prerequisites}

  * U moet PostgreSQL op 2 knooppunten (virtuele machines of fysieke servers) hebben geïnstalleerd.



{{%  insert-safekit-installation-package-windows-nl app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-nl app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-nl app="PostgreSQL" mod="postgresql"  %}}
 

## Stapsgewijze configuratie van de SafeKit/PostgreSQL-oplossing {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-nl app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
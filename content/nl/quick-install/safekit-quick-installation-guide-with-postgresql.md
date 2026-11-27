---
title: "PostgreSQL hoge beschikbaarheid met SafeKit: Installeer de postgresql.safe-module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Stapsgewijze handleiding: installeer de SafeKit-module postgresql.safe voor realtime replicatie en automatische failover van PostgreSQL op Windows of Linux."
category: "quick-install"
lang: "nl"
topics: "Overzicht van de SafeKit/PostgreSQL-oplossing, Installatie van de SafeKit/PostgreSQL-oplossing op Windows en Linux (postgresql.safe), Stapsgewijze configuratie van de SafeKit/PostgreSQL-oplossing, Demonstratie van de SafeKit mirror"
hashpart: "overview-of-the-safekit--postgresql-solution, installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe, step-by-step-configuration-of-the-safekit--postgresql-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
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
---
title: "PostgreSQL hoge beschikbaarheid met SafeKit: installeer de postgresql.safe-module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Implementeer de postgresql.safe-module voor SafeKit om synchrone real-time replicatie en automatische failover van PostgreSQL op Windows en Linux mogelijk te maken. Deze handleiding begeleidt u bij het opzetten van een SANless-cluster met 2 knooppunten voor kritieke applicaties zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelle installatiehandleiding voor hoge beschikbaarheid voor PostgreSQL, SafeKit Hoge beschikbaarheidsbeperkingen, Overzicht van de SafeKit / PostgreSQL-oplossing, Installatie van de SafeKit / PostgreSQL-oplossing op Windows en Linux (postgresql.safe), Stapsgewijze configuratie van de SafeKit / PostgreSQL-oplossing, Demonstratie van de SafeKit mirror-oplossing, 🔍 SafeKit High Availability Navigation Hub"
---

# PostgreSQL hoge beschikbaarheid met SafeKit: installeer de postgresql.safe-module voor failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Overzicht van de SafeKit / PostgreSQL-oplossing {#overview-of-the-safekit--postgresql-solution}

De oplossing wordt hier beschreven: **💡[De eenvoudigste PostgreSQL hoge beschikbaarheid: synchrone replicatie en failover met 2 knooppunten](</nl/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installatie van de SafeKit / PostgreSQL-oplossing op Windows en Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Vereisten {#prerequisites}

  * U moet PostgreSQL op 2 knooppunten installeren (virtuele machines of fysieke servers).



{{%  insert-safekit-installation-package-windows-nl app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-nl app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-nl app="PostgreSQL" mod="postgresql"  %}}
 

## Stap voor stap configuratie van de SafeKit / PostgreSQL-oplossing {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-nl app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstratie van de SafeKit spiegeloplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
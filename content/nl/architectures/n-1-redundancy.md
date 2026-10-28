---
title: "N-1 redundantieclustering: hoge beschikbaarheid voor meerdere applicaties met één back-up."
canonical: "https://safekit.eviden.com/nl/architectures/n-1-redundancy/"
description: "Optimaliseer uw datacenter met SafeKit N-1 redundantie. Implementeer N mirror modules over N+1 servers om hoge beschikbaarheid te bieden voor meerdere applicaties met één gedeelde back-up. Elimineer SAN-vereisten en verlaag hardwarekosten met realtime replicatie voor Windows en Linux . Lees meer."
category: "architectures"
lang: "nl"
topics: "Hoge beschikbaarheid met datareplicatie en applicatiefailover van N servers naar 1, 🔍 SafeKit High Availability Navigation Hub"
---

# N-1 redundantieclustering: hoge beschikbaarheid voor meerdere applicaties met één back-up {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Hoge beschikbaarheid met datareplicatie en applicatiefailover van N servers naar 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1 redundantie {#n-1-redundancy}


![ SafeKit N-1 redundantiecluster ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Hoe werkt de N-1 redundantie? {#how-the-n-1-redundancy-works}

SafeKit biedt een eenvoudig N-1 redundantiecluster met N applicaties die op N servers draaien en met één back-up voor failover. In een SafeKit N-1 redundantiecluster werkt elke applicatie met zijn eigen gerepliceerde directory's.

In geval van uitval van één van de primaire servers, in tegenstelling tot het actieve-actieve cluster [ ](</nl/architectures/active-active-cluster-real-time-replication/>) , hoeft de back-upserver geen dubbele werklast te verwerken.

Dit gaat ervan uit dat er slechts één server tegelijk uitvalt in het N-1 redundantiecluster. De oplossing kan meerdere primaire servers tegelijk laten uitvallen, maar in dat geval moet de back-upserver de gecombineerde werklast van alle uitgevallen servers verwerken.

### Hoe implementeer ik N-1 redundantie? {#how-to-implement-n-1-redundancy}

Het SafeKit N-1 redundantiecluster wordt eenvoudig geconfigureerd door N mirror -modules te implementeren op N+1 servers.

Let op:

  * Alle applicaties (Appli1, Appli2, Appli3) moeten op de back-up geïnstalleerd zijn voor failover van de applicaties.
  * Elke mirror module krijgt een eigen virtueel IP-adres, eigen gerepliceerde bestandsmappen en eigen herstelscripts.



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
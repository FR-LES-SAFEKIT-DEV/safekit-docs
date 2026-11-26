---
title: "N-1-redundantiecluster: hoge beschikbaarheid voor meerdere toepassingen met één back-upserver"
canonical: "https://safekit.eviden.com/nl/architectures/n-1-redundancy/"
description: "Optimaliseer uw datacenter met SafeKit N-1-redundantie. Implementeer N mirror-modules op N+1 servers om hoge beschikbaarheid te bieden voor meerdere toepassingen met één gedeelde back-upserver. Elimineer SAN-vereisten en verlaag hardwarekosten met realtime replicatie voor Windows en Linux. Meer informatie."
category: "architectures"
lang: "nl"
topics: "Hoge beschikbaarheid met gegevensreplicatie en applicatie-failover van N servers naar 1, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# N-1-redundantiecluster: hoge beschikbaarheid voor meerdere toepassingen met één back-upserver {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Hoge beschikbaarheid met gegevensreplicatie en applicatie-failover van N servers naar 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1-redundantie {#n-1-redundancy}


![N-1-redundantiecluster met SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Hoe werkt N-1-redundantie? {#how-the-n-1-redundancy-works}

SafeKit biedt een eenvoudig N-1-redundantiecluster: N applicaties draaien op N primaire servers en een enkele back-upserver neemt het over in geval van een storing. In een SafeKit N-1-redundantiecluster werkt elke applicatie op zijn eigen gerepliceerde mappen.

In tegenstelling tot een [actief-actief cluster](</nl/architectures/active-active-cluster-real-time-replication/>) hoeft de back-upserver bij het uitvallen van een primaire server geen dubbele werklast te verwerken.

Hierbij wordt ervan uitgegaan dat slechts één primaire server tegelijkertijd uitvalt in het N-1-redundantiecluster. De oplossing kan ook meerdere primaire serverstoringen tegelijkertijd afhandelen. In dit geval voert de enige back-upserver de gecombineerde werklast van alle uitgevallen servers uit.

### Hoe implementeert u N-1-redundantie? {#how-to-implement-n-1-redundancy}

Om een SafeKit N-1-redundantiecluster te configureren, hoeft u alleen maar N mirror-modules op N+1 servers te implementeren.

Opmerkingen:

  * Alle applicaties (Appli1, Appli2, Appli3) moeten op de back-upserver worden geïnstalleerd voor applicatie-failover.
  * Elke mirror-module heeft zijn eigen virtuele IP-adres, zijn eigen gerepliceerde bestandsmappen en zijn eigen herstelscripts.



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
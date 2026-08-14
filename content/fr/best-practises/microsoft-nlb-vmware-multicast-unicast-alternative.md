---
title: "Alternative à Microsoft NLB pour VMware : problèmes de multidiffusion et d’unicast résolus"
slug: "microsoft-nlb-vmware-multicast-unicast-alternative"
canonical: "https://safekit.eviden.com/fr/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Alternative à Microsoft NLB pour VMware : problèmes de multidiffusion et d’unicast résolus Mode multicast de Microsoft NLB Comme expliqué dans la base de connaissances de VMware pour la configuration du mode multicast de Microsoft NLB, vous devez positionner manuellement la résolution ARP statique des switchs ou des routeurs réseaux pour chaque port connecté au cluster. […]"
category: "best-practises"
lang: "fr"
topics: "Mode multicast de Microsoft NLB, Mode unicast de Microsoft NLB, Alternative avec SafeKit, Comment fonctionne le cluster SafeKit en mode farm avec Windows ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Alternative à Microsoft NLB pour VMware : problèmes de multidiffusion et d’unicast résolus

## Mode multicast de Microsoft NLB

Comme expliqué dans la base de connaissances de [VMware pour la configuration du mode multicast de Microsoft NLB](<https://knowledge.broadcom.com/external/article?articleNumber=414968>), vous devez positionner manuellement la résolution ARP statique des switchs ou des routeurs réseaux pour chaque port connecté au cluster. Le déploiement du mode multicast de Microsoft NLB dans un environnement réseau inconnu peut s'avérer une tâche complexe et ardue.

## Mode unicast de Microsoft NLB

Avec le mode unicast de Microsoft NLB, vous devez configurer l'hôte ESXi / ESX pour qu'il n'envoie pas de paquets RARP lorsque l'une de ses machines virtuelles est mise sous tension. C'est pourquoi [VMware recommande de ne pas utiliser le mode unicast de Microsoft NLB](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternative avec SafeKit

La configuration de l'[adresse IP virtuelle de SafeKit](</fr/best-practises/how-a-virtual-ip-address-works/>) ne nécessite aucune configuration réseau particulière et l'équilibrage de charge réseau peut s'exécuter dans n'importe quel environnement. Une fonctionnalité importante lorsque la solution doit être déployée dans une infrastructure inconnue : switchs ou routeurs inconnus, serveurs physiques ou serveurs virtuels.


{{%  insert-safekit-farm-fr app="Windows" %}}
 


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}
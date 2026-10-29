---
title: "Microsoft Alternative à NLB pour VMware : Problèmes de multidiffusion et d’unicast résolus"
canonical: "https://safekit.eviden.com/fr/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Vous rencontrez des difficultés avec la multidiffusion ou l'unicast NLB Microsoft dans VMware ? SafeKit propose un cluster farm sans SAN comme alternative simple. Bénéficiez d'un équilibrage de charge automatique et d'un basculement sur Windows et Linux sans entrées ARP statiques, usurpation d'adresse MAC ni configuration réseau complexe."
category: "best-practises"
lang: "fr"
topics: "Mode multicast NLB Microsoft , mode unicast NLB Microsoft , alternative avec SafeKit , comment le cluster SafeKit en mode farm fonctionne-t-il avec Windows ? 🔍 Centre de navigation haute disponibilité SafeKit"
---

# Microsoft Alternative à NLB pour VMware : Résolution des problèmes de multidiffusion et d'unidiffusion {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft Mode multicast NLB {#microsoft-nlb-multicast-mode}

Comme expliqué dans la base de connaissances de [ VMware concernant la configuration du mode multicast d'équilibrage de charge réseau (NLB) ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) , vous devez configurer manuellement la résolution ARP statique au niveau du commutateur ou du routeur pour chaque port connecté au cluster. Le déploiement du mode multicast NLB Microsoft dans un environnement réseau inconnu peut s'avérer complexe et ardu.

## Microsoft Mode monocast NLB {#microsoft-nlb-unicast-mode}

En mode unicast NLB Microsoft , vous devez configurer l'hôte ESXi/ESX pour qu'il n'envoie pas de paquets RARP lorsqu'une de ses machines virtuelles est mise sous tension. C'est pourquoi NLB [ Microsoft ne fonctionne pas correctement en mode unicast avec VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>) .

## Alternative avec SafeKit {#alternative-with-safekit}

La configuration des adresses IP virtuelles [ SafeKit ](</fr/best-practises/how-a-virtual-ip-address-works/>) ne requiert aucune configuration réseau particulière et l'équilibrage de charge réseau est compatible avec tous les environnements. Cette caractéristique est essentielle pour le déploiement de la solution dans une infrastructure inconnue : commutateurs ou routeurs, serveurs physiques ou virtuels, etc.


{{%  insert-safekit-farm-fr app="Windows"  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
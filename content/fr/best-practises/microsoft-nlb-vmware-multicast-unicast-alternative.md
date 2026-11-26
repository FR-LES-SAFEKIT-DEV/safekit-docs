---
title: "Alternative VMware Microsoft NLB : les problèmes de multicast et d’unicast sont résolus"
canonical: "https://safekit.eviden.com/fr/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Vous rencontrez des difficultés avec le multicast ou l’unicast Microsoft NLB dans VMware ? SafeKit offre une alternative simple : un cluster farm avec équilibrage de charge automatique et basculement sous Windows et Linux. Il ne nécessite aucune entrée ARP statique, aucune usurpation d’adresse MAC et aucune configuration réseau spécialisée."
category: "best-practises"
lang: "fr"
topics: "Mode multicast Microsoft NLB, Mode unicast de Microsoft NLB, Alternative avec SafeKit, Comment fonctionne le cluster SafeKit en mode farm sous Windows ?, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Alternative VMware Microsoft NLB : les problèmes de multicast et d’unicast sont résolus {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Mode multicast Microsoft NLB {#microsoft-nlb-multicast-mode}

En mode multicast, vous devez configurer manuellement la résolution ARP statique sur le commutateur ou le routeur. Ceci est requis pour chaque port connecté au cluster. Pour plus de détails, consultez l’article de la base de connaissances VMware [Configuration du mode multicast de l’équilibrage de charge réseau (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). Dans un environnement réseau inconnu, le déploiement de Microsoft NLB en mode multicast peut être complexe et exigeant.

## Mode unicast de Microsoft NLB {#microsoft-nlb-unicast-mode}

En mode unicast, vous devez configurer l’hôte ESXi/ESX de sorte qu’il n’envoie pas de paquets RARP lorsqu’une de ses machines virtuelles est mise sous tension. Sinon, Microsoft NLB ne fonctionne pas correctement avec VMware. Pour plus de détails, consultez l’article de la base de connaissances VMware [Microsoft NLB ne fonctionne pas correctement en mode Unicast](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternative avec SafeKit {#alternative-with-safekit}

SafeKit utilise une [adresse IP virtuelle](</fr/best-practises/how-a-virtual-ip-address-works/>) qui ne nécessite aucune configuration réseau spéciale. Son équilibrage de charge réseau fonctionne dans n’importe quel environnement. Ceci est important lorsque vous déployez la solution dans une infrastructure inconnue : commutateurs ou routeurs inconnus, serveurs physiques ou serveurs virtuels.


{{%  insert-safekit-farm-fr app="Windows"  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
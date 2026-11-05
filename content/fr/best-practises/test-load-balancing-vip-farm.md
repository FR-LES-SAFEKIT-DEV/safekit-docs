---
title: "Test de l’adresse IP virtuelle d’équilibrage de charge dans un cluster farm SafeKit"
canonical: "https://safekit.eviden.com/fr/best-practises/test-load-balancing-vip-farm/"
description: "Découvrez comment tester l’équilibrage de charge de SafeKit sur les nœuds du cluster et vérifier le basculement de l’IP virtuelle, le réacheminement GARP et le comportement du réseau."
category: "best-practises"
lang: "fr"
topics: "Principes clés, Prérequis : la mosaïque SafeKit, Test 1 – Distribution des connexions, Test 2 – Changement de serveur de répartition, Test 3 – Vérification du réacheminement GARP avec arp -a, Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux), Quelles stations de travail tester, Résumé des résultats attendus, Dépannage, Démonstration de la solution farm SafeKit"
translation: "translate_md 2026-11-05.13 | glossaire 2026-11-05.17 | Translation LLM | 20 expressions"
---

# Test de l’adresse IP virtuelle d’équilibrage de charge dans un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

Ce guide décrit comment vérifier qu’une <span class="notranslate farm-term" translate="no">Farm</span> SafeKit (module <span class="notranslate farm-term" translate="no">Farm</span>, équilibrage de charge sur une adresse IP virtuelle) fonctionne correctement dans votre réseau : distribution des connexions sur les nœuds et réacheminement de l’IP virtuelle (VIP) lorsque le nœud de distribution s’arrête.

## 1. Principes clés {#1-key-principles}

**Prérequis :** tous les nœuds de la <span class="notranslate farm-term" translate="no">Farm</span> doivent se trouver dans le même sous-réseau IP de couche 2 : un LAN ou un VLAN étendu entre des sites distants.

- L’IP virtuelle (VIP) est configurée localement sur chaque nœud de la <span class="notranslate farm-term" translate="no">Farm</span> : elle est définie comme un alias de l’adresse IP physique, sur la carte réseau de cette adresse, lorsque la <span class="notranslate farm-term" translate="no">Farm</span> est démarrée sur le nœud.
- Un seul nœud, le **serveur de répartition**, reçoit le trafic réseau pour l’IP virtuelle (VIP) (configuration `vmac_directed`, la valeur par défaut de SafeKit) : son adresse MAC est celle associée à l’IP virtuelle (VIP) dans les tables ARP (routeur, passerelle, clients dans le même sous-réseau).
- Le filtre du noyau de ce nœud distribue ensuite les connexions TCP sur les nœuds de la <span class="notranslate farm-term" translate="no">Farm</span>, en **réécrivant l’adresse MAC de destination** des paquets à celle du nœud de traitement (l’adresse IP de destination reste l’adresse IP virtuelle (VIP)). Les réponses sont envoyées directement du nœud qui traite la connexion au client.
- La distribution effectuée par le filtre est **déterministe** : le nœud de traitement est calculé à partir de l’identité du client, selon la règle d’équilibrage de charge configurée :
  - sur l’**adresse IP du client** (`filter="on_addr"`) : un client donné est toujours servi par le même nœud, ce qui assure l’affinité de session ;
  - sur le **port TCP du client** (`filter="on_port"`) : chaque connexion TCP du même client peut être desservie par un nœud différent. C’est la règle utilisée pour la mosaïque (section 2), qui affiche donc tous les nœuds à partir d’un seul poste de travail.
- Si le serveur de répartition s’arrête, un autre nœud prend ce rôle et envoie **GARPs** (ARP gratuit) afin que le réseau associe l’IP virtuelle (VIP) à sa propre adresse MAC.

Ce que vous devez donc tester :

1. que les connexions sont correctement réparties sur tous les nœuds;
2. que le réseau (routeur, passerelle, virtualisation) prenne en compte le GARP lorsque le serveur de répartition change.

## 2. Prérequis : la mosaïque SafeKit {#2-prerequisite-the-safekit-mosaic}

La mosaïque est une page de test fournie par SafeKit. Elle ouvre de nombreuses connexions TCP vers l’adresse IP virtuelle (VIP) et affiche, pour chacune d’elles, le nom du nœud qui a répondu. Cela permet de visualiser la distribution en un coup d’œil.

1. Dans le `userconfig.xml` du module <span class="notranslate farm-term" translate="no">Farm</span>, dans la section `<vip>`, ajoutez la règle d’équilibrage de charge sur le port du serveur Web SafeKit. Exemple avec le serveur Web SafeKit en HTTP sur le port 9010 :

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Si le serveur Web et la console SafeKit ont été basculés sur HTTPS, remplacez 9010 par 9453.

2. Appliquez la configuration sur tous les nœuds.
3. À partir d’un navigateur sur un poste de travail client **situé à l’extérieur de la <span class="notranslate farm-term" translate="no">Farm</span>**, connectez-vous à :

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   puis entrez le **nom du module** <span class="notranslate farm-term" translate="no">Farm</span> et exécutez le test. Chaque cellule de la mosaïque affiche le nom du nœud qui a répondu à la connexion TCP, et une couleur est associée à chaque nœud pour montrer clairement les blocs de la mosaïque servis par le même nœud.

   En HTTPS, utilisez `https://<VIP>:9453/safekit/mosaic.html`, avec la règle d’équilibrage de charge sur le port 9453.

![Testez l’adresse IP virtuelle d’une <span class="notranslate farm-term" translate="no">farm</span> SafeKit avec la mosaïque](/wp-content/uploads/2024/03/appli-19.png)

Regardez la vidéo de test de mosaïque dans la section « [Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit](/fr/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ».

## 3. Test 1 – Répartition des connexions {#3-test-1--distribution-of-connections}

**Étapes**

1. Démarrez la <span class="notranslate farm-term" translate="no">Farm</span> sur tous les nœuds (état UP).
2. Ouvrez la mosaïque à partir d’un poste de travail client.

**Résultat attendu :** la mosaïque affiche les noms de **tous les nœuds** de la <span class="notranslate farm-term" translate="no">Farm</span>, avec une couleur différente pour chaque nœud de traitement.

Cela prouve que le routeur ou la passerelle en amont atteint l’un des nœuds via son adresse MAC, et que ce nœud distribue correctement les connexions.

## 4. Test 2 – Changement de serveur d’expédition {#4-test-2--change-of-dispatching-server}

Ce test vérifie que la <span class="notranslate farm-term" translate="no">Farm</span> continue de répondre lorsque le serveur d’expédition s’arrête.

**Étapes**

1. Arrêtez la <span class="notranslate farm-term" translate="no">Farm</span>, c’est-à-dire tous les nœuds de SafeKit.
2. Démarrez **un nœud unique**. Ce nœud devient le serveur de répartition.
   → **Résultat attendu :** la mosaïque n’affiche que ce nœud.
3. Démarrez les autres nœuds.
   → **Résultat attendu :** la mosaïque affiche tous les nœuds.
4. Arrêtez le **premier nœud**, celui qui fait office de serveur de répartition.
   → **Résultat attendu :** la mosaïque affiche les nœuds restants.

> **Limitation de ce test :** un résultat correct à l’étape 4 ne prouve pas que GARP fonctionne. Lorsque le module <span class="notranslate farm-term" translate="no">Farm</span> est démarré sur les autres nœuds (étape 3), l’adresse IP virtuelle est configurée sur ces nœuds, ce qui génère des messages sur le réseau qui peuvent déjà rediriger l’association adresse IP virtuelle / adresse MAC. Seuls les tests 3 et 4 testent réellement GARP.

> L’arrêt de tout autre nœud de la <span class="notranslate farm-term" translate="no">Farm</span> (un nœud autre que le serveur de répartition) ne teste que la reconfiguration de la distribution.

## 5. Test 3 – Vérification du réacheminement GARP avec `arp -a` {#5-test-3--checking-garp-rerouting-with-arp--a}

Avec le test 4, ce test vérifie réellement GARP : vous notez l’adresse MAC du serveur de répartition avant de l’arrêter, puis vous vérifiez que l’association IP virtuelle (VIP)/MAC a changé par la suite.

Ce test n’est possible que si le poste de travail client affichant la mosaïque se trouve dans le **même sous-réseau IP** que la <span class="notranslate farm-term" translate="no">Farm</span>.

S’il y a un routeur entre le client et la <span class="notranslate farm-term" translate="no">Farm</span>, la table ARP du client ne contient pas l’adresse IP virtuelle (VIP), mais l’adresse de la passerelle utilisée pour atteindre le réseau de la <span class="notranslate farm-term" translate="no">Farm</span>. Dans ce cas, vérifiez la table ARP du routeur ou de la passerelle avec l’équipe réseau.

**Étapes**

1. Démarrez la <span class="notranslate farm-term" translate="no">Farm</span> sur tous les nœuds.
2. Sur le poste de travail client, exécutez `arp -a` et notez l’adresse MAC associée à l’adresse IP virtuelle (VIP). Elle identifie le serveur de répartition.
3. Arrêtez le nœud <span class="notranslate farm-term" translate="no">Farm</span> qui possède cette adresse MAC.
4. Vérifiez que la mosaïque fonctionne toujours avec les nœuds restants.
5. Exécutez à nouveau `arp -a` pour lire la nouvelle association IP virtuelle (VIP)/MAC et identifier le nouveau serveur de répartition.

## 6. Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

Vous pouvez suivre une connexion TCP vers l’IP virtuelle (VIP) en capturant les paquets sur le client et sur les nœuds <span class="notranslate farm-term" translate="no">Farm</span> : avec Wireshark sur les machines Windows, et avec tcpdump sur les machines Linux.

Vous devez regarder les **en-têtes MAC (Ethernet) des paquets**, et pas seulement les adresses IP : le filtre du noyau du serveur de distribution distribue les connexions en **réécrivant l’adresse MAC de destination** des paquets à celle du nœud de traitement. L’adresse IP de destination reste l’IP virtuelle (VIP) sur l’ensemble du chemin.

**Ce que vous devriez observer pour le même paquet SYN :**

| Étape | Où capturer les paquets | Adresses MAC observées |
|---|---|---|
| 1. Le client envoie à l’adresse IP virtuelle (VIP) | client | MAC du client → MAC du **serveur de répartition** |
| 2. Le serveur de répartition transmet la connexion. | serveur d’expédition | Serveur d’expédition MAC → MAC du **nœud de traitement** |
| 3. Le nœud de traitement reçoit | nœud de traitement | MAC du serveur d’expédition → MAC du nœud |
| 4. Le nœud répond directement au client. | nœud de traitement | Adresse MAC du nœud → adresse MAC du client |
| 5. Le client reçoit la réponse. | client | Adresse MAC du nœud → adresse MAC du client |

> Si le poste de travail client se trouve dans un sous-réseau différent de celui de la <span class="notranslate farm-term" translate="no">Farm</span>, le « MAC client » vu sur les nœuds <span class="notranslate farm-term" translate="no">Farm</span> est l’adresse MAC de la **passerelle** (routeur) connectant les deux sous-réseaux, et non celle du poste de travail client.

Répétez la capture après avoir arrêté le serveur de répartition (test 2, étape 4) : l’étape 1 doit maintenant afficher l’adresse MAC du **nouveau** serveur de répartition.

## 7. À partir de quels postes de travail effectuer les tests {#7-which-workstations-to-test-from}

Le comportement dépend du chemin réseau entre le client et la <span class="notranslate farm-term" translate="no">Farm</span>. Exécutez les tests 1 et 2 à partir de chaque type de client pertinent pour votre architecture :

| Localisation du client | Ce que le test vérifie |
|---|---|
| Client dans le **même sous-réseau** que la <span class="notranslate farm-term" translate="no">Farm</span> | Mise à jour des tables ARP des clients par GARP (test 3 possible) |
| Client dans un **sous-réseau différent** (routeur, passerelle, réseau virtuel de l’hyperviseur) | Gestion du GARP par le routeur ou la passerelle |
| Machine virtuelle cliente **sur un hyperviseur qui héberge également une machine virtuelle <span class="notranslate farm-term" translate="no">Farm</span>** | Comportement du commutateur virtuel de l’hyperviseur, qui gère également la commutation et le routage internes. |

## 8. Synthèse des résultats attendus {#8-summary-of-expected-results}

| Test | Action | Résultat attendu |
|---|---|---|
| 1 | Tous les nœuds UP, mosaïque | Tous les nœuds apparaissent. |
| 2.2 | Un seul nœud a démarré | Seul ce nœud apparaît. |
| 2.3 | Tous les nœuds ont démarré. | Tous les nœuds apparaissent. |
| 2.4 | Le serveur d’expédition s’est arrêté. | Les nœuds restants apparaissent, sans interruption durable. |
| 3 | `arp -a` avant et après l’arrêt | L’adresse MAC associée à l’adresse IP virtuelle (VIP) change. |
| 4 | Capture Wireshark ou tcpdump avant et après l’arrêt | Le client envoie à l’adresse MAC du nouveau serveur de répartition. |

## 9. Dépannage {#9-troubleshooting}

- **Images bitmap d’équilibrage de charge :** pour plus de détails sur le test et les images bitmap d’équilibrage de charge, consultez le Guide de l’utilisateur SafeKit 8.2, section 4.3.5 « [Test de l’équilibrage de charge TCP sur une adresse IP virtuelle](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#Mosaic) ».
- **La mosaïque ne répond plus après l’arrêt du serveur d’expédition :** GARP n’est pas pris en compte par un périphérique sur le chemin (routeur, passerelle, commutateur virtuel). Vérifiez la gestion GARP avec votre équipe réseau.
- **Envoi périodique de GARP :** l’attribut `arpreroute="on"` de la section `<vip>` (avec `arpinterval` et `arpelapse`) envoie GARPs régulièrement sur les VIP. Voir le Guide de l’utilisateur, section 13.6.4 « [Syntaxe `<vip>`](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ».
- **Diagnostic de la résolution IP virtuelle (VIP) ↔ MAC :** voir le Guide de l’utilisateur, section 7.24 « [Dépannage de la résolution IP virtuelle (VIP) ↔ MAC](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_Issue_with_VIP) », et section 7.15 « [Module <span class="notranslate farm-term" translate="no">Farm</span> UP (Ready) mais problème d’équilibrage de charge dans une <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ».

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

Pour plus d’informations :
- [Comment fonctionne une adresse IP virtuelle dans un cluster de haute disponibilité ?](/fr/best-practises/how-a-virtual-ip-address-works/)
- Pour le basculement primaire/de secours avec une adresse IP virtuelle, consultez [la section Test de l’adresse IP virtuelle d’un cluster mirror SafeKit](/fr/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-fr  %}}

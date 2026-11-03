---
titre : « Test de l’adresse IP virtuelle d’équilibrage de charge dans un cluster SafeKit farm »
canonique : "https://safekit.eviden.com/fr/best-practises/test-load-balancing-vip-farm/"
description: "Apprenez à tester l'équilibrage de charge SafeKit sur les nœuds du cluster et à vérifier le basculement d'adresse IP virtuelle, le reroutage GARP et le comportement du réseau."
catégorie : « meilleures pratiques »
lang: "fr"
Sujets : « Principes clés, Prérequis : la mosaïque SafeKit, Test 1 – Distribution des connexions, Test 2 – Changement de serveur de répartition, Test 3 – Vérification du reroutage GARP avec arp -a, Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux), Postes de travail à tester, Résumé des résultats attendus, Dépannage »
---

# Test de l'adresse IP virtuelle d'équilibrage de charge dans un cluster SafeKit <span class="notranslate farm-term" translate="no">farm</span>

Ce guide décrit comment vérifier qu'un module SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span>, équilibrage de charge sur une adresse IP virtuelle) fonctionne correctement dans votre réseau : distribution des connexions entre les nœuds et réacheminement de l'adresse IP virtuelle (VIP) lorsque le nœud de répartition s'arrête.

## 1. Principes clés

**Prérequis : ** tous les nœuds du <span class="notranslate farm-term" translate="no">Farm</span> doivent se trouver dans le même sous-réseau IP de couche 2 : un LAN ou un VLAN étendu entre des sites distants.

- L'adresse IP virtuelle (VIP) est configurée localement sur chaque nœud du <span class="notranslate farm-term" translate="no">Farm</span> : elle est définie comme un alias de l'adresse IP physique, sur la carte réseau de cette adresse, lorsque le <span class="notranslate farm-term" translate="no">Farm</span> est démarré sur le nœud.
- Un seul nœud, le serveur de répartition **, reçoit le trafic réseau pour l'IP virtuelle (VIP) (configuration `vmac_directed`, la configuration par défaut SafeKit) : son adresse MAC est celle associée à l'IP virtuelle (VIP) dans les tables ARP (routeur, passerelle, clients dans le même sous-réseau).
Le filtre noyau de ce nœud répartit ensuite les connexions TCP entre les nœuds du réseau 0-1-2 en réécrivant l'adresse MAC de destination des paquets pour la remplacer par celle du nœud de traitement (l'adresse IP de destination reste l'adresse IP virtuelle (VIP)). Les réponses sont envoyées directement du nœud qui traite la connexion au client.
- La distribution effectuée par le filtre est **déterministe** : le nœud de traitement est calculé à partir de l'identité du client, selon la règle d'équilibrage de charge configurée :
  - sur l'adresse IP du client **1 (`filter="on_addr"`) : un client donné est toujours servi par le même nœud, ce qui assure l'affinité de session ;
  Sur le port TCP client 1 (2) : chaque connexion TCP provenant d’un même client peut être gérée par un nœud différent. C’est la règle utilisée pour la mosaïque (section 2), qui représente donc tous les nœuds d’un seul poste de travail.
- Si le serveur de répartition s'arrête, un autre nœud prend le relais et envoie **GARPs** (ARP gratuit) afin que le réseau associe l'adresse IP virtuelle (VIP) à sa propre adresse MAC.

Ce que vous devez donc tester :

1. que les connexions sont correctement réparties sur tous les nœuds ;
2. que le réseau (routeur, passerelle, virtualisation) prenne en compte le GARP lorsque le serveur de répartition change.

## 2. Prérequis : la mosaïque SafeKit

La mosaïque est une page de test fournie par SafeKit. Elle ouvre de nombreuses connexions TCP vers l'adresse IP virtuelle (VIP) et affiche, pour chacune d'elles, le nom du nœud ayant répondu. Cela permet de visualiser la distribution en un coup d'œil.

1. Dans le module `userconfig.xml` du module <span class="notranslate farm-term" translate="no">Farm</span>, dans la section `<vip>`, ajoutez la règle d'équilibrage de charge sur le port du serveur web SafeKit. Exemple avec le serveur web SafeKit en HTTP sur le port 9010 :

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Si le serveur web et la console SafeKit ont été basculés vers HTTPS, remplacez 9010 par 9453.

2. Appliquez la configuration à tous les nœuds.
3. Depuis un navigateur sur un poste de travail client **en dehors du <span class="notranslate farm-term" translate="no">Farm</span>**, connectez-vous à :

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Saisissez ensuite le nom du module (0, 1, 2, 3) et exécutez le test. Chaque cellule de la mosaïque affiche le nom du nœud ayant répondu à la connexion TCP, et une couleur est associée à chaque nœud afin de visualiser clairement les blocs de la mosaïque desservis par ce même nœud.

   En HTTPS, utilisez `https://<VIP>:9453/safekit/mosaic.html`, avec la règle d'équilibrage de charge sur le port 9453.

Le test est décrit en détail dans le Guide de l'utilisateur SafeKit 8.2, section 4.3.5 "[Test d'équilibrage de charge TCP sur une adresse IP virtuelle](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. Test 1 – Distribution des connexions

0 étapes 1

1. Démarrer le <span class="notranslate farm-term" translate="no">Farm</span> sur tous les nœuds (état UP).
2. Ouvrez la mosaïque depuis un poste de travail client.

0 Résultat attendu : 1 la mosaïque affiche les noms de 2 tous les nœuds 3 des 4 5 6, avec une couleur différente pour chaque nœud de traitement.

Cela prouve que le routeur ou la passerelle en amont atteint l'un des nœuds via son adresse MAC, et que ce nœud distribue correctement les connexions.

## 4. Test 2 – Changement de serveur de répartition

Ce test vérifie que le <span class="notranslate farm-term" translate="no">Farm</span> continue de répondre lorsque le serveur de répartition s'arrête.

0 étapes 1

1. Arrêtez le <span class="notranslate farm-term" translate="no">Farm</span>, c'est-à-dire tous les nœuds dans SafeKit.
2. Démarrer **un seul nœud**. Ce nœud devient le serveur de répartition.
   → **Résultat attendu : ** la mosaïque n’affiche que ce nœud.
3. Démarrez les autres nœuds.
   → **Résultat attendu : ** la mosaïque affiche tous les nœuds.
4. Arrêtez le premier nœud ****, celui qui fait office de serveur de répartition.
   → **Résultat attendu : ** la mosaïque affiche les nœuds restants.

> **Limitation de ce test : ** Un résultat correct à l’étape 4 ne prouve pas que GARP fonctionne. Lorsque le module <span class="notranslate farm-term" translate="no">Farm</span> est démarré sur les autres nœuds (étape 3), l’adresse IP virtuelle est configurée sur ces nœuds, ce qui génère des messages sur le réseau susceptibles de modifier l’association adresse IP virtuelle/adresse MAC. Seuls les tests 3 et 4 testent réellement GARP.

> L'arrêt de tout autre nœud du <span class="notranslate farm-term" translate="no">Farm</span> (qui n'est pas le serveur de répartition) ne teste que la reconfiguration de la distribution.

## 5. Test 3 – Vérification du reroutage GARP avec `arp -a`

Avec le test 4, ce test vérifie réellement GARP : vous notez l'adresse MAC du serveur de répartition avant de l'arrêter, puis vous vérifiez que l'association IP virtuelle (VIP)/MAC a changé par la suite.

Ce test n'est possible que si le poste de travail client affichant la mosaïque se trouve dans le même sous-réseau IP que le 2 3 4.

S'il existe un routeur entre le client et le serveur <span class="notranslate farm-term" translate="no">Farm</span>, la table ARP du client ne contient pas l'adresse IP virtuelle (VIP), mais l'adresse de la passerelle utilisée pour accéder au réseau du serveur <span class="notranslate farm-term" translate="no">Farm</span>. Dans ce cas, veuillez consulter la table ARP du routeur ou de la passerelle auprès de votre équipe réseau.

0 étapes 1

1. Démarrez le <span class="notranslate farm-term" translate="no">Farm</span> sur tous les nœuds.
2. Sur le poste client, exécutez `arp -a` et notez l'adresse MAC associée à l'adresse IP virtuelle (VIP). Elle identifie le serveur de répartition.
3. Arrêtez le nœud <span class="notranslate farm-term" translate="no">Farm</span> qui possède cette adresse MAC.
4. Vérifiez que la mosaïque fonctionne toujours avec les nœuds restants.
5. Exécutez à nouveau `arp -a` pour lire la nouvelle association IP virtuelle (VIP)/MAC et identifier le nouveau serveur de répartition.

## 6. Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux)

Vous pouvez suivre une connexion TCP vers l'IP virtuelle (VIP) en capturant des paquets sur le client et sur les nœuds <span class="notranslate farm-term" translate="no">Farm</span> : avec Wireshark sur Windows machines, et avec tcpdump sur Linux machines.

Vous devez examiner les en-têtes MAC (Ethernet) des paquets, et non seulement les adresses IP : le filtre du noyau du serveur de répartition distribue les connexions en réécrivant l’adresse MAC de destination des paquets pour qu’elle corresponde à celle du nœud de traitement. L’adresse IP de destination reste l’adresse IP virtuelle (VIP) tout au long du chemin.

0 Ce que vous devez observer pour le même paquet SYN : 1

0 Étape 1 Où capturer 2 Adresses MAC observées 3
|---|---|---|
0 1. Le client envoie à l'adresse IP virtuelle (VIP) 1 Client 2 Adresse MAC du client → Adresse MAC du 3 Serveur de répartition 4 5
0 2. Le serveur de répartition transfère la connexion 1 Serveur de répartition 2 Adresse MAC de répartition → Adresse MAC du 3 Nœud de traitement 4 5
0 3. Le nœud de traitement reçoit 1 nœud de traitement 2 MAC de répartition → MAC du nœud 3
0 4. Le nœud répond directement au client 1 Nœud de traitement 2 Adresse MAC du nœud → Adresse MAC du client 3
0 5. Le client reçoit la réponse 1 client 2 Adresse MAC du nœud → adresse MAC du client 3

> Si le poste de travail client se trouve dans un sous-réseau différent du <span class="notranslate farm-term" translate="no">Farm</span>, l'« adresse MAC du client » vue sur les nœuds <span class="notranslate farm-term" translate="no">Farm</span> est l'adresse MAC de la passerelle **7 (routeur) reliant les deux sous-réseaux, et non celle du poste de travail client.

Répétez la capture après avoir arrêté le serveur de répartition (test 2, étape 4) : l'étape 1 doit maintenant afficher l'adresse MAC du serveur de répartition **new**.

## 7. Quels postes de travail tester ?

Le comportement dépend du chemin réseau entre le client et le <span class="notranslate farm-term" translate="no">Farm</span>. Exécutez les tests 1 et 2 à partir de chaque type de client pertinent pour votre architecture :

0 Emplacement du client 1 Ce que le test vérifie 2
|---|---|
0 Client dans le même sous-réseau que le 3 4 5 6 Mise à jour des tables ARP des clients par GARP (test 3 possible) 7
0 Client dans un sous-réseau différent 2 (routeur, passerelle, réseau virtuel d'hyperviseur) 3 Gestion GARP par le routeur ou la passerelle 4
0 VM cliente 1 sur un hyperviseur qui héberge également une VM 2 3 4 5 6 Comportement du commutateur virtuel de l'hyperviseur, qui gère également la commutation et le routage internes 7

## 8. Résumé des résultats attendus

0 Test 1 Action 2 Résultat attendu 3
|---|---|---|
0 1 1 Tous les nœuds sont en haut, mosaïque 2 Tous les nœuds apparaissent 3
0 2.2 1 Un seul nœud a démarré 2 Seul ce nœud apparaît 3
0 2.3 1 Tous les nœuds ont démarré 2 Tous les nœuds apparaissent 3
0 2.4 1 Le serveur de répartition s'est arrêté 2 Les nœuds restants apparaissent, sans interruption durable 3
0 3 1 2 avant et après l'arrêt 3 L'adresse MAC associée à l'adresse IP virtuelle (VIP) change 4
0 4 1 Capture Wireshark ou tcpdump avant et après l'arrêt 2 Le client envoie à l'adresse MAC du nouveau serveur de répartition 3

## 9. Dépannage

- 0 Le réseau Mosaic ne répond plus après l'arrêt du serveur de distribution : 1 GARP n'est pas pris en compte par un périphérique du chemin (routeur, passerelle, commutateur virtuel). Vérifiez la gestion de GARP avec votre équipe réseau.
- **Envoi périodique de GARP : ** l’attribut `arpreroute="on"` de la section `<vip>` (avec `arpinterval` et `arpelapse`) envoie régulièrement des GARP sur les VIP. Voir le Guide de l’utilisateur, section 13.6.4 « [`<vip>` syntaxe](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ».
- 0 Diagnostic de l'adresse IP virtuelle (VIP) ↔ Résolution MAC : 1 Voir le Guide de l'utilisateur, section 7.24 « 2 Dépannage de l'adresse IP virtuelle (VIP) ↔ Résolution MAC 3 », et section 7.15 « 4 5 6 7 Module UP (Prêt) mais problème d'équilibrage de charge dans un 8 9 10 11 ».

## Démonstration de la solution SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

Pour le basculement principal/de secours avec une adresse IP virtuelle, voir [Test de l’adresse IP virtuelle d’un SafeKit mirror cluster](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-fr  %}}

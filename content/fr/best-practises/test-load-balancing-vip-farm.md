---
title: "Test de l'adresse IP virtuelle d'équilibrage de charge dans un SafeKit farm grappe"
canonical: "https://safekit.eviden.com/fr/best-practises/test-load-balancing-vip-farm/"
description: "Apprenez comment tester SafeKit Équilibrage de charge entre les nœuds du cluster et vérification du basculement d'adresse IP virtuelle, du réacheminement GARP et du comportement du réseau."
category: "meilleures pratiques"
lang: "fr"
topics: "Principes clés, Prérequis : le SafeKit mosaïque, Test 1 – Distribution des connexions, Test 2 – Changement de serveur de répartition, Test 3 – Vérification du reroutage GARP avec arp -a, Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux), Postes de travail à tester, Résumé des résultats attendus, Dépannage"
---

# Test de l'adresse IP virtuelle d'équilibrage de charge dans un SafeKit <span class="notranslate farm-term" translate="no">farm</span> grappe

Ce guide explique comment vérifier qu'un SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> le module (équilibrage de charge sur une adresse IP virtuelle) fonctionne correctement sur votre réseau : distribution des connexions entre les nœuds et réacheminement de l'adresse IP virtuelle (VIP) lorsque le nœud de répartition s'arrête.

## 1. Principes clés

**Condition préalable:** tous les nœuds de <span class="notranslate farm-term" translate="no">Farm</span> doivent se trouver dans le même sous-réseau IP de couche 2 : un LAN ou un VLAN étendu entre des sites distants.

- L'adresse IP virtuelle (VIP) est configurée localement sur chaque nœud du réseau. <span class="notranslate farm-term" translate="no">Farm</span>: il est défini comme un alias de l'adresse IP physique, sur la carte réseau de cette adresse, lorsque le <span class="notranslate farm-term" translate="no">Farm</span> est démarré sur le nœud.
- Un seul nœud, le **serveur de répartition**, reçoit le trafic réseau pour l'adresse IP virtuelle (VIP) (`vmac_directed` configuration, la SafeKit par défaut) : son adresse MAC est celle associée à l'adresse IP virtuelle (VIP) dans les tables ARP (routeur, passerelle, clients dans le même sous-réseau).
- Le filtre noyau de ce nœud répartit ensuite les connexions TCP entre les nœuds du <span class="notranslate farm-term" translate="no">Farm</span>, par **réécriture de l'adresse MAC de destination** Les paquets sont acheminés vers le nœud de traitement (l'adresse IP de destination reste l'adresse IP virtuelle (VIP)). Les réponses sont envoyées directement du nœud qui traite la connexion au client.
- La distribution effectuée par le filtre est **déterministe**: le nœud de traitement est calculé à partir de l'identité du client, conformément à la règle d'équilibrage de charge configurée :
  - sur le **Adresse IP du client** (`filter="on_addr"`): un client donné est toujours servi par le même nœud, ce qui garantit l'affinité de session ;
  - sur le **port TCP client** (`filter="on_port"`Chaque connexion TCP provenant d'un même client peut être gérée par un nœud différent. C'est la règle utilisée pour la mosaïque (section 2), qui représente donc tous les nœuds d'un seul poste de travail.
- Si le serveur de répartition s'arrête, un autre nœud prend le relais et envoie les données. **GARPs** (ARP gratuit) afin que le réseau associe l'adresse IP virtuelle (VIP) à sa propre adresse MAC.

Ce que vous devez donc tester :

1. que les connexions sont correctement réparties sur tous les nœuds ;
2. que le réseau (routeur, passerelle, virtualisation) prenne en compte le GARP lorsque le serveur de répartition change.

## 2. Prérequis : le SafeKit mosaïque

La mosaïque est une page de test fournie par SafeKitIl ouvre de nombreuses connexions TCP vers l'adresse IP virtuelle (VIP) et affiche, pour chacune d'elles, le nom du nœud ayant répondu. Cela permet de visualiser la distribution en un coup d'œil.

1. Dans le `userconfig.xml` de la <span class="notranslate farm-term" translate="no">Farm</span> module, dans le `<vip>` Dans cette section, ajoutez la règle d'équilibrage de charge sur le port du SafeKit serveur web. Exemple avec le SafeKit Serveur web en HTTP sur le port 9010 :

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Si le SafeKit Le serveur web et la console sont passés au HTTPS, remplacez 9010 par 9453.

2. Appliquez la configuration à tous les nœuds.
3. Depuis un navigateur sur un poste de travail client **à l'extérieur de <span class="notranslate farm-term" translate="no">Farm</span>**, se connecter à :

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   puis entrez dans <span class="notranslate farm-term" translate="no">Farm</span> **nom du module** et exécutez le test. Chaque cellule de la mosaïque affiche le nom du nœud qui a répondu à la connexion TCP, et une couleur est associée à chaque nœud pour indiquer clairement les blocs de la mosaïque desservis par ce même nœud.

   En HTTPS, utilisez `https://<VIP>:9453/safekit/mosaic.html`, avec la règle d'équilibrage de charge sur le port 9453.

Le test est décrit en détail dans le SafeKit 8.2 Guide de l'utilisateur, section 4.3.5 «[Tester l'équilibrage de charge TCP sur une adresse IP virtuelle](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. Test 1 – Distribution des connexions

**Mesures**

1. Commencez le <span class="notranslate farm-term" translate="no">Farm</span> sur tous les nœuds (état UP).
2. Ouvrez la mosaïque depuis un poste de travail client.

**Résultat attendu :** la mosaïque affiche les noms de **tous les nœuds** de la <span class="notranslate farm-term" translate="no">Farm</span>, chaque nœud de traitement ayant une couleur différente.

Cela prouve que le routeur ou la passerelle en amont atteint l'un des nœuds via son adresse MAC, et que ce nœud distribue correctement les connexions.

## 4. Test 2 – Changement de serveur de répartition

Ce test vérifie que le <span class="notranslate farm-term" translate="no">Farm</span> continue de répondre même lorsque le serveur de répartition s'arrête.

**Mesures**

1. Arrêtez le <span class="notranslate farm-term" translate="no">Farm</span>, c'est-à-dire tous les nœuds dans SafeKit.
2. Commencer **un seul nœud**Ce nœud devient le serveur de répartition.
   → **Résultat attendu :** La mosaïque n'affiche que ce nœud.
3. Démarrez les autres nœuds.
   → **Résultat attendu :** La mosaïque affiche tous les nœuds.
4. Arrêtez le **premier nœud**, celui qui fait office de serveur de répartition.
   → **Résultat attendu :** La mosaïque affiche les nœuds restants.

> **Limites de ce test :** Un résultat correct à l'étape 4 ne prouve pas que GARP fonctionne. Lorsque le <span class="notranslate farm-term" translate="no">Farm</span> Le module est lancé sur les autres nœuds (étape 3), l'adresse IP virtuelle est configurée sur ces nœuds, ce qui génère des messages sur le réseau susceptibles de modifier l'association adresse IP virtuelle/adresse MAC. Seuls les tests 3 et 4 testent réellement GARP.

> Arrêter tout autre nœud du <span class="notranslate farm-term" translate="no">Farm</span> (celui qui n'est pas le serveur de répartition) teste uniquement la reconfiguration de la distribution.

## 5. Test 3 – Vérification du réacheminement GARP avec `arp -a`

Associé au test 4, ce test vérifie réellement GARP : vous notez l’adresse MAC du serveur de répartition avant de l’arrêter, puis vous vérifiez que l’adresse IP virtuelle (VIP)/MAC L'association a changé par la suite.

Ce test n'est possible que si le poste de travail client affichant la mosaïque se trouve dans le **même sous-réseau IP** comme le <span class="notranslate farm-term" translate="no">Farm</span>.

S'il existe un routeur entre le client et le <span class="notranslate farm-term" translate="no">Farm</span>La table ARP du client ne contient pas l'adresse IP virtuelle (VIP), mais l'adresse de la passerelle utilisée pour atteindre le serveur. <span class="notranslate farm-term" translate="no">Farm</span>Le réseau de [nom de l'entreprise]. Dans ce cas, vérifiez la table ARP du routeur ou de la passerelle avec l'équipe réseau.

**Mesures**

1. Commencez le <span class="notranslate farm-term" translate="no">Farm</span> sur tous les nœuds.
2. Sur le poste de travail client, exécutez `arp -a` Notez l'adresse MAC associée à l'adresse IP virtuelle (VIP). Elle identifie le serveur de répartition.
3. Arrêtez le <span class="notranslate farm-term" translate="no">Farm</span> nœud possédant cette adresse MAC.
4. Vérifiez que la mosaïque fonctionne toujours avec les nœuds restants.
5. Courir `arp -a` à nouveau pour lire le nouveau Virtual IP (VIP)/MAC association et identification du nouveau serveur de répartition.

## 6. Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux)

Vous pouvez suivre une connexion TCP vers l'adresse IP virtuelle (VIP) en capturant les paquets sur le client et sur le routeur. <span class="notranslate farm-term" translate="no">Farm</span> nœuds : avec Wireshark activé Windows machines, et avec tcpdump sur Linux machines.

Vous devez regarder le **En-têtes MAC (Ethernet) des paquets**, et pas seulement les adresses IP : le filtre noyau du serveur de répartition distribue les connexions par **réécriture de l'adresse MAC de destination** des paquets à celui du nœud de traitement. L'adresse IP de destination reste l'adresse IP virtuelle (VIP) tout au long du chemin.

**Voici ce que vous devez observer pour le même paquet SYN :**

| Étape | Où prendre des photos | Adresses MAC observées |
|---|---|---|
| 1. Le client envoie à l'adresse IP virtuelle (VIP) | client | Adresse MAC du client → Adresse MAC du **serveur de répartition** |
| 2. Le serveur de répartition transfère la connexion | serveur de répartition | Dispatching MAC → MAC du **nœud de traitement** |
| 3. Le nœud de traitement reçoit | nœud de traitement | Envoi du MAC → MAC du nœud |
| 4. Le nœud répond directement au client | nœud de traitement | Adresse MAC du nœud → adresse MAC du client |
| 5. Le client reçoit la réponse | client | Adresse MAC du nœud → adresse MAC du client |

> Si le poste de travail client se trouve dans un sous-réseau différent de celui du <span class="notranslate farm-term" translate="no">Farm</span>, le « MAC client » visible sur le <span class="notranslate farm-term" translate="no">Farm</span> L'adresse MAC du nœud est celle du nœud **porte** (routeur) reliant les deux sous-réseaux, et non celui du poste de travail client.

Répétez la capture après avoir arrêté le serveur de répartition (test 2, étape 4) : l’étape 1 doit maintenant afficher l’adresse MAC du **nouveau** serveur de répartition.

## 7. Quels postes de travail tester ?

Le comportement dépend du chemin réseau entre le client et le <span class="notranslate farm-term" translate="no">Farm</span>Exécutez les tests 1 et 2 pour chaque type de client pertinent pour votre architecture :

| Lieu du client | Ce que vérifie le test |
|---|---|
| Client dans le **même sous-réseau** comme le <span class="notranslate farm-term" translate="no">Farm</span> | Mise à jour des tables ARP des clients par GARP (test 3 possible) |
| Client dans un **sous-réseau différent** (routeur, passerelle, hyperviseur, réseau virtuel) | Gestion GARP par le routeur ou la passerelle |
| Machine virtuelle cliente **sur un hyperviseur qui héberge également un <span class="notranslate farm-term" translate="no">Farm</span> VM** | Comportement du commutateur virtuel de l'hyperviseur, qui gère également la commutation et le routage internes. |

## 8. Résumé des résultats attendus

| Test | Action | Résultat attendu |
|---|---|---|
| 1 | Tous les nœuds sont opérationnels, mosaïque | Tous les nœuds apparaissent |
| 2.2 | Un seul nœud a démarré | Seul ce nœud apparaît |
| 2.3 | Tous les nœuds ont démarré | Tous les nœuds apparaissent |
| 2.4 | Le serveur de répartition s'est arrêté | Les nœuds restants apparaissent, sans interruption durable. |
| 3 | `arp -a` avant et après l'arrêt | L'adresse MAC associée à l'adresse IP virtuelle (VIP) change |
| 4 | Capture Wireshark ou tcpdump avant et après l'arrêt | Le client envoie un message à l'adresse MAC du nouveau serveur de répartition. |

## 9. Dépannage

- **Le système Mosaic ne répond plus après l'arrêt du serveur de distribution :** Le protocole GARP n'est pas pris en compte par un équipement du chemin (routeur, passerelle, commutateur virtuel). Veuillez vérifier la gestion du protocole GARP auprès de votre équipe réseau.
- **Envoi périodique de GARP :** le `arpreroute="on"` attribut de l' `<vip>` section (avec `arpinterval` et `arpelapse`) envoie régulièrement des GARP sur les VIP. Voir le Guide de l'utilisateur, section 13.6.4[`<vip>` syntaxe](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnostic des adresses IP virtuelles (VIP) ↔ Résolution MAC :** voir le Guide de l'utilisateur, section 7.24[Dépannage des adresses IP virtuelles (VIP) ↔ Résolution MAC](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", et la section 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> module UP (prêt) mais problème d'équilibrage de charge dans un <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Démonstration de la SafeKit <span class="notranslate farm-term" translate="no">farm</span> solution {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-en  %}}

Pour le basculement principal/de secours avec une adresse IP virtuelle, voir [Tester l'adresse IP virtuelle d'un SafeKit mirror grappe](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-en  %}}

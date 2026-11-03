---
title: "Tester l'adresse IP virtuelle d'un cluster SafeKit mirror"
canonical: "https://safekit.eviden.com/fr/best-practises/test-primary-backup-vip-mirror/"
description: "Testez la disponibilité et le basculement de l'adresse IP virtuelle d'un cluster SafeKit mirror : reroutage GARP, vérifications ARP et captures de paquets."
category: "best-practises"
lang: "fr"
topics: "Principes clés, Prérequis : configuration de l'adresse IP virtuelle (VIP), Test 1 – Adresse IP virtuelle (VIP) portée par le serveur primaire, Test 2 – Basculement manuel (arrêt du primaire), Test 3 – Vérification du reroutage GARP avec arp -a, Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux), Depuis quels postes de travail effectuer les tests, Résumé des résultats attendus, Dépannage"
---

# Tester l'adresse IP virtuelle d'un cluster SafeKit mirror sur votre réseau

Ce guide explique comment vérifier que l'adresse IP virtuelle (VIP) d'un cluster SafeKit mirror (module mirror) fonctionne correctement sur votre réseau : l'adresse IP virtuelle (VIP) est portée par le serveur primaire et reroutée vers le nouveau serveur primaire après un basculement.

## 1. Principes clés

**Prérequis :** les deux nœuds du cluster mirror doivent se trouver dans le même sous-réseau IP de couche 2 : un LAN ou un VLAN étendu entre des sites distants.

- L'adresse IP virtuelle (VIP) est active uniquement sur le **serveur primaire** (états PRIM ou ALONE) : elle est ajoutée comme alias de l'adresse IP physique, sur la carte réseau de cette adresse, lorsque le module démarre en primaire sur le nœud (configuration `where="one_side_alias"`).
- L'adresse MAC du serveur primaire est donc associée à l'adresse IP virtuelle (VIP) dans les tables ARP (routeur, passerelle, clients du même sous-réseau). Tout le trafic destiné à l'adresse IP virtuelle (VIP) est envoyé au primaire.
- Lors d'un basculement (arrêt ou panne du primaire), l'adresse IP virtuelle (VIP) est supprimée de l'ancien primaire et ajoutée comme alias sur le nouveau primaire. Deux mécanismes permettent ensuite au réseau d'associer l'adresse IP virtuelle (VIP) à l'adresse MAC du nouveau primaire :
  - les messages réseau envoyés par le système d'exploitation lorsque l'adresse IP virtuelle (VIP) est ajoutée comme alias sur la carte réseau ;
  - les **GARPs** (annonces ARP spontanées, ou « gratuitous ARP ») envoyés par SafeKit lorsque l'attribut `arpreroute="on"` est configuré dans la section `<vip>`.

Vous devez donc vérifier :

1. que l'adresse IP virtuelle (VIP) est portée par le serveur primaire et accessible depuis les clients ;
2. que l'association entre l'adresse IP virtuelle (VIP) et l'adresse MAC est mise à jour dans le réseau (routeur, passerelle, virtualisation) pour pointer vers le nouveau primaire lors du changement de serveur primaire.

## 2. Prérequis : configuration de l'adresse IP virtuelle (VIP)

1. Dans le fichier `userconfig.xml` du module mirror, configurez l'adresse IP virtuelle (VIP) dans la section `<vip>`. L'attribut `arpreroute="on"` permet au nouveau primaire d'envoyer des GARPs après un basculement :

   ```xml
   <vip>
     <interface_list>
       <interface arpreroute="on">
         <real_interface>
           <virtual_addr addr="<VIP>" where="one_side_alias"/>
         </real_interface>
       </interface>
     </interface_list>
   </vip>
   ```

2. Appliquez la configuration sur les deux nœuds.
3. Démarrez le module : un nœud doit être **PRIM (Ready)** et l'autre **SECOND (Ready)**.

## 3. Test 1 – Adresse IP virtuelle (VIP) portée par le serveur primaire

**Étapes**

1. Sur le serveur primaire, exécutez `ipconfig` (Windows) ou `ip addr show` (Linux).
   → **Résultat attendu :** l'adresse IP virtuelle (VIP) apparaît comme alias sur la carte réseau de l'adresse IP physique.
2. Sur le serveur secondaire, exécutez la même commande.
   → **Résultat attendu :** l'adresse IP virtuelle (VIP) n'apparaît pas.
3. Depuis un poste client **externe au cluster**, exécutez `ping` sur les deux adresses IP physiques et sur l'adresse IP virtuelle (VIP).
   → **Résultat attendu :** les trois commandes `ping` répondent (sauf si elles sont filtrées par des pare-feu).
4. Vérifiez l'accès via l'adresse IP virtuelle (VIP) avec la mosaïque SafeKit : depuis un navigateur sur le client **externe**, connectez-vous à `http://<VIP>:9010/safekit/mosaic.html` (ou utilisez le port 9453 si le serveur web et la console SafeKit sont passés en HTTPS), puis saisissez le **nom du module** mirror et lancez le test.
   → **Résultat attendu :** toutes les cellules de la mosaïque affichent le nom du **serveur primaire**, dans une seule couleur : toutes les connexions TCP à l'adresse IP virtuelle (VIP) sont traitées par le primaire.

![Test de l'adresse IP virtuelle d'un cluster SafeKit mirror avec la mosaïque](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Basculement manuel (arrêt du primaire)

Ce test vérifie que l'adresse IP virtuelle (VIP) suit le serveur primaire lors d'un basculement déclenché par l'arrêt du module sur le primaire.

**Étapes**

1. Arrêtez le module sur le primaire (nœud 1) depuis la console SafeKit, ou en ligne de commande avec `safekit stop -m <module>`.
   → **Résultat attendu :** le nœud 1 passe à STOP (NotReady) et le nœud 2 à ALONE (Ready). Le message `Virtual IP <VIP> set` apparaît dans le journal du nouveau primaire.
2. Sur le nouveau primaire, exécutez `ipconfig` ou `ip addr show`.
   → **Résultat attendu :** l'adresse IP virtuelle (VIP) apparaît maintenant comme alias sur ce nœud, et non plus sur l'ancien primaire.
3. Depuis le poste client, répétez les trois commandes `ping` et relancez la mosaïque sur l'adresse IP virtuelle (VIP).
   → **Résultat attendu :** tout répond et toutes les cellules de la mosaïque affichent désormais le nom du **nouveau primaire**, dans une seule couleur.
4. Redémarrez le module sur le nœud 1 : il se resynchronise et passe à SECOND (Ready), tandis que le nœud 2 passe à PRIM (Ready).

## 5. Test 3 – Vérification du reroutage MAC avec `arp -a`

Relevez l'adresse MAC associée à l'adresse IP virtuelle (VIP) avant le basculement, puis vérifiez qu'elle a changé après le basculement.

Ce test n'est possible que si le poste de travail client se trouve dans le **même sous-réseau IP** que le cluster.

Si un routeur se trouve entre le client et le cluster, la table ARP du client ne contient pas l'adresse IP virtuelle (VIP), mais l'adresse de la passerelle utilisée pour atteindre le réseau du cluster. Dans ce cas, vérifiez la table ARP du routeur ou de la passerelle avec l'équipe réseau.

**Étapes**

1. Le module est PRIM (Ready) sur le nœud 1 et SECOND (Ready) sur le nœud 2.
2. Sur le poste client, exécutez `ping` sur les deux adresses IP physiques et sur l'adresse IP virtuelle (VIP), puis exécutez `arp -a`.
   → **Résultat attendu :** l'adresse IP virtuelle (VIP) est associée à la **même adresse MAC que l'adresse IP physique du primaire**.
3. Arrêtez le module sur le primaire (nœud 1) avec `stop`.
4. Exécutez de nouveau `ping` sur l'adresse IP virtuelle (VIP), puis `arp -a`.
   → **Résultat attendu :** l'adresse IP virtuelle (VIP) est maintenant associée à la **même adresse MAC que l'adresse IP physique du nouveau primaire**.

> Exécutez de nouveau `ping` sur l'adresse IP virtuelle (VIP) avant de lire la table ARP : l'entrée peut être marquée comme obsolète et actualisée uniquement après un `ping`.

Exemple de table ARP attendue, avant et après l'arrêt du primaire :

| Adresse | MAC avant l'arrêt | MAC après l'arrêt |
|---|---|---|
| IP physique du nœud 1 | MAC du nœud 1 | MAC du nœud 1 |
| IP physique du nœud 2 | MAC du nœud 2 | MAC du nœud 2 |
| Adresse IP virtuelle (VIP) | **MAC du nœud 1** | **MAC du nœud 2** |

## 6. Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux)

Vous pouvez suivre une connexion TCP vers l'adresse IP virtuelle (VIP) en capturant les paquets sur le client et sur les deux nœuds : avec Wireshark sous Windows et avec tcpdump sous Linux.

Vous devez examiner les **en-têtes MAC (Ethernet) des paquets** : l'adresse IP de destination reste l'adresse IP virtuelle (VIP), et c'est l'adresse MAC de destination qui indique quel nœud reçoit le trafic.

**Ce que vous devez observer :**

| Quand | Où capturer les paquets | Adresses MAC observées |
|---|---|---|
| Avant le basculement | client | MAC du client → MAC du **nœud 1 (primaire)** |
| Avant le basculement | nœud 1 | Les paquets destinés à l'adresse IP virtuelle (VIP) sont reçus ; le nœud 2 ne reçoit rien |
| Pendant le basculement | réseau | Messages de reroutage MAC envoyés par le nœud 2 pour l'adresse IP virtuelle (VIP) : messages envoyés par le système d'exploitation lors de son ajout comme alias, et GARPs envoyés par SafeKit (`arpreroute="on"`) |
| Après le basculement | client | MAC du client → MAC du **nœud 2 (nouveau primaire)** |

> Si le poste client appartient à un sous-réseau différent de celui du cluster, la « MAC du client » observée sur les nœuds est l'adresse MAC de la **passerelle** (routeur) reliant les deux sous-réseaux, et non celle du poste client.

## 7. Depuis quels postes de travail effectuer les tests

Le comportement dépend du chemin réseau entre le client et le cluster. Exécutez les tests 1 et 2 depuis chaque type de client pertinent pour votre architecture :

| Emplacement du client | Ce que le test vérifie |
|---|---|
| Client situé dans le **même sous-réseau** que le cluster | Mise à jour des tables ARP des clients (test 3 possible) |
| Client situé dans un **sous-réseau différent** (routeur, passerelle, réseau virtuel d'hyperviseur) | Mise à jour des tables ARP des clients dans le routeur ou la passerelle |
| Machine virtuelle cliente **sur un hyperviseur qui héberge également une machine virtuelle du cluster mirror** | Comportement du commutateur virtuel de l'hyperviseur, qui gère également la commutation et le routage internes. |

## 8. Résumé des résultats attendus

| Test | Action | Résultat attendu |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` et mosaïque | Adresse IP virtuelle (VIP) comme alias sur le primaire uniquement ; les trois commandes `ping` répondent, sauf filtrage par les pare-feu ; la mosaïque affiche uniquement le primaire |
| 2 | Arrêt du primaire | Adresse IP virtuelle (VIP) comme alias sur le nouveau primaire ; message `Virtual IP <VIP> set` ; la mosaïque affiche uniquement le nouveau primaire |
| 3 | `arp -a` avant et après l'arrêt du primaire | L'adresse IP virtuelle (VIP) passe de l'adresse MAC du nœud 1 à celle du nœud 2 |
| 4 | Capture Wireshark ou tcpdump avant et après le basculement | Le client envoie vers l'adresse MAC du nouveau primaire |

## 9. Dépannage

- **L'adresse IP virtuelle (VIP) ne répond plus après le basculement :** un équipement sur le trajet (routeur, passerelle, commutateur virtuel) ne prend pas en compte les messages de reroutage MAC et continue d'envoyer le trafic à l'adresse MAC de l'ancien primaire. Vérifiez la prise en compte de ces messages avec l'équipe réseau.
- **Envoi de GARPs :** l'attribut `arpreroute="on"` de la section `<vip>` (avec `arpinterval` et `arpelapse`) envoie régulièrement des GARPs sur l'adresse IP virtuelle (VIP) après le basculement. Consultez le guide utilisateur, section 13.6.4 « [Syntaxe de `<vip>`](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ».
- **Diagnostic de la résolution adresse IP virtuelle (VIP) ↔ MAC :** consultez le guide utilisateur, section 7.24 « [Dépannage de la résolution adresse IP virtuelle (VIP) ↔ MAC](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) », et section 7.16 « [Problème d'adresse IP virtuelle après basculement](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Problem_with_the_1) ».

Pour l'équilibrage de charge avec une adresse IP virtuelle, consultez [Tester l'adresse IP virtuelle d'équilibrage de charge d'un cluster SafeKit Farm](/fr/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-fr  %}}

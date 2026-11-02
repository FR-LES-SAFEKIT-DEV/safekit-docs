---
title: "Test de l'adresse IP virtuelle d'un cluster miroir SafeKit"
canonical: "https://safekit.eviden.com/fr/best-practises/test-primary-backup-vip-mirror/"
description: "Tester la disponibilité et le basculement des adresses IP virtuelles dans un cluster miroir SafeKit, y compris le réacheminement GARP, les vérifications ARP et les captures de paquets."
category: "best-practises"
lang: "fr"
topics: "Principes clés, Prérequis : Configuration VIP, Test 1 – VIP hébergée par le serveur principal, Test 2 – Basculement manuel (arrêt du serveur principal), Test 3 – Vérification du reroutage GARP avec arp -a, Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux), Postes de travail à tester, Résumé des résultats attendus, Dépannage"
---

# Tester l'adresse IP virtuelle d'un cluster miroir SafeKit sur votre réseau

Ce guide décrit comment vérifier que l'adresse IP virtuelle (VIP) d'un cluster miroir SafeKit (module miroir) fonctionne correctement sur votre réseau : la VIP est détenue par le serveur principal et est redirigée vers le nouveau serveur principal après un basculement.

## 1. Principes clés

**Prérequis :** les deux nœuds du cluster miroir doivent se trouver dans le même sous-réseau IP de couche 2 : un LAN ou un VLAN étendu entre des sites distants.

- Le VIP est actif uniquement sur le **serveur principal** (états PRIM ou ALONE) : il est défini comme un alias de l'adresse IP physique, sur la carte réseau de cette adresse, lorsque le module démarre en tant que principal sur le nœud (configuration `where="one_side_alias"` ).
- L'adresse MAC du serveur principal est donc celle associée à l'adresse IP virtuelle (VIP) dans les tables ARP (routeur, passerelle, clients du même sous-réseau). Tout le trafic destiné à l'adresse IP virtuelle est acheminé vers le serveur principal.
- Lors d'un basculement (arrêt ou panne du serveur principal), l'adresse IP virtuelle (VIP) est supprimée de l'ancien serveur principal et définie comme alias sur le nouveau serveur principal. Deux mécanismes permettent alors au réseau d'associer la VIP à l'adresse MAC du nouveau serveur principal :
  - les messages réseau envoyés par le système d'exploitation lorsque VIP est ajouté comme alias sur la carte réseau ;
  - les **GARP** (ARP gratuits) envoyés par SafeKit, lorsque l'attribut `arpreroute="on"` est configuré dans la section `<vip>` .

Ce que vous devez donc tester :

1. ce VIP est détenu par le serveur principal et accessible depuis les clients ;
2. que l'adresse MAC associée au VIP est redirigée vers le nouveau serveur principal du réseau (routeur, passerelle, virtualisation) lorsque le serveur principal change.

## 2. Prérequis : configuration VIP

1. Dans le `userconfig.xml` du module miroir, configurez l'adresse IP virtuelle (VIP) dans la section `<vip>` . L'attribut `arpreroute="on"` permet au nouveau serveur principal d'envoyer des requêtes GARP après un basculement.

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
3. Démarrez le module : un nœud doit être **PRIM (Prêt)** et l'autre **SECOND (Prêt)** .

## 3. Test 1 – VIP détenu par le serveur principal

**Mesures**

1. Sur le serveur principal, exécutez `ipconfig` (Windows) ou `ip addr show` (Linux).
   → **Résultat attendu :** VIP apparaît comme un alias sur la carte réseau de l’adresse IP physique.
2. Sur le serveur secondaire, exécutez la même commande.
   → **Résultat attendu :** le VIP n'apparaît pas.
3. Depuis un poste de travail client **situé en dehors du cluster** , `ping` à la fois sur les adresses IP physiques et sur l'adresse IP virtuelle.
   → **Résultat attendu :** les trois commandes `ping` répondent (sauf si elles sont filtrées par des pare-feu).
4. Vérifiez l'accès via VIP avec le diagramme SafeKit : depuis un navigateur sur le client **externe** , connectez-vous à `http://<VIP>:9010/safekit/mosaic.html` , puis entrez le **nom du module** miroir et exécutez le test.
   → **Résultat attendu :** toutes les cellules de la mosaïque affichent le nom du **serveur principal** , dans une seule couleur : toutes les connexions TCP vers le VIP sont gérées par le serveur principal.

## 4. Test 2 – Basculement manuel (arrêt du système principal)

Ce test vérifie que le VIP suit le serveur principal lors d'un basculement, déclenché par l'arrêt du module sur le serveur principal.

**Mesures**

1. Arrêtez le module sur le nœud principal (nœud 1) depuis la console SafeKit (ou depuis la ligne de commande avec `safekit stop -m <module>` ).
   → **Résultat attendu :** le nœud 1 passe à l’état STOP (Non prêt) et le nœud 2 à l’état ALONE (Prêt). Dans le journal du nouveau nœud primaire, le message `Virtual IP <VIP> set` apparaît.
2. Sur le nouveau serveur principal, exécutez `ipconfig` ou `ip addr show` .
   → **Résultat attendu :** VIP apparaît désormais comme un alias sur ce nœud, et non plus sur l’ancien nœud principal.
3. Depuis le poste de travail client, répétez les trois commandes `ping` et exécutez à nouveau le mosaic sur le VIP.
   → **Résultat attendu :** tout réagit et toutes les cellules de la mosaïque affichent désormais le nom de la **nouvelle primaire** , dans une seule couleur.
4. Redémarrez le module sur le nœud 1 : il se resynchronise et passe à SECOND (Prêt), tandis que le nœud 2 passe à PRIM (Prêt).

## 5. Test 3 – Vérification du réacheminement MAC avec `arp -a`

Vous notez l'adresse MAC associée au VIP avant le basculement, puis vous vérifiez qu'elle a changé par la suite.

Ce test n'est possible que si le poste de travail client se trouve dans le **même sous-réseau IP** que le cluster.

Si un routeur est présent entre le client et le cluster, la table ARP du client ne contient pas l'adresse IP virtuelle (VIP), mais l'adresse de la passerelle utilisée pour accéder au réseau du cluster. Dans ce cas, le réacheminement MAC doit être vérifié dans la table ARP du routeur ou de la passerelle, en collaboration avec l'équipe réseau.

**Mesures**

1. Le module est PRIM (Prêt) sur le nœud 1 et SECOND (Prêt) sur le nœud 2.
2. Sur le poste de travail client, `ping` sur les deux adresses IP physiques et l'adresse IP virtuelle, puis exécutez `arp -a` .
   → **Résultat attendu :** le VIP est associé à la **même adresse MAC que l'adresse IP physique du serveur principal** .
3. `stop` le module sur le nœud principal (nœud 1).
4. `ping` à nouveau le VIP, puis exécutez à nouveau `arp -a` .
   → **Résultat attendu :** le VIP est maintenant associé à la **même adresse MAC que l'adresse IP physique du nouveau serveur principal** .

> Effectuez un nouveau `ping` VIP avant de lire la table ARP : l’entrée peut être marquée comme obsolète et ne sera actualisée qu’après un `ping` .

Exemple de la table ARP attendue, avant et après l'arrêt du serveur principal :

| Adresse | MAC avant le stop | MAC après le stop |
|---|---|---|
| Adresse IP physique du nœud 1 | Adresse MAC du nœud 1 | Adresse MAC du nœud 1 |
| Adresse IP physique du nœud 2 | Adresse MAC du nœud 2 | Adresse MAC du nœud 2 |
| VIP | **Nœud 1 MAC** | **Nœud 2 MAC** |

## 6. Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux)

Vous pouvez suivre une connexion TCP vers une adresse IP virtuelle en capturant des paquets sur le client et sur les deux nœuds : avec Wireshark sur les machines Windows et avec tcpdump sur les machines Linux.

Vous devez examiner les **en-têtes MAC (Ethernet) des paquets** : l’adresse IP de destination reste VIP, et c’est l’adresse MAC de destination qui indique quel nœud reçoit le trafic.

**Ce que vous devez observer :**

| Quand | Où capturer | Adresses MAC observées |
|---|---|---|
| Avant le basculement | client | Adresse MAC du client → Adresse MAC du **nœud 1 (primaire)** |
| Avant le basculement | nœud 1 | Les paquets destinés au VIP sont reçus ; le nœud 2 ne reçoit rien |
| Pendant le basculement | réseau | Messages de réacheminement MAC envoyés par le nœud 2 pour VIP : messages envoyés par le système d'exploitation lorsque VIP est défini comme alias, et GARP envoyés par SafeKit ( `arpreroute="on"` ) |
| Après le basculement | client | Adresse MAC du client → Adresse MAC du **nœud 2 (nouveau nœud principal)** |

> Si le poste de travail client se trouve dans un sous-réseau différent de celui du cluster, l'« adresse MAC du client » affichée sur les nœuds est l'adresse MAC de la **passerelle** (routeur) reliant les deux sous-réseaux, et non celle du poste de travail client.

## 7. Quels postes de travail tester ?

Le comportement dépend du chemin réseau entre le client et le cluster. Exécutez les tests 1 et 2 depuis chaque type de client pertinent pour votre architecture :

| Emplacement du client | Ce que le test vérifie |
|---|---|
| Client dans le **même sous-réseau** que le cluster | Mise à jour des tables ARP des clients (test 3 possible) |
| Client situé dans un **sous-réseau différent** (routeur, passerelle, réseau virtuel d'hyperviseur) | Mise à jour des tables ARP des clients dans le routeur ou la passerelle |
| Machine virtuelle cliente **sur un hyperviseur hébergeant également une machine virtuelle du cluster miroir** | Comportement du commutateur virtuel de l'hyperviseur, qui gère également la commutation et le routage internes |

## 8. Résumé des résultats attendus

| Test | Action | Résultat attendu |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig` , `ping` et mosaic | VIP comme alias sur le serveur principal uniquement ; les 3 commandes `ping` répondent (sauf si filtrées par les pare-feu) ; mosaic affiche uniquement le serveur principal |
| 2 | Arrêt du serveur principal | VIP comme alias sur le nouveau serveur principal ; Message `Virtual IP <VIP> set` ; la mosaïque affiche uniquement le nouveau serveur principal |
| 3 | `arp -a` avant et après l'arrêt du nœud principal | L'adresse IP virtuelle (VIP) passe de l'adresse MAC du nœud 1 à celle du nœud 2 |
| 4 | Capture Wireshark ou tcpdump avant et après le basculement | Le client envoie à l'adresse MAC du nouveau serveur principal |

## 9. Dépannage

- **Le serveur VIP ne répond plus après le basculement :** les messages de réacheminement MAC ne sont pas pris en compte par un périphérique du chemin (routeur, passerelle, commutateur virtuel), qui continue d'envoyer du trafic vers l'adresse MAC de l'ancien serveur principal. Veuillez vérifier la gestion des messages de réacheminement MAC avec votre équipe réseau.
- **Envoi de GARP :** l’attribut `arpreroute="on"` de la section `<vip>` (avec `arpinterval` et `arpelapse` ) envoie régulièrement des GARP sur l’adresse VIP après le basculement. Voir le Guide de l’utilisateur, section 13.6.4 «[ Syntaxe `<vip>`](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ».
- **Diagnostic de la résolution VIP ↔ MAC :** voir le Guide de l'utilisateur, section 7.24 « [Dépannage de la résolution VIP ↔ MAC](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_Issue_with_VIP) » et section 7.16 « [Problème avec l'adresse IP virtuelle après basculement](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_Problem_with_the_1) ».

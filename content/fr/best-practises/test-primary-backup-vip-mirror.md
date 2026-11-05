---
title: "Test de l’adresse IP virtuelle d’un cluster mirror SafeKit"
canonical: "https://safekit.eviden.com/fr/best-practises/test-primary-backup-vip-mirror/"
description: "Testez la disponibilité de l’IP virtuelle et le basculement dans un cluster mirror SafeKit, y compris le réacheminement GARP, les vérifications ARP et les captures de paquets."
category: "best-practises"
lang: "fr"
topics: "Principes clés, Prérequis : configuration de l’IP virtuelle (VIP), Test 1 – IP virtuelle (VIP) détenue par le serveur principal, Test 2 – Basculement manuel (arrêt du serveur principal), Test 3 – Vérification du réacheminement GARP avec arp -a, Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux), Quelles stations de travail tester, Résumé des résultats attendus, Dépannage"
translation: "translate_md 2026-11-05.13 | glossaire 2026-11-05.17 | Translation LLM | 20 expressions"
---

# Test de l’adresse IP virtuelle d’un cluster mirror SafeKit dans votre réseau {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

Ce guide décrit comment vérifier que l’adresse IP virtuelle (VIP) d’un cluster mirror SafeKit (module mirror) fonctionne correctement dans votre réseau : la VIP est détenue par le serveur principal et elle est redirigée vers le nouveau serveur principal après un basculement.

## 1. Principes clés {#1-key-principles}

**Prérequis :** les deux nœuds du cluster mirror doivent se trouver dans le même sous-réseau IP de couche 2 : un LAN ou un VLAN étendu entre des sites distants.

- L’IP virtuelle (VIP) est active uniquement sur le **serveur principal** (états PRIM ou ALONE) : elle est définie comme un alias de l’adresse IP physique, sur la carte réseau de cette adresse, lorsque le module démarre en tant que principal sur le nœud (configuration `where="one_side_alias"`).
- L’adresse MAC du serveur principal est donc celle associée à l’IP virtuelle (VIP) dans les tables ARP (routeur, passerelle, clients dans le même sous-réseau). Tout le trafic vers l’IP virtuelle (VIP) est envoyé au serveur principal.
- Lors d’un basculement (arrêt ou défaillance du primaire), l’IP virtuelle (VIP) est supprimée de l’ancien primaire et définie comme un alias sur le nouveau primaire. Deux mécanismes permettent alors au réseau d’associer l’IP virtuelle (VIP) à l’adresse MAC du nouveau primaire :
  - les messages réseau envoyés par le système d’exploitation lorsque l’adresse IP virtuelle (VIP) est ajoutée en tant qu’alias sur la carte réseau;
  - les **GARPs** (gratuitous ARP) envoyés par SafeKit, lorsque l’attribut `arpreroute="on"` est configuré dans la section `<vip>`.

Ce que vous devez donc tester :

1. l’adresse IP virtuelle (VIP) est détenue par le serveur principal et accessible depuis les clients ;
2. l’adresse MAC associée à l’IP virtuelle (VIP) est redirigée vers le nouveau serveur principal du réseau (routeur, passerelle, virtualisation) lorsque le serveur principal change.

## 2. Prérequis : configuration de l’adresse IP virtuelle (VIP) {#2-prerequisite-virtual-ip-vip-configuration}

1. Dans le `userconfig.xml` du module mirror, configurez l’adresse IP virtuelle (VIP) dans la section `<vip>`. L’attribut `arpreroute="on"` permet au nouveau primaire d’envoyer GARPs après un basculement :

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
3. Démarrez le module : un nœud doit être **PRIM (Ready)** et l’autre **SECOND (Ready)**.

## 3. Test 1 – Adresse IP virtuelle (VIP) détenue par le serveur principal {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**Étapes**

1. Sur le serveur principal, exécutez `ipconfig` (Windows) ou `ip addr show` (Linux).
   → **Résultat attendu :** l’adresse IP virtuelle (VIP) apparaît comme un alias sur la carte réseau de l’adresse IP physique.
2. Sur le serveur secondaire, exécutez la même commande.
   → **Résultat attendu :** l’adresse IP virtuelle (VIP) n’apparaît pas.
3. À partir d’un poste de travail client **situé à l’extérieur du cluster**, `ping` les deux adresses IP physiques et sur l’adresse IP virtuelle (VIP).
   → **Résultat attendu :** les trois commandes `ping` répondent (sauf si elles sont filtrées par des pare-feu).
4. Vérifiez l’accès via l’IP virtuelle (VIP) avec la mosaïque SafeKit : à partir d’un navigateur sur le client **externe**, connectez-vous à `http://<VIP>:9010/safekit/mosaic.html` (ou utilisez le port 9453 si le serveur Web et la console SafeKit ont été basculés vers HTTPS), puis entrez le **nom du module** mirror et exécutez le test.
   → **Résultat attendu :** toutes les cellules de la mosaïque affichent le nom du **serveur principal**, dans une seule couleur : toutes les connexions TCP à l’IP virtuelle (VIP) sont desservies par le serveur principal.

![Testez l’adresse IP virtuelle d’un mirror SafeKit avec la mosaïque](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Basculement manuel (arrêt du serveur principal) {#4-test-2--manual-failover-stop-of-the-primary}

Ce test vérifie que l’adresse IP virtuelle (VIP) suit le serveur principal lors d’un basculement, déclenché par l’arrêt du module sur le serveur principal.

**Étapes**

1. Arrêtez le module sur le primaire (nœud 1) à partir de la console SafeKit (ou à partir de la ligne de commande avec `safekit stop -m <module>`).
   → **Résultat attendu :** le nœud 1 passe à STOP (NotReady) et le nœud 2 passe à ALONE (Ready). Dans le journal du nouveau primaire, le message `Virtual IP <VIP> set` apparaît.
2. Sur la nouvelle interface primaire, exécutez `ipconfig` ou `ip addr show`.
   → **Résultat attendu :** l’adresse IP virtuelle (VIP) apparaît désormais comme un alias sur ce nœud, et non plus sur l’ancien nœud principal.
3. Depuis le poste de travail client, répétez les trois commandes `ping` et exécutez à nouveau la mosaïque sur l’adresse IP virtuelle (VIP).
   → **Résultat attendu :** tout répond, et toutes les cellules de la mosaïque affichent maintenant le nom du **nouveau primaire**, dans une seule couleur.
4. Redémarrez le module sur le nœud 1 : il se resynchronise et passe à SECOND (Ready), tandis que le nœud 2 passe à PRIM (Ready).

## 5. Test 3 – Vérification du réacheminement MAC avec `arp -a` {#5-test-3--checking-mac-rerouting-with-arp--a}

Notez l’adresse MAC associée à l’adresse IP virtuelle (VIP) avant le basculement, puis vérifiez qu’elle a changé après.

Ce test n’est possible que si le poste de travail client se trouve dans le **même sous-réseau IP** que le cluster.

S’il y a un routeur entre le client et le cluster, la table ARP du client ne contient pas l’IP virtuelle (VIP), mais l’adresse de la passerelle utilisée pour atteindre le réseau du cluster. Dans ce cas, vérifiez la table ARP du routeur ou de la passerelle avec l’équipe réseau.

**Étapes**

1. Le module est PRIM (Ready) sur le nœud 1 et SECOND (Ready) sur le nœud 2.
2. Sur le poste de travail client, `ping` sur les deux adresses IP physiques et sur l’adresse IP virtuelle (VIP), puis exécutez `arp -a`.
   → **Résultat attendu :** l’adresse IP virtuelle (VIP) est associée à la **même adresse MAC que l’adresse IP physique du serveur principal**.
3. `stop` le module sur le primaire (nœud 1).
4. Effectuez un nouveau `ping`) sur l’adresse IP virtuelle (VIP), puis exécutez à nouveau `arp -a`.
   → **Résultat attendu :** l’adresse IP virtuelle (VIP) est maintenant associée à la **même adresse MAC que l’adresse IP physique du nouveau serveur principal**.

> Effectuez un nouveau `ping` de l’adresse IP virtuelle (VIP) avant de lire la table ARP : l’entrée peut être marquée comme obsolète et ne sera actualisée qu’après un `ping`.

Exemple de la table ARP attendue, avant et après l’arrêt du serveur principal :

| Adresse | MAC avant l’arrêt | MAC après l’arrêt |
|---|---|---|
| IP physique du nœud 1 | MAC du nœud 1 | MAC du nœud 1 |
| IP physique du nœud 2 | MAC du nœud 2 | MAC du nœud 2 |
| Adresse IP virtuelle (VIP) | **MAC du nœud 1** | **MAC du nœud 2** |

## 6. Test 4 – Vérification de bout en bout avec Wireshark (Windows) ou tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

Vous pouvez suivre une connexion TCP vers l’IP virtuelle (VIP) en capturant les paquets sur le client et sur les deux nœuds : avec Wireshark sur les machines Windows, et avec tcpdump sur les machines Linux.

Vous devez regarder les **en-têtes MAC (Ethernet) des paquets** : l’adresse IP de destination reste l’IP virtuelle (VIP), et c’est l’adresse MAC de destination qui indique quel nœud reçoit le trafic.

**Ce que vous devez observer :**

| Quand | Où capturer les paquets | Adresses MAC observées |
|---|---|---|
| Avant le basculement | client | Adresse MAC du client → Adresse MAC du **nœud 1 (primaire)** |
| Avant le basculement | nœud 1 | Les paquets destinés à l’adresse IP virtuelle (VIP) sont reçus ; le nœud 2 ne reçoit rien. |
| Pendant le basculement | réseau | MAC réachemine les messages envoyés par le nœud 2 pour l’IP virtuelle (VIP) : les messages envoyés par le système d’exploitation lorsqu’il est défini comme un alias, et GARPs envoyés par SafeKit (`arpreroute="on"`) |
| Après le basculement | client | MAC du client → MAC du **nœud 2 (nouveau primaire)** |

> Si le poste de travail client se trouve dans un sous-réseau différent de celui du cluster, l’adresse MAC client vue sur les nœuds est l’adresse MAC de la **passerelle** (routeur) connectant les deux sous-réseaux, et non celle du poste de travail client.

## 7. À partir de quels postes de travail effectuer les tests {#7-which-workstations-to-test-from}

Le comportement dépend du chemin réseau entre le client et le cluster. Exécutez les tests 1 et 2 à partir de chaque type de client pertinent pour votre architecture :

| Localisation du client | Ce que le test vérifie |
|---|---|
| Client dans le **même sous-réseau** que le cluster | Mise à jour des tables ARP des clients (3 tests possibles) |
| Client dans un **sous-réseau différent** (routeur, passerelle, réseau virtuel de l’hyperviseur) | Mise à jour des tables ARP des clients dans le routeur ou la passerelle |
| Machine virtuelle cliente **sur un hyperviseur qui héberge également une machine virtuelle du cluster mirror** | Comportement du commutateur virtuel de l’hyperviseur, qui gère également la commutation et le routage internes. |

## 8. Synthèse des résultats attendus {#8-summary-of-expected-results}

| Test | Action | Résultat attendu |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` et mosaïque | IP virtuelle (VIP) comme alias sur le primaire uniquement ; les 3 commandes `ping` répondent (sauf si filtrées par les pare-feu) ; la mosaïque affiche uniquement le primaire |
| 2 | Arrêt du primaire | IP virtuelle (VIP) comme alias sur le nouveau primaire ; message `Virtual IP <VIP> set` ; la mosaïque affiche uniquement le nouveau primaire |
| 3 | `arp -a` avant et après l’arrêt du primaire | L’adresse IP virtuelle (VIP) passe de l’adresse MAC du nœud 1 à celle du nœud 2. |
| 4 | Capture Wireshark ou tcpdump avant et après le basculement | Le client envoie à l’adresse MAC du nouveau serveur principal. |

## 9. Dépannage {#9-troubleshooting}

- **L’adresse IP virtuelle (VIP) ne répond plus après le basculement :** les messages de réacheminement MAC ne sont pas pris en compte par un périphérique sur le chemin (routeur, passerelle, commutateur virtuel), qui continue d’envoyer du trafic à l’adresse MAC de l’ancien périphérique principal. Vérifiez la gestion des messages de réacheminement MAC avec votre équipe réseau.
- **Envoi GARPs :** l’attribut `arpreroute="on"` de la section `<vip>` (avec `arpinterval` et `arpelapse`) envoie GARPs régulièrement sur l’IP virtuelle (VIP) après le basculement. Voir le Guide de l’utilisateur, section 13.6.4 « [Syntaxe `<vip>`](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ».
- **Diagnostic de la résolution IP virtuelle (VIP) ↔ MAC :** consultez le Guide de l’utilisateur, section 7.24 « [Dépannage de la résolution IP virtuelle (VIP) ↔ MAC](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_Issue_with_VIP) », et la section 7.16 « [Problème avec l’IP virtuelle après le basculement](https://safekit.eviden.com/fr/resources/safekit-user-guide-82/#_Problem_with_the_1) ».

Pour plus d’informations :
- [Comment fonctionne une adresse IP virtuelle dans un cluster de haute disponibilité ?](/fr/best-practises/how-a-virtual-ip-address-works/)
- Pour l’équilibrage de charge avec une adresse IP virtuelle, consultez [la section Test de l’adresse IP virtuelle d’équilibrage de charge dans un cluster farm](/fr/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-fr  %}}

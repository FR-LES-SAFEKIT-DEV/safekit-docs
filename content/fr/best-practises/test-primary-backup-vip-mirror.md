---
title: "Test de l'adresse IP virtuelle d'un cluster mirror SafeKit"
canonical: "https://safekit.eviden.com/fr/best-practises/test-primary-backup-vip-mirror/"
description: "Tester la disponibilité et le basculement IP virtuelles dans un cluster mirror SafeKit , y compris le réacheminement GARP , les vérifications ARP et les captures de paquets."
category: "best-practises"
lang: "fr"
topics: "Principes clés, Prérequis : Configuration d’ IP virtuelle ( VIP ), Test 1 – IP virtuelle ( VIP ) détenue par le serveur principal, Test 2 – Basculement manuel (arrêt du serveur principal), Test 3 – Vérification du reroutage GARP avec la commande arp -a, Test 4 – Vérification de bout en bout avec Wireshark ( Windows ) ou tcpdump ( Linux ), Postes de travail à tester, Résumé des résultats attendus, Dépannage"
---

# Tester l'adresse IP virtuelle d'un cluster mirror SafeKit sur votre réseau

Ce guide décrit comment vérifier que l'adresse IP virtuelle ( VIP ) d'un cluster mirror SafeKit (module mirror ) fonctionne correctement sur votre réseau : l' IP virtuelle ( VIP ) est détenue par le serveur principal et est redirigée vers le nouveau serveur principal après un basculement.

## 1. Principes clés

**Prérequis :** les deux nœuds du cluster mirror doivent se trouver dans le même sous-réseau IP de couche 2 : un LAN ou un VLAN étendu entre des sites distants.

- L' IP virtuelle ( VIP ) est active uniquement sur le **serveur principal** (états PRIM ou ALONE ) : elle est définie comme un alias de l'adresse IP physique, sur la carte réseau de cette adresse, lorsque le module démarre en tant que principal sur le nœud (configuration `where="one_side_alias"` ).
- L'adresse MAC du serveur principal est donc celle associée à l' IP virtuelle ( VIP ) dans les tables ARP (routeur, passerelle, clients du même sous-réseau). Tout le trafic destiné à l' IP virtuelle ( VIP ) est acheminé vers le serveur principal.
- Lors d'un basculement (arrêt ou panne du serveur principal), l' IP virtuelle ( VIP ) est supprimée de l'ancien serveur principal et définie comme alias sur le nouveau serveur principal. Deux mécanismes permettent ensuite au réseau d'associer l' IP virtuelle ( VIP ) à l'adresse MAC du nouveau serveur principal :
  - les messages réseau envoyés par le système d'exploitation lorsque l' IP virtuelle ( VIP ) est ajoutée comme alias sur la carte réseau ;
  - les **GARPs** (gratuitous ARP ) envoyés par SafeKit , lorsque l'attribut `arpreroute="on"` est configuré dans la section `<vip>` .

Ce que vous devez donc tester :

1. l' IP virtuelle ( VIP ) est détenue par le serveur principal et accessible depuis les clients ;
2. L'adresse MAC associée à l' IP virtuelle ( VIP ) est redirigée vers le nouveau serveur principal du réseau (routeur, passerelle, virtualisation) lorsque le serveur principal change.

## 2. Prérequis : Configuration d’ IP virtuelle ( VIP ).

1. Dans le `userconfig.xml` du module mirror , configurez l' IP virtuelle ( VIP ) dans la section `<vip>` . L'attribut `arpreroute="on"` permet au nouveau serveur principal d'envoyer GARPs après un basculement.

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
3. Démarrez le module : un nœud doit être **PRIM ( Ready )** et l’autre **SECOND ( Ready )** .

## 3. Test 1 – IP virtuelle ( VIP ) détenue par le serveur principal

**Mesures**

1. Sur le serveur principal, exécutez `ipconfig` ( Windows ) ou `ip addr show` ( Linux ).
   → **Résultat attendu :** l' IP virtuelle ( VIP ) apparaît comme un alias sur la carte réseau de l'adresse IP physique.
2. Sur le serveur secondaire, exécutez la même commande.
   → **Résultat attendu :** l' IP virtuelle ( VIP ) n'apparaît pas.
3. Depuis un poste de travail client **situé en dehors du cluster** , `ping` à la fois sur les adresses IP physiques et sur l' IP virtuelle ( VIP ).
   → **Résultat attendu :** les trois commandes `ping` répondent (sauf si elles sont filtrées par des pare-feu).
4. Vérifiez l'accès via l' IP virtuelle ( VIP ) avec le SafeKit Mosaic : depuis un navigateur sur le client **externe** , connectez-vous à `http://<VIP>:9010/safekit/mosaic.html` (ou utilisez le port 9453 si le serveur Web et la console SafeKit sont passés en HTTPS), puis saisissez le **nom du module** mirror et exécutez le test.
   → **Résultat attendu :** toutes les cellules de la mosaïque affichent le nom du **serveur principal** , dans une seule couleur : toutes les connexions TCP à l' IP virtuelle ( VIP ) sont gérées par le serveur principal.

![ Tester l'adresse IP virtuelle d'un mirror SafeKit avec la mosaïque ](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Basculement manuel (arrêt du système principal)

Ce test vérifie que l' IP virtuelle ( VIP ) suit le serveur principal lors d'un basculement, déclenché par l'arrêt du module sur le serveur principal.

**Mesures**

1. Arrêtez le module sur le nœud principal (nœud 1) depuis la console SafeKit (ou depuis la ligne de commande avec `safekit stop -m <module>` ).
   → **Résultat attendu :** le nœud 1 passe à STOP ( NotReady ) et le nœud 2 à l’état ALONE ( Ready ). Dans le journal du nouveau nœud primaire, le message `Virtual IP <VIP> set` apparaît.
2. Sur le nouveau serveur principal, exécutez `ipconfig` ou `ip addr show` .
   → **Résultat attendu :** l' IP virtuelle ( VIP ) apparaît désormais comme un alias sur ce nœud, et non plus sur l'ancien nœud principal.
3. Depuis le poste de travail client, répétez les trois commandes `ping` et exécutez à nouveau le mosaic sur l' IP virtuelle ( VIP ).
   → **Résultat attendu :** tout réagit et toutes les cellules de la mosaïque affichent désormais le nom de la **nouvelle primaire** , dans une seule couleur.
4. Redémarrez le module sur le nœud 1 : il se resynchronise et passe à SECOND ( Ready ), tandis que le nœud 2 passe à PRIM ( Ready ).

## 5. Test 3 – Vérification du réacheminement MAC avec `arp -a`

Vous notez l'adresse MAC associée à l' IP virtuelle ( VIP ) avant le basculement, puis vous vérifiez qu'elle a changé après.

Ce test n'est possible que si le poste de travail client se trouve dans le **même sous-réseau IP** que le cluster.

Si un routeur est présent entre le client et le cluster, la table ARP du client ne contient pas l' IP virtuelle ( VIP ), mais l'adresse de la passerelle utilisée pour accéder au réseau du cluster. Dans ce cas, veuillez consulter la table ARP du routeur ou de la passerelle avec votre équipe réseau.

**Mesures**

1. Le module est PRIM ( Ready ) sur le nœud 1 et SECOND ( Ready ) sur le nœud 2.
2. Sur le poste de travail client, `ping` sur les deux adresses IP physiques et l' IP virtuelle ( VIP ), puis exécutez `arp -a` .
   → **Résultat attendu :** l' IP virtuelle ( VIP ) est associée à la **même adresse MAC que l'adresse IP physique du serveur principal** .
3. `stop` le module sur le nœud principal (nœud 1).
4. `ping` à nouveau l' IP virtuelle ( VIP ), puis exécutez à nouveau `arp -a` .
   → **Résultat attendu :** l' IP virtuelle ( VIP ) est maintenant associée à la **même adresse MAC que l'adresse IP physique du nouveau serveur principal** .

> `ping` à nouveau l' IP virtuelle ( VIP ) avant de lire la table ARP : l'entrée peut être marquée comme obsolète et ne sera actualisée qu'après un `ping` .

Exemple de la table ARP attendue, avant et après l'arrêt du serveur principal :

| Adresse | MAC avant l'arrêt | MAC après l'arrêt |
|---|---|---|
| IP physique du nœud 1 | MAC du nœud 1 | MAC du nœud 1 |
| IP physique du nœud 2 | MAC du nœud 2 | MAC du nœud 2 |
| IP virtuelle ( VIP ) | **MAC du nœud 1** | **MAC du nœud 2** |

## 6. Test 4 – Vérification de bout en bout avec Wireshark ( Windows ) ou tcpdump ( Linux )

Vous pouvez suivre une connexion TCP vers l' IP virtuelle ( VIP ) en capturant les paquets sur le client et sur les deux nœuds : avec Wireshark sur les machines Windows et avec tcpdump sur les machines Linux .

Vous devez examiner les **en-têtes MAC (Ethernet) des paquets** : l’adresse IP de destination reste l’ IP virtuelle ( VIP ), et c’est l’adresse MAC de destination qui indique quel nœud reçoit le trafic.

**Ce que vous devez observer :**

| Quand | Où prendre des photos | Adresses MAC observées |
|---|---|---|
| Avant le basculement | client | MAC du client → MAC du **nœud 1 (primaire)** |
| Avant le basculement | nœud 1 | Les paquets destinés à l' IP virtuelle ( VIP ) sont reçus ; le nœud 2 ne reçoit rien. |
| Lors du basculement | réseau | Messages de réacheminement MAC envoyés par le nœud 2 pour l' IP virtuelle ( VIP ) : messages envoyés par le système d'exploitation lorsqu'elle est définie comme un alias, et GARPs envoyés par SafeKit ( `arpreroute="on"` ). |
| Après le basculement | client | MAC du client → MAC du **nœud 2 (nouveau nœud primaire)** |

> Si le poste de travail client se trouve dans un sous-réseau différent de celui du cluster, l' MAC du « client » affichée sur les nœuds est l'adresse MAC de la **passerelle** (routeur) reliant les deux sous-réseaux, et non celle du poste de travail client.

## 7. Quels postes de travail tester ?

Le comportement dépend du chemin réseau entre le client et le cluster. Exécutez les tests 1 et 2 depuis chaque type de client pertinent pour votre architecture :

| Lieu du client | Ce que vérifie le test |
|---|---|
| Client situé dans le **même sous-réseau** que le cluster | Mise à jour des tables ARP des clients (test 3 possible) |
| Client situé dans un **sous-réseau différent** (routeur, passerelle, réseau virtuel d'hyperviseur) | Mise à jour des tables ARP des clients dans le routeur ou la passerelle |
| Machine virtuelle cliente **sur un hyperviseur qui héberge également une machine virtuelle du cluster mirror** | Comportement du commutateur virtuel de l'hyperviseur, qui gère également la commutation et le routage internes. |

## 8. Résumé des résultats attendus

| Test | Action | Résultat attendu |
|---|---|---|
| 1 | PRIM / SECOND , `ipconfig` , `ping` et mosaic | IP virtuelle ( VIP ) utilisée comme alias uniquement sur le serveur principal ; les trois commandes `ping` répondent (sauf en cas de filtrage par un pare-feu) ; la mosaïque n'affiche que le serveur principal. |
| 2 | Arrêt du primaire | IP virtuelle ( VIP ) en tant qu'alias sur le nouveau serveur principal ; message `Virtual IP <VIP> set` ; la mosaïque n'affiche que le nouveau serveur principal. |
| 3 | `arp -a` avant et après l'arrêt du processus principal | IP virtuelle ( VIP ) passe de l'adresse MAC du nœud 1 à celle du nœud 2. |
| 4 | Capture Wireshark ou tcpdump avant et après le basculement | Le client envoie un message à l'adresse MAC du nouveau serveur principal. |

## 9. Dépannage

- **L' IP virtuelle ( VIP ) ne répond plus après le basculement :** les messages de réacheminement MAC ne sont pas pris en compte par un périphérique du chemin (routeur, passerelle, commutateur virtuel), qui continue d'envoyer le trafic vers l'adresse MAC de l'ancien périphérique principal. Veuillez vérifier la gestion des messages de réacheminement MAC avec votre équipe réseau.
- **Envoi GARPs :** l’attribut `arpreroute="on"` de la section `<vip>` (avec `arpinterval` et `arpelapse` ) envoie régulièrement GARPs sur l’ IP virtuelle ( VIP ) après le basculement. Voir le Guide de l’utilisateur, section 13.6.4 « [ syntaxe `<vip>` ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ».
- **Diagnostic de la résolution IP virtuelle ( VIP ) ↔ MAC :** consultez le Guide de l’utilisateur, section 7.24 « [ Dépannage de la résolution IP virtuelle ( VIP ) ↔ MAC ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) » et section 7.16 « [ Problème avec l’ IP virtuelle après basculement ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Problem_with_the_1) ».

Pour l'équilibrage de charge avec une adresse IP virtuelle, voir [ Tester l'adresse IP virtuelle d'équilibrage de charge dans un cluster SafeKit Farm ](/fr/best-practises/test-load-balancing-vip-farm/) .

{{%  insert-safekit-4-buttons-fr  %}}

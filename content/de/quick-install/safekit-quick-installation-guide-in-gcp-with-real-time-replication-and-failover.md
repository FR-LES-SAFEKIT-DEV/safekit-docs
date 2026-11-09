---
title: "GCP Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/"
description: "Setzen Sie das Modul mirror.safe für SafeKit in GCP ein, um synchrone Echtzeit-Replikation und automatische Failover auf Windows und Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines 2-Knoten Shared-Nothing Clusters ohne Shared Storage für kritische Anwendungen."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für GCP, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/GCP mirror, Installation der SafeKit/GCP mirror unter Windows und Linux (mirror.safe), Schritt-für-Schritt-Konfiguration der SafeKit/GCP mirror, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# GCP Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover {#gcp-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="GCP" mod="mirror"  %}}
 

## Übersicht über die SafeKit/GCP mirror {#overview-of-the-safekit--gcp-mirror-solution}

Die Lösung wird hier beschrieben: **💡 [Google GCP Hochverfügbarkeit: SafeKit synchrone Replikation & Failover](</de/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)**.

## Installation der SafeKit/GCP mirror unter Windows und Linux (mirror.safe) {#installation-of-the-safekit--gcp-mirror-solution-on-windows-and-linux-mirrorsafe}

### Konfiguration des Google GCP Load Balancer {#configuration-of-the-google-gcp-load-balancer}

Der Load Balancer muss konfiguriert werden, wenn Sie eine virtuelle IP-Adresse implementieren möchten.  
Und der Load Balancer muss so konfiguriert sein, dass er regelmäßig Statuspakete an die Knoten sendet.  
Dafür bietet SafeKit einen Health-Check, der innerhalb der Knoten ausgeführt wird und der

  * gibt OK zurück, wenn der Status des Mirror-Modul PRIM (grün) oder ALONE (grün) ist
  * Gibt in allen anderen Bundesstaaten NICHT GEFUNDEN zurück


Sie müssen den Google GCP Load Balancer mit folgenden Einstellungen konfigurieren:

  * HTTP-Protokoll
  * Port 9010, der SafeKit Webserver-Port
  * URL /var/modules/mirror/ready.txt (wenn mirror der Modulname ist, den Sie später bereitstellen werden)


Weitere Informationen finden Sie [unter Konfiguration des Google GCP Load Balancer](<https://docs.cloud.google.com/load-balancing/docs/>). 


⚠️ Konfigurieren Sie in Schritt 4 der nachstehenden Schritt-für-Schritt-Konfiguration keine virtuelle IP-Adresse. Die virtuelle IP-Adresse ist bereits im Google GCP Load Balancer festgelegt. Das Festlegen einer virtuellen IP-Adresse in Schritt 4 ist nur für die On-Premise-Konfiguration nützlich.

### Konfiguration der Google GCP-Netzwerksicherheit {#configuration-of-the-google-gcp-network-security}

Die Netzwerksicherheit muss so konfiguriert werden, dass die Kommunikation für die folgenden Protokolle und Ports ermöglicht wird:

  * UDP – 4800 für den SafeAdmin-Dienst (zwischen SafeKit Knoten)
  * UDP – 8888 für den Modul-Heartbeat (zwischen SafeKit Knoten)
  * TCP – 5600 für das Modul zur Echtzeit-Dateireplikation (zwischen SafeKit-Knoten)
  * TCP – 9010 für die Zustandsprüfung des Load-Balancers und für die SafeKit-Webkonsole, die im HTTP-Modus ausgeführt wird
  * TCP – 9001 zur Konfiguration des HTTPS-Modus für die Konsole
  * TCP – 9453 für die SafeKit-Webkonsole im HTTPS-Modus



{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}
 

Hinweis: Das generische Modul **mirror.safe**, das Sie konfigurieren werden, wird im Paket mitgeliefert.

## Schritt-für-Schritt-Konfiguration der SafeKit/GCP mirror {#step-by-step-configuration-of-the-safekit--gcp-mirror-solution}


{{%  insert-safekit-82-configuration-de app="Windows" mod="mirror"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
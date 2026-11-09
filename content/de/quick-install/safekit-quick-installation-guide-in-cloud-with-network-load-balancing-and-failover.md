---
title: "Cloud-Netzwerk-Lastausgleich und Failover: Installieren Sie das SafeKit farm.safe-Modul"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Verbessern Sie das Cloud-Netzwerk-Lastausgleichsverfahren mit dem intelligenten Anwendungsmonitoring von SafeKit. Das Modul farm.safe bietet eine dedizierte Zustandsprüfung für den Cloud-Load Balancer, die eine nahtlose Hochverfügbarkeit auf Anwendungsebene ermöglicht. Erzielen Sie automatische Selbstheilung und Failover für geschäftskritische Anwendungen."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit in der Cloud, Einschränkungen SafeKit Hochverfügbarkeit, Überblick über die SafeKit /Cloud-Lösung, Installation der SafeKit /Cloud-Lösung unter Windows und Linux (farm.safe), Schritt-für-Schritt-Konfiguration der SafeKit /Cloud-Lösung, Demonstration der SafeKit farm Lösung, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# Cloud-Netzwerk-Lastausgleich und Failover: Installieren Sie das SafeKit farm.safe-Modul {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-de app="Cloud" mod="farm"  %}}
 

## Überblick über die SafeKit /Cloud-Lösung {#overview-of-the-safekit--cloud-solution}

Die Lösung wird hier beschrieben: **💡 [SafeKit: Cloud-Lastenausgleich und Anwendungs-Hochverfügbarkeits <span class="notranslate farm-term" translate="no">Farm</span>-Cluster](</de/solutions/cloud-load-balancing-cluster-failover/>)**.

## Installation der SafeKit /Cloud-Lösung unter Windows und Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Konfiguration des Cloud-Load Balancer {#configuration-of-the-cloud-load-balancer}

Der Load Balancer muss mit einer virtuellen IP-Adresse konfiguriert werden.  
Und der Load Balancer muss so konfiguriert sein, dass er regelmäßig Statuspakete an die Knoten sendet.  
Dafür bietet SafeKit einen Health-Check, der innerhalb der Knoten ausgeführt wird und der

  * gibt OK zurück, wenn der Status des <span class="notranslate farm-term" translate="no">Farm</span>-Modul UP (grün) ist
  * Gibt in allen anderen Bundesstaaten NICHT GEFUNDEN zurück


Sie müssen den Cloud Load Balancer mit folgenden Einstellungen konfigurieren:

  * HTTP-Protokoll
  * Port 9010, der SafeKit Webserver-Port
  * URL /var/modules/farm/ready.txt (wenn <span class="notranslate farm-term" translate="no">farm</span> der Modulname ist, den Sie später bereitstellen werden)


⚠️ Konfigurieren Sie in Schritt 4 der folgenden Schritt-für-Schritt-Konfiguration keine virtuelle IP-Adresse und keine Lastausgleichsregeln. Die virtuelle IP-Adresse und die Lastausgleichsregeln sind bereits im Cloud-Load Balancer festgelegt. Das Festlegen einer virtuellen IP-Adresse und von Lastausgleichsregeln in Schritt 4 ist nur für die lokale Konfiguration nützlich.

### Konfiguration der Cloud-Netzwerksicherheit {#configuration-of-the-cloud-network-security}

Die Netzwerksicherheit muss so konfiguriert werden, dass die Kommunikation für die folgenden Protokolle und Ports ermöglicht wird:

  * UDP – 4800 für den SafeAdmin-Dienst (zwischen SafeKit Knoten)
  * UDP – 4803 für die Heartbeats innerhalb des <span class="notranslate farm-term" translate="no">Farm</span>-Modul (zwischen SafeKit Knoten)
  * TCP – 9010 für die Zustandsprüfung des Load-Balancers und für die SafeKit-Webkonsole, die im HTTP-Modus ausgeführt wird
  * TCP – 9001 zur Konfiguration des HTTPS-Modus für die Konsole
  * TCP – 9453 für die SafeKit-Webkonsole im HTTPS-Modus



{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}
 

Hinweis: Das generische Modul **farm.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schritt-für-Schritt-Konfiguration der SafeKit /Cloud-Lösung {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-de app="" mod="farm"  %}}
 

## Demonstration der SafeKit <span class="notranslate farm-term" translate="no">farm</span> Lösung {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
---
title: "Cloud-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Erweitern Sie den Cloud-Netzwerklastausgleich um die intelligente Anwendungsüberwachung von SafeKit. Das Modul farm.safe stellt eine dedizierte Integritätsprüfung für den Cloud-Load-Balancer bereit und ermöglicht nahtlose Hochverfügbarkeit auf Anwendungsebene. Erzielen Sie automatische Selbstheilung und Failover für geschäftskritische Anwendungen."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit in der Cloud, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/Cloud-Lösung, Installation der SafeKit-/Cloud-Lösung unter Windows und Linux (farm.safe), Schritt-für-Schritt-Konfiguration der SafeKit-/Cloud-Lösung, Demonstration der SafeKit-Lösung `farm`, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# Cloud-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-de app="Cloud" mod="farm"  %}}

## Überblick über die SafeKit-/Cloud-Lösung {#overview-of-the-safekit--cloud-solution}

Die Lösung wird hier beschrieben: **💡[SafeKit: Cloud-Lastausgleich und Anwendungs-Hochverfügbarkeit mit einem `Farm`-Cluster](</solutions/cloud-load-balancing-cluster-failover/>)**.

## Installation der SafeKit-/Cloud-Lösung unter Windows und Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Konfiguration des Cloud-Load-Balancers {#configuration-of-the-cloud-load-balancer}

Der Load-Balancer muss mit einer virtuellen IP-Adresse konfiguriert werden.  
Außerdem muss der Load-Balancer so konfiguriert werden, dass er regelmäßig Integritätspakete an die Knoten sendet.  
Dafür stellt SafeKit eine Integritätsprüfung bereit, die auf den Knoten läuft und

  * OK zurückgibt, wenn der Status des Moduls `farm` UP (grün) ist
  * in allen anderen Status NOT FOUND zurückgibt

Sie müssen den Cloud-Load-Balancer wie folgt konfigurieren:

  * HTTP-Protokoll
  * Port 9010, der Port des SafeKit-Webservers
  * URL /var/modules/farm/ready.txt (wenn `farm` der Name des Moduls ist, das Sie später bereitstellen)

⚠️ Konfigurieren Sie in Schritt 4 der folgenden Schritt-für-Schritt-Konfiguration weder eine virtuelle IP-Adresse noch Lastausgleichsregeln. Die virtuelle IP-Adresse und die Lastausgleichsregeln sind bereits im Cloud-Load-Balancer festgelegt. Das Festlegen einer virtuellen IP-Adresse und von Lastausgleichsregeln in Schritt 4 ist nur für eine lokale (On-Premises-)Konfiguration sinnvoll.

### Konfiguration der Cloud-Netzwerksicherheit {#configuration-of-the-cloud-network-security}

Die Netzwerksicherheit muss so konfiguriert werden, dass die Kommunikation für die folgenden Protokolle und Ports möglich ist:

  * UDP - 4800 für den Dienst safeadmin (zwischen SafeKit-Knoten)
  * UDP - 4803 für die Heartbeats innerhalb des Moduls `farm` (zwischen SafeKit-Knoten)
  * TCP – 9010 für die Integritätsprüfung des Load-Balancers und für die SafeKit-Webkonsole im http-Modus
  * TCP – 9001 zum Konfigurieren des https-Modus für die Konsole
  * TCP – 9453 für die SafeKit-Webkonsole im https-Modus

{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}

Hinweis: Das generische Modul **farm.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schritt-für-Schritt-Konfiguration der SafeKit-/Cloud-Lösung {#step-by-step-configuration-of-the-safekit--cloud-solution}

{{%  insert-safekit-82-farm-configuration-de app="" mod="farm"  %}}

## Demonstration der SafeKit-Lösung `farm` {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}

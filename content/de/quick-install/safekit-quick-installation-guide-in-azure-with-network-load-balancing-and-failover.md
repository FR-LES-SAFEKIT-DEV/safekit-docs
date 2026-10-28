---
title: "Azure-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "Erweitern Sie den Azure Load Balancer mit der intelligenten Anwendungsüberwachung von SafeKit. Das Modul farm.safe bietet eine dedizierte Integritätsprüfung für den Azure Load Balancer und ermöglicht nahtlose Hochverfügbarkeit auf Anwendungsebene, automatische Selbstheilung und Failover für geschäftskritische Anwendungen."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit in Azure, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/Azure-Lösung, Installation der SafeKit-/Azure-Lösung unter Windows und Linux (farm.safe), Schrittweise Konfiguration der SafeKit-/Azure-Lösung, Demonstration der SafeKit-farm-Lösung, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# Azure-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-de app="Azure" mod="farm"  %}}

## Überblick über die SafeKit-/Azure-Lösung {#overview-of-the-safekit--azure-solution}

Die Lösung wird hier beschrieben: **💡[SafeKit: Microsoft-Azure-Lastenausgleich und Anwendungshochverfügbarkeit mit einem `Farm`-Cluster](</de/solutions/azure-load-balancing-cluster-failover/>)**.

## Installation der SafeKit-/Azure-Lösung unter Windows und Linux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Konfiguration des Microsoft-Azure-Load Balancers {#configuration-of-the-microsoft-azure-load-balancer}

Der Load Balancer muss mit einer virtuellen IP-Adresse konfiguriert werden.
Außerdem muss der Load Balancer regelmäßig Integritätsprüfungen an die Knoten senden.
Dafür stellt SafeKit eine Integritätsprüfung bereit, die auf den Knoten ausgeführt wird und:

  * OK zurückgibt, wenn der Status des `farm`-Moduls UP (grün) ist
  * in allen anderen Zuständen NOT FOUND zurückgibt

Konfigurieren Sie den Microsoft-Azure-Load Balancer mit:

  * HTTP-Protokoll
  * Port 9010, dem SafeKit-Webserverport
  * URL /var/modules/farm/ready.txt (wenn `farm` der Name des später bereitzustellenden Moduls ist)

Weitere Informationen finden Sie unter [Konfiguration des Microsoft-Azure-Load Balancers](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Konfigurieren Sie in Schritt 4 der folgenden Schritt-für-Schritt-Anleitung weder eine virtuelle IP-Adresse noch Lastenausgleichsregeln. Die virtuelle IP-Adresse und die Lastenausgleichsregeln sind bereits im Microsoft-Azure-Load Balancer festgelegt. Ihre Konfiguration in Schritt 4 ist nur für lokale Konfigurationen vorgesehen.

### Konfiguration der Microsoft-Azure-Netzwerksicherheit {#configuration-of-the-microsoft-azure-network-security}

Die Netzwerksicherheit muss so konfiguriert werden, dass die Kommunikation über folgende Protokolle und Ports möglich ist:

  * UDP - 4800 für den safeadmin-Dienst (zwischen SafeKit-Knoten)
  * UDP - 4803 für Heartbeats innerhalb des `farm`-Moduls (zwischen SafeKit-Knoten)
  * TCP – 9010 für die Integritätsprüfung des Load Balancers und die im http-Modus ausgeführte SafeKit-Webkonsole
  * TCP – 9001 zum Konfigurieren des https-Modus für die Konsole
  * TCP – 9453 für die im https-Modus ausgeführte SafeKit-Webkonsole

{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}

Hinweis: Das generische Modul **farm.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schrittweise Konfiguration der SafeKit-/Azure-Lösung {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-de app="" mod="farm"  %}}

## Demonstration der SafeKit-`farm`-Lösung {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}

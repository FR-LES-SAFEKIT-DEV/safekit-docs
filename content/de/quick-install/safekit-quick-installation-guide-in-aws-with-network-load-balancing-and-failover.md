---
title: "AWS-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/"
description: "Erweitern Sie den AWS-Netzwerklastausgleich um die intelligente Anwendungsüberwachung von SafeKit. Das Modul farm.safe stellt eine dedizierte Integritätsprüfung für den AWS-Load-Balancer bereit und ermöglicht nahtlose Hochverfügbarkeit auf Anwendungsebene. Erzielen Sie automatische Selbstheilung und Failover für geschäftskritische Anwendungen."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit in AWS, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/AWS-Lösung, Installation der SafeKit-/AWS-Lösung unter Windows und Linux (farm.safe), Schritt-für-Schritt-Konfiguration der SafeKit-/AWS-Lösung, Demonstration der SafeKit-Lösung `farm`, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# AWS-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe {#aws-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-de app="AWS" mod="farm"  %}}

## Überblick über die SafeKit-/AWS-Lösung {#overview-of-the-safekit--aws-solution}

Die Lösung wird hier beschrieben: **💡[SafeKit: Amazon AWS-Lastausgleich und Anwendungs-Hochverfügbarkeit mit einem `Farm`-Cluster](</de/solutions/aws-load-balancing-cluster-failover/>)**.

## Installation der SafeKit-/AWS-Lösung unter Windows und Linux (farm.safe) {#installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe}

### Konfiguration des Amazon AWS-Load-Balancers {#configuration-of-the-amazon-aws-load-balancer}

Der Load-Balancer muss mit einer virtuellen IP-Adresse konfiguriert werden.  
Außerdem muss der Load-Balancer so konfiguriert werden, dass er regelmäßig Integritätspakete an die Knoten sendet.  
Dafür stellt SafeKit eine Integritätsprüfung bereit, die auf den Knoten läuft und

  * OK zurückgibt, wenn der Status des Moduls `farm` UP (grün) ist
  * in allen anderen Status NOT FOUND zurückgibt

Sie müssen den Amazon AWS-Load-Balancer wie folgt konfigurieren:

  * HTTP-Protokoll
  * Port 9010, der Port des SafeKit-Webservers
  * URL /var/modules/farm/ready.txt (wenn `farm` der Name des Moduls ist, das Sie später bereitstellen)

Weitere Informationen finden Sie unter [Konfiguration des Amazon AWS-Load-Balancers](<https://aws.amazon.com/elasticloadbalancing/>).

⚠️ Konfigurieren Sie in Schritt 4 der folgenden Schritt-für-Schritt-Konfiguration weder eine virtuelle IP-Adresse noch Lastausgleichsregeln. Die virtuelle IP-Adresse und die Lastausgleichsregeln sind bereits im Amazon AWS-Load-Balancer festgelegt. Das Festlegen einer virtuellen IP-Adresse und von Lastausgleichsregeln in Schritt 4 ist nur für eine lokale (On-Premises-)Konfiguration sinnvoll.

### Konfiguration der Amazon AWS-Netzwerksicherheit {#configuration-of-the-amazon-aws-network-security}

Die Netzwerksicherheit muss so konfiguriert werden, dass die Kommunikation für die folgenden Protokolle und Ports möglich ist:

  * UDP - 4800 für den Dienst safeadmin (zwischen SafeKit-Knoten)
  * UDP - 4803 für den Heartbeat innerhalb des Moduls `farm` (zwischen SafeKit-Knoten)
  * TCP – 9010 für die Integritätsprüfung des Load-Balancers und für die SafeKit-Webkonsole im http-Modus
  * TCP – 9001 zum Konfigurieren des https-Modus für die Konsole
  * TCP – 9453 für die SafeKit-Webkonsole im https-Modus

{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}

Hinweis: Das generische Modul **farm.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schritt-für-Schritt-Konfiguration der SafeKit-/AWS-Lösung {#step-by-step-configuration-of-the-safekit--aws-solution}

{{%  insert-safekit-82-farm-configuration-de app="" mod="farm"  %}}

## Demonstration der SafeKit-Lösung `farm` {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}

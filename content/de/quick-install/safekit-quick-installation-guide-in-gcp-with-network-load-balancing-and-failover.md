---
title: "GCP-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "Erweitern Sie den GCP-Netzwerklastausgleich um die intelligente Anwendungsüberwachung von SafeKit. Das Modul farm.safe stellt eine dedizierte Integritätsprüfung für den GCP-Load-Balancer bereit und ermöglicht nahtlose Hochverfügbarkeit auf Anwendungsebene. Erzielen Sie automatische Selbstheilung und Failover für geschäftskritische Anwendungen."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit in GCP, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/GCP-Lösung, Installation der SafeKit-/GCP-Lösung unter Windows und Linux (farm.safe), Schritt-für-Schritt-Konfiguration der SafeKit-/GCP-Lösung, Demonstration der SafeKit-Lösung <span class="notranslate farm-term" translate="no">farm</span>, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# GCP-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-de app="GCP" mod="farm"  %}}

## Überblick über die SafeKit-/GCP-Lösung {#overview-of-the-safekit--gcp-solution}

Die Lösung wird hier beschrieben: **💡[SafeKit: Google GCP-Lastausgleich und Anwendungs-Hochverfügbarkeit mit einem <span class="notranslate farm-term" translate="no">Farm</span>-Cluster](</de/solutions/gcp-load-balancing-cluster-failover/>)**.

## Installation der SafeKit-/GCP-Lösung unter Windows und Linux (farm.safe) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Konfiguration des Google GCP-Load-Balancers {#configuration-of-the-google-gcp-load-balancer}

Der Load-Balancer muss mit einer virtuellen IP-Adresse konfiguriert werden.  
Außerdem muss der Load-Balancer so konfiguriert werden, dass er regelmäßig Integritätspakete an die Knoten sendet.  
Dafür stellt SafeKit eine Integritätsprüfung bereit, die auf den Knoten läuft und

  * OK zurückgibt, wenn der Status des Moduls <span class="notranslate farm-term" translate="no">farm</span> UP (grün) ist
  * in allen anderen Status NOT FOUND zurückgibt

Sie müssen den Google GCP-Load-Balancer wie folgt konfigurieren:

  * HTTP-Protokoll
  * Port 9010, der Port des SafeKit-Webservers
  * URL /var/modules/farm/ready.txt (wenn <span class="notranslate farm-term" translate="no">farm</span> der Name des Moduls ist, das Sie später bereitstellen)

Weitere Informationen finden Sie unter [Konfiguration des Google GCP-Load-Balancers](<https://docs.cloud.google.com/load-balancing/docs/>).

⚠️ Konfigurieren Sie in Schritt 4 der folgenden Schritt-für-Schritt-Konfiguration weder eine virtuelle IP-Adresse noch Lastausgleichsregeln. Die virtuelle IP-Adresse und die Lastausgleichsregeln sind bereits im Google GCP-Load-Balancer festgelegt. Das Festlegen einer virtuellen IP-Adresse und von Lastausgleichsregeln in Schritt 4 ist nur für eine lokale (On-Premises-)Konfiguration sinnvoll.

### Konfiguration der Google GCP-Netzwerksicherheit {#configuration-of-the-google-gcp-network-security}

Die Netzwerksicherheit muss so konfiguriert werden, dass die Kommunikation für die folgenden Protokolle und Ports möglich ist:

  * UDP - 4800 für den Dienst safeadmin (zwischen SafeKit-Knoten)
  * UDP - 4803 für die Heartbeats innerhalb des Moduls <span class="notranslate farm-term" translate="no">farm</span> (zwischen SafeKit-Knoten)
  * TCP – 9010 für die Integritätsprüfung des Load-Balancers und für die SafeKit-Webkonsole im http-Modus
  * TCP – 9001 zum Konfigurieren des https-Modus für die Konsole
  * TCP – 9453 für die SafeKit-Webkonsole im https-Modus

{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}

Hinweis: Das generische Modul **farm.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schritt-für-Schritt-Konfiguration der SafeKit-/GCP-Lösung {#step-by-step-configuration-of-the-safekit--gcp-solution}

{{%  insert-safekit-82-farm-configuration-de app="" mod="farm"  %}}

## Demonstration der SafeKit-Lösung <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}

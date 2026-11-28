---
title: "SafeKit installieren: Lastverteilung für IIS"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Schritt für Schritt: Installieren Sie das SafeKit-Modul iis_farm.safe unter Windows für Netzwerk-Lastverteilung und Failover von IIS-Webservern auf einer virtuellen IP."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für IIS, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/IIS-Lösung, Installation der SafeKit/IIS-Lösung unter Windows (iisfarm.safe), Schritt-für-Schritt-Konfiguration der SafeKit/IIS-Lösung, Demonstration der SafeKit farm Lösung"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--iis-solution, installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe, step-by-step-configuration-of-the-safekit--iis-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# SafeKit installieren: Lastverteilung für IIS {#install-safekit-for-iis-load-balancing}


{{%  insert-safekit-farm-guide-de app="IIS" mod="iis_farm"  %}}
 

## Übersicht über die SafeKit/IIS-Lösung {#overview-of-the-safekit--iis-solution}

Die Lösung wird hier beschrieben: **💡 [SafeKit: All-in-One-Software IIS Lastenausgleich und Hochverfügbarkeit](</de/solutions/iis-load-balancing-failover/>)**.

## Installation der SafeKit/IIS-Lösung unter Windows (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen IIS das auf zwei oder mehr Knoten (virtuelle Maschinen oder physische Server) installiert ist.



{{%  insert-safekit-installation-package-windows-de app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="IIS" mod="iis_farm"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit/IIS-Lösung {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-de app="IIS" mod="iis_farm"  %}}
 

## Demonstration der SafeKit <span class="notranslate farm-term" translate="no">farm</span> Lösung {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-de  %}}

{{%  insert-safekit-hub-de app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-de  %}}
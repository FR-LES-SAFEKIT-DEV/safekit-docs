---
title: "Clustering-Software mit Lastausgleich und Spiegelung: Hochverfügbarkeit und Skalierbarkeit"
canonical: "https://safekit.eviden.com/de/architectures/clustering-software-load-balancing-mirroring/"
description: "Erstellen Sie fortschrittliche Architekturen durch die Kombination von SafeKit-Farm- und -Mirror-Modulen. Das Netzwerk-Load-Balancing skaliert das Frontend, und die synchrone Echtzeit-Replikation schützt die Backend-Daten. Einfaches SANless-Clustering für Windows und Linux, ohne dass spezielle IT-Kenntnisse erforderlich sind. Laden Sie Ihre kostenlose Testversion herunter."
category: "architectures"
lang: "de"
topics: "Hochverfügbarkeit und Skalierbarkeit kritischer Web- und Datenbankanwendungen mit der Clustering-Software SafeKit, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 54 expressions"
---

# Clustering-Software mit Lastausgleich und Spiegelung: Hochverfügbarkeit und Skalierbarkeit {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Hochverfügbarkeit und Skalierbarkeit kritischer Web- und Datenbankanwendungen mit der Clustering-Software SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Lastverteilung, Spiegelung und Failover {#load-balancing-mirroring-and-failover}


![SafeKit-Clustering mit Lastverteilung und Spiegelung](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Beispiel mit der Clustering-Software SafeKit {#example-with-the-safekit-clustering-software}

Mit der Clustering-Software SafeKit können Sie beispielsweise Lastausgleich für IIS und Spiegelung für Microsoft SQL Server implementieren.

Stellen Sie dazu ein <span class="notranslate farm-term" translate="no">Farm</span>-Modul für IIS und ein Mirror-Modul für Microsoft SQL Server bereit. Jedes Modul wird mit einer eigenen virtuellen IP-Adresse und eigenen Neustartskripten konfiguriert.

Die beiden Module können auf einem einzigen Cluster von zwei Servern bereitgestellt werden, auf denen sowohl IIS als auch Microsoft SQL Server ausgeführt werden. Alternativ können die beiden Module auf zwei separaten Clustern mit unterschiedlichen Servern bereitgestellt werden.

Mit der SafeKit-Clustering-Software funktioniert die Bereitstellung auf denselben Servern oder auf verschiedenen Servern auf exakt dieselbe Weise.

### Lösung für Hochverfügbarkeit und Skalierbarkeit {#high-availability-and-scalability-solution}

Die Clustering-Software SafeKit bietet eine einfache Lösung für Hochverfügbarkeit und Skalierbarkeit für geschäftskritische Web- und Datenbankanwendungen.

Netzwerklastenausgleich, Echtzeit-Datenmirroring und Anwendungs-Failover werden konsistent in einem einzigen Produkt verwaltet.

Im Gegensatz zum Hardware-Clustering benötigt die SafeKit-Clustering-Software keine gemeinsam genutzten Festplatten, replizierten SANs, Hardware-Load-Balancer oder Enterprise-Editionen von Betriebssystemen oder Datenbanken.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
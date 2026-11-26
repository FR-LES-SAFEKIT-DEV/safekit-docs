---
title: "Aktualisieren einer durch SafeKit geschützten Anwendung in einem HA-Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "So aktualisieren Sie eine durch SafeKit geschützte Anwendung: kleine und große Upgrades, Rolling Upgrades, Rollback-Optionen und der VM-HA-Ansatz."
category: "best-practises"
lang: "de"
topics: "Aktualisierung einer Hochverfügbarkeitsanwendung, die durch SafeKit geschützt ist, Hochverfügbarkeit auf VM-Ebene, Hochverfügbarkeit auf Anwendungsebene, Die richtige Upgrade-Strategie wählen, Schlussfolgerung, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-20.1 | glossaire 2026-11-20.3 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
schemaType: "TechArticle"
---

# Aktualisieren einer durch SafeKit geschützten Anwendung in einem HA-Cluster {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Aktualisierung einer Hochverfügbarkeitsanwendung, die durch SafeKit geschützt ist {#upgrading-a-high-availability-application-protected-by-safekit}

Die Aktualisierung geschäftskritischer Anwendungen ist für Sicherheit, Leistung und den Zugriff auf neue Funktionen unerlässlich. Wenn eine Anwendung durch SafeKit geschützt ist, hängt das Upgrade-Verfahren von der verwendeten Hochverfügbarkeitsarchitektur ab.

Es gibt zwei gängige Bereitstellungsmodelle:

  * **Hochverfügbarkeit von virtuellen Maschinen**, bei der die Anwendung in einer geschützten virtuellen Maschine läuft, die von SafeKit verwaltet wird.
  * **Hochverfügbarkeit auf Anwendungsebene**, bei der die Anwendung auf zwei Servern installiert ist.


Jedes Modell bietet unterschiedliche Upgrade-Mechanismen und Rollback-Strategien.

## Hochverfügbarkeit auf VM-Ebene {#vm-level-ha}

Mit SafeKit VM-Failover-Lösungen wie **hyperv.safe** und **kvm.safe** wird die Anwendung nur einmal in einer virtuellen Maschine installiert.

SafeKit schützt die gesamte VM und nicht die Anwendung selbst. Dies vereinfacht die Wartungsarbeiten erheblich.

### Vereinfachter Upgrade-Prozess {#simplified-upgrade-process}

Da Sie mit einer einzelnen VM-Instanz der Anwendung arbeiten, wird die Wartung auf der Virtualisierungsebene und nicht durch Failover auf Anwendungsebene durchgeführt.

Das Upgrade-Verfahren ist unkompliziert:

  1. Erstellen Sie einen Checkpoint oder einen Snapshot der virtuellen Maschine mithilfe der Hyper-V oder KVM Verwaltungskonsole.
  2. Führen Sie das Anwendungsupgrade in der virtuellen Maschine durch.
  3. Validieren Sie die aktualisierte Anwendung.
  4. Wenn das Upgrade erfolgreich war, entfernen Sie den Snapshot und setzen Sie den normalen Betrieb fort.
  5. Wenn ein Problem auftritt, stellen Sie die virtuelle Maschine aus dem Snapshot wieder her und kehren Sie sofort zum vorherigen, bekannten funktionierenden Zustand zurück.


Die Dienstunterbrechung ist auf die Dauer beschränkt, die normalerweise für das Upgrade-Verfahren der Anwendung selbst erforderlich ist.

### Vorteile des VM-Level-Schutzes {#benefits-of-vm-level-protection}

  * Nur eine Anwendungsinstanz muss verwaltet werden.
  * Kein clusterspezifisches Upgrade-Verfahren.
  * Schnelle Wiederherstellung durch VM-Snapshots.
  * Reduzierte operative Komplexität.
  * Konsistenter Upgrade-Prozess, unabhängig von der geschützten Anwendung.


Dieser Ansatz ist besonders attraktiv für vorkonfigurierte Anwendungen und kommerzielle Standardsoftware, bei denen Anwendungsclusterung nicht verfügbar oder schwer zu implementieren ist.

## Hochverfügbarkeit auf Anwendungsebene {#app-level-ha}

In einem traditionellen SafeKit-Cluster wird die Anwendung auf zwei Knoten installiert: Knoten 1 und Knoten 2. SafeKit synchronisiert die Anwendungsdaten zwischen diesen Knoten und übernimmt bei Bedarf automatisch das Failover.

### Minor-Versions-Upgrade der Anwendung {#app-level-ha-minor}

Ein Minor-Upgrade modifiziert nur Anwendungsbinärdateien, während die replizierten Daten zwischen den Versionen vollständig kompatibel bleiben. Da sich das replizierte Datenformat nicht ändert, unterstützt SafeKit ein Rolling-Upgrade mit minimaler Ausfallzeit. 

  1. Der Cluster läuft zunächst in einer **✅ PRIM (Knoten 1) / ✅ SECOND (Knoten 2)**-Konfiguration. Die Anwendung läuft auf dem PRIM-Knoten. Die replizierten Daten werden kontinuierlich mit dem SECOND-Knoten synchronisiert.
  2. Stoppen Sie das SafeKit-Modul auf dem SECOND-Knoten. Sein Status wird zu **❌ STOP (Knoten 2)**. Aktualisieren Sie die Anwendung und starten Sie das Modul neu. Während dieses Vorgangs läuft die Anwendung auf Knoten 1 im Status **✅ ALONE (Knoten 1)** weiter. Es kommt zu keiner Dienstunterbrechung.
  3. Nach dem Neustart tritt der aktualisierte Knoten dem Cluster als **✅ SECOND (Knoten 2)** wieder bei. Er synchronisiert die replizierten Daten neu.
  4. Stoppen Sie den PRIM-Knoten. Sein Status wird zu **❌ STOP (Knoten 1)**. SafeKit führt automatisch ein Failover durch. Der aktualisierte Knoten wird zu **✅ ALONE (Knoten 2)**. Die Anwendung wird auf diesem Knoten neu gestartet. Die Ausfallzeit ist auf die Failover- und Anwendungsneustartzeit beschränkt.
  5. Wenn die aktualisierte Anwendung auf Knoten 2 korrekt funktioniert, aktualisieren Sie den verbleibenden Knoten (Knoten 1) und starten Sie sein SafeKit-Modul neu.
  6. Nach der Resynchronisierung kehrt der Cluster zu einer normalen **✅ SECOND (Knoten 1) / ✅ PRIM (Knoten 2)**-Konfiguration zurück. Die ursprünglichen Rollen können entweder manuell über die SafeKit-Administrationskonsole oder automatisch über die SafeKit-Konfiguration wiederhergestellt werden.


**Rollback-Verfahren**

  * Stoppen Sie in Schritt 5 den Knoten 2 im Zustand **✅ ALONE (Knoten 2)**.
  * Starten Sie den ursprünglichen Knoten (Knoten 1) als primären Knoten mit der vorherigen Anwendungsversion neu. Sein Status ist **✅ ALONE (Knoten 1)**.
  * Installieren Sie die vorherige Version auf dem aktualisierten Knoten (Knoten 2) neu.
  * Stellen Sie die normale **✅ PRIM (Knoten 1) / ✅ SECOND (Knoten 2)**-Konfiguration wieder her.


Die Ausfallzeit für das vollständige Upgrade ist auf den Übergang von **✅ PRIM/✅ SECOND** zu **❌ STOP/✅ ALONE** beschränkt.

### Major-Versions-Upgrade der Anwendung {#app-level-ha-major}

Ein Major-Upgrade ändert das Format oder die Struktur der replizierten Daten. Da die von der neuen Version generierten Daten nicht mehr mit der alten Version kompatibel sind, kann kein rollierendes Upgrade durchgeführt werden.

  1. Der Cluster läuft zunächst in einer **✅ PRIM (Knoten 1) / ✅ SECOND (Knoten 2)**-Konfiguration.
  2. Stoppen Sie den SECOND-Knoten und dann den PRIM-Knoten. Der Cluster wechselt zu **❌ STOP (Knoten 1) / ❌ STOP (Knoten 2)**.
  3. Aktualisieren Sie den ehemaligen PRIM-Knoten und starten Sie ihn neu. Der Knoten startet allein mit der neuen Anwendungsversion. Sein Status ist **✅ ALONE (Knoten 1)**.
  4. Validieren Sie die aktualisierte Anwendung und vergewissern Sie sich, dass sie korrekt funktioniert.
  5. Wenn die Validierung erfolgreich ist, aktualisieren Sie den verbleibenden Knoten und starten Sie sein SafeKit-Modul neu.
  6. Der aktualisierte Knoten wird zu **✅ SECOND (Knoten 2)**. Er synchronisiert die Anwendungsdaten neu. Der Cluster kehrt zu einer normalen **✅ PRIM (Knoten 1) / ✅ SECOND (Knoten 2)**-Konfiguration zurück.


**Rollback-Verfahren**

  * Stoppen Sie in Schritt 5 den aktualisierten Knoten 1 im Status **✅ ALONE (Knoten 1)**.
  * Starten Sie den nicht aktualisierten Knoten (Knoten 2) als primären Knoten neu. Sein Status ist **✅ ALONE (Knoten 2)**.
  * Installieren Sie die vorherige Anwendungsversion auf dem aktualisierten Knoten neu.
  * Stellen Sie die ursprüngliche **✅ SECOND (Knoten 1) / ✅ PRIM (Knoten 2)**-Konfiguration wieder her.


Da die replizierten Daten während der Migration geändert werden, entspricht die Ausfallzeit dem Zeitraum zwischen dem Status **❌ STOP/❌ STOP** und dem Neustart des ersten aktualisierten Knotens als **✅ ALONE**.

### Vorteile von SafeKit für Anwendungs-Upgrades {#why-safekit-simplifies-application-upgrades}

SafeKit minimiert das Betriebsrisiko:

  * Administratoren aktualisieren jeweils einen Knoten.
  * SafeKit gewährleistet die Dienstverfügbarkeit, wann immer dies möglich ist.
  * Neue Versionen werden validiert, bevor der Produktionsverkehr umgestellt wird.
  * Administratoren können bei unerwarteten Problemen schnell zum vorherigen Knoten zurückkehren.


## Die richtige Upgrade-Strategie wählen {#choosing-the-right-upgrade-strategy}

Bereitstellungsmodell | Anwendungsinstanzen | Auswirkungen replizierter Daten | Upgrade-Ansatz  
---|---|---|---  
Hochverfügbarkeit auf Anwendungsebene | Zwei Knoten | Abhängig von der Upgrade-Art | Rolling Upgrade mit Failover  
VM-Level-HA mit hyperv.safe oder kvm.safe | Eine VM | Innerhalb der VM verwaltet | Snapshot erstellen, aktualisieren, validieren, bei Bedarf zurücksetzen  
  
## Schlussfolgerung {#conclusion}

SafeKit bietet flexible Hochverfügbarkeitsarchitekturen, die sich an die betrieblichen Anforderungen verschiedener Anwendungen anpassen. Egal, ob Sie eine geclusterte Anwendung über zwei Knoten oder eine einzelne Anwendungsinstanz, die in einer virtuellen Maschine läuft, schützen, SafeKit ermöglicht kontrollierte Upgrades, minimiert Ausfallzeiten und bietet zuverlässige Wiederherstellungsoptionen, wenn Wartungsarbeiten erforderlich sind.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
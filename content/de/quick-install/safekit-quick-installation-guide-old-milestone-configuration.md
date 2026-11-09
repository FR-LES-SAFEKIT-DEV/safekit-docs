---
title: "Alte SafeKit Milestone-Konfiguration"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "de"
topics: "Schritt-für-Schritt-Konfiguration der SafeKit/Milestone XProtect-Lösung"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# Alte SafeKit Milestone-Konfiguration {#old-safekit-milestone-configuration}

## Schritt-für-Schritt-Konfiguration der SafeKit/Milestone XProtect-Lösung {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Seien Sie vorsichtig, es sind einige spezifische Schritte erforderlich, um die virtuelle IP-Adresse zu konfigurieren, da sonst das Failover nicht funktioniert.

### 1. Starten Sie die SafeKit Konsole {#1-launch-the-safekit-console}

  * Starten Sie die Webkonsole in einem Browser auf einem Clusterknoten, indem Sie eine Verbindung zu `http://localhost:9010` herstellen.
  * Geben Sie als Benutzernamen `admin` und das während der Installation festgelegte Passwort ein.


Sie können die Konsole auch in einem Browser auf einer Workstation außerhalb des Clusters ausführen.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Die Konfiguration von SafeKit erfolgt auf beiden Knoten über einen einzigen Browser.


![Hinweis](/wp-content/uploads/2022/07/note.png)


Informationen zur Sicherung der Webkonsole finden Sie unter „Sichern der SafeKit-Webkonsole“ im Benutzerhandbuch.


![Starten Sie die SafeKit Webkonsole, um den Cluster zu konfigurieren](/wp-content/uploads/2023/01/appli-1.png)


### 2. Knotenadressen konfigurieren {#2-configure-node-addresses}

  * Geben Sie die IP-Adressen der Knoten ein.
  * Klicken Sie anschließend auf `Apply`, um die Konfiguration zu speichern.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn die Hintergrundfarbe node1 oder node2 rot ist, überprüfen Sie die Konnektivität des Browsers zu beiden Knoten und überprüfen Sie die Firewall auf beiden Knoten zur Fehlerbehebung.


![Hinweis](/wp-content/uploads/2022/07/note.png)


Dieser Vorgang platziert die IP-Adressen in der Datei `cluster.xml` auf beiden Knoten (weitere Informationen im Training mit der Befehlszeile).


![Geben Sie die Knoten des Clusters ein](/wp-content/uploads/2023/01/appli-3.png)


### 3. Modul auswählen {#3-choose-the-module}

  * Klicken Sie auf der Registerkarte „Konfiguration“ auf das Modul „.safe“.


![Hinweis](/wp-content/uploads/2022/07/note.png)


Die Konsole findet xxx.safe im Verzeichnis „Application_Modules/demo/“ auf der Serverseite, wenn Sie während der Installation ein Modul dort abgelegt haben.


![Wählen Sie das Modul für](/wp-content/uploads/2023/01/appli-4.png)


### 4. Modul konfigurieren {#4-configure-the-module}

  * Wählen Sie einen automatischen Start des Moduls beim Hochfahren ohne Verzögerung.
  * Normalerweise haben Sie ein einzelnes Heartbeat Netzwerk, über das die Replikation erfolgt. Bei Bedarf können Sie jedoch ein privates Netzwerk definieren.
  * Überprüfen Sie, ob die replizierten Verzeichnisse auf beiden Knoten installiert sind und die Anwendungsdaten enthalten.  
Für eine Datenbank ist die Replikation von Daten und Protokollen erforderlich.  
Sie können bei Bedarf neue replizierte Verzeichnisse hinzufügen.
  * Geben Sie eine virtuelle IP-Adresse ein. Eine virtuelle IP-Adresse ist eine Standard-IP-Adresse im selben IP-Netzwerk (dasselbe Subnetz) wie die IP-Adressen beider Knoten.  
Anwendungsklienten müssen mit der virtuellen IP-Adresse (oder dem mit der virtuellen IP-Adresse verknüpften DNS-Namen) konfiguriert werden.  
Die virtuelle IP-Adresse wird im Fehlerfall automatisch umgeschaltet.
  * `start_prim` und `stop_prim` müssen das Starten und Stoppen der Anwendung enthalten.  
Sie können neue Dienste in diesen Skripten hinzufügen.  
Überprüfen Sie, ob die Namen der Dienste in diesen Skripten mit denen übereinstimmen, die auf beiden Knoten installiert sind, andernfalls ändern Sie sie in den Skripten.
  * Stoppen Sie die in `start_prim` konfigurierten Dienste auf beiden Knoten.
  * Legen Sie unter Windows und auf beiden Knoten mit dem Windows-Dienstemanager `Boot Startup Type = Manual` für alle in `start_prim` registrierten Dienste auf „Manuell“ fest (SafeKit steuert den Start der Dienste in `start_prim`).


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn sich SQL auf dem Management-Server befindet:

  * Die [SQL-Systemdatenbanken](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (wie master.mdf und mastlog.ldf) müssen sich in denselben Verzeichnissen auf beiden Knoten befinden. Die Verzeichnisse müssen als repliziert konfiguriert sein.
  * SQL muss auch am gleichen Ort im Dateisystem auf beiden Knoten installiert sein, da sich die schreibgeschützte [SQL-Ressourcendatenbank](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) in der Binärdatei befindet und für das Failover erforderlich ist. Diese Datenbank muss nicht repliziert werden.
  * Die SQL-Milestone-Datenbanken (.mdf und .ldf) müssen sich auf beiden Knoten in denselben Verzeichnissen befinden. Die Verzeichnisse müssen als repliziert konfiguriert sein. Milestone-Datenbanken sind gemäß diesem [Artikel](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) wie folgt:


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Beachten Sie, dass ein Prozessname, der im Process Checker angezeigt wird, im Falle eines Fehlers mit einer Neustartaktion überwacht wird. Die Konfiguration eines falschen Prozessnamens führt dazu, dass das Modul direkt nach dem Start beendet wird.


![Hinweis](/wp-content/uploads/2022/07/note.png)


Die Schaltfläche „Anwenden“ meldet die Konfiguration in den Dateien `userconfig.xml`, `start_prim` und `stop_prim` auf beiden Knoten (weitere Informationen im Training mit der Befehlszeile).


![Moduleinstellungen aufrufen](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Erfolgreiche Konfiguration überprüfen {#5-verify-successful-configuration}

  * Überprüfen Sie die Erfolgsmeldung (grün) auf beiden Knoten und klicken Sie auf „Weiter“.


![Überprüfen Sie den Erfolg der Modulkonfiguration](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Starten Sie nichts und klicken Sie auf die Schaltfläche „Schließen“ {#6-do-not-start-anything-and-click-on-the-close-button}


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Starten Sie nichts und klicken Sie auf die Schaltfläche „Schließen“, da vor dem Start eine spezielle Konfiguration der virtuellen IP-Adresse erforderlich ist


![Wählen Sie den Knoten mit den aktuellen Daten aus](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Gehen Sie zum Desktop von Knoten 1 und legen Sie die virtuelle IP-Adresse in den internen Milestone-Dateien fest {#milestone-files}


![Hinweis](/wp-content/uploads/2022/07/note.png)


Seit Milestone 2022 R3 ist dieser Schritt nicht mehr sinnvoll und wird in einem nächsten Schritt automatisch mit " Server Configurator - Server registrieren - http://virtual-IP" durchgeführt.

Führen Sie in einer Powershell-Befehlszeile als Administrator auf Knoten 1 dieses Skript aus:
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![Hinweis](/wp-content/uploads/2022/07/note.png)


Dieses Skript legt die virtuelle IP-Adresse in zwei internen Milestone Dateien fest:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< virtuelle IP-Adresse>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtuelle-IP>**/IDP"


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wir gehen in diesem Schritt davon aus, dass die virtuelle IP-Adresse in den vorherigen Schritten korrekt konfiguriert wurde (das Skript verwendet die virtuelle IP-Adresse, die in der SafeKit Konsole eingegeben und in `userconfig.xml` gespeichert wurde).


![Hinweis](/wp-content/uploads/2022/07/note.png)


### 8. Starten Sie Knoten 1 als primären Knoten in der Konsole, den Knoten mit den aktuellsten Daten {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Wir gehen ab Schritt 7 davon aus, dass Knoten 1 über die aktuellsten replizierten Verzeichnisse verfügt.

Erzwingen Sie den Start von Knoten 1 als primären Knoten. Wenn Knoten 2 gestartet wird, werden alle Daten von Knoten 1 auf Knoten 2 kopiert.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn Sie die falsche Wahl treffen, laufen Sie Gefahr, veraltete Daten auf beiden Knoten zu synchronisieren.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Es wird auch davon ausgegangen, dass die Anwendung auf Knoten 1 gestoppt wird, damit SafeKit die Replikationsmechanismen installiert und dann die Anwendung im `start_prim` Skript startet.


![Erzwingen Sie den Start des Knotens mit den aktuellen Daten als primärer Knoten](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Warten Sie auf den Übergang zu ALONE (grün) {#9-wait-for-the-transition-to-alone-green}

  * Knoten 1 sollte den ALONE Zustand (grün) erreichen, was bedeutet, dass das `start_prim`-Skript auf Knoten 1 ausgeführt wurde.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn der Status ALONE (grün) ist und die Anwendung nicht gestartet wurde, überprüfen Sie die Ausgabemeldungen von `start_prim` im Anwendungsprotokoll von Knoten 1.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn Knoten 1 den Zustand ALONE (grün) nicht erreicht, analysieren Sie die Ursache mithilfe des Modulprotokolls von Knoten 1.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn sich der Cluster im Zustand `WAIT (red) not uptodate - STOP (red) not uptodate`, stoppen Sie den WAIT Knoten und erzwingen Sie seinen Start als primärer Knoten.


![Der erste Knoten startet als primärer Knoten und wird ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Stoppen Sie auf dem Desktop von Knoten 1 den Dienst, registrieren Sie ihn dann auf der virtuellen IP-Adresse und starten Sie den Milestone Management Server neu {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Führen Sie die folgenden Punkte auf Knoten 1 gemäß dem Menü im Bild aus:

  * Klicken Sie mit der rechten Maustaste auf das Symbol **Milestone Management Servers** in der Taskleiste.
  * **Management-Server-Dienst beenden**
  * Wählen Sie dann **Server Configurator ...** und registrieren Sie die virtuelle IP-Adresse.
  * **Management-Server-Dienst starten**


![Hinweis](/wp-content/uploads/2022/07/note.png)


Dieses Verfahren registriert den Management-Server von Knoten 1 in der SQL-Datenbank (die auf Knoten 1 läuft) über eine Verbindung zur virtuellen Adresse.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Vor der Version Milestone 2022 R3 hat die Registrierung möglicherweise die Konfiguration der virtuellen IP-Adresse in den internen Milestone Dateien gelöscht. Wiederholen Sie in diesem Fall [Schritt 7](#milestone-files).


![Hinweis](/wp-content/uploads/2022/07/note.png)


Hinweis: Um eine Version vor Milestone 2020 R2 zu registrieren, verwenden Sie **„Verschlüsselungseinstellungen ändern...“.**


![Registrieren Sie den Management-Server in Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Legen Sie auf dem Desktop von Knoten 1 mit Milestone Management Client die virtuelle IP-Adresse in den URLs für Dienste und Netzwerk fest {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![Hinweis](/wp-content/uploads/2022/07/note.png)


Seit Milestone 2022 R3 ist dieser Schritt nicht mehr sinnvoll und wird automatisch mit " Server Configurator - Registrieren von Servern - http://virtual-IP".

Dem Bild zufolge:

  1. Starten Sie **Milestone XProtect Management Client** auf Knoten 1.
  2. Wählen Sie im Menü **„Extras“** die **Option „Registrierte Dienste“** aus. 
     * Wählen Sie im Fenster **„Registrierte Dienste hinzufügen/entfernen“** einen Dienst in der Liste aus und klicken Sie auf **„Bearbeiten“**.
     * Ändern Sie im Fenster **„Registrierten Dienst bearbeiten“** die URL-Adresse des Dienstes in dieselbe URL-Adresse, die jedoch die virtuelle IP-Adresse enthält.
     * Wiederholen Sie diese Schritte für alle im Fenster aufgelisteten Dienste.
  3. Klicken Sie im selben Fenster auf **Netzwerk**. 
     * Ändern Sie im Fenster **„Netzwerkkonfiguration“** die URL-Adresse des Servers in dieselbe URL-Adresse, die jedoch die virtuelle IP-Adresse enthält.


![Legen Sie die virtuelle IP-Adresse in den URLs und im Milestone Management Client fest](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Legen Sie auf dem Desktop von Knoten 1 mit Milestone Management Client die Administratorrollen fest, um ein korrektes Failover zu gewährleisten {#role}


![Hinweis](/wp-content/uploads/2022/07/note.png)


Wenn Milestone „ Windows-Authentifizierung“ mit einem Active Directory konfiguriert wurde, werden der Benutzer/das Passwort im externen AD auf dem sekundären Knoten nach einem Failover abgerufen, sodass keine spezielle Konfiguration erforderlich ist.

Wenn Sie den Milestone XProtect Management Client starten, müssen Sie sich entweder mit " Windows Authentifizierung" oder "Basisauthentifizierung" authentifizieren ([klicken Sie hier, um den Screenshot zu sehen](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

Öffnen Sie **Milestone XProtect Management Client** und gehen Sie zu **Sicherheit/Rollen** (siehe Abbildung)

  * Legen Sie die Windows Gruppe **BUILTIN\Administrators** fest. So kann sich ein Administratorbenutzer auf dem Sekundärserver mit „ Windows Authentifizierung“ mit Milestone auf dem Sekundärserver verbinden.
  * Erstellen Sie einen Benutzer mit „Basisauthentifizierung“ (im Bild als **Admin**), um sicherzustellen, dass Sie sich nach einem Failover am sekundären Knoten erneut authentifizieren. Bei der „Basisauthentifizierung“ werden Benutzername/Passwort in der SQL-Datenbank gespeichert und nach einem Failover auf dem sekundären Knoten abgerufen.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Durch das Festlegen der Gruppe BUILTIN\Administrators können Sie sich am sekundären Knoten mit einem lokalen Windows Administrator authentifizieren.

Andernfalls ist nach einem Failover keine Authentifizierung mit einem lokalen Windows Konto auf dem sekundären Server möglich.

Das liegt daran, dass die BUILTIN\Administrators-Gruppe auf beiden Knoten dieselbe SID hat. Für andere lokale Gruppen oder lokale Benutzer ist die Authentifizierung auf dem sekundären Knoten nicht möglich, da die SIDs zwischen beiden Knoten unterschiedlich sind, auch wenn sie denselben Namen haben.


![Rollen im Milestone Management Client festlegen](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Gehen Sie zum Desktop von Knoten 2 und legen Sie die virtuelle IP-Adresse in den internen Milestone Dateien fest {#milestone-files-2}


![Hinweis](/wp-content/uploads/2022/07/note.png)


Seit Milestone 2022 R3 ist dieser Schritt nicht mehr sinnvoll und wird in einem nächsten Schritt automatisch mit " Server Configurator - Server registrieren - http://virtual-IP" durchgeführt.

Führen Sie in einer Powershell-Befehlszeile als Administrator auf Knoten 2 dieses Skript aus:
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![Hinweis](/wp-content/uploads/2022/07/note.png)


Dieses Skript legt die virtuelle IP-Adresse in zwei internen Milestone Dateien fest:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< virtuelle IP-Adresse>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtuelle-IP>**/IDP"

### 14. Registrieren Sie auf dem Desktop von Knoten 2 den Verwaltungsserver unter der virtuellen IP-Adresse {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Wählen Sie im Taskleistenbereich von Knoten 2 **Server Configurator** aus und registrieren Sie ihn auf der virtuellen IP-Adresse (siehe Abbildung).
  * **Beenden Sie dann den Management-Server-Dienst**.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Das Konto des Benutzers, der die Registrierung auf Knoten 2 ausführt, muss über die Administratorrolle in Milestone auf Knoten 1 verfügen.

Wenn der lokale Administrator auf Knoten 2 die Registrierung vornimmt, muss die integrierte Windows Gruppe `BUILTIN\Administrators` in [Schritt 12](#role) im Management Client unter Sicherheit/Rollen festgelegt worden sein. Andernfalls funktioniert die Registrierung nicht.


![Hinweis](/wp-content/uploads/2022/07/note.png)


Dieses Verfahren registriert den Management-Server von Knoten 2 in der SQL-Datenbank (die auf Knoten 1 läuft) über eine Verbindung zur virtuellen Adresse.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Bei einer Version von Milestone vor 2022 R3 hat die Registrierung möglicherweise die Konfiguration der virtuellen IP-Adresse in den internen Milestone Dateien gelöscht. Wiederholen Sie in diesem Fall [Schritt 13](#milestone-files-2).


![Registrieren Sie den Management-Server bei Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Startknoten 2 {#15-start-node-2}

  * Starten Sie Knoten 2 mit seinem Kontextmenü.
  * Warten Sie auf den SECOND (grünen) Zustand.


![Hinweis](/wp-content/uploads/2022/07/note.png)


Knoten 2 bleibt im SECOND (magentafarbenen) Zustand, während die replizierten Verzeichnisse resynchronisiert werden (Kopie von Knoten 1 auf Knoten 2).

Dies kann je nach Größe der in replizierten Verzeichnissen zu resynchronisierenden Dateien und der Netzwerkbandbreite einige Zeit dauern.

Um den Fortschritt des Kopiervorgangs zu sehen, rufen Sie das Modulprotokoll von Knoten 2 mit der Option „verbose“ auf und vergessen Sie nicht, das Fenster zu aktualisieren.


![Der erste Knoten startet als primärer Knoten und wird ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. Überprüfen Sie, ob der Cluster betriebsbereit ist {#16-verify-that-the-cluster-is-operational}

  * Überprüfen Sie, ob das Cluster grün/grün ist und die Dienste auf dem PRIM-Knoten ausgeführt werden und nicht auf dem SECOND-Knoten.


In diesem Zustand werden nur Änderungen innerhalb von Dateien in Echtzeit repliziert.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Komponenten, die Clients von Diensten sind, müssen mit der virtuellen IP-Adresse konfiguriert werden. Die Konfiguration kann mit einem DNS-Namen erfolgen (wenn ein DNS-Name erstellt und der virtuellen IP-Adresse zugeordnet wurde).


![Der zweite Knoten beginnt als SECOND](/wp-content/uploads/2022/07/appli-12.png)


### 17. Konfigurieren Sie die virtuelle IP-Adresse in den Aufzeichnungsservern {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Installieren Sie entweder die Aufzeichnungsserver und geben Sie die virtuelle IP-Adresse in der Installations-URL an.
  * Oder legen Sie auf der Seite der Aufzeichnungsserver die virtuelle IP-Adresse in den folgenden Feldern fest: 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Verbinden Sie den Milestone Management Client und den Milestone Smart Client mit der virtuellen IP-Adresse.


### 18. Management Client und Smart Client funktionieren nach dem Knotenwechsel nicht ordnungsgemäß {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

In einem geclusterten XProtect Management Server-Setup zeigen Smart Client und Management Client nach einem Knotenwechsel verschiedene Probleme an. Das Problem hängt mit Token zusammen, die vor und nach dem Knotenwechsel auf verschiedenen Knoten generiert werden, sowie mit Problemen beim Zugriff auf bestimmte Zertifikate, die für die Token-Validierung erforderlich sind. Eine Lösung ist verfügbar (für die Versionen 2022 R3 bis 2023 R2, siehe Milestone KB).

Das Problem wird in Milestone 2023 R3 behoben.

### 18. Tests {#18-testing}

  * Stoppen Sie den PRIM-Knoten, indem Sie im Kontextmenü nach unten scrollen und auf „Stoppen“ klicken. **Verwenden Sie für einen ersten Test keinen Swap** (siehe unten, warum).
  * Überprüfen Sie, ob auf dem SECOND Knoten ein Failover stattfindet, der ALONE (grün) sein sollte.
  * Überprüfen Sie mit Microsoft Management Console (MMC) das Failover der Dienste (gestoppt auf Knoten 1 im `stop_prim`-Skript und gestartet auf Knoten 2 im `start_prim`-Skript).


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn Ihr System PRIM-SECOND ist und alles ordnungsgemäß funktioniert, führen Sie einen Stopp auf PRIM durch und überprüfen Sie, ob alles korrekt auf node2 funktioniert, der dann ALONE wird. Wenn alles in Ordnung ist, starten Sie node1, wodurch die replizierten Verzeichnisse von node2 erneut synchronisiert werden.

Wenn etwas schiefgeht, stoppen Sie node2 und erzwingen Sie den Start von node1 als primären Knoten, der mit seinen lokal intakten Daten zum Zeitpunkt des Stopps neu gestartet wird.

Der Swap beinhaltet einen Stop-Start des PRIM, der die Daten von node2 unmittelbar nach dem Stopp neu synchronisiert, sodass keine Möglichkeit für einen Neustart mit intakten Daten besteht, wenn ein Problem mit der Replikationskonfiguration vorliegt.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn die Anwendung auf Knoten 2 nicht gestartet wird, während der Status ALONE (grün) ist, überprüfen Sie die Ausgabemeldungen des `start_prim`-Skripts im Anwendungsprotokoll von Knoten 2.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn ALONE (grün) nicht erreicht wird, analysieren Sie dies mit dem Modulprotokoll von Knoten 2.


![Hinweis](/wp-content/uploads/2022/07/note.png)


Weitere Informationen zu den Tests finden Sie im Benutzerhandbuch


![Stoppen Sie das Modul auf dem PRIM-Server](/wp-content/uploads/2022/07/appli-19.png)
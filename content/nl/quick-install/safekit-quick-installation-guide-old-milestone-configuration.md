---
title: "Oude SafeKit Milestone-configuratie"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "nl"
topics: "Oude stap-voor-stapconfiguratie van de SafeKit/Milestone XProtect oplossing"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Oude SafeKit Milestone-configuratie {#old-safekit-milestone-configuration}

## Oude stap-voor-stapconfiguratie van de SafeKit/Milestone XProtect oplossing {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Wees voorzichtig, er zijn specifieke stappen vereist om de virtuele IP-configuratie in te stellen, anders werkt de failover niet.

### 1. Start de SafeKit console {#1-launch-the-safekit-console}

  * Start de webconsole in een browser op een clusterknooppunt door verbinding te maken met `http://localhost:9010`.
  * Voer `admin` in als gebruikersnaam en het wachtwoord dat tijdens de installatie is gedefinieerd.


U kunt de console ook in een browser uitvoeren op een werkstation dat zich buiten het cluster bevindt.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


De configuratie van SafeKit wordt op beide knooppunten vanuit één browser uitgevoerd.


![Opmerking](/wp-content/uploads/2022/07/note.png)


Raadpleeg 'De SafeKit webconsole beveiligen' in de gebruikershandleiding om de webconsole te beveiligen.


![Start de SafeKit webconsole om het cluster te configureren](/wp-content/uploads/2023/01/appli-1.png)


### 2. Knoopp Adressen configureren {#2-configure-node-addresses}

  * Voer de IP-adressen van de knooppunten in.
  * Klik vervolgens op `Apply` om de configuratie op te slaan.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als de achtergrondkleur node1 of node2 rood is, controleer dan de connectiviteit van de browser met beide nodes en controleer de firewall op beide nodes voor probleemoplossing.


![Opmerking](/wp-content/uploads/2022/07/note.png)


Met deze bewerking worden de IP-adressen in het bestand `cluster.xml` op beide knooppunten geplaatst (meer informatie in de training met de opdrachtregel).


![Voer de knooppunten van het cluster in](/wp-content/uploads/2023/01/appli-3.png)


### 3. Kies de module {#3-choose-the-module}

  * Klik in het tabblad Configuratie op de .safe-module.


![Opmerking](/wp-content/uploads/2022/07/note.png)


De console vindt xxx.safe in de map 'Application_Modules/demo/' aan de serverzijde als u daar tijdens de installatie een module hebt neergezet.


![Kies de module voor](/wp-content/uploads/2023/01/appli-4.png)


### 4. De module configureren {#4-configure-the-module}

  * Kies voor een automatische start van de module bij het opstarten zonder vertraging.
  * Normaal gesproken heeft u één heartbeat netwerk waarop de replicatie wordt uitgevoerd. Indien nodig kunt u echter een privénetwerk definiëren.
  * Controleer of de gerepliceerde mappen op beide knooppunten zijn geïnstalleerd en de toepassingsgegevens bevatten.  
Replicatie van gegevens en logboeken is vereist voor een database.  
U kunt naar behoefte nieuwe gerepliceerde mappen toevoegen.
  * Voer een virtueel IP-adres in. Een virtueel IP-adres is een standaard IP-adres in hetzelfde IP-netwerk (hetzelfde subnet) als de IP-adressen van beide knooppunten.  
Applicatieclients moeten worden geconfigureerd met het virtuele IP-adres (of de DNS-naam die aan het virtuele IP-adres is gekoppeld).  
Het virtuele IP-adres wordt automatisch omgeschakeld in geval van een storing.
  * `start_prim` en `stop_prim` moeten het starten en stoppen van de applicatie bevatten.  
U kunt nieuwe services toevoegen aan deze scripts.  
Controleer of de namen van de services in deze scripts overeenkomen met de services die op beide knooppunten zijn geïnstalleerd. Pas ze anders aan in de scripts.
  * Stop de services die zijn geconfigureerd in `start_prim` op beide knooppunten.
  * Stel op Windows en op beide knooppunten, met de Windows servicebeheerder, `Boot Startup Type = Manual` voor alle services die zijn geregistreerd in `start_prim` (SafeKit regelt het starten van services in `start_prim`).


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als SQL zich op de beheerserver bevindt:

  * De [SQL-systeemdatabases](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (zoals master.mdf en mastlog.ldf) moeten zich in dezelfde mappen op beide knooppunten bevinden. De mappen moeten worden geconfigureerd als gerepliceerd.
  * SQL moet ook op dezelfde locatie in het bestandssysteem op beide knooppunten worden geïnstalleerd, omdat de alleen-lezen [SQL-resource database](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) zich in het binaire bestand bevindt en vereist is voor de failover. Deze database hoeft niet te worden gerepliceerd.
  * De SQL Milestone databases (.mdf en .ldf) moeten zich in dezelfde mappen op beide knooppunten bevinden. De mappen moeten worden geconfigureerd als gerepliceerd. Milestone databases zijn als volgt volgens dit [artikel](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>).


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Merk op dat als een procesnaam wordt weergegeven in Process Checker, deze wordt gemonitord met een herstartactie in geval van een storing. Het configureren van een verkeerde procesnaam zal ervoor zorgen dat de module direct na de start stopt.


![Opmerking](/wp-content/uploads/2022/07/note.png)


De knop "Toepassen" rapporteert de configuratie in de bestanden `userconfig.xml`, `start_prim`, `stop_prim` op beide knooppunten (meer informatie in de training met de opdrachtregel).


![Ga naar de module-instellingen](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Controleer of de configuratie succesvol is {#5-verify-successful-configuration}

  * Controleer het succesbericht (groen) op beide knooppunten en klik op Volgende.


![Controleer of de moduleconfiguratie succesvol is](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Start niets en klik op de knop Sluiten {#6-do-not-start-anything-and-click-on-the-close-button}


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Start niets en klik op de knop Sluiten, want er is een speciale configuratie van het virtuele IP-adres vereist voordat u begint


![Selecteer de node met de meest recente gegevens](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Ga naar het bureaublad van node 1 en stel het virtuele IP-adres in de interne Milestone bestanden in {#milestone-files}


![Opmerking](/wp-content/uploads/2022/07/note.png)


Sinds Milestone 2022 R3 is deze stap niet nuttig en wordt deze automatisch uitgevoerd met " Server Configurator - Servers registreren - http://virtual-IP" in een volgende stap.

Voer dit script als beheerder uit op knooppunt 1 in een Powershell-opdrachtregel:
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![Opmerking](/wp-content/uploads/2022/07/note.png)


Dit script stelt het virtuele IP-adres in twee interne Milestone bestanden in:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< <virtueel-IP-adres>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtual-ip>**/IDP"


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


We gaan er in deze stap van uit dat het virtuele IP-adres correct is geconfigureerd in de vorige stappen (het script gebruikt het virtuele IP-adres dat is ingevoerd in de SafeKit console en is opgeslagen in `userconfig.xml`).


![Opmerking](/wp-content/uploads/2022/07/note.png)


### 8. Start knooppunt 1 als primair in de console, het knooppunt met de meest recente gegevens {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Vanaf stap 7 gaan we ervan uit dat knooppunt 1 de meest recente gerepliceerde mappen heeft.

Forceer het starten van node 1 als primair. Wanneer node 2 wordt gestart, worden alle gegevens van node 1 gekopieerd naar node 2.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als u de verkeerde keuze maakt, loopt u het risico dat u verouderde gegevens op beide knooppunten synchroniseert.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Er wordt ook aangenomen dat de toepassing op knooppunt 1 wordt gestopt, zodat SafeKit de replicatiemechanismen installeert en vervolgens de toepassing start in het `start_prim` script.


![Forceer de start als primair van de node met de meest recente gegevens](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Wacht tot de overgang naar ALONE (groen) {#9-wait-for-the-transition-to-alone-green}

  * Knooppunt 1 moet de ALONE status (groen) bereiken, wat betekent dat het `start_prim` script op knooppunt 1 is uitgevoerd.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als de status ALONE (groen) is en de toepassing niet is gestart, controleer dan de uitvoerberichten van `start_prim` in het toepassingslogboek van node 1.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als knooppunt 1 de status ALONE (groen) niet bereikt, analyseer dan waarom met het modullogboek van knooppunt 1.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als de cluster zich in de status `WAIT (red) not uptodate - STOP (red) not uptodate`, stop dan het WAIT knooppunt en forceer de start ervan als primair.


![Het eerste knooppunt begint als primair en wordt ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Stop op het bureaublad van node 1, registreer vervolgens op het virtuele IP-adres en start de Milestone Management Server opnieuw op {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Voer de volgende stappen uit op knooppunt 1 volgens het menu in de afbeelding:

  * Klik met de rechtermuisknop op het pictogram van de **Milestone Management Server** in de taakbalk.
  * **Beheerserverdienst stoppen**
  * Kies vervolgens **Server Configurator ...** en registreer het virtuele IP-adres.
  * **Beheerserverdienst starten**


![Opmerking](/wp-content/uploads/2022/07/note.png)


Deze procedure registreert de beheerserver van knooppunt 1 in de SQL-database (die op knooppunt 1 draait) via een verbinding met het virtuele adres.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Vóór Milestone 2022 R3-versie kan de registratie de configuratie van het virtuele IP-adres in de interne Milestone bestanden hebben verwijderd. Herhaal in dit geval [stap 7](#milestone-files).


![Opmerking](/wp-content/uploads/2022/07/note.png)


Opmerking: Om een versie vóór Milestone 2020 R2 te registreren, gebruikt u **Wijzig versleutelingsinstellingen...**


![Registreer de beheerserver in Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Stel op het bureaublad van knooppunt 1 met Milestone Management Client het virtuele IP-adres in in de URL's voor services en netwerk {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![Opmerking](/wp-content/uploads/2022/07/note.png)


Sinds Milestone 2022 R3 is deze stap niet nuttig en wordt deze automatisch uitgevoerd met " Server Configurator - Servers registreren - http://virtual-IP".

Volgens de afbeelding:

  1. Start **Milestone XProtect Management Client** op knooppunt 1.
  2. Selecteer in het menu **Tools** **de optie Geregistreerde services**. 
     * Selecteer in het venster **Geregistreerde services toevoegen/verwijderen** een service in de lijst en klik op **Bewerken**.
     * **Wijzig in het venster Geregistreerde service** bewerken het URL-adres van de service in hetzelfde URL-adres, maar dan met het virtuele IP-adres.
     * Herhaal deze stappen voor alle services die in het venster worden vermeld.
  3. Klik in hetzelfde venster op **Netwerk**. 
     * Wijzig in het venster **Netwerkconfiguratie** het URL-adres van de server in hetzelfde URL-adres, maar dan met het virtuele IP-adres.


![Stel het virtuele IP-adres in de URL's en in de Milestone Management Client in](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Stel op het bureaublad van knooppunt 1 met Milestone Management Client de beheerdersrollen in om een correcte failover te garanderen {#role}


![Opmerking](/wp-content/uploads/2022/07/note.png)


Als Milestone " Windows-authenticatie" is geconfigureerd met een Active Directory, wordt de gebruikersnaam/het wachtwoord opgehaald in de externe AD op de secundaire node na een failover, dus er is geen speciale configuratie nodig.

Wanneer u de Milestone XProtect Management Client start, moet u zich authenticeren met " Windows-authenticatie" of "Basisauthenticatie" ([klik hier om de schermafbeelding te bekijken](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

Open **Milestone XProtect Management Client** en ga naar **Beveiliging / Rollen** (zie afbeelding)

  * Stel de Windows groep **BUILTIN\Administrators** in. Zo kan een beheerdersgebruiker op de secundaire server verbinding maken met Milestone op de secundaire server met " Windows authenticatie".
  * Maak een gebruiker met 'Basisverificatie' (**Admin** in de afbeelding) om er zeker van te zijn dat u opnieuw wordt geverifieerd op de secundaire node na een failover. Voor 'Basisverificatie' wordt de gebruikersnaam/het wachtwoord opgeslagen in de SQL-database en wordt deze opgehaald op de secundaire node na een failover.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Door de groep BUILTIN\Administrators in te stellen, kunt u zich op de secundaire node authenticeren met een lokale Windows beheerder.

Anders is authenticatie met een lokaal Windows account op de secundaire server na een failover niet mogelijk.

Dit komt doordat de BUILTIN\Administrators-groep op beide knooppunten hetzelfde SID heeft. Voor andere lokale groepen of lokale gebruikers is authenticatie op de secundaire node niet mogelijk, omdat de SID's van beide knooppunten verschillen, zelfs als ze dezelfde naam hebben.


![Rollen instellen in de Milestone Management Client](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Ga naar het bureaublad van node 2 en stel het virtuele IP-adres in de interne Milestone bestanden in {#milestone-files-2}


![Opmerking](/wp-content/uploads/2022/07/note.png)


Sinds Milestone 2022 R3 is deze stap niet nuttig en wordt deze automatisch uitgevoerd met " Server Configurator - Servers registreren - http://virtual-IP" in een volgende stap.

Voer dit script als beheerder uit op knooppunt 2 in een Powershell-opdrachtregel:
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![Opmerking](/wp-content/uploads/2022/07/note.png)


Dit script stelt het virtuele IP-adres in twee interne Milestone bestanden in:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< <virtueel-IP-adres>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtual-ip>**/IDP"

### 14. Registreer op het bureaublad van node 2 de beheerserver op het virtuele IP-adres {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Kies **Server Configurator** in de taakbalk van node 2 en registreer deze op het virtuele IP-adres (zie afbeelding).
  * **Stop vervolgens de Management Server-service**.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Het account van de gebruiker die de registratie uitvoert op knooppunt 2 moet de beheerdersrol hebben in Milestone op knooppunt 1.

Als de lokale beheerder op node 2 de registratie uitvoert, moet de ingebouwde Windows-groep `BUILTIN\Administrators` zijn ingesteld in Management Client / Security / Roles bij [stap 12](#role) Anders zal de registratie niet werken.


![Opmerking](/wp-content/uploads/2022/07/note.png)


Deze procedure registreert de beheerserver van knooppunt 2 in de SQL-database (die wordt uitgevoerd op knooppunt 1) via een verbinding met het virtuele adres.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als u een versie van Milestone vóór 2022 R3 gebruikt, kan de registratie de configuratie van het virtuele IP-adres in de interne Milestone bestanden hebben verwijderd. Herhaal in dit geval [stap 13](#milestone-files-2).


![Registreer de beheerserver bij Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Start knooppunt 2 {#15-start-node-2}

  * Start knooppunt 2 met het contextmenu.
  * Wacht op de SECOND (groene) toestand.


![Opmerking](/wp-content/uploads/2022/07/note.png)


Knooppunt 2 blijft in de SECOND (magenta) toestand terwijl de gerepliceerde mappen opnieuw worden gesynchroniseerd (kopiëren van knooppunt 1 naar knooppunt 2).

Dit kan even duren, afhankelijk van de grootte van de bestanden die opnieuw moeten worden gesynchroniseerd in gerepliceerde mappen en de netwerkbandbreedte.

Om de voortgang van de kopie te zien, raadpleegt u het modullogboek van knooppunt 2 met de optie 'verbose', en vergeet u niet het venster te vernieuwen.


![Het eerste knooppunt begint als primair en wordt ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. Controleer of het cluster operationeel is {#16-verify-that-the-cluster-is-operational}

  * Controleer of het cluster groen/groen is, met services die draaien op de PRIM node en niet op de SECOND node.


In deze status worden alleen wijzigingen in bestanden in realtime gerepliceerd.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Componenten die klanten zijn van services moeten worden geconfigureerd met het virtuele IP-adres. De configuratie kan worden gedaan met een DNS-naam (als er een DNS-naam is gemaakt en gekoppeld aan het virtuele IP-adres).


![Het tweede knooppunt begint als SECOND](/wp-content/uploads/2022/07/appli-12.png)


### 17. De virtuele IP-opnamenservers configureren {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Installeer de opnameservers en geef het virtuele IP-adres op in de installatie-URL.
  * Of stel aan de kant van de opnameservers het virtuele IP-adres in de volgende velden in van 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Verbind de Milestone Management Client en de Milestone Smart Client met het virtuele IP-adres.


### 18. Management Client en Smart Client werken niet goed na een knoopp Wissel {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

In een geclusterde XProtect Management Server-installatie vertonen Smart Client en Management Client verschillende problemen na een knooppuntwissel. Het probleem houdt verband met tokens die op verschillende knooppunten worden gegenereerd voor en na de knooppuntwissel, en met problemen bij het openen van bepaalde certificaten die nodig zijn voor tokenvalidatie. Er is een oplossing beschikbaar (voor versies 2022 R3 tot 2023 R2, zie Milestone KB).

Het probleem is opgelost in Milestone 2023 R3.

### 18. Testen {#18-testing}

  * Stop het PRIM knooppunt door in het contextmenu naar beneden te scrollen en op Stoppen te klikken. **Gebruik geen swap voor een eerste test** (zie hieronder waarom).
  * Controleer of er een failover is op het SECOND knooppunt, dat ALONE (groen) zou moeten worden.
  * Controleer met Microsoft Management Console (MMC) de failover van services (gestopt op knooppunt 1 in het `stop_prim` script en gestart op knooppunt 2 in het `start_prim` script).


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als uw systeem PRIM-SECOND is en alles correct functioneert, voer dan een stop uit op de PRIM en controleer of alles correct werkt op node2, die ALONE wordt. Als alles in orde is, start dan node1, die de gerepliceerde mappen van node2 opnieuw zal synchroniseren.

Als er iets misgaat, stop dan node2 en forceer de start als primair van node1, die opnieuw zal opstarten met zijn lokaal gezonde gegevens op het moment van de stop.

De swap omvat een stop-start van de PRIM, die de gegevens van node2 onmiddellijk na het stoppen opnieuw synchroniseert, waardoor er geen kans is op een herstart met gezonde gegevens als er een replicatieconfiguratieprobleem is.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als de toepassing niet wordt gestart op node 2 terwijl de status ALONE (groen) is, controleer dan de uitvoerberichten van het `start_prim` script in het applicatielogboek van node 2.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als ALONE (groen) niet wordt bereikt, analyseer dan waarom met het modullogboek van knooppunt 2.


![Opmerking](/wp-content/uploads/2022/07/note.png)


Meer informatie over de tests vindt u in de gebruikershandleiding


![Stop de module op de PRIM server](/wp-content/uploads/2022/07/appli-19.png)
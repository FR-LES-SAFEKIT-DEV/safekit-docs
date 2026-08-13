# Script called on module start for stopping services before setting module resources

$scriptName = Split-Path -Path $PSCommandPath -Leaf

# Import utils functions
. "$env:SAFEUSERBIN\module_scripts_utils.ps1"

Write-Host "Running ${scriptName} $args"

# graceful stop
Write-Host "--- Graceful stop"
if (Test-Path "$env:SAFEUSERBIN\stop_second.ps1") { & "$env:SAFEUSERBIN\stop_second.ps1" }
if (Test-Path "$env:SAFEUSERBIN\stop_prim.ps1") { & "$env:SAFEUSERBIN\stop_prim.ps1" }
if (Test-Path "$env:SAFEUSERBIN\stop_both.ps1") { & "$env:SAFEUSERBIN\stop_both.ps1" }

Write-Host "--- Force stop"
if (Test-Path "$env:SAFEUSERBIN\stop_second.ps1") { & "$env:SAFEUSERBIN\stop_second.ps1" force }
if (Test-Path "$env:SAFEUSERBIN\stop_prim.ps1") { & "$env:SAFEUSERBIN\stop_prim.ps1" force }
if (Test-Path "$env:SAFEUSERBIN\stop_both.ps1") { & "$env:SAFEUSERBIN\stop_both.ps1" force }

# Array of service names as defined in argument -Services or in SERVICES configuration variable
$servicesArray = Get-ServicesArray -ScriptArgs $args -ReverseOrder $true
if ($servicesArray.Count -eq 0) {
    # No services found
    exit 0
}
# Check of services found
Write-Host "--- Check of SERVICES $($servicesArray -join ', ')"
foreach ($serviceName in $servicesArray) {
    # Check the service status
    $status = Check-Service -ServiceName $serviceName -Status "Stopped"
    if ($status -ne "Stopped") {
        & "$env:SAFE\safekit" printe "${scriptName}: $serviceName not Stopped"
        # Comment to not stop the module when it is not critical
        Stop-Module-And-Exit -ScriptName "${scriptName}"
    }               
}

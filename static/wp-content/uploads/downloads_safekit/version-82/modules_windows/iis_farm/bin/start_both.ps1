# Script called on module start for starting application services 

# For logging into module log use:
# & "$env:SAFE\safekit" printi "message"
# & "$env:SAFE\safekit" printe "message"

$scriptName = Split-Path -Path $PSCommandPath -Leaf

# Import utils functions
. "$env:SAFEUSERBIN\module_scripts_utils.ps1"

# stdout goes into module script log
Write-Host "Running ${scriptName} $args"

# Array of service names as defined in argument -Services or in SERVICES configuration variable
$servicesArray = Get-ServicesArray -ScriptArgs $args -ReverseOrder $false
if ($servicesArray.Count -eq 0) {
    # No services found
    exit 0
}
# Start and check of services found
Write-Host "--- Start and check of SERVICES $($servicesArray -join ', ')"
foreach ($serviceName in $servicesArray) {
    # Start the service
    if (! (Manage-Service -ServiceName $serviceName -Action "start")) {
        & "$env:SAFE\safekit" printe "${scriptName}: $serviceName start failed"
        Stop-Module-And-Exit -ScriptName "${scriptName}"
    }
    # Check the service status
    $status = Check-Service -ServiceName $serviceName -Status "Running" -Timeout 10
    if ($status -ne "Running" -and $status -ne "StartPending") {
        & "$env:SAFE\safekit" printe "${scriptName}: $serviceName not Running or StartPending"
        # Comment to not stop the module when it is not critical
        Stop-Module-And-Exit -ScriptName "${scriptName}"
    }     
    # If necessary, uncomment to delay the start of the next service
#   if ($serviceName -ne $servicesArray[$($servicesArray.Count - 1)]) {
#        #Start-Sleep -Seconds 10
#   }
}
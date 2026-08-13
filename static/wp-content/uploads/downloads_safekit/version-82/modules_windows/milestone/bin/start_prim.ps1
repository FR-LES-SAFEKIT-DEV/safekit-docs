Import-Module WebAdministration
# Script called on module start for starting application services 

# For logging into module log use:
# & "$env:SAFE\safekit" printi "message"
# & "$env:SAFE\safekit" printe "message"

$scriptName = Split-Path -Path $PSCommandPath -Leaf

# Import utils functions
. "$env:SAFEUSERBIN\module_scripts_utils.ps1"

# stdout goes into module script log
Write-Host "Running ${scriptName} $args"

# Function to start the list of W3SVC application pools specified in bin\apppoollist.txt
# Returns:
# - $true if all application pools are started
#   $false if at least one failed (application pool does not exist or start failed)
function Start-AppPools {
    $returnValue = $true

    $appPoolList = Get-Content "$env:SAFEUSERBIN\apppoollist.txt"
    foreach ($appPool in $appPoolList) {
        Write-Host "   > Start AppPool $appPool"
        try {
            Get-WebAppPoolState -Name $appPool -ErrorAction Stop | Out-Null
        } catch {
            Write-Host "     AppPool $appPool does not exist"
            & "$env:SAFE\safekit" printe "$appPool AppPool does not exist" > $null
            $returnValue = $false
            continue
        }
 
        Start-WebAppPool -Name $appPool
        $apppoolState = Get-WebAppPoolState -Name "$appPool"
        Write-Host "     $appPool state is $($apppoolState.value)"
        if ($apppoolState.Value -ne "Started") {
            & "$env:SAFE\safekit" printe "$appPool AppPool not Started"
            $returnValue = $false
        }                
    }
    return $returnValue
}

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
    if ($serviceName -eq "W3SVC") {
        # Start W3SVC Application pools
        if (! (Start-AppPools)) {
            # Comment to not stop the module when it is not critical
            Stop-Module-And-Exit -ScriptName "${scriptName}"
        }
    }
    if ($serviceName -eq "MSSQLServer" -or $serviceName -eq "Milestone XProtect Management Server") {
        # Waiting for service initialization
        Start-Sleep -Seconds 10
    }
}

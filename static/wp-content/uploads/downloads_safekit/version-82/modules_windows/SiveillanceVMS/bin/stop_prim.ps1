# Script called on module stop for stopping application services 
# For logging into module log use:
# & "$env:SAFE\safekit" printi "message"
# & "$env:SAFE\safekit" printe "message"

# ----------------------------------------------------------
# 2 stop modes:
# - graceful stop
#   call standard service stop
# - force stop ($args[0] -eq "force")
#   optionnally kill application's processes
# ----------------------------------------------------------

$scriptName = Split-Path -Path $PSCommandPath -Leaf

# Import utils functions
. "$env:SAFEUSERBIN\module_scripts_utils.ps1"

# stdout goes into module script log
Write-Host "Running ${scriptName} $args"

$gracefulStop = ($args[0] -ne "force")

# Array of service names as defined in argument -Services or in SERVICES configuration variable
# Reverse order for the stop
$servicesArray = Get-ServicesArray -ScriptArgs $args -ReverseOrder $true
if ($servicesArray.Count -eq 0) {
    # No services found
    exit 0
}
# Stop and check of services found
if ($gracefulStop) {
    Write-Host "--- Stop and check of SERVICES $($servicesArray -join ', ')"
    foreach ($serviceName in $servicesArray) {
        # Graceful stop
        # Stop the service
        if (! (Manage-Service -ServiceName $serviceName -Action "stop")) {
            & "$env:SAFE\safekit" printe "${scriptName}: $serviceName stop failed"
        }
        if ($serviceName -eq "MSSQLServer" -or $serviceName -eq "W3SVC") {
            # Wait for the stop
            Start-Sleep -Seconds 10
        }
                
		# Check the service status
		$status = Check-Service -ServiceName $serviceName -Status "Stopped"
		if ($status -ne "Stopped") {
			& "$env:SAFE\safekit" printe "${scriptName}: $serviceName not Stopped"
		}    
    }
}
else {
    # Force stop
    # If necessary, insert here command to force the stop

	Write-Host "--- Check of SERVICES $($servicesArray -join ', ')"
	foreach ($serviceName in $servicesArray) {
        # Check the service status
        $status = Check-Service -ServiceName $serviceName -Status "Stopped"
        if ($status -ne "Stopped") {
            & "$env:SAFE\safekit" printe "${scriptName}: $serviceName not Stopped"
        }               
    }
}

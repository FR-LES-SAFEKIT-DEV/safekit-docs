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
		# Check the service status
		$status = Check-Service -ServiceName $serviceName -Status "Stopped"
		if ($status -ne "Stopped") {
			& "$env:SAFE\safekit" printe "${scriptName}: $serviceName not Stopped"
		}    
        # If necessary, uncomment to delay the stop of the next service
#       if ($serviceName -ne $servicesArray[$($servicesArray.Count - 1)]) {
#           #Start-Sleep -Seconds 10
#       }
    }
}
else {
    # Force stop
	Write-Host "--- Check of SERVICES $($servicesArray -join ', ')"
    $allStopped = $true
	foreach ($serviceName in $servicesArray) {
        # Check the service status
        $status = Check-Service -ServiceName $serviceName -Status "Stopped"
        if ($status -ne "Stopped") {
            & "$env:SAFE\safekit" printe "${scriptName}: $serviceName not Stopped"
            $allStopped = $false
        }               
    }
	
    # If necessary, insert here command to force the stop
    if ($allStopped) {
        Write-Host "--- Clean"
        $postmasterpidFile= Join-Path -Path $env:POSTGRESQLDIR -ChildPath "postmaster.pid"
        if (Test-Path $postmasterpidFile) {
            Write-Host "    Remove file $postmasterpidFile"
            try {
                Remove-Item $postmasterpidFile
            } catch {
                Write-Host "    Remove file $postmasterpidFile failed: $_"
            }            
            Start-Sleep -Seconds 15
        }
                
        $postgreslProcesses = Get-Process | Where-Object { $_.Name -eq "postgres" } -ErrorAction SilentlyContinue
        if ($postgreslProcesses) {
            $postgreslProcesses | ForEach-Object { 
                Write-Host "    kill pid: $($_.Id), name: $($_.Name), arguments: $($_.StartInfo.Arguments), start time: $($_.StartTime)"
                try {
                    $_.Kill()
                } catch {
                    Write-Host "    kill pid: $($_.Id) failed: $_"
                }
            }
            Start-Sleep -Seconds 5
        }	
    }
}

# Script called on module configuration 

# Import utils functions
. "$env:SAFEUSERBIN\module_scripts_utils.ps1"

# Array of service names as defined in SERVICES configuration variable
$servicesArray = Get-ServicesArray
if ($servicesArray.Count -eq 0) {
    # No services found
    exit 0
}
Write-Host "    SERVICES $($servicesArray -join ', ')"
foreach ($serviceName in $servicesArray) {
    # Check if the service exists
    $serviceFullName=Test-Service-Exist -ServiceName $serviceName
    if ($serviceFullName -eq '') {
        Write-Host "    The service '$serviceName' does not exist"
        Write-Host "Verify the value of the SERVICES macro in the module configuration"
        exit 1
    }
    else {
        # Set manual startup
        if (Set-Service-Startup -ServiceName $serviceName -StartupType Manual) {
            Write-Host "    '$serviceFullName' startup type set to Manual"
        }
        else {
            Write-Host "    Warning: '$serviceFullName' startup type set to Manual failed"
        }
    }
}

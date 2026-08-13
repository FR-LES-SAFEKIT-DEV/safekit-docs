# Function to retrieve a service by its name or display name.
# If the service is not found by its name, it attempts to retrieve it by its display name.
# Parameters:
#     -ServiceName (string): The name or display name of the service to retrieve.
# Returns:
#     The service object if found; otherwise, returns $null.
function Retrieve-Service {
    param (
        [Parameter(Mandatory = $true)]
        [string]$ServiceName
    )

    # Try to get the service by name
    $service = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
    # If the service is not found by name, try to get it by display name
    if (-not $service) {
        $service = Get-Service -DisplayName $ServiceName -ErrorAction SilentlyContinue
    }      
    return $service
}

# Function to check if a service exists
# Parameters:
# - ServiceName: The service name or display name of the service to test
# Returns:
# - the full service name if the service exists, "" otherwise
function Test-Service-Exist {
    param (
        [Parameter(Mandatory = $true)]
        [string]$ServiceName
    )

    $service = Retrieve-Service -ServiceName $ServiceName
    if ($service) {
        return "$($service.DisplayName) ($($service.Name))"
    }
    else {
        return ""
    }
}

# Function to set the service startup type
# Parameters:
# - ServiceName: The service name or display name of the service to test
# - StartupType: The startup type
# Returns:
# - $true on success, $false otherwise
function Set-Service-Startup {
    param (
        [Parameter(Mandatory = $true)]
        [string]$ServiceName,
        [Parameter(Mandatory = $true)]
        [ValidateSet("Automatic", "Manual", "Disabled")]
        [string]$StartupType         
    )

    $service = Retrieve-Service -ServiceName $ServiceName
    if ($service) {
        Set-Service -Name $service.Name -StartupType $StartupType -ErrorAction SilentlyContinue
        if ($?) {
            return $true
        }
 
    }
    return $false
}
  
# Function to start or stop a service
# Parameters:
# - ServiceName: The service name or display name of the service to manage
# - Action: The action to perform ('start' or 'stop')
# Returns:
# - $true if the command succeeded, $false otherwise
function Manage-Service {
    param (
        [Parameter(Mandatory = $true)]
        [string]$ServiceName,
        [Parameter(Mandatory = $true)]
        [ValidateSet("start", "stop")]
        [string]$Action
    )
    
    $returnValue = $false

    $service = Retrieve-Service -ServiceName $ServiceName
    if ($service) {
        if ($service.DisplayName -ne $ServiceName -and $service.Name -ne $ServiceName) {
            Write-Host "Warning: found $($service.Name) ($($service.DisplayName)) for $ServiceName"
        }
        $realServiceName = $service.Name
        Write-Host "> $Action '$($service.DisplayName) ($($service.Name))'"
        switch ($Action) {
            "start" {
                if ($service.Status -ne 'Running') {
                    Start-Service -Name "$realServiceName" -PassThru -ErrorAction SilentlyContinue
                    if ($?) {
                        Write-Host "  $realServiceName start succeeded"
                        $returnValue = $true
                    }
                    else {
                        Write-Host "  $realServiceName start failed. Error: $($Error[0])"
                    }
                }
                else {
                    Write-Host "  $realServiceName is already running"
                    $returnValue = $true
                }
            }
            "stop" {
                if ($service.Status -ne 'Stopped') {
                    $runningDependents = $service.DependentServices | Where-Object Status -eq 'Running'
                    if ($runningDependents.Count -gt 0) {
					
                        Write-Host (" Stop also running dependent services: " + (@($runningDependents | ForEach-Object { $_.Name }) -join ", "))
                    }                    
                    Stop-Service -Name "$realServiceName" -Force -PassThru -ErrorAction SilentlyContinue

                    if ($?) {
                        Write-Host "  $realServiceName stop succeeded"
                        $returnValue = $true
                    }
                    else {
                        Write-Host "  $realServiceName stop failed. Error: $($Error[0])"
                    }
                }
                else {
                    Write-Host "  $realServiceName is already stopped"
                    $returnValue = $true
                }
            }
        }        
    }
    else {
        Write-Host "> $Action $ServiceName"
        Write-Host "  $ServiceName does not exist"
    }
    return $returnValue
}
  
# Function to check the service status
# Parameters:
# - ServiceName: The service name or display name of the service to check
# - Status: The status to check (Running, Stopped, ...)
# - Timeout: The maximum time to wait for the service to reach the desired status (in seconds)
# Returns:
# - The status of the service if found (Running, Stopped, Paused, StartPending, StopPending, ContinuePending, PausePending)
#   or "" if the service does not exist
function Check-Service {
    param (
        [Parameter(Mandatory = $true)]
        [string]$ServiceName,
        [Parameter(Mandatory = $true)]
        [ValidateSet("Running", "Stopped", "StartPending", "StopPending")]
        [string]$Status,
        [int]$Timeout = 0  # Default timeout of 0 seconds
    )

    $service = Retrieve-Service -ServiceName $ServiceName
    if ($service) {
        if ($service.DisplayName -ne $ServiceName -and $service.Name -ne $ServiceName) {
            Write-Host "Warning: found $($service.Name) ($($service.DisplayName)) for $ServiceName"
        }
        $realServiceName = $service.Name
        Write-Host "> check '$($service.DisplayName) ($($service.Name))'"
        
        $elapsedTime = 0
        $interval = 1  # Check every second
        while ($elapsedTime -lt $Timeout -or ($Timeout -eq 0 -and $elapsedTime -eq 0)) {
            $service.Refresh()
            Write-Host "  $realServiceName status is $($service.Status)"
            if ($service.Status -eq $Status) {
                return $service.Status
            }
            else {
                switch ($Status) {
                    "Running" {
                        if ($service.Status -ne 'StartPending') {
                            return $service.Status
                        }
                    }
                    "Stopped" {
                        if ($service.Status -ne 'StopPending ') {
                            return $service.Status
                        }
                    }
                }
            }
            Start-Sleep -Seconds $interval
            $elapsedTime += $interval
        }
        if ($Timeout -ne 0) {
            Write-Host "  check timeout reached: $realServiceName status is $($service.Status)"
        }
        return $service.Status
    }
    else {
        Write-Host "> check $ServiceName"
        Write-Host "  $ServiceName does not exist"
        return ""
    }
}

# Function to stop the SafeKit module and exit with an error code.
# Called by module scripts (prestart, start_prim, stop_prim, start_both, stop_both, ...) on fatal error
# Parameters:
#   - ScriptName: The name of the script that requires the stop (mandatory).
function Stop-Module-And-Exit() {
    param (
        [Parameter(Mandatory = $true)]
        [string]$ScriptName
    )

    #& "$env:SAFE\safekit" printe "$ScriptName failed"
    Write-Host "  Stop the module $env:SAFEMODULE"
    & "$env:SAFE\safekit" stop -i "$ScriptName"
    exit 1
}

# Function that returns an array of service names from 
# (1) script argument -Services (can be a list of services with , as separator)
# (2) the SERVICES environment variable
# (3) the SERVICES user var defined into safeconf.xml
# Parameters: 
#   - [string[]] $ScriptArgs: Array of script arguments that optionnally contains -Services value
#   - [bool]$ReverseOrder: reverse array order if $true ; default is $false
# Returns: 
#   - An array of service names or an empty array if no services are defined.
function Get-ServicesArray() {
    param (
        [string[]]$ScriptArgs = @(),
        [bool]$ReverseOrder = $false
    )
    # Default return value is an empty array
    [System.Collections.ArrayList]$servicesArray = @()
    $ServicesList = ""
    # (1) Loop through the arguments to find -Services
    for ($i = 0; $i -lt $ScriptArgs.Count; $i++) {
        if ($ScriptArgs[$i] -eq "-Services" -and $i + 1 -lt $ScriptArgs.Count) {
            $ServicesList = $ScriptArgs[$i + 1]
        }
    }
    if ($null -eq $ServicesList -or $ServicesList.Trim() -eq '') {
        # (2) the SERVICES environment variable
        $ServicesList = $env:SERVICES
        if ($null -eq $ServicesList -or $ServicesList.Trim() -eq '') {
            # (3) the SERVICES user var defined into safeconf.xml
            $moduleConfig = "$env:SAFEUSERCONF/safeconf.xml"
            $ServicesList = (Select-Xml -XPath "//user/var[@name='SERVICES']/@value" -Path $moduleConfig).Node.Value
            if ($null -eq $ServicesList -or $ServicesList.Trim() -eq '') {
                # No services found
                Write-Host "   Warning: SERVICES not found"
                return @()
            }
            else {
                Write-Host "   $ServicesList from SERVICES in XML configuration file"
            }
        }
        else {
            Write-Host "   $ServicesList from SERVICES environment variable"
        }
    }
    else {
        Write-Host "   $ServicesList from -Services argument in $ScriptArgs"
    }
    $servicesArray = @($ServicesList -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })
    if (-not $servicesArray -is [array]) {
        $servicesArray = @($servicesArray)
    }
    if ($ReverseOrder) {
        $servicesArray = [System.Collections.ArrayList]$servicesArray
        $servicesArray.Reverse()
    }
    return , $servicesArray
}
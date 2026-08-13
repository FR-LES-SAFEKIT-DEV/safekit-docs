param([Parameter(Mandatory = $true, ValueFromPipeLine = $true, position=0)][String]$module,
      [Parameter(Mandatory = $true, ValueFromPipeLine = $true, position=1)][String]$resource
      )
Import-Module WebAdministration
 
$safekit="$env:SAFE/safekit.exe"
$customchecker=$MyInvocation.MyCommand.Name

$poolList = Get-Content -Path "$Env:SAFEUSERBIN\apppoollist.txt"
 
# Checking apppool
while($true)
{
    Start-Sleep -s 10
	$anyPoolDown = $false
 
	foreach ($pool in $poolList)
	{
		$apppoolState = Get-WebAppPoolState -Name $pool

		if ($apppoolState.Value -ne "Started")
		{
			$anyPoolDown = $true
		}
	}
		
	if ($anyPoolDown)
	{
		& $safekit set -r "$resource" -v down -i $customchecker -m $module 
	}
	else
	{
		& $safekit set -r "$resource" -v up -i $customchecker -m $module
	}
}
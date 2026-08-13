param([Parameter(Mandatory = $true, ValueFromPipeLine = $true, position=1)][String]$VMName,
      [Parameter(Mandatory = $true, ValueFromPipeLine = $false, position=2)][String]$ExportPath,
      [Switch] $force
      )
      
      $vobj = Get-VM "$VMName" -ea Stop
      $expath = Get-Item -Path "$ExportPath" -ea Stop
      echo "Exporting '$VMName' to '$ExportPath'"
      Export-VM -Path "$ExportPath" -Name "$VMName" -ea Stop
      $vmconfig = (Get-ChildItem -Path "$ExportPath\$VMName\Virtual Machines\*" -File -Include "*.XML","*.vmxc").FullName
      echo "Removing '$VMName' from hyper-v manager configuration (keeping files)"
      Remove-VM -Name "$VMName" -Force:$force
      echo "Re-importing '$VMName' into hyper-v manager configuration"
      Import-VM "$vmconfig" -Register 

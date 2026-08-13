Function SK-Start-VM ([Microsoft.HyperV.PowerShell.VirtualMachine] $vobj)
{
	    $vobjstate = $vobj.State
        $vobjstatus = $vobj.Status
	    $vmname = $vobj.Name
            
            & "$safe\safekit.exe" printi "'$vmname' : $vobjstate , $vobjstatus"

            & "$safe\safekit.exe" printi "Attempting to start '$vmname'"
            try{
                Set-VM "$vmname" -AutomaticStartAction Nothing -ErrorAction SilentlyContinue
            	Start-VM "$vmname" -ea Stop
			}catch{
				echo ("Start-VM : <" + $PSItem.ToString() + ">")
            	& "$safe\safekit.exe" printi "Normal start failed, attempting cold start"
                Remove-VMSavedState -VMName "$vmname" -ea Continue
                Start-VM "$vmname" -ea Stop
                $vobj = Get-VM "$vmname"
            }
            while ( $vobj.State -ne "Running"){
                    $vobjstate = $vobj.State
                    & "$safe\safekit.exe" printi "'$vmname' : Waiting ( $vobjstate )"
                    Start-Sleep -Seconds 5
            }

            $vobjstate = $vobj.State
            $vobjstatus = $vobj.Status
            & "$safe\safekit.exe" printi "'$vmname' : $vobjstate , $vobjstatus"
}

try{

    
    $safe = (Get-Item env:SAFE).Value
    $suv = (Get-Item env:SAFEUSERVAR).Value
    $vmname = (Get-Item env:VM_NAME).Value
    $vmpath = (Get-Item env:VM_PATH).Value
    $vmconfig = (Get-ChildItem -Path ($vmpath + "\Virtual Machines\*") -File -Include "*.XML","*.vmcx").FullName
    
    
    $retval = 0
    $d = Get-Date

    echo "$d : Start_prim called" 

    # under mutual exclusion.  

    [System.Threading.Mutex]$m;                   
    [bool]$created=$false

       $m = New-Object System.Threading.Mutex($true, "SafeKit-vmms", [ref] $created)
       if(!$created){
         echo "Waiting for another instance"
         $m.WaitOne()
       }
       net start vmms
        
       $vobj = Get-VM "$vmname"
       if($vobj) {
 
 	     SK-Start-VM $vobj
 
       }else{
         
         $report = Compare-VM "$vmconfig" -Register
         $report.Incompatibilities | %{ echo $_.Message }
         & "$safe\safekit.exe" printi "Importing '$vmname'"
         $ivm = Import-VM "$vmconfig" -Register

         $vobj = Get-VM "$vmname"
         if($vobj){
 		    SK-Start-VM $vobj
 	     }
         else{
             & "$safe\safekit.exe" printe "'$vmname' import failed"
             $retval = -1
         } 
       }

       (Get-VM "$vmname")|Format-Table
       
}
catch{
		echo ("Error: <<" + $PSItem.ToString() + ">>")
        & "$safe\safekit.exe" printi "START_PRIM failed, see application log"
        $retval =-1
}
finally{
   $m.ReleaseMutex();
   $m.Close();
   exit $retval
}


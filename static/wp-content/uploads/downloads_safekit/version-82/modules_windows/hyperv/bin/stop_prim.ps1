try{

    
    $safe = (Get-Item env:SAFE).Value
    $suv = (Get-Item env:SAFEUSERVAR).Value
    $vmname = (Get-Item env:VM_NAME).Value
    $vmpath = (Get-Item env:VM_PATH).Value

    $action = $args[0]
    
    $saveOptions=@{
	    Name = $vmname
	    Save = $true
	    ErrorAction = "Stop"
    }    

    $stopOptions=@{
	    Name = $vmname
	    Force = $true
	    ErrorAction = "Stop"
    }

    $offOptions=@{
	    Name = $vmname
	    TurnOff = $true
	    ErrorAction = "Stop"
   }

    $normalStop= Invoke-Expression $( "$" + $ENV:NORMAL_STOP + "Options" )
    $forceStop=  Invoke-Expression $( "$" + $ENV:FORCE_STOP + "Options" )

    $retval = 0
    $d = Get-Date

    echo "$d : Stop_prim $action called" 

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

        $vobjstate = $vobj.State
        $vobjstatus = $vobj.Status
        
        $printfinal = $false

        & "$safe\safekit.exe" printi "'$vmname' : $vobjstate , $vobjstatus"
         
        if( $action -eq "force" ){
            if ( ($vobj.State -ne "Saved") -and ($vobj.State -ne "Off") ) {
                $printfinal = $true
                & "$safe\safekit.exe" printi "Stopping '$vmname'"

		# To poweroff the guest, replace stopforceOptions  by poweroffOptions
                Stop-VM @forceStop
                
                While (($vobj.State -ne "Saved") -and ($vobj.State -ne "Off")){
                    $vobjstate = $vobj.State
                    & "$safe\safekit.exe" printi "Waiting '$vmname' off ( $vobjstate )"
                    Start-Sleep -Seconds 5
                }
            }
        }
        else{
            if ( ($vobj.State -ne "Saved") -and ($vobj.State -ne "Off") ) {
                $printfinal = $true
                & "$safe\safekit.exe" printi "Stopping '$vmname'"
	
		# To shutdown the guest, replace saveOptions below with stopforceOptions.
		# To poweroff the guest, replace saveOptions below with poweroffOptions.
                Stop-VM @normalStop

                While (($vobj.State -ne "Saved") -and ($vobj.State -ne "Off")){
                    $vobjstate = $vobj.State
                    & "$safe\safekit.exe" printi "Waiting '$vmname' stop ( $vobjstate )"
                    Start-Sleep -Seconds 5
                }   
                
            }
        }
        if($printfinal){
            $vobjstate = $vobj.State
            & "$safe\safekit.exe" printi "'$vmname' : $vobjstate"
        }
        $vobj | Format-Table

    }else{
        & "$safe\safekit.exe" printw "'$vmname' not registered or missing"
    }

    

   
}
catch{
        echo "Error $Error" 
        & "$safe\safekit.exe" printi "STOP_PRIM failed"
        $retval =-1
}
finally{
   $m.ReleaseMutex();
   $m.Close();
   $d = Get-Date
   echo "$d : Stop_prim  exit ($retval)"
   exit $retval
}
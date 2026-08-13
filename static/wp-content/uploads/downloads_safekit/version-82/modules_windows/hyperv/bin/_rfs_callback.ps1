Function SK-Delete([String] $filepath) 
{
  echo "SK-Delete $filepath" >> $logfile
  if (Test-Path $filepath) { 
	try {
   	 Remove-Item $filepath -ErrorAction Stop
	} 
	catch {
		$ErrorMessage = $_.Exception.Message
		echo "SK-Delete $filepath : $ErrorMessage">> $logfile
		throw "SK-Delete exception"
	} 
 } 
 else {
      echo "SK-Delete $filepath : file does not exist">> $logfile
  }
}


Function SK-Unregister-VM ([Microsoft.HyperV.PowerShell.VirtualMachine] $v)
{
		 $vmid = $v.Id
                 $vmidfile = $vmconfprefix + "\Virtual Machines\"+ $vmid + ".xml"
                 $vm = $v.Name
                 $snapshots = @()
		 $filestodel = @()

		 if(Test-Path -Path "$vmidfile"){
		    $filestodel += $vmidfile
                    foreach ($id in (Get-VMSnapshot -VM $v).Id){
                       $filestodel += $vmconfprefix + "\Snapshots\" + $id + ".xml"
                    }
		 }
		 else {
		   if(Test-Path -Path "$vmconfprefix\Virtual Machines Cache\$vmid.vmcx"){
#		   	$filestodel += "$vmconfprefix\Virtual Machines Cache\$vmid.vmcx"
#			$filestodel += "$vmconfprefix\Virtual Machines Cache\$vmid"
#                    	foreach ($id in (Get-VMSnapshot -VM $v).Id){
#                       	   $filestodel += $vmconfprefix + "\Snapshots Cache\" + $id + ".vmcx"
#                       	   $filestodel += $vmconfprefix + "\Snapshots Cache\" + $id
#                    	}
            echo "removing $vm" >> $logfile
            Remove-VM -Name $vm -Force
            return
		   }
		 }
              	
                echo "SK-Unregister-VM $vm :" >> $logfile
                echo $vmid>> $logfile
                echo $filestodel >> $logfile
                
		if( $filestodel.Count -gt 0 ){
                 # Remove VM without touching configuration files & vhd (reintegre friendly)
                 # under mutual exclusion.  
		 
                 [bool]$stopped=$true
  
                 try{      
					net stop vmms
					$vmmsService = Get-Service -Name vmms 
					echo $vmmsService >> $logfile
                     
					foreach ($f in $filestodel) {
					       	SK-Delete "$f"
					}
					net start vmms
					$stopped=$false                     
                 }catch{
		     $ErrorMessage = $_.Exception.Message	
		     echo "SK-Unregister-VM $vm : $ErrorMessage">> $logfile
                 }finally{
                   if($stopped){ net start vmms }                   
                 }
		}
                
}

try{

    
    $safe = (Get-Item env:SAFE).Value
    $suv = (Get-Item env:SAFEUSERVAR).Value
    $configfile = $suv + "\hypervconf.ps1"
    $logfile = $suv + "\rfs_callback.log"
    $action = $args[0]
    $retval = 0
    $d = Get-Date
    echo "$d : rfs_callback called (action = $action)" >>$logfile
    $vmconfprefix = (Get-Item env:ProgramData).Value + "\Microsoft\Windows\Hyper-V"
    [System.Threading.Mutex]$m;	       
    [bool]$created=$false;       
      
    try {
        . $configfile
        echo "vmname='$vm' vmpath='$vmpath'" >> $logfile
    }catch{}

    switch ($action)
    {
        "_rfs_pritoscd" {
            # Remove VM without touching configuration files & vhd (reintegre friendly)

	    try{
				$m = New-Object System.Threading.Mutex($true, "SafeKit-vmms", [ref] $created)
				if(!$created){
					echo "_rfs_pritoscd : Waiting for another instance" >> $logfile
					$m.WaitOne()
                }
				$vmmsService = Get-Service -Name vmms 
				echo $vmmsService >> $logfile
            	$v = Get-VM "$vm"
            	if($v){  
              		 SK-Unregister-VM $v
            	} else {
					echo "'$vm' not registered" >> $logfile
				}
	    }
	    finally{
	    	$m.ReleaseMutex();
                $m.Close();	
	    }
        }

        "_rfs_startsynch" {
            try {
				$m = New-Object System.Threading.Mutex($true, "SafeKit-vmms", [ref] $created)
				if(!$created){
					echo "_rfs_startsynch : Waiting for another instance" >> $logfile
                    $m.WaitOne()
                }
				$vmmsService = Get-Service -Name vmms 
				echo $vmmsService >> $logfile
                $v = Get-VM "$vm"
                if($v){
                    SK-Unregister-VM $v
                } else {
					echo "'$vm' not registered" >> $logfile
				}
            }catch {
                if( $v ) { 
                    echo "removal of $vm failed :" + $Error >> $logfile
                    $retval=2 
                } else {
					echo "'$vm' not registered" >> $logfile
				}
            }
            finally{
	        $m.ReleaseMutex();
                $m.Close();	
            }
        }      
    }

}
catch{
    $retval = 2
}
finally{
    exit $retval
}

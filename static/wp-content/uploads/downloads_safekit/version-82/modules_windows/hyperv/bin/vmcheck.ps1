#
# Custom checker to detect VM malfunction using Hyper-V heartbeat feature.
# Example of userconfig.xml associated configuration : 
#
# Declare the custom checker and its associated resource custom.VM
#  ...
#  <check>
#	<custom ident="VM" exec="vmcheck.ps1" arg="%VM_NAME%" when="prim" action="restart"/>
#  </check>
#  ...
#
param([Parameter(Mandatory = $true, ValueFromPipeLine = $true, position=1)][String]$ModName,
      [Parameter(Mandatory = $true, ValueFromPipeLine = $true, position=2)][String]$RName,
      [Parameter(Mandatory = $true, ValueFromPipeLine = $true, position=3)][String]$VMName,
      [Parameter(Mandatory = $false, ValueFromPipeLine = $false, position=4)][String]$Grace="2",
      [Parameter(Mandatory = $false, ValueFromPipeLine = $false, position=5)][String] $Period="5",
      [Parameter(Mandatory = $false, ValueFromPipeLine = $false, position=6)][String]$InitialGrace="10"
      )

Function testvmstate([String]$VMName)
{
    $vobj = Get-VM $VMName
    if($vobj.State -ne "Running"){
      return "off"
    }
    $hb=$vobj.heartbeat.value__
    if($hb -eq 5){
     return "up"
    }
    else{
     return "down"
    }
}
     
     
      $setres="$env:SAFE/safekit.exe" 
      $gracecount=$InitialGrace
      $prevrstate="unknown"
      while ($true){
        Start-Sleep $Period
        if( [System.Environment]::HasShutdownStarted ) {
	  return
        }
        $rstate = testvmstate($VMNAME)
        if($rstate -eq "down"){
	        if($gracecount -le 0){
        	    if($prevrstate -ne $rstate){
                    & $setres set -r "$RName" -v $rstate
		            $prevrstate = $rstate
                }	    
	        }else{
             $gracecount-=1
            }
        }else{
	        if($rstate -eq "off"){
	            $rstate = "down"
	        }
            else{ 
	            $gracecount = $Grace
	        }
            if($prevrstate -ne $rstate){
                & $setres set -r "$RName" -v $rstate
                $prevrstate = $rstate
            }
        }
      }



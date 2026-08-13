try{

    
    $safe = (Get-Item env:SAFE).Value
    $suv = (Get-Item env:SAFEUSERVAR).Value
    $vmname = (Get-Item env:VM_NAME).Value
    $vmpath = (Get-Item env:VM_PATH).Value
    $sub    = (Get-Item env:SAFEUSERBIN).Value
    $action = $args[0]
    $conffile = $suv + "\hypervconf.ps1"
    $stop_prim = $sub + "\stop_prim.ps1"
    $retval = 0
    $d = Get-Date

    echo "$d : prestart called" 

    #refresh config for rfs_callback script (which does not see userplug variables)
    echo "`$vm='$vmname'" > $conffile
    echo "`$vmpath='$vmpath'" >> $conffile

#    try{
#	  Remove-Item "$suv\nfsbox_namespace"
#         Remove-Item "$suv\nfsbox_namespace.id"
#         Remove-Item "$suv\nfsbox_namespace.sum"
#
#    }catch{}

    #graceful stop
    
    & "$stop_prim" 

    #force stop
    & "$stop_prim" force

}catch{
    $retval=-1
}finally{
    $d = Get-Date
    echo "$d : prestart exit ($retval)" 
    exit $retval
}
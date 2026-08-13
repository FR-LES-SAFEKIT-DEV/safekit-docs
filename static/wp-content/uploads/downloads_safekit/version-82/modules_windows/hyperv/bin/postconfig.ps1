$userconf="$ENV:SAFEUSERCONF\safeconf.xml"
try{
	$VMNAME = (Select-Xml -XPath "//user/var[@name='VM_NAME']" -Path $userconf).Node.Value
	if( $VMNAME ){
		Write-Host "Making sure $VMNAME does not start automatically at boot"
		Set-VM -Name $VMNAME -AutomaticStartAction Nothing -ErrorAction SilentlyContinue
	}
	else{
		Write-Host "VM_NAME variable not initialized, check configuration" 
		exit 1
	}
}catch{
	Write-Host "Error while processing xml configuration $userconf"
	exit 1
}

exit 0
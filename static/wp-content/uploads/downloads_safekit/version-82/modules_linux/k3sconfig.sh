#!/bin/bash

#set -x
# replace environment variables according to your deployment

if [ -z "$1" ]; then
echo "this script must be modified to match your deployment environment"
echo " NODE1IP and NODE2IP must be set to the addresses of the first and second server respectively"
echo " VIRTUALIP will be the address to reach the replicated database and nfs shares. It must be in a subnet that is common to the 2 servers"
echo " if defined, PROXY is the address of the proxy to use for accessing internet"
echo " NODENETWORK and PROXY are used to set the proxy configuration. NODENETWORK will be reached directly (without proxy). It is ignored if PROXY is not defined."
echo " PASSWORD is the password to use for the k3s mysql user"
exit 1
fi
 
### EDIT THE FOLLOWING LINES 

export VIRTUALIP=10.2.0.22
export NODE1IP=10.2.0.4
export NODE2IP=10.2.0.5
export NODENETWORK="10.2.0.0/24"
#export PROXY="http://proxyfqdn:port"
export PASSWORD="password"
export SKSTORAGESIZE="100G"

export STORAGEDIR="/var/SKreplicated-storage"
export NFSPROVDIR="/var/SKexported-storage"
### DO NOT MODIFY THE REST OF THE SCRIPT


export MSQLPWD=\'$PASSWORD\'
if [ "$PASSWORD" == "password" ]; then 
	exit 1;
fi
if [ "$PROXY" == "http://proxyfqdn:port" ]; then 
	exit 1;  
fi

if [ $1 == "prereq" ]; then 
echo "ON BOTH NODES, install prerequisites and prepare the system."
# BEWARE : INSTALLATION ORDER MUST BE THE SAME ON BOTH NODES TO GET SAME UID FOR MYSQL USER

apt update

echo "install alien"
apt install alien || exit 1

echo "install nfs server and client"
apt install nfs-kernel-server || exit 1
apt install nfs-common || exit 1

echo "stop nfs server"
systemctl stop nfs-server
systemctl disable nfs-server

echo "install mariadb"
apt install mariadb-server || exit 1

echo "secure installation. Suggested answers follow." 
echo "<ENTER> stands for the enter/return key." 
echo "--"
echo "current password for root: <ENTER>"
echo "Set root password :  n<ENTER>" 
echo "Remove anonymous users: <ENTER>"
echo "Disallow root login remotely: <ENTER>"
echo "Remove test database and access to it: <ENTER>"
echo "Reload privilege tables now! <ENTER>"
mysql_secure_installation

echo "create replicated storage directory and mount point for replicated nfs export"
mkdir $STORAGEDIR 
mkdir $NFSPROVDIR

echo "move /var/lib/nfs/rmtab into replicated storage directory and create a symlink to it"
mv /var/lib/nfs/rmtab $STORAGEDIR
ln -s $STORAGEDIR/rmtab /var/lib/nfs/rmtab

echo "install safekit"
chmod +x ./safekit.bin
./safekit.bin
./safekitinstall || exit 1

/opt/safekit/private/bin/webservercfg -unsecure

fi

if [ $1 == "first" ]; then
echo "ON THE FIRST SERVER ONLY"

echo "Create k3s database and user with password auth"
mysql -e "CREATE DATABASE k3s; CREATE USER 'k3s'@'%' IDENTIFIED BY $MSQLPWD; GRANT ALL ON k3s.* TO 'k3s'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;" || exit 1

echo "stop and disable mysql"
systemctl stop mariadb
systemctl disable mariadb

echo "create the sparse replicated storage filesystem image ($SKSTORAGESIZE)"
dd if=/dev/zero of=$STORAGEDIR/replicatedVolume bs=1 count=0 seek=$SKSTORAGESIZE
mkfs -t xfs $STORAGEDIR/replicatedVolume

echo "define the cluster"
/opt/safekit/safekit cluster create $NODE1IP $NODE2IP
/opt/safekit/safekit cluster config
/opt/safekit/safekit -H "*" -G

echo "install , configure and start as prim the k3s module"

/opt/safekit/safekit module install -m k3s $PWD/k3s.safe
echo "replace values in userconfig.xml then configure and start as prim"
#edit userconfig.xml, set values for VIRTUALIP macro
sed -i "/macro name=\"VIRTUALIP\"/s,value=\".*\"/>,value=\"$VIRTUALIP\"/>," /opt/safekit/modules/k3s/conf/userconfig.xml
sed -i "/macro name=\"STORAGEDIR\"/s,value=\".*\"/>,value=\"$STORAGEDIR\"/>," /opt/safekit/modules/k3s/conf/userconfig.xml
sed -i "/macro name=\"NFSPROVDIR\"/s,value=\".*\"/>,value=\"$NFSPROVDIR\"/>," /opt/safekit/modules/k3s/conf/userconfig.xml
/opt/safekit/safekit -H "*" -E k3s || exit -1
/opt/safekit/safekit prim -m k3s || exit -1
echo "wait for start of k3s"
/opt/safekit/safekit waitstart -m k3s || exit -1

echo "install k3s"
echo "set up proxy env variables if needed"
if [ -n "$PROXY" ]; then
export http_proxy=$PROXY
export https_proxy=$PROXY
export no_proxy="localhost,127.0.0.0/8,$NODENETWORK,0.0.0.0,192.168.0.0/16,.svc,.cluster.local"
export HTTPS_PROXY=$http_proxy
export HTTP_PROXY=$http_proxy
export NO_PROXY=$no_proxy
fi
curl -sfL https://get.k3s.io | sh -s - server \
  --datastore-endpoint="mysql://k3s:$PASSWORD@tcp($VIRTUALIP:3306)/k3s"


#install helm client (at least on PRIM, or on both if the usecase demands it)
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
apt-get install apt-transport-https --yes || exit 1
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
apt-get update
apt-get install helm || exit -1


# install nfs provisionner
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
helm repo add nfs-subdir-external-provisioner https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/
helm install nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \
    --set nfs.server=$VIRTUALIP \
    --set nfs.path=$NFSPROVDIR --set "nfs.mountOptions={vers=3,rw,nolock,hard}"

echo "disable k3s"
systemctl disable k3s

echo "get token"
cat /var/lib/rancher/k3s/server/token

exit 0


fi

if [ $1 == "second" ]; then
echo "ON THE SECOND ONLY"

if [ -z "$2" ]; then
echo "usage: k3sconfig second \"<token>\""
echo "<token> is the content of the /var/lib/rancher/k3s/server/token file on the first node."
echo "It was output by the "k3sconfig first" script at the end of its execution."
exit -1
fi  
 
echo "stop and disable mysql"
systemctl stop mariadb
systemctl disable mariadb
echo "make sure the module is running as ALONE on the PRIM"
/opt/safekit/safekit -H "server0" waitstart -m k3s || exit 1

echo "install k3s"
echo "set up proxy env variables if needed"

if [ -n "$PROXY" ]; then
export http_proxy=$PROXY
export https_proxy=$PROXY
export no_proxy="localhost,127.0.0.0/8,$NODENETWORK,0.0.0.0,192.168.0.0/16,.svc,.cluster.local"
export HTTPS_PROXY=$http_proxy
export HTTP_PROXY=$http_proxy
export NO_PROXY=$no_proxy
fi
export TOKEN=$2
curl -sfL https://get.k3s.io | sh -s - server \
  --datastore-endpoint="mysql://k3s:$PASSWORD@tcp($VIRTUALIP:3306)/k3s" --token $TOKEN

k3s kubectl get node

echo "disable k3s"
systemctl disable k3s

echo "start k3s SafeKit module"
/opt/safekit/safekit start -m k3s

fi

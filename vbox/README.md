```
$ apt-get update
$ apt-get install linux-headers-$(uname -r)
$ apt-get install build-essential
```
Download the .iso [http://download.virtualbox.org/virtualbox/5.1.22/](http://download.virtualbox.org/virtualbox/5.1.22/)

```
$ mount /dev/sr0 /media/cdrom
$ sh /media/cdrom/VBoxLinuxAdditions.run
```

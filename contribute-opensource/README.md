## Configure Git

You can configure globaly the user

```
$ git config --global user.name ""
$ git config --global user.email ""
```

Global gitignore file that can be used to your specific computer

[https://github.com/github/gitignore](https://github.com/github/gitignore)

> **Note** You can search file throught all the project by pressing `t` keyboard shortcut.

put it into ~/.gitignore_global and then notify github to use that file as global gitignore.
```
$ git config --global core.excludesfile ~/.gitignore_global
```

To config public key to able auto autentificate

### Configure ssh with public key
If the folder exist with the file id_rsa.pub you are done.
```
$ ls -la ~/.ssh
```

If not, create the public key and accept the default without enter passphrase, just hit enter
```
$ ssh-keygen -t rsa -b 4096 -C "your@email"
# Check that folder is created
$ ls -la ~/.ssh
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa
```

To copy the public key into your clipboard.
```
$ pbcopy < ssh-add ~/.ssh/id_rsa.pub
```

Now go to github / Your profile / Edit profile / SSH keys / add SSH key
Title : The name of your machine
Key : past your public key.

To verify that the key is configured on github. Type yes to RSA key. If it successful it will print out Hi 'your name'!
```
$ ssh -T git@github.com
```
The github documentation at (github debug)[https://help.github.com/articles/error-permission-denied-publickey/]

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

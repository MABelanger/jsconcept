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
The github documentation at [github debug](https://help.github.com/articles/error-permission-denied-publickey/)


Check the CONTRIBUTING.md files that explain how to contribute and setup the project. If not exist, you may find it inside the README.md or wiki.

Go to the issues

Talk to the maintainer what is your solution to be shure that you don't waste times.






1. Fork the repo
2. Clone your fork
3. Create a branch
4. Run `npm install`
5. Run `npm t && npm run build`. If everything works, then you're ready to make changes.
6. Run `npm run test:watch`. See that it's watching your file system for changes.
7. Make your changes and try to make the tests pass. If you can't or need help then commit what you have with `--no-verify` and make a PR
8. If you get things working, add your changed files with `git add` and run `npm run commit` to get an interactive prompt for creating a commit message that follows [our standards](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md). You'll notice that there are git hooks in place which will run testing, linting, etc. (unless you commit with `--no-verify`).
9. Push your changes to your fork with `git push`
10. Create a pull request.
11. Iterate on the solution.
12. Get merged! 🎉 🎊

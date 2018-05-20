### Print the sha1 of the content
```bash
> echo 'Hello, world!' | git hash-object --stdin
af5626b4a114abcb82d63db7c8082c3c4756e51b
```

### Print the content of the git objects
```bash
> tree .git/objects                                     
.git/objects
├── 21
│   └── b8a84863cabcd26885c40b879c344e7c8d2819
├── 58
│   └── 1caa0fe56cf01dc028cc0b089d364993e046b6
├── 98
│   └── 0a0d5f19a64b4b30a87d4206aade58726b60e3
├── info
└── pack
```

### Print the type of the object
-t
```bash
> git cat-file -t 581c
tree
```

### Print the content of the object
-p
```bash
> git cat-file -p 581c
100644 blob 980a0d5f19a64b4b30a87d4206aade58726b60e3	hello.txt
```

### witch commit the branch points to
```bash
> cat .git/refs/heads/master                       
21b8a84863cabcd26885c40b879c344e7c8d2819
```

### get the current commit
```bash
 > git log --oneline
```

### Graph with branch
```bash
 > git log --graph
```

### Do not use less pager
```bash
> git --no-pager log --oneline
```

### show what is in the staging area
```bash
> git ls-files -s
```
### moving files in & out of the staging area
```bash
## add file
> git add <file>
## remove file
> git rm --cached <file>
## rename file
> git mv <file>
```

### git add -p


### git stash
```bash
# stash changes
> git stash
# Apply the last stash
> git stash apply


# list changes
> git stash list
# Show the contents
> git stash show stash@{0}
# Apply a specific stash
> git stash apply stash@{0}
```
### keep untracked files
```bash
# Keep untracked files
> git stash --include-untracked
# Keep all files (even ignored ones in the .gitignore)
> git stash --all
```

### keep untracked files
```bash
# Name stashes for easy reference
> git stash save "The name of the stash"
# Start a new branch from stash
> git stash branch <optional branch name>
# Grab a single file from a stash
> git checkout <stash name> -- <filename>
```

## cleaning the stash
```bash
# Remove the last stash and apply changes (it do not remove if merge conflict)
> git stash pop

# Remove the last stash
> git stash drop

# Remove the nth stash
> git stash drop stash@{n}

# Remove all stashes
> git stash clear
```

## Tags
```bash
# Add lightweight tag
> git tag my-first-commit

# Add Annotated tag
> git tag -a v1.0 -m 'Version 1.0 of my blog'
```

```bash
# List all the tags in the repo
> git tag

# List all tags, and what commit they're pointing to
> git show-ref --tags

# List all the tags pointing at a commits
> git tag --points-at <commit>

# Looking at the tag, or tagged contents:
> git show <tag-name>
```

## Show the list of commit, stash, tag
```bash
> git show-ref --head
> git show aa145e5
```

## Show the content of the commit
```bash
> git show-ref --head
> git show aa145e5
```

## Create a new branch from commit
```bash
> git branch new-branch-name 6ef8a62
```
## merge with no fast foward
```bash
> git checkout master
> git merge new_feature --no-ff
```
## Show difference between staging or commit
```bash
# diff staging area
> git diff --staged
# diff master branch with new_feature
> git diff master new_feature
```

## Undo the commit
```bash
git reset --hard HEAD^
```

## Switch to the previous branch
```bash
git checkout -
```

## Track a file
```bash
> git log --name-status --follow --  <file>
```

## git log diff-filter
Selectively iinclude or exclude file that have been:
(A)dded, (D)eleted, (M)odified & (R)ename ...
```bash
> git log --diff-filter=R --stat
```

## Git show look at commit
Show commit and contents:

```bash
> git show <commit>
# Or for current branch
> git show HEAD~1
# or for branch
git show BRANCH_NAME~1
```
Show files changed in commit:

```bash
> git show <commit> --stat
```
Look at a file from another commit:

```bash
> git show <commit>:<file>
```

## Diff two between
```bash
# working area and commit.
> git diff
# Staged change
> git diff --staged
# compare two branches
> git diff BRANCH_A BRANCH_B
```

### Diff branch

```bash
# Witch branch can be merged in master and can be cleaned up.
> git branch --merged master
# Witch branch aren't merged with master yet.
> git branch --no-merged master
```

#### Checkout from a specific commit
- Copy to both working area & staging area
```bash
> git checkout <commit> -- <file_path>
```
- Restore a deleted file
```bash
> git checkout <commit> -- <file_path>
```

## Git clean
Git clean will clear your working area by deleting untracked files.

```bash
# To see what would be deleted only file
> git clean --dry-run
# To se what would be deleted file + dir
> git clean -d --dry-run

# Do the deletion Only files
> git clean -f

# Clean files and directories
> git clean -fd
```

##Git reset <commit>
1. Move HEAD and current branch
2. Reset the staging area
3. Reset working area

### Git reset
``` bash
# --soft = (1)
> git reset --soft HEAD~

# --mixed = (1) & (2)
> git reset --mixed HEAD~

# --hard = (1) & (2) & (3)
> git reset --hard HEAD~

# It only reset the saging area with the default --mixed
> git reset <commit> -- <file>

# accidental `git reset -`
> git reset ORIG_HEAD
```


### git revert, the safe reset.
```bash
# It will not change history
> git revert <commit>
```

### Git amend
```bash
# make change to previous commit (message or files)
> git commit --amend
```
### Git rebase

#### Interractive
```bash
# the ^ specifies the parent commit
# In the format of : <command> <commit> <commit msg>
> git rebase -i <commit_to_fix>^
```

#### Split it up into multiple commits

1. Start an interactive rebase with rebase -i
2. mark the commit with an edit
3. git reset HEAD^
4. git add
5. git commit
6. repeat (4) & (5) until the working area is clean!
7. git rebase --continue

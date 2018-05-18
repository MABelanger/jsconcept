git is key/value
value : is the data (the files)
key : the SHA1

The identifier blob
The size of the content
\0 delimiter
content


echo 'Hello, world!' | git hash-object --stdin

echo 'blob 14\0Hello, World!' | openssl sha1


echo 'Hello, World!' | git hash-object -w --stdin

You can't store empty directory.

Git object is compressed.

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

➜  test git:(master) git cat-file -t 581c
tree

➜  test git:(master) git cat-file -p 581c
100644 blob 980a0d5f19a64b4b30a87d4206aade58726b60e3	hello.txt
```

You can't change the content with malicious code because is sha1. The date, the commiter ect...
Another great feature is corruption in disk.

Head point to the current commit.
Git is fast because is only changing pointer to the files.

# Head is a pointer to the current branch.
```bash
> cat .git/HEAD
ref: refs/heads/master
```

### List of branch
```bash
> tree .git/refs
```

### Three area where code lives
1. Working area :
  - The files that are also not handled by git. (untracked files  )
2. Staging area
  - What file are going to be part of the next commit (git add)
3. Repository
  - The files git know about, contains all of your commits.

### The commit
The commit is a snapshot what your working and staging area look like a the time of the commit.


cat .git/refs/heads/master

In some case HEAD can point to a commit instead of a branch.

### git stash
It's another place where the code live like working, staging, repository area.
It's safe from the destructing like git reset, git checkout...

### Three types of git references
- Tags & Annotated Tags
- Branches
- HEAD

### What is a branch
A branch is just a pointer to a particular commit.

### What is head
HEAD is how git knows what branch you're currently on, and what the next parent will be.

- It's a pointer
  - It usually point at the name of the current branch.
  - But, it can point at a commit to (detached HEAD)
- It moves when:
  - You make a commit in the currently active branch
  - When you checkout a new branch.

HEAD -> Master -> CD0B5


### Lightweight tag
Lightweight tags are juste a simple pointer to a commit.
When you create a tag with no arguments, it captures the value in HEAD.
```bash
> git tag my-first-commit
```

### Annotated tags : git tag -a
```bash
> git tag -a v1.0 -m 'Version 1.0 of my blog'

> git tag
my-first-commit
v1.0

> git show v1.0
```

## detached head
If you work in detached head, you can create a branch from that commit. Be careful in detached head it can be garbage collected. The commit in a detached head is called dangling commit.

## Show commit of the branch
```bash
# only commits
> git show-ref --heads

# all commits with tag and stash
> git show-ref --head
```

## Merging & Fast-forward
Most merge commit have two parents but it's possible to have more than two parents to a merge commit.

## Fast forward commit
A fast forward commit if when no file has to merge from the master, so it only change the master pointer to the last commit. The problem is it's not create a merge commit, git know how to do it without merge commit. So because it has no trace, you can lose track of the feature branch, the commit becoming linear. To avoid this :

```bash
> git checkout master
> git merge new_feature --no-ff
```
## Git RERERE REuse REcorded REsolution
- git saves how you resolved a conflict.
- next conflict: reuse the same resolution.
Useful for :
- Long lived feature branch (like a refactor)
- rebasing
```bash
# Only for the current project
> git config rerere.enabled true
# For all projects.
> git config rerere.enabled true --global
```

## Git commit message is useful
A description of how you did that not what the code do. You can add one first line follow by blank line and then the paragraph of the descripion. The description is broken into 72 characters line.

- good commit help to preserve the history of a code base.
- They help with:
  - debugging & troubleshooting
  - creating release notes
  - code reviews
  - rolling back
  - associating the code with an issue or ticket.

- Encapsulates one logical idea
- Doesn't introduce breaking changes
  - i.e. tests pass.

## Useful git log
```bash
> git log --since=yesterday
> git log --since=2.weeks.ago
```

## Track a file
```bash
> git log --name-status --follow --oneline --  <file>
```

## Seach For git commit match regexp
```bash
> git log -grep <regexp>
```

## Filter search
```bash
> git log --grep=Wrapper --author=Francis --since=2.years
```

## git log diff-filter
Selectively iinclude or exclude file that have been:
(A)dded, (D)eleted, (M)odified & (R)ename ...
```bash
> git log --diff-filter=R --stat
```


## git log: referencing commits
Git allow commit referencing of multiple parent so to point to a parent you can.
- ^ or ^n
  - no args: ^ == ^1 : the first parent commit
  - n : the nth parent commit

- ~ or ~n
  - no args : == ~1 : the first commit back, following 1st parent
  - n: number of commits back, following only 1st parent.

note: ^ and ~ can be combined.

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

## Diff
- Diff shows your changes:
  - between commits
  - between the staging area and the repository
  - what's in thw working area

- unstaged changes
```bash
> git diff
```
- staged changes
```bash
> git diff --staged
```

- compare two branches
what is in the branch A that is not in the branch B
```bash
> git diff BRANCH_A BRANCH_B
```

### Two dot notation
The two .. notation is B exclude A
Show the difference that is on branch B but not in branch A
```bash
> git diff A B
> git diff A..B
```

### Diff branch

```bash
# Witch branch can be merged in master and can be cleaned up.
> git branch --merged master
# Witch branch aren't merged with master yet.
> git branch --no-merged master
```

## Fix mistakes
- checkout
- reset
- revert
- clean


### Checkout
Can restore working area tree files or switch branches. Depend on the parameter.
If checkout a file it not moving the pointer HEAD to the new branch

#### Checkout Branch
1. Change HEAD to point to the new branche.
2. Copy the commit snapshot Repository to the staging area. (Index)
3. Update the working area with the branch contents.

#### Checkout a file
1. Replace the working area copy with the version from the current staging area.
```bash
> git checkout -- <file_path>
```
** The two dash -- signify the end of the command operation and a start of positional parameter (files). If i have the file with the same of branch name. git checkout will know is a file with the --

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

## Git reset
Do not reset if you working on a pubic repo if you pushed your change.
### Git reset --soft
When git reset soft to the parent, the head is moving but the parent is detached. dangling commit after a new commit from the child.

### Git reset --mixed
It move the head than copy the new head to the staging area. (the default)
```bash
> git reset --soft HEAD~
```

### Git reset --hard
It does the same thing of soft and mixed but it also copy to the working area.
```bash
> git reset --hard HEAD~
```

##Git reset <commit>
1. Move HEAD and current branch
2. Reset the staging area
3. Reset working area

--soft = (1)
--mixed = (1) & (2)
--hard = (1) & (2) & (3)

# Git reset files
It only reset the saging area with the default --mixed, so this operation do not work with flags.
```bash
> git reset <commit> -- <file>
```

In case of accidental `git reset -`, or accidental merge, git keeps the previous value of `HEAD` in variable called `ORIG_HEAD`. To go back the way things were:
```bash
> git reset ORIG_HEAD
```

# git revert, the safe reset.
It will not change history, and it will create a new commit the mirror opposite of the one commit specified.
```bash
> git revert <commit>
```

## Git amend
Amend is a let you make change to previous commit. It add an new commit and it the old one become dangling commit that will garbage collected.

```bash
> git commit --amend
```
## Git rebase
A rebase apply our commit on the top of other commit on another branch. Rebase=Give a commit a new parent. (a new base commit).
1. It rewind head to the top of master.
2. It apply a copy of our commit on our branch on top of the master head.

The power of rebase is replay commits *Before* they're "replayed" on the top of the new HEAD.
- Commits can be :
  - Edited
  - Removed
  - Combined
  - Re-ordered
  - Inserted

### Interractive rebase
```bash
# the ^ specifies the parent commit
> git rebase -i <commit_to_fix>^
```
It open an editor with a list of "todo"
- In the format of : <command> <commit> <commit msg>
- 

Editing a commit can also split it up into multiple commits!
1. Start an interactive rebase with rebase -i
2. mark the commit with an edit
3. git reset HEAD^
4. git add
5. git commit
6. repeat (4) & (5) until the working area is clean!
7. git rebase --continue

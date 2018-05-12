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
> git log --name-status --follow --  <file>
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

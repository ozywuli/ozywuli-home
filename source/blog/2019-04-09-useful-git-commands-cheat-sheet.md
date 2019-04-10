---
title: Useful Git commands cheat sheet
slug: useful-git-commands-cheat-sheet
date: 2019-04-09
excerpt: Ozy's cheat sheet for git
---

These are the git commands I use in different situations. Inspired by [https://www.bennadel.com/blog/3587-my-opinionated-git-cheat-sheet.htm](https://www.bennadel.com/blog/3587-my-opinionated-git-cheat-sheet.htm).

working copy -> index (git add) -> tree (git commit)


## Workflow

**Initialize a git repository**
```bash
git init
```

**Clone a remote repository**
```bash
git clone <remote-url>
```

**Sync local git repo with remote repo**
```bash
git pull

git pull <remote-name> <branch-name>
```

**Check the status of a git repository**
```bash
git status
```

**Add all changes in a project to staging**
```bash
git add .
```

**Commit all files in staging**
```bash
git commit -m <message>
```

**Push changes to a remote repository**
```bash
# set a upstream remote for a branch
git push -u <remote-name> <branch-name>

# if remote upstream branch has been set
git push

# manually push to a upstream remote for a branch
git push <remote-name> <branch-name>
```

## Revert

Undos a commit and remembers this as a change in history

```bash
git revert <SHA>
```

## Reset

Undos changes in the working directory. These are not saved in history

**Remove files from staging**

```bash
git reset
git reset <filename>

# alternative
git rm --cached <filename>
git rm -r --cached <directory>
```

**Undo commit but keep changes**
```bash
git reset HEAD^
```

You want to undo a commit and remove the files from staging but still keep them in memory.

**Undo commit but keep changes in staging**

You want to undo a commit but keep the file changes in staging.

```bash
git reset --soft HEAD^
```

**Undo current commit and move head to the last commit**

Nuke the commit and never see it again. Switch to the previous commit.

```bash
git reset --hard HEAD^
```

**Remove a file from index and working directory**

```bash
git rm -f <filename>
```

**Move HEAD to a specific commit (even ones that have been destroyed)**

You accidentally nuked a commit. Not all is lost. You can recover the commit by using:

```bash
# get the SHA or HEAD
git reflog

# Move your HEAD to the specified SHA or head
git checkout -b <branch-name> <SHA>
```

All git commits are saved for 90 days

**Force push reset**

When you rewrite history with `reset`, you'll likely run into issues when pushing your changes upstream. To sync your remote branch with the latest changes from you local branch, do this:

```bash
git push -f
```

## Branching

**List branches**
```bash
git branch
```

**Create a branch**

```bash
git branch <branch-name>
```

**Switch to a different branch**

```bash
git checkout <branch-name>
```

**Create a branch and switch to it**
```bash
git checkout -b <branch-name>
```

**Merge all the contents of the feature branch with the base branch**

```bash
git merge <feature-branch>
```

**Move the base of the feature branch onto the endpoint of the base branch**

```bash
git rebase <base-branch>
```

**check out an older commit to make changes**
```bash
git checkout -b <new branch-name> <SHA>
```

## Stashing

**stash changes in the staging area**

```bash
git stash
```

**stash with a comment**
```bash
git stash save "stash README.md"
```

**stash all files**
```bash
git stash --include-untracked
```

**list all stashes**
```bash
git stash list
```

**apply the stash at top of heap**
```bash
git stash apply
```
**apply a specific stash**
```bash
git stash apply <id>
```

**grab latest stash and then throwit away**
```bash
git stash pop

```
**drop latest stash**

```bash
git stash drop
```

**drop specific stash**
```bash
git stash drop stash@{2}
```

**clear stash**
```bash
git stash clear
```

## History

Show history of commits

```bash
git log
```

**Ammend the message in the previous commit**
```bash
git commit --amend
```

```bash
git rebase -i <HEAD>

# commit with the same message
git commit --all --amend --no-edit

# return to the previous head commit
git rebase --continue
```

## Remotes

List remotes

```bash
git remote
```

Add remote

```bash
git remote add origin <url>
```

Add a remote for an upstream repo (the main repo you forked from)

```bash
git remote add upstream <url>
```
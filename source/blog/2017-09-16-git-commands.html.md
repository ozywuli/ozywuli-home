---
title: Git Commands
slug: git-commands
date: 2017-09-16
excerpt: List of my most used git commands
---


Restore the file in your working directory to look exactly as it did when you last made a commit
Discard changes in the work directory.

```ruby
git checkout HEAD "file name"
```


The commands resets the file in the staging area to be the same as the HEAD commit. It does not discard file changes from the working directory, it just removes them from the staging area.
Unstage file changes in the staging area

```
git reset HEAD "file name"
```


Move the HEAD to a specific commit. Resets to a previous commit in your commit history.

```
git reset commit_SHA
```


Create a new branch

```
git branch "branch_name"
```


Create a new branch and switch to it

```
git checkout -b "branch_name"
```


Switch branches

```
git checkout "branch_name"
```


Merge branches

```
git merge "branch_name"
```


delete branch

```
git branch -d "branch_name"
```


Resolve merge conflicts

```
<<<<<<< HEAD
master version of line
=======
fencing version of line
>>>>>>> fencing
```


Get a copy of a remote repository

```
git clone "remote_location" "clone_name"
```


List remotes

```
git remote -v
```


Check if any changes have been more to the remote and bring th changes down to your local copy without merging any changes

```
git fetch
git merge origin/master
```


Push your branch to remote

```
git push origin bio-questions
```
---
title: .bash_profile vs .bashrc
slug: bash-profile-vs-bashrc
date: 2020-04-10
excerpt: When to use one or the other?
---

If you're starting out changing or customizing your shell environment, you'll see tutorials asking you edit your `.bash_profile` or `.bashrc` file. Eventually you'll ask yourself, why are there two ways to do (in your mind) the same thing? There has to be a difference right? Well, you're sorta right.

The shell reads the `.bash_profile` script once every shell login.

The shell reads the `.bashrc` script every time the shell is started.

So then you might ask yourself, what is a shell login? If you're using Ubuntu for example, anytime you boot the OS or run it through WSL, the login shell is the desktop itself. If you SSH into a Ubuntu-powered server, then your login is, well, your login shell.

So as you can imagine, in most cases you want to add shell environment configuration to your `.bash_profile` and keep `.bashrc` as light as possible because the latter runs every time you open up a shell. But in practice, the overhead isn't all that much greater unless your `.bashrc` file is absolutely massive.
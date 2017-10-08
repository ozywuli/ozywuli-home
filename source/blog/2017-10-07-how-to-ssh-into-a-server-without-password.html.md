---
title: How To SSH Into A Server Without A Password
slug: how-to-ssh-into-a-server-without-a-password
date: 2017-10-07
excerpt: Learn how to SSH into your Linux server without typing a password each time
---


You use SSH to connect to a remote Linux server and you do this pretty often. You're tired of having to type a password each time you SSH. You want to know if there's a way to connect to a Linux server without having to type in a password. Here's how:

## Step 1

On your local machine, open a terminal with root access and type the following:

```
ssh-keygen -t rsa
```

This will generate a SSH key located in ~/.ssh/id_rsa.pub

## Step 2

Now that you've generated a public SSH key, copy it so that you can paste the content onto your Linux server.

```
pbcopy < ~/.ssh/id_rsa.pub
```

## Step 3

SSH into your Linux server (using your password for the last time) and open `.ssh/authorized_keys`

```
ssh username@111.111.111.11
vi ~/.ssh/authorized_keys
```

Now paste your public SSH key into the file, then save and quit.

## Conclusion

Alright, you should be set to go. Exit your SSH session and try to SSH into your Linux server again. If you did everything right, you should be able to log into your Linux server without being prompted for a password!


## References
[http://www.thegeekstuff.com/2008/11/3-steps-to-perform-ssh-login-without-password-using-ssh-keygen-ssh-copy-id/](http://www.thegeekstuff.com/2008/11/3-steps-to-perform-ssh-login-without-password-using-ssh-keygen-ssh-copy-id/)
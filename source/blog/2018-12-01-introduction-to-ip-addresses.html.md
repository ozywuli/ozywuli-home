---
title: Introduction to IP Addresses
slug: introduction-to-ip-addresses
date: 2018-12-01
excerpt: An introductory post on IP addresses
---


## What is an IP address?

Not to be confused with "Intellectual Property" (also IP), an Internet Protocol (IP) address is assign to any device that connects to the internet. Think of them as phone numbers for your device, whether it's a desktop computer, a smartphone, or even a server. Your device can't identify and contact other devices without IP addresses (phone numbers) and vice versa. Most devices use an IP address based on the IPv4 standard, which consists of a string of 4 different numbers that range from 0 to [255](https://en.wikipedia.org/wiki/255_(number)). For example: 255.123.462.531 and 118.34.0.131.

This means there are 4,294,967,296 different combinations of IPv4 addressses (256 * 256 * 256 * 256 === 4,294,967,296). Sounds like a lot but then you have to remember that there are almost 8 billion people alive today. So as you can imagine, IPv4 doesn't provide anywhere [near enough](https://en.wikipedia.org/wiki/IPv4_address_exhaustion) addresses for everyone that needs one. That's where IPv6 comes in.

IPv6

IPv6 is the latest version of the Internet Protocol. It provides a number of improvements over the IPv4 standard including more address space to handle the explosive growth in demand for devices that connect to theinternet. Whereas IPv4 is made up of 4 numbers whose range is 0-255, IPv6 addresses consist of 8 groups of hexadecimals (letters and digits). For example: 0000:1111:2222:3333:9A9A:8T8T:7C7C:DDDD. This means that the number of possible combinations is in the 340 undecillion range. For those like me who have no idea what undecillion means, here's the number in numeric form: 340,282,366,920,938,463,463,374,607,431,768,211,456. If I had to guess, I think that should be enough addresses for everyone now and into the far future.

Public and Private

IP addresses have something known as public and private addresses. The public IP addresses are the ones shared with other devices in the world. When you visit a website, for example, you've been assigned an IP address that the website can use to identify you. But there are also private IP addresses, which are a different set of addresses used to identify your device within home networks served by a router. This means public addresses cannot use them and home networks can reuse them the world over. These are the reserved private IP addresses:

- 10.0.0.0 to 10.255.255.255
- 172.16.0.0 to 172.31.255.255
- 192.168.0.0 to 192.168.255.255

So unless your device isn't using a router and is directly connected to the internet, if you run `ipconfig` on Windows or `ifconfig` on Linux on the command line in a local device, you'll only see the private IP address. Y

You might wonder then, how can you identify the public IP address assigned to you? One way to is to run the following command: 

```
curl ifconfig.me
```

`curl` is a command that fetches file content from the web. ifconfig.me is just a public website that displays your IP address. So the above command essentially just fetches your IP address from a public website.


## References
- [https://en.wikipedia.org/wiki/IP_address](https://en.wikipedia.org/wiki/IP_address)
- [https://en.wikipedia.org/wiki/255_(number)](https://en.wikipedia.org/wiki/255_(number))
- [https://www.lifewire.com/what-is-a-private-ip-address-2625970](https://www.lifewire.com/what-is-a-private-ip-address-2625970)


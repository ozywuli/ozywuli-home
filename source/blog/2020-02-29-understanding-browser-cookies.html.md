---
title: Understanding Browser Cookies
slug: understanding-browser-cookies
date: 2020-02-29
excerpt: Learn about Browser Cookies
---

Cookies are tasty, but they also leave crumbs. Browser cookies aren't tasty, but they leave behind crumbs that help servers identify the user's web browser. A common use case for cookies is checking that a user is logged in and that one or more requests are coming from the correct user's web browser. Browser cookies, or just cookies (as we know them from now in this article), is the stateful solution for the stateless HTTP protocol that connects the web. In other words, without crumbs, we wouldn't have the web as we know it today.

How are cookies created?
- Strings of key/value pairs.
- Server sends a HTTP header called "Set-Cookie" to the browser
- Browser sends cookie back to the server with a HTTP header called "Cookie"

Cookies serve 3 main purposes:

1. Session Management
	- user authentication
	- number of items in your shopping cart
	- your Flappy Bird score
2. Personalization
	- UI settings (grid view, list view)
	- themes (dark mode, light mode, pink mode)
3. Tracking
	- seeing what pages you've visited
	- what kind of content you're reading or watching
	- yea this kinda scary

Properties of a cookie

- Name: unique name of the cookie
- Value: value stored in cookie
- Domain: (domain where cookie origiantes. in specified, includes subdomains)
- Path: requests must include this URL path for cookies to be included in response header
- Expires / Max-Age: (if not setcookie is destroyed when browser closes. a cookie without an expiry date is considered a session cookie)
- Size: max size is 4096 bytes
- HttpOnly: (inacessible to `Document.cookie` and JS to mitigate XSS attacks)
- Secure: (only sent through https)
- SameSite: (shouldn't be sent cross-site)
- Last Accessed:

Types of Cookies

- Session cookies (transient cookie)
	- A cookie that does not container an expiration date
	- Stored in memory and never written to disk
	- When browser closes, the session cookie is destroyed
- Persistent cookies
	- A cookie with an expiration date
	- saved to disk
	- persists between browser sessions

How are server sessions related?
- A session is a global variable stored on the server, usually either in the databse or in an in-memory data structure like Redis.
- Each session is assigned a unique id that is referenced when retrieving stored values
- When a session is created, a cookie containing the session id is sent to the browser. The browser includes this session id with every request to the server

## References
[https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
[https://www.cisco.com/c/en/us/support/docs/security/web-security-appliance/117925-technote-csc-00.html](https://www.cisco.com/c/en/us/support/docs/security/web-security-appliance/117925-technote-csc-00.html)
[https://www.guru99.com/difference-between-cookie-session.html](https://www.guru99.com/difference-between-cookie-session.html)
[https://www.reddit.com/r/learnprogramming/comments/5jneho/difference_between_sessions_and_cookies/](https://www.reddit.com/r/learnprogramming/comments/5jneho/difference_between_sessions_and_cookies/)
[https://stackoverflow.com/questions/32563236/relation-between-sessions-and-cookies](https://stackoverflow.com/questions/32563236/relation-between-sessions-and-cookies)
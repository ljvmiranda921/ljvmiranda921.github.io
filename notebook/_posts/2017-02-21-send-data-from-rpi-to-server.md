---
layout: post
title: "How to send data from RPI to Server"
date: 2017-02-21
category: notebook
comments: true
author: "LJ MIRANDA"
---

> For those who were redirected here from my Wordpress site, I would like to welcome you to my new blog! I will be moving some of my older posts here so that in the future,  I can delete the Wordpress site entirely. Feel free to look around!

In most Raspberry Pi projects, sending data to a website (or in the website’s
database) is very crucial. For example, in home automation, if we want to
access the room’s sensor and consumption data in our devices through a
website in real-time, we must first be able to do data transfer from RPi to
website. In this tutorial, I am going to teach you a simple technique to do
just that. We will be utilizing a `curl bash` command via Python in RPi, and
we’ll build a simple PHP service in our website/client.

Here, `curl` sounds a very cute command when one hears it for the first time.
For Linux users, this is nothing new for you. `curl` is a nifty command line
tool for getting or sending files using URL syntax. To help you remember, you
can write it this way: `cURL`. Meaning, just by changing the URL syntax, you
can easily send data to your website!

In a sense, you will be having a URL that looks like this:

```
http://www.example.com/phpService.php?a1=val1&a2=val2&a3=val3
```

(If you try a Google Search, their URL will be somehow similar to the format
above!)

We can denote `a1`, `a2`, `a3` as three different variables, and `val1`,
`val2`, `val3` as their respective values. We will do the following tasks:

- [Write a curl command that will create an HTTP request](#the-curl-command); and
- [Write a PHP script in our website to process the HTTP request](#php)

## The cURL command

In order to use the `curl` command, we need to import the `os` module into
Python. After which, we provide the necessary code to access our data (it may
be an MySQL query, or another thing entirely). In this example, I will just
provide arbitrary values for our data. We "package" the HTTP request nicely
and then invoke the `curl` command. Here's an example of how we can do it:

```python
#Import necessary libraries
import os

#Write code here to access your data
val1 = 10
val2 = 20
val3 = 30

#Construct the cURL bash
http_address = "http://example.com/phpService.php?"
request_string = http_address + "a1=" + str(val1) + "&a2=" + str(val2) + "&a3=" + str(val3)

#Invoke the command
os.system('curl' + '"' + request_string + '"')
```
Including the `os` library is important so that the command will work. Your
data may be stored inside your RPi’s local database, so just call the
appropriate query and store those values inside your variables. Another note,
you cannot concatenate integers and strings together, thus the reason for
enclosing the val variables in an str() function.

<div class="alert alert-danger">
  <strong>Warning!</strong> My example here is a very simple one and is just
  used to demonstrate how the data transfer works. The problem with HTTP
  request is that your data is "exposed" in the transfer process, and may be
  prone to compromise. It is strongly recommended to encrypt one's data first
  before using the HTTP request.
</div>

Next we’ll be writing a PHP service that can understand the URL set by the
curl command and thus give you an opportunity to do the necessary operations.

## <a name="php"></a> PHP Service to process the cURL command

```php
<?php
print"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang=\"en\" lang=\"en\">
        <head>
        </head>
        <body>&";

            if ($_SERVER['REQUEST_METHOD'] == "GET) {
               $storeVal1 = $_GET["a1"];
               $storeVal2 = $_GET["a2"];
               $storeVal3 = $_GET["a3"];
            //Now you have the values of val1, val2, val3 stored in storeVal1, storeVal2, storeVal3 respectively.
            }
        print "</body>;
?>
```

In web development jargon, what we just did is called an HTTP GET Request, if
you’ve been scouring different programming forums, you might have read about
the HTTP POST Request. Normally, I use POST requests on Forms (like in
entering your Username and Password) and GET for simple services like this.

My own implementation of the curl bash command can be found
[here](https://gist.github.com/ljvmiranda921/f5b815013b96e4801007), while the
PHP service can be found
[here](https://gist.github.com/ljvmiranda921/c0d943541a6392470c23). I first
gathered the data from my RPI’s local database, and then send them to the web
to be stored in the server database.

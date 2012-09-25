dns-middleware
==============

DNS-lookup middleware for express/connect

Usage
-----
The passed request must have a body consisting of JSON with the following keys:

__query__
 - The address queried

__type__ (defaults to: 'A')
 - The type of query made

__server__ (defaults to: '8.8.8.8')
 - The server to make the query from


The answer is passed back as a JSON with the following keys:

__answer__
 - Contains all the answer-sections in an array

__time__
 - The time it took to make the request

Example
-------
See: [dns-middleware-example](https://github.com/gildean/dns-middleware-example)

License
-------
Unless stated elsewhere, the license as in the LICENSE-file

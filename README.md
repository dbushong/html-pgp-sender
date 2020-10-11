# PGP Message Encryptor Static HTML

This is a serverless, locally runnable JavaScript Web App which will accept
a short message and encrypt it using one of a set of public keys you include
in the app.  It provides a convenient button which can then open the result
(as a `mailto:` link) in the user's email client of choice.

The simple purpose is to provide non-technical users a trivially simple way
of securely sending small bits of information (e.g. passwords) to you, without
them having to install any tools.

## Features

* encrypts as you type, gives a message length estimate, targetted at keeping
    the resulting `mailto:` URL under 2000 chars, so it'll actually work
* lets you bookmark a specific public key fingerprint as `?to=<fingerprint>`
    to pre-select the proper recipient from the list
* can draft an email

## Installation

1. Clone the repo
1. Stick it somewhere where it's web-accessible
1. `cp pubkeys.example.js pubkeys.js`
1. Edit the `pubkeys.js` file to contain whichever ASCII-armored PGP/GPG
    public keys you wish
1. Profit

## Support

Works at least on recent Chrome and Firefox.

## Credit

* https://openpgpjs.org/

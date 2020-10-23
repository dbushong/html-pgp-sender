# PGP Message Encryptor Static HTML

Demo: https://dbushong.github.io/html-pgp-sender/

This is a serverless, locally runnable JavaScript Web App which will accept
a short message and encrypt it using one of a set of public keys you include
in the app.  It provides a convenient button which can then open the result
(as a `mailto:` link) in the user's email client of choice.

The purpose is to provide non-technical users a trivially simple way
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
    public keys you wish.  If you don't already have GPG set up, you can
    follow [these instructions][gh-gpg], and just skip the GitHub bits.
1. Profit

## Usage

1. Give the URL to your webpage, with your public key pre-selected in
    the dropdown, to the person you want to send you stuff
1. They'll use the page, and you'll get an email w/ an encrypted message
1. Copy the text and either put it in a file and run `gpg --decrypt` on it,
    or if you're on a Mac and you don't have a passphrase on your key, you
    can just run this in a terminal: `pbpaste | gpg --decrypt`

## Support

Works at least on recent Chrome and Firefox.

## Credit

* https://openpgpjs.org/

[gh-gpg]: https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-gpg-key

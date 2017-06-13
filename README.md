# Paragliding Theory to Anki Deck

A script that converts [DHV](https://www.dhv.de) questions / answers to an [Anki](https://apps.ankiweb.net/) deck.

## How to get the latest Anki deck

- Download all CSV files from [the latest anki deck](https://github/)
- Import them into Anki, one Deck per CSV (check HTML usage)
- Open Images from the PDFs in `/originals`
- Start learning

## Script usage

The script is a simple [node](https://nodejs.com) script that looks for the inputs

**Setup node**

You will need an OS X / unix machine for our development scripts to work.

You need at least node 6:

- install nvm https://github.com/creationix/nvm)
- add the necessary lines to your `.bash_profile` / `.zshrc` or similar.

```
nvm install 6
```

**Execute**

```
node convertToAnki.js
```

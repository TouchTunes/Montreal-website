# TouchTunes

## Installation

Prerequests:
- node.js version 4+

Installation:

1. Clone this repository & enter 
2. Run `npm install` to install the dependencies

## Run

To run it locally run `npm start` command.
It'll start local server, open browser and watch code for any changes.

## Deploy

TBA

## Directory structure

```
.
├── config            // Config for metalsmith plugins
├── dist              // Build folder, this should be deployed on server
├── layouts           // Layouts for all page types
│   └── partials      // Partials for layouts (header, footer, menu, etc.)
├── node_modules      // All node modules required for a build
└── src               // Source of the app
    ├── img           // All images
    │   └── members   // Images for all employees that are listed in member section
    ├── jobs          // All jobs, add, edit and remove them here
    ├── js            // JS for the page
    │   └── vendor    // All vendor JS libraries
    ├── members       // All employees for employee landing pages
    ├── posts         // All pages (home, about, etc.)
    └── styles        // Less and fonts
        ├── fonts     // All fonts for font-face
        ├── partials  // Less partials
        └── vendor    // 3rd party CSS libraries
```

## Commit style

This project use "Angular JS" commit messages and [git-changelog](https://www.npmjs.com/package/git-changelog) tool to generate markdown file with the last changes.

There's a set of very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. But also, we can use the git commit messages to generate the a changelog file.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on github as well as in various git tools.

Example commit messages

```
git commit -m "feat(metalsmith): add permalinks plugin"
git commit -m "fix(modal): show close button on small screens"
```

### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation


### Scope

The scope could be anything specifying place of the commit change. For example `metalsmith`, `modal`, `home`, `menu`, etc...

### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".  
The body should include the motivation for the change and contrast this with previous behavior and can also be the place to reference issues that this commit **Closes**.

###Footer

The footer should contain any information about **Breaking Changes** and can also be the place to reference Bitbucket issues that this commit **Closes**.

A detailed explanation can be found in this [document][commit-message-format].
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#

Most of the time we don't use this.

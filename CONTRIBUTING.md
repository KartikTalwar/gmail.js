
# Contributing to gmail.js

## Documentation

If you introduce new API calls or features, please ensure they are
documented. Having it both in the `README.md`-file and as code-doc
makes it easier to use for everyone!

## Code quality

Gmail.js tries to keep a consistent code-quality and style-guide.

To enforce this, `eslint` is used.

Before submitting any patches, please run check that you have not
increased the amount of warnings, or caused any linting-errors. You
can do this by running `npm run lint`:

````bash
$ npm install
$ npm run lint

> gmail-js@0.5.3 test /home/jostein/build/gmail.js
> eslint src/*.js


/home/jostein/build/gmail.js/src/gmail.js
   650:66  warning  'j' is defined but never used          no-unused-vars
   691:48  warning  'xhr' is defined but never used        no-unused-vars
   942:85  warning  'password' is defined but never used   no-unused-vars
  1086:44  warning  'response' is defined but never used   no-unused-vars
  1122:65  warning  'callbacks' is defined but never used  no-unused-vars
  1442:86  warning  'sub' is defined but never used        no-unused-vars

✖ 6 problems (0 errors, 6 warnings)

````

Submissions with actual linting-errors will not be accepted, and
linting-warnings should be taken as that: Your code may not be doing
what you think it does.

## Anything else?

Apart from that: Feel free to send in patches and help improve this
library. All patches are appreciated!

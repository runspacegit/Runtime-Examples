# Runtime Examples
Some examples to show @runspace/runtime possibilities.

[![asciicast](https://asciinema.org/a/335210.svg)](https://asciinema.org/a/335210)

For example `install-chrome.js`

To execute something setup [daemon](https://github.com/runspacegit/daemon) on remote nodes, and install [cli](https://github.com/runspacegit/cli) on admin machine.

To broadcast function using cli use:
```shell
$ runspace daemon:broadcast install-chrome.js
$ # Or
$ runspace daemon:broadcast some/path/to/function.js
```

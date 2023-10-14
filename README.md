oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g noob123
$ noob123 COMMAND
running command...
$ noob123 (--version)
noob123/0.0.0 darwin-arm64 node-v20.5.0
$ noob123 --help [COMMAND]
USAGE
  $ noob123 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`noob123 hello PERSON`](#noob123-hello-person)
* [`noob123 hello world`](#noob123-hello-world)
* [`noob123 help [COMMANDS]`](#noob123-help-commands)
* [`noob123 plugins`](#noob123-plugins)
* [`noob123 plugins:install PLUGIN...`](#noob123-pluginsinstall-plugin)
* [`noob123 plugins:inspect PLUGIN...`](#noob123-pluginsinspect-plugin)
* [`noob123 plugins:install PLUGIN...`](#noob123-pluginsinstall-plugin-1)
* [`noob123 plugins:link PLUGIN`](#noob123-pluginslink-plugin)
* [`noob123 plugins:uninstall PLUGIN...`](#noob123-pluginsuninstall-plugin)
* [`noob123 plugins:uninstall PLUGIN...`](#noob123-pluginsuninstall-plugin-1)
* [`noob123 plugins:uninstall PLUGIN...`](#noob123-pluginsuninstall-plugin-2)
* [`noob123 plugins update`](#noob123-plugins-update)

## `noob123 hello PERSON`

Say hello

```
USAGE
  $ noob123 hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/motdotla/noob123/blob/v0.0.0/src/commands/hello/index.ts)_

## `noob123 hello world`

Say hello world

```
USAGE
  $ noob123 hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ noob123 hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/motdotla/noob123/blob/v0.0.0/src/commands/hello/world.ts)_

## `noob123 help [COMMANDS]`

Display help for noob123.

```
USAGE
  $ noob123 help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for noob123.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)_

## `noob123 plugins`

List installed plugins.

```
USAGE
  $ noob123 plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ noob123 plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.9.1/src/commands/plugins/index.ts)_

## `noob123 plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ noob123 plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ noob123 plugins add

EXAMPLES
  $ noob123 plugins:install myplugin 

  $ noob123 plugins:install https://github.com/someuser/someplugin

  $ noob123 plugins:install someuser/someplugin
```

## `noob123 plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ noob123 plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ noob123 plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.9.1/src/commands/plugins/inspect.ts)_

## `noob123 plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ noob123 plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ noob123 plugins add

EXAMPLES
  $ noob123 plugins:install myplugin 

  $ noob123 plugins:install https://github.com/someuser/someplugin

  $ noob123 plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.9.1/src/commands/plugins/install.ts)_

## `noob123 plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ noob123 plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help      Show CLI help.
  -v, --verbose
  --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ noob123 plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.9.1/src/commands/plugins/link.ts)_

## `noob123 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ noob123 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ noob123 plugins unlink
  $ noob123 plugins remove
```

## `noob123 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ noob123 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ noob123 plugins unlink
  $ noob123 plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.9.1/src/commands/plugins/uninstall.ts)_

## `noob123 plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ noob123 plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ noob123 plugins unlink
  $ noob123 plugins remove
```

## `noob123 plugins update`

Update installed plugins.

```
USAGE
  $ noob123 plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.9.1/src/commands/plugins/update.ts)_
<!-- commandsstop -->

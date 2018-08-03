Node Options:
    --version
    --experimental-modules
    --experimental-vm-modules

Node provides a standalone and includible REPL
process.exit();

global Object:
--------------
Global object in node is `global`
    global.x

var is module specific variable


Modules:
--------
Modules are reusable 
Node applications are modular
Each file in node treated as seperate module
Every node application will have one main module.
The require function is used to include require modules

Before a module's code is executed, Node.js will wrap it with a function wrapper that looks like the following
(function(exports, require, module, __filename, __dirname) {
    exports = moudle.exports
})

Always exports should be module.exports
require will search for the specified modules in all module.paths

Node Build-in modules:
----------------------
- options
- FS
- readline

Third Party Modules:
----------------------
To include third party modules we need to have package.json

require will look for following options
1. .js
2. folder
3. .json
4. .node (c++ extensions)

Require steps:
--------------
1. Resolving: To find the absolute path of the file
2. Loadin: To determine the type of the file content
3. Wrapping: To give the file its private scope
4. Evaluation: This is what the VM eventually does with loaded code
5. Cache: So that when we require this file again, we don't go over all the steps another time.

To check the cached required files
----------------------------------
console.log(require.cache)

To Resolve the required file.
----------------------------------
require.resolve('module_name')

Async Programming:
-- Timers
-- I/O Operations
-- Watch Operations

Asynchronous programming can be achieved using following approaches:
1. Callbacks
2. Promise
3. Events
4. Async/await


Events:

const EventEmitter =  require('events')
class MyEmitter extends EventEmitter { }
var obj = new MyEmitter();


#Node Built-in Libs
-------------------
- fs, os, net, udp, http, https

#Socket.io
-----------
- Live reloads
- Web Socket
- Ajax Polling(fallback)

#Timers
-------
- setTimeout
- setInterval
- setImmediate
- process.nextTick
- I/O Sync
- Watcher







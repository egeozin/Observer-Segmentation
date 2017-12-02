const config = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const port = config.server_port
const host = config.server_host

server.listen(port)
debug(`Server is now running at http://${host}:${port}.`)
debug(`Server accessible via localhost:${port} if you are using the project defaults.`)

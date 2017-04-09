const getIP = require('ipware')().get_ip
const LOCALHOST = "127.0.0.1"

const get_ip = function(req) {
	const ip_str = getIP(req).clientIp;
	return ip_str;
}

module.exports = get_ip;
var request = require("request");
var when = require("when");

var post = function(url, data, type) {
	type = type || 'json';
	var deferred = when.defer();

	request.post(url, {
		form: data
	}, function(err, resp, body) {
		if(err) {
			return deferred.reject(err);
		}

		if (resp.statusCode !== 200) {
			deferred.reject(resp.statusCode);
		}

		deferred.resolve(type === 'json' ? JSON.parse(body) : body);
	});

	return deferred.promise;
};

var get = function(url, type) {
	type = type || 'json';
	var deferred = when.defer();

	request(url,function(err, resp, body) {
		if(err) {
			return deferred.reject(err);
		}

		if (resp.statusCode !== 200) {
			deferred.reject(resp.statusCode);
		}

		deferred.resolve(type === 'json' ? JSON.parse(body) : body);
	});

	return deferred.promise;
};

module.exports = {
	get: get,
	post: post
};

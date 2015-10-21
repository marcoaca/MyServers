var express = require('express');
var port = 3000;
var app = express();

app.get('*', function(request, response){
	response.end('Hello Marco');
});

app.listen(port, function(){
	console.log('Server is running, please open browser at http://localhost:%s', port);
});
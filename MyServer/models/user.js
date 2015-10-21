var bcrypt   = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
	local : {
		username : integer
	}
});

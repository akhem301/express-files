var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: {type : String, default: 'Akshay'},
    rating: {type:Number, default: 0}
});

module.exports = mongoose.model('Bear', BearSchema);

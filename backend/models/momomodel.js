const mongoose = require('mongoose');

const momoSchema = mongoose.Schema({
    orderId: { type: String },
    info: {type: Object},
});

module.exports = mongoose.model('Momo', momoSchema);

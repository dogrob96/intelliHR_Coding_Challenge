const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testQuestionSchema = new Schema({
    label: String,
    type: String,
    required: Boolean,
    options: String,
});

module.exports = mongoose.model('testQuestion', testQuestionSchema);
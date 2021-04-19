const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSubmissionSchema = new Schema({
    date: Date,
    subjectID: String,
    responses: String
});

module.exports = mongoose.model('testSubmission', testSubmissionSchema);
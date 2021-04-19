const graphql = require('graphql');
const testQuestion = require('../models/testQuestion');
const testSubmission = require('../models/testSubmission');
const user = require('../models/user')

const { GraphQLObjectType, GraphQLBoolean ,GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

const QuestionType = new GraphQLObjectType({
    name: 'Question',
    fields: () => ({
        id: { type: GraphQLID },
        label: { type: GraphQLString },
        type: { type: GraphQLString },
        required: { type: GraphQLBoolean },
        options: { type: GraphQLString}
    })
});

const TestSubjectType = new GraphQLObjectType({
    name: 'Subject',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        testChamber: { type: GraphQLInt },
        dateOfBirth: { type: GraphQLString },
        totalScore: { type: GraphQLInt },
        alive: { type: GraphQLBoolean}
    })
})

const SubmissionType = new GraphQLObjectType({
    name: 'Submission',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        subjectID: { type: GraphQLString },
        responses: { type: GraphQLString }
    }) 
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Question: {
            type: QuestionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return testQuestion.findById(args.id);
            }
        },
        Questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args){
                return testQuestion.find();
            }
        },
        Subjects: {
            type: new GraphQLList(TestSubjectType),
            resolve(parent, args){
                return user.find({name: { $ne: "GLaDOS"}});
            }
        },
        Submission: {
            type: SubmissionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return testSubmission.findById(args.id);
            }
        },
        Submissions: {
            type: new GraphQLList(SubmissionType),
            resolve(parent, args){
                return testSubmission.find();
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addQuestion: {
            type: QuestionType,
            args: {
                label: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                required: { type: new GraphQLNonNull(GraphQLBoolean) },
                options: {type: GraphQLString}
            },
            resolve(parent, args) {
                let question = new testQuestion({
                    label: args.label,
                    type: args.type,
                    required: args.required,
                    options: args.options
                });
                return question.save();
            }
        },
        addSubmission: {
            type: SubmissionType,
            args: {
                date: { type: new GraphQLNonNull(GraphQLString) },
                subjectID: { type: new GraphQLNonNull(GraphQLString) },
                responses: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let submission = new testSubmission({
                    date: args.date,
                    subjectID: args.subjectID,
                    responses: args.responses
                });
                return submission.save();
            }
        },
        updateQuestion: {
            type: QuestionType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
                label: { type: GraphQLString },
                type: { type: GraphQLString },
                required: { type: GraphQLBoolean },
                options: { type: GraphQLString}
            },
            async resolve(parent, args) {
                return testQuestion.findOneAndUpdate({_id: args.id}, args);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
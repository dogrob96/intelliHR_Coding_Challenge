import axios from 'axios';

export function login(username, password) {
    return axios({
        url: "http://localhost:3001/api/users/login",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*'
        },
        data: { "user": { "name": username, "password": password }}
    })
}

export function getQuestionByID(id,token) {
    return axios({
        url: "http://localhost:3001/graphql",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Authorization': "Token " + token
        },
    data: JSON.stringify({"query":"{ Question(id: \"" + id + "\")  { id label type required options } }"})
    })
}

export function getAllQuestions(token) {
    return axios({
        url: "http://localhost:3001/graphql",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Authorization': "Token " + token
        },
        data: JSON.stringify({"query":"{ Questions  { id label type required options } }"})
    })
}

export function getAllSubmissions(token) {
    return axios({
        url: "http://localhost:3001/graphql",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Authorization': "Token " + token
        },
        data: JSON.stringify({"query":"{ Submissions  { id date subjectID responses } }"})
    })
}

export function getSubmissionByID(id,token) {
    return axios({
        url: "http://localhost:3001/graphql",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Authorization': "Token " + token
        },
        data: JSON.stringify({"query":"{ Submission(id: \"" + id + "\")  { id date subjectID responses } }"})
    })
}

export function getSubjects(token) {
    return axios({
        url: "http://localhost:3001/graphql",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Authorization': "Token " + token
        },
        data: JSON.stringify({"query": "{ Subjects {id name testChamber dateOfBirth totalScore alive}}"})
    })
} 

export function addSubmission(date,subjectID,responses,token) {
    return axios({
        url: "http://localhost:3001/graphql",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Authorization': "Token " + token
        },
        data: JSON.stringify({"query":"mutation{ addSubmission(date:\""+date+"\",subjectID:\""+subjectID+"\",responses:\""+responses+"\") { id date subjectID responses } }"})
    })
}

export function addQuestion(label,type,required,options,token) {
    return axios({
        url: "http://localhost:3001/graphql",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Authorization': "Token " + token
        },
        data: JSON.stringify({"query":"mutation{ addQuestion(lable:\""+label+"\",type:\""+type+"\",required:\""+required+"\",options:\""+options+"\") { id label type required options } }"})
    })
}

export function updateQuestion(id,label,type,required,options,token) {
    return axios({
        url: "http://localhost:3001/graphql",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Authorization': "Token " + token
        },
        data: JSON.stringify({"query":"mutation{ updateQuestion(id:\""+id+"\",lable:\""+label+"\",type:\""+type+"\",required:\""+required+"\",options:\""+options+"\") { id label type required options } }"})
    })
}
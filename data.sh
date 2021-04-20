#!/bin/sh

curl -d '{"user":{"name":"GLaDOS","password":"ISawDeer"}}' -H 'Content-Type: application/json' http://localhost:3001/api/users

curl -d '{"user":{"name":"1", "password":"ILoveCube11", "testChamber":1, "dateOfBirth":"1988-04-07T07:50:00Z", "totalScore":86, "alive":true}}' -H 'Content-Type: application/json' http://localhost:3001/api/users

curl -d '{"user":{"name":"2","password":"WeightedLove","testChamer":14,"dateOfBirth":"1974-12-24T08:53:00Z","totalScore":12,"alive":false}}' -H 'Content-Type: application/json' http://localhost:3001/api/users

curl -d '{"user":{"name":"3","password":"Cubecubecube","testChamer":54,"dateOfBirth":"1999-03-20T01:53:00Z","totalScore":90,"alive":false}}' -H 'Content-Type: application/json' http://localhost:3001/api/users

curl -d '{"user":{"name":"4","password":"thereisnocube","testChamer":1,"dateOfBirth":"1988-01-17T10:52:00Z","totalScore":86,"alive":true}}' -H 'Content-Type: application/json' http://localhost:3001/api/users

curl -d '{"user":{"name":"5","password":"123companion","testChamer":14,"dateOfBirth":"1974-02-08T11:20:00Z","totalScore":12,"alive":false}}' -H 'Content-Type: application/json' http://localhost:3001/api/users

curl -d '{"user":{"name":"6","password":"potato","testChamer":54,"dateOfBirth":"1980-06-26T01:02:00Z","totalScore":90,"alive":false}}' -H 'Content-Type: application/json' http://localhost:3001/api/users

TOKEN=$(curl -d '{"user":{"name":"GLaDOS","password":"ISawDeer"}}' -H 'Content-Type: application/json' http://localhost:3001/api/users/login | grep -Po '(?<="token":")[^"]+')

curl --location --request POST 'localhost:3001/graphql' \
--header "Authorization: Token $TOKEN" \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation{ addQuestion(label:\"What is the Cake\",type:\"Text\",required:true) { id label type required options } }"}'

curl --location --request POST 'localhost:3001/graphql' \
--header "Authorization: Token $TOKEN" \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation{ addQuestion(label:\"How does that make you feel\",type:\"Text\",required:true) { id label type required options } }"}'

curl --location --request POST 'localhost:3001/graphql' \
--header "Authorization: Token $TOKEN" \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation{ addQuestion(label:\"Do you think this test has miss treted you\",type:\"Text\",required:true) { id label type required options } }"}'

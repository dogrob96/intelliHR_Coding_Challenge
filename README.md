Coding Chanllenge for IntelliHR

Built with Node React Graphql Mongodb

to run have a local mongodb server running
then run ./setup.sh
then in another window run ./data.sh to add the users and test questions

user stories 
### User stories
| ID | Story Description                                                                                                             | Priority    | Details                                                                 | Completed |
|----|-------------------------------------------------------------------------------------------------------------------------------|-------------|-------------------------------------------------------------------------|-----------|
| 1  | As GLaDOS, I can log in to the application                                                                                    | Must have   | Login requires username and password | true                                   |
| 2  | As a Subject, I can log in to the application                                                                                 | Must have   | Login requires test subject ID and password   | true                          |
| 3  | As GLaDOS, I can edit the questions in the questionnaire                                                                      | Could have  | false |                                                                         |
| 4  | As a Subject, I can submit testing data (questionnaires)                                                                      | Must have   | Must capture date,      Testing data based on stored testing parameters | true |
| 5  | As GLaDOS, I can view all test subjects' data                                                                                 | Must have   | | true                                                                         |
| 6  | As a Subject, I can only view my own testing data (historical   questionnaire submissions)                                    | Must have   |           |false                                                              |
| 7  | As GLaDOS, I can ~~capture~~ register new test subjects                                                                       | Should have | Maximum of 10 subjects alive at once.      |false                             |
| 8  | As GLaDOS, I can filter and sort test subjects based on their metadata                                                        | Should have |             |false                                                             |
| 9  | As a facility manager, I can retrieve the Subject Number of the subject   that has submitted the most data and is still alive | Could have  | Must be via API with basic authorization   | partail                              |
| 10 | As a facility manager, I can test the new testing management system (unit   tests)                                            | Could have  |                                                                         |
| 11 | As a facility manager, I can deploy the new system in a docker container                                                      | Could have  |                                                                         |


estimate for uncomplete stories
user story 3 30 minitues to build a edit function on the view test question screen for GLaDOS
user story 6 30 minitues to add the abillity to get a users tests and display them
user story 7 10 minitues to allow GLaDOS to capture new subjects
user story 8 1 hour to add search and sorting fuctions as well as building interface for it
user story 9 5 minitues to add endpoint for getting subject number
user story 10 1 hour + to add unit test with good coverage
user story 11 unknown time to complete

with more time I would also have done some work on the CSS but I was focused on the functionality not aesthetics

Remember the Cake Is Always A Lie

Thank you for taking the time to look at my submission
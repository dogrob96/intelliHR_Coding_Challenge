import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import { getAllQuestions, getSubjects, getAllSubmissions} from './api';
import {  useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  

export default function Dashboard({token}){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Test Submissions" {...a11yProps(0)} />
                    <Tab label="Test Subjects" {...a11yProps(1)} />
                    <Tab label="Test Questions" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <TestSubmissions token={token}/>
            </TabPanel>
            <TabPanel value={value}  index={1}>
                <TestSubjects />
            </TabPanel>
            <TabPanel value={value}  index={2}>
                <TestQuestions />
            </TabPanel>  
        </div>
    );
}

function TestSubmissions(){
    let token = sessionStorage.getItem('token');
    console.log(token)
    const [Submissions, setSubmissions] = React.useState(0);
    if(!Submissions){
        getAllSubmissions(token).then((res) => {
            if(res && res.data){
                setSubmissions(res.data.data.Submissions)
            }
        })
    }

    return (
        <div>
            <div>
                {(Submissions)&&(Submissions.map((submission,count) => {
                    let answers = submission.responses.split(',')
                    return (<div  style={{padding:"1em"}}>
                        <Card style={{paddingLeft:"1em"}}>
                            <h2>Subject id: {submission.subjectID}</h2>
                            <h3>Test Date: {submission.date}</h3>
                            <div>
                                    {answers.map((answer,count) => {
                                        return (<h4>Answer to Question {count}: {answer}</h4>)
                                    })}
                            </div>
                        </Card>
                    </div>)
                }))}
            </div>
        </div>
    )
}

function TestSubjects(){
    let token = sessionStorage.getItem('token');
    console.log(token)
    const [subjects, setSubjects] = React.useState(0);
    if(!subjects){
        getSubjects(token).then((res) => {
            if(res && res.data){
                setSubjects(res.data.data.Subjects)
            }
        })
    }

    return (
        <div>
            {(subjects)&&(subjects.map((subject,count) => (
                <div>
                    <Card style={{paddingLeft:"1em"}}>
                        <h2>Subject Name: {subject.name}</h2>
                        <ul>
                            <li>Subject Test Chamber: {subject.testChamber}</li>
                            <li>Subject Date Of Birth: {subject.dateOfBirth}</li>
                            <li>Subject Score: {subject.totalScore}</li>
                            <li>Subject Living: {subject.alive.toString()}</li>
                        </ul>
                    </Card>
                </div>
            )))}
        </div>
    )
}

function TestQuestions(){

    let token = sessionStorage.getItem('token');
    console.log(token)
    const [questions, setQuestions] = useState(0);
    if(!questions){
        getAllQuestions(token).then((res) => {
            if(res && res.data){
                setQuestions(res.data.data.Questions)
            }
        })
    }
    return (
        <div>
            {(questions)&&(questions.map((question,count) => (
                <div>
                    <Card style={{paddingLeft:"1em"},{Margin:"1em"}}>
                        <ul>
                            <li>Question Label: {question.label}</li>
                            <li>Question Type: {question.type}</li>
                            <li>Required: {question.required.toString()}</li>
                        </ul>
                    </Card>
                </div>
            )))}
        </div>
    )
}


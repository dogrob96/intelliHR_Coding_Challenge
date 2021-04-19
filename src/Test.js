import { getAllQuestions,addSubmission } from './api';
import {  useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TestQuestion from './TestQuestion';

export default function Test({user}){
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
    let data = []
    //(date,subjectID,responses,token
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(user)
        await addSubmission(Date(),user._id,data.toString(),token)
    }
     
    const onChange = (value, id) => {
        data[id] = value;
    }

    return (
        <div>
            <form id="testForm" onSubmit={handleSubmit}>
                {(questions)&&(questions.map((question,count) => (
                    <div style={{padding:"1em"}}>
                        <Card style={{paddingLeft:"1em"},{Margin:"1em"}}>
                            <TestQuestion question={question} count={count} onChange={onChange}/>
                        </Card>
                    </div>
                )))}    
                <Button variant="contained" color="primary" type="submit">Submit</Button>           
            </form>

        </div>
    )
}
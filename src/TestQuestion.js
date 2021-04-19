import React from 'react';
import TextField from '@material-ui/core/TextField';



export default function TestQuestion({question,count,onChange}){
    switch(question.type) {
        case "Text":
            return (
                <div style={{padding:"1em"}}>
                    <TextField id={count.toString()} onChange={e=> onChange(e.target.value,count)} label={question.label} required={question.required} variant="outlined" />
                </div>
            )
        default:

    }
}
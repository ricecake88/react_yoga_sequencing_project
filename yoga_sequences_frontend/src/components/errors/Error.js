import React from 'react';

const Error = (props) => {
    let message = ''
    if (props !== null && props.error !== null) {
        message = "*" + props.error
    }
    return <>
       <div className="error margin10">{ message }</div>
    </>
    
}
export default Error;
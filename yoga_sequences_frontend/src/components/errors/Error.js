import React from 'react';

const Error = (props) => {
    let message = ''
    if (props !== null && props.error !== null) {
        message = props.error
    }
    return <>
       { message }
    </>
    
}
export default Error;
import React from 'react';

function FormError(props) {
    return (
        <div style={{marginTop: 16, display: "flex", justifyContent: "center", color: "red"}}>{props.text}</div>
    )
}

export default FormError;
import React from 'react';
import styled from 'styled-components'

const Component = styled.div`
    width: 100%;
    background-color: gray;
    padding: 20px;
    ${'' /* box-shadow: 0 0 10px rgba(128, 0, 0, 0.3) */}
`

const styleObj = {
    red: { color: 'red', backgroundColor: 'white' },
    white: {color: 'white'}
}


// class Example extends React.Component {
const Example = () => {
    return (
        <div className="container">
            <Component>
                <h1 style={styleObj.red}>Example of Styled Component</h1>
                <p style={styleObj.white}>Do I have to use this Styled Component?</p>

            </Component>
        </div>
    )
}

export default Example;
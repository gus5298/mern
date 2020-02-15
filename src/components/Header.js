import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <div style={header}>
            <h1>TMS Cloud</h1>
            <Link style={link} to="/signin"> Sign In</Link> | 
                <Link style={link} to="/"> Files</Link> |
                <Link style={link} to="/about"> About TMS Cloud</Link> |
                <Link style={link} to="/create"> Add File</Link> 
                {/* <Link style={link} to="/edit/:id">Edit File</Link> */}
        </div>
    )
}

var header = {
    backgroundColor: "#505050",
    'color': "white",
    'padding': "10px",
    textAlign: "center"
}

var link = {
    'color': "white",
    textDecoration: "none",
    'padding': "2px"
}
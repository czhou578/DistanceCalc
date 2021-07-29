import React, { Component } from 'react';


export default function About(props) {
  const styles = {
    color: 'white',
    fontSize: '15px'
  }

  const styles2 = {
    marginTop: '50px',
    marginBottom: '10px'
  }


  return (
    <div style={styles2}>
      <h1 style={styles}>About the maker: Colin Zhou</h1>
    </div>
  )
}
import React from 'react'
import styled from 'styled-components'
import Table from './Table'

const App = () => {
    return (
        <Container>
            <h1>Pokésmart</h1>
            <p>Sort Pokémons from Sword/Shield based on your prefered base stats and check their weaknesses & strenghts!</p>
            <Table />
        </Container>
    )
}

export default App

const Container = styled.div`
    padding: 16px 8px 32px 8px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #383838;
    width: calc(100% - 16px);
    height: 100%;
    color: #f5f5f5;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    > h1 { 
        margin: 0px 0px 8px;
    }
    > p {
        max-width: 580px;
        padding: 0px 16px 0px 16px;
        margin: 0px 0px 8px;
    }
`
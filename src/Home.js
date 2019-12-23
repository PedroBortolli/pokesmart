import React from 'react'
import styled from 'styled-components'
import Table from './Table'

const App = () => {
    return (
        <Container>
            <h1>Pokésmart</h1>
            <Table />
        </Container>
    )
}

export default App

const Container = styled.div`
    padding: 12px 8px 32px 8px;
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
`
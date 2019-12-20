import React from 'react'
import styled from 'styled-components'
import { pokemons } from './db'
import { columns } from './utils'

const Table = () => {
    const test = pokemons.sort((a, b) => a.Total > b.Total)
    return (
        <Container>
            <Row>
                {columns.map(column => <Item key={column.value}>{column.label}</Item>)}
            </Row>
            {test.map(pokemon => {
                return (
                    <Row key={pokemon.Name}>
                        {columns.map(column => <Item key={`${pokemon.Name}-${column.value}`}>{pokemon[column.value]}</Item>)}
                    </Row>
                )
            })}
        </Container>
    )
}

export default Table

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #6d7075;
    border-radius: 8px;
    grid-row-gap: 8px;
    margin-top: 8px;
`
const Row = styled.div`
    height: 50px;
    display: grid;
    grid-template-columns: 50px 180px 64px 64px 64px 64px 64px 64px 72px;
    :not(:first-child):hover {
        background-color: #575757;
    }
    :first-child {
        border-bottom: 2px solid #6d7075;
        height: 40px;
    }
    > span:nth-child(9) {
        margin-left: 8px;
    }
`
const Item = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`
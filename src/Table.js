import React, { useState } from 'react'
import styled from 'styled-components'
import { pokemons } from './db'
import { columns } from './utils'

const Table = () => {
    const [name, setName] = useState('')
    return (
        <Container>
            <Sticky>
                <Input value={name} onChange={e => setName(e.target.value.toLowerCase())} placeholder="Search for a pokémon" />
            </Sticky>

            <TableContainer>
                <Row>
                    {columns.map(column => <Item key={column.value}>{column.label}</Item>)}
                </Row>
                {pokemons.map((pokemon, id) => {
                    //const display = pokemon.Name.toLowerCase().includes(name) ? 'grid' : 'none'
                    const display = 'grid'
                    return (
                        pokemon.Name.toLowerCase().includes(name) ?
                        <Row key={pokemon.Name} style={{ display }}>
                            {columns.map(column => <Item key={`${pokemon.Name}-${column.value}`}>{pokemon[column.value]}</Item>)}
                        </Row> : null
                    )
                })}
            </TableContainer>
        </Container>
    )
}

export default Table

const Container = styled.div`
    display: flex;
    flex-direction: column;
    
`
const TableContainer = styled.div`
    border: 2px solid #6d7075;
    border-radius: 8px;
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
        position: sticky;
        top: 80px;
        background-color: #4a4a4a;
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
const Input = styled.input`
    width: 240px;
    background: #fff;
    color: #a3a3a3;
    font: inherit;
    border: 0;
    outline: 0;
    height: 28px;
    border-radius: 8px;
    padding: 6px 16px 6px 16px;
    font-size: 20px;
    text-align: center;
`
const Sticky = styled.div`
    position: sticky;
    top: 0px;
    height: 80px;
    background-color: #383838;
    display: flex;
    justify-content: center;
    align-items: center;
`
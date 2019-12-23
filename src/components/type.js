import React from 'react'
import styled from 'styled-components'

const types = {
    Normal: '#c7c7c7',
    Grass: '#87b555',
    Fire: '#c40404',
    Water: '#2d80ed',
    Fighting: '#7d201b',
    Flying: '#6c89eb',
    Poison: '#9f37cc',
    Ground: '#cfbc5f',
    Rock: '#c4b87c',
    Bug: '#b3db7f',
    Ghost: '#52309c',
    Electric: '#f0ed3a',
    Psychic: '#d938b6',
    Ice: '#aeeef5',
    Dragon: '#4921cc',
    Dark: '#543731',
    Steel: '#a6a6a6',
    Fairy: '#f0b5ff'
}

const Type = ({ type, tiny = false, medium = false }) => {
    return (
        <Container type={type} tiny={tiny} medium={medium}>{type}</Container>
    )
}

export default Type

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.tiny ? '46px' : props.medium ? '52px' : '74px'};
    height: ${props => props.tiny ? '18px' : props.medium ? '20px' : '28px'};
    font-size: ${props => props.tiny ? '10px': props.medium ? '12px' : '14px'};
    color: white;
    background-color: ${props => types[props.type]};
    border-radius: 8px;
    text-shadow: 0 0 4px black, 0 0 4px black, 0 0 4px black;
`
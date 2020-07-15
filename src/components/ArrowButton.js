import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowLeftSVG } from '../assets/svgs/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../assets/svgs/arrow-right.svg';

const Container = styled.button`
    width: 100%;
    height: 100%;
    background: inherit;
    border: none;
    cursor: pointer;
    &:hover {
        background: hsla(100, 5%, 20%, 30%);
    }
    svg {
        stroke: white;
    }
`;

const ArrowButton = ({ direction, changePage }) => {
    const handleArrowButtonClick = () => {
        if (direction === 'previous') {
            changePage('previous');
        } else if (direction === 'next') {
            changePage('next');
        }
    };
    return (
        <Container onClick={() => handleArrowButtonClick()}>
            {direction === 'previous' ? <ArrowLeftSVG /> : <ArrowRightSVG />}
        </Container>
    );
};

export default ArrowButton;

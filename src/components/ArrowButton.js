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

const ArrowButton = ({
    direction,
    setAnimation,
    pageCount,
    setPageCount,
    dimensions,
    maxPageCount,
}) => {
    const handleArrowButtonClick = () => {
        if (pageCount === 0 && direction === 'previous') {
            setAnimation((previousState) => {
                return {
                    ...previousState,
                    translate: dimensions.width * maxPageCount,
                };
            });
            setPageCount(maxPageCount);

            return;
        } else if (pageCount === maxPageCount && direction === 'next') {
            setAnimation((previousState) => {
                return {
                    ...previousState,
                    translate: 0,
                };
            });
            setPageCount(0);
            return;
        }

        const transitionValue =
            direction === 'previous' ? -dimensions.width : dimensions.width;
        setAnimation((previousState) => {
            return {
                ...previousState,
                translate: previousState.translate + transitionValue,
            };
        });
        setPageCount((previousPageCount) => {
            return direction === 'previous'
                ? previousPageCount - 1
                : previousPageCount + 1;
        });
    };
    return (
        <Container onClick={() => handleArrowButtonClick()}>
            {direction === 'previous' ? <ArrowLeftSVG /> : <ArrowRightSVG />}
        </Container>
    );
};

export default ArrowButton;

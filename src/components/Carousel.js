import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import CarouselContent from './CarouselContent';
import { ReactComponent as ArrowLeftSVG } from '../assets/svgs/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../assets/svgs/arrow-right.svg';
import Dots from './Dots';

const Container = styled.div`
    display: grid;
    height: 30rem;
    width: 40rem;
    overflow: hidden;
`;

const Overlay = styled.div`
    display: grid;
    justify-items: center;
    z-index: 2;
    grid-row: 1 /-1;
    grid-column: 1/-1;
    grid-template-columns: 10% auto 10%;
`;

const InnerContent = styled.div`
    z-index: 1;
    grid-row: 1 /-1;
    grid-column: 1/-1;
`;

const Arrow = styled.button`
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

const Carousel = ({ images }) => {
    const contentRef = useRef(null);
    const [animation, setAnimation] = useState({
        translate: 0,
        transition: 0.45,
    });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [pageCount, setPageCount] = useState(0);

    const { translate, transition } = animation;
    const maxPageCount = images.length - 1;

    useLayoutEffect(() => {
        if (contentRef.current) {
            setDimensions({
                width: contentRef.current.offsetWidth,
                height: contentRef.current.offsetHeight,
            });
            console.log(contentRef.current.offsetWidth, contentRef.current.offsetHeight);
        }
    }, []);

    const handleArrowClick = (direction) => {
        if (
            (pageCount === 0 && direction === 'previous') ||
            (pageCount === maxPageCount && direction === 'next')
        ) {
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
        <Container ref={contentRef}>
            <Overlay>
                <Arrow onClick={() => handleArrowClick('previous')}>
                    <ArrowLeftSVG />
                </Arrow>
                <Dots
                    setAnimation={setAnimation}
                    setPageCount={setPageCount}
                    images={images}
                    dimensions={dimensions}
                />
                <Arrow onClick={() => handleArrowClick('next')}>
                    <ArrowRightSVG />
                </Arrow>
            </Overlay>
            <InnerContent>
                <CarouselContent
                    translate={translate}
                    transition={transition}
                    images={images}
                />
            </InnerContent>
        </Container>
    );
};

export default Carousel;

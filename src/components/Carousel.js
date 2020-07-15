import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import CarouselContent from './CarouselContent';
import { ReactComponent as ArrowLeftSVG } from '../assets/svgs/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../assets/svgs/arrow-right.svg';

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

const DotsContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    align-self: end;
`;

const Dot = styled.div`
    background: white;
    border: hsl(70, 10%, 40%) solid 2px;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    margin: 0.1rem;
    cursor: pointer;
    box-shadow: 0 2px 2px 0 hsla(206, 6%, 25%, 0.3);
    &:hover {
        background: hsl(190, 65%, 50%);
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

    const handleDotClick = (slideNumber) => {
        setAnimation((previousState) => ({
            ...previousState,
            translate: slideNumber * dimensions.width,
        }));
        setPageCount(slideNumber);
    };

    const renderedDots = images.map((image, index) => {
        return <Dot key={image + index} onClick={() => handleDotClick(index)} />;
    });

    return (
        <Container ref={contentRef}>
            <Overlay>
                <Arrow onClick={() => handleArrowClick('previous')}>
                    <ArrowLeftSVG />
                </Arrow>
                <DotsContainer>{renderedDots}</DotsContainer>
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

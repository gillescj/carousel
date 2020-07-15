import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import CarouselContent from './CarouselContent';

import Dots from './Dots';
import ArrowButton from './ArrowButton';

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

    return (
        <Container ref={contentRef}>
            <Overlay>
                <ArrowButton
                    direction="previous"
                    setAnimation={setAnimation}
                    pageCount={pageCount}
                    setPageCount={setPageCount}
                    dimensions={dimensions}
                    maxPageCount={maxPageCount}
                />
                <Dots
                    setAnimation={setAnimation}
                    pageCount={pageCount}
                    setPageCount={setPageCount}
                    images={images}
                    dimensions={dimensions}
                />
                <ArrowButton
                    direction="next"
                    setAnimation={setAnimation}
                    pageCount={pageCount}
                    setPageCount={setPageCount}
                    dimensions={dimensions}
                    maxPageCount={maxPageCount}
                />
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

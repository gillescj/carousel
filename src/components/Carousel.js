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

    const changePage = (changeTo) => {
        if (changeTo === 'previous' || changeTo === 'next') {
            let transitionValue;
            let pageValue;

            if (changeTo === 'previous') {
                if (pageCount === 0) {
                    changePage(maxPageCount);
                    return;
                }
                transitionValue = -dimensions.width;
                pageValue = -1;
            } else if (changeTo === 'next') {
                if (pageCount === maxPageCount) {
                    changePage(0);
                    return;
                }
                transitionValue = dimensions.width;
                pageValue = +1;
            }
            setAnimation((previousState) => {
                return {
                    ...previousState,
                    translate: previousState.translate + transitionValue,
                };
            });
            setPageCount((previousPageCount) => {
                return previousPageCount + pageValue;
            });
        } else if (typeof changeTo === 'number') {
            setAnimation((previousState) => ({
                ...previousState,
                translate: changeTo * dimensions.width,
            }));
            setPageCount(changeTo);
        }
    };

    return (
        <Container ref={contentRef}>
            <Overlay>
                <ArrowButton
                    direction="previous"
                    pageCount={pageCount}
                    maxPageCount={maxPageCount}
                    changePage={changePage}
                />
                <Dots pageCount={pageCount} images={images} changePage={changePage} />
                <ArrowButton
                    direction="next"
                    pageCount={pageCount}
                    maxPageCount={maxPageCount}
                    changePage={changePage}
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

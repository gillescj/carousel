import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import CarouselContent from './CarouselContent';
import Dots from './Dots';
import ArrowButton from './ArrowButton';
import useInterval from '../hooks/useInterval';
import useWindowSize from '../hooks/useWindowSize';

const Container = styled.div`
    display: grid;
    height: 30rem;
    width: 100%;
    overflow: hidden;
`;

const Overlay = styled.div`
    display: grid;
    justify-items: center;
    z-index: 2;
    grid-row: 1 /-1;
    grid-column: 1/-1;
    grid-template-columns: minmax(10%, 3rem) auto minmax(10%, 3rem);
`;

const InnerContent = styled.div`
    z-index: 1;
    grid-row: 1 /-1;
    grid-column: 1/-1;
`;

const Carousel = ({ images, autoPlay = true, autoPlayDelay = 8000 }) => {
    const [animation, setAnimation] = useState({
        translate: 0,
        transition: 0.45,
    });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [pageCount, setPageCount] = useState(0);
    const [delay] = useState(autoPlayDelay);
    const [isRunning, setIsRunning] = useState(autoPlay);
    const { height: windowHeight, width: windowWidth } = useWindowSize();

    const { translate, transition } = animation;
    const maxPageCount = images.length - 1;

    useLayoutEffect(() => {
        setDimensions({
            width: windowWidth,
            height: windowHeight,
        });
        changePage(0);
    }, [windowWidth, windowHeight]);

    const changePage = (changeTo, stopAutoPlay = false) => {
        if (stopAutoPlay) setIsRunning(false);
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

    useInterval(
        () => {
            changePage('next');
        },
        isRunning ? delay : null
    );

    return (
        <Container>
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

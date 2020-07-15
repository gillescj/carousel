import React from 'react';
import styled from 'styled-components';
import CarouselItem from './CarouselItem';

const Container = styled.div`
    transform: translateX(-${(props) => props.translate}px);
    transition: transform ease-out ${(props) => props.transition}s;
    height: 100%;
    width: 100%;
    display: flex;
`;

const CarouselContent = ({ images, translate, transition }) => {
    return (
        <Container translate={translate} transition={transition}>
            {images.map((image) => {
                return <CarouselItem key={image} image={image} />;
            })}
        </Container>
    );
};

export default CarouselContent;

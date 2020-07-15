import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-image: url('${(props) => props.image}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    flex: 0 0 auto;
`;

const CarouselItem = ({ image }) => {
    return <Container image={image}></Container>;
};

export default CarouselItem;

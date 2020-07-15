import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    padding: 0.5rem;
    align-self: end;
`;

const Dot = styled.div`
    background: white;
    border: ${(props) => (props.selected ? 'hsl(210, 60%, 37%)' : 'hsl(70, 10%, 40%)')}
        solid 2px;
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

const Dots = ({ pageCount, images, changePage }) => {
    const handleDotClick = (slideNumber) => {
        changePage(slideNumber, true);
    };

    const renderedDots = images.map((image, index) => {
        return (
            <Dot
                key={image + index}
                onClick={() => handleDotClick(index)}
                selected={pageCount === index}
            />
        );
    });

    return <Container>{renderedDots}</Container>;
};

export default Dots;

import React from 'react';
import styled from 'styled-components';

interface Props {
    $size: number;
    $minHeight: number;
}

const LoaderWrapper = styled.div<Props>`
    display: flex;
    align-items: center;
    outline:none;
    border:none;
    cursor:wait;
    height:100%;
    justify-content: center;
    width: 100%;
    min-height: ${props => props.$minHeight ? props.$minHeight + "px" : "auto"};
    &::after {
        content:"";
        width:${props => props.$size + "px"};
        height:${props => props.$size + "px"};
        border:2px solid teal;
        border-top:2px solid white;
        border-radius: 50%;
        animation: Loader 1s linear infinite;
    }
    @keyframes Loader {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
`;
export default function Loader(props: Props) {
    return (
        <LoaderWrapper {...props}></LoaderWrapper>
    )
}
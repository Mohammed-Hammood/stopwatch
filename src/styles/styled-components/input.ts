import styled from "styled-components";

interface Props {
    $margin?:string;
    $width?:string;
    $height?:string;
    $background?:string;
    $outline?:string;
    $outlineOnFocus?:string
}

export const Input = styled.input<Props>`
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: text;
    width:${props => props.$width?props.$width:'100%'};
    height:${props => props.$height?props.$height:'auto'};
    min-height: 35px;
    background: white;
    outline:${props => props.$outline?props.$outline:'1px solid rgba(0, 0, 0, 0.1)'};
    &:focus {
        outline:${props => props.$outlineOnFocus?props.$outlineOnFocus:'1px solid var(--specialColor)'};
    }
`;
import React from "react";
import styled from "styled-components";


const Wrapper = styled.div`
        flex-direction: row;
        padding:0;
        border:1px solid var(--specialColor);
        outline:none;
        display:flex;
        width:100%;
        overflow-y: hidden;
        overflow-x: auto;
        button {
            width:100%;
            height:40px;
            border:none;
            outline:none;
            min-width: 20px;
            cursor:pointer;
            &:hover {
                transform: scale(1.2);
                box-shadow: 0 0 20px white;
            }
    }
`
type Props = {
    setColor: (color: number[]) => void;
}

export default function ColorRBGAElement(props: Props) {
    const { setColor } = props;
    return (
        <Wrapper>
            <button title={'White'} className={'bgWhite'} type="button" onClick={() => setColor([255, 255, 255, 1])}></button>
            <button title={'Ghost white'} className={'bgGhostWhite'} type="button" onClick={() => setColor([248, 248, 255, 100])}></button>
            <button title={'Silver'} className={'bgSilver'} type="button" onClick={() => setColor([192, 192, 192, 1])}></button>
            <button title={'Gainsboro'} className={'bgGainsboro'} type="button" onClick={() => setColor([220, 220, 220, 1])}></button>
            <button title={'Light blue'} className={'bgLightBlue'} type="button" onClick={() => setColor([173, 216, 230, 1])}></button>
            <button title={'Sky blue'} className={'bgSkyBlue'} type="button" onClick={() => setColor([135, 206, 235, 1])}></button>
            <button title={'Yelloow'} className={'bgYellow'} type="button" onClick={() => setColor([255, 255, 0, 1])}></button>
            <button title={'Gold'} className={'bgGold'} type="button" onClick={() => setColor([255, 215, 0, 1])}></button>
            <button title={'Red'} className={'bgRed'} type="button" onClick={() => setColor([255, 0, 0, 1])}></button>
            <button title={'Dark red'} className={'bgDarkRed'} type="button" onClick={() => setColor([139, 0, 0, 1])}></button>
            <button title={'Teal'} className={'bgTeal'} type="button" onClick={() => setColor([0, 128, 128, 1])}></button>
            <button title={'Light sean green'} className={'bgLightSeaGreen'} type="button" onClick={() => setColor([32, 178, 170, 1])}></button>
            <button title={'Dark green'} className={'bgDarkGreen'} type="button" onClick={() => setColor([0, 100, 0, 1])}></button>
            <button title={'Dark slate gray'} className={'bgDarkSlateGray'} type="button" onClick={() => setColor([47, 79, 79, 1])}></button>
            <button title={'Light slate gray'} className={'bgLightSlateGray'} type="button" onClick={() => setColor([119, 136, 153, 1])}></button>
            <button title={'Dim gray'} className={'bgDimGray'} type="button" onClick={() => setColor([105, 105, 105, 1])}></button>
            <button title={'Dark slate blue'} className={'bgDarkSlateBlue'} type="button" onClick={() => setColor([72, 61, 139, 1])}></button>
            <button title={'Dark violet'} className={'bgDarkViolet'} type="button" onClick={() => setColor([148, 0, 211, 1])}></button>
            <button title={'Navy'} className={'bgNavy'} type="button" onClick={() => setColor([0, 0, 128, 1])}></button>
            <button title={'Black'} className={'bgBlack'} type="button" onClick={() => setColor([0, 0, 0, 1])}></button>
        </Wrapper>)
}
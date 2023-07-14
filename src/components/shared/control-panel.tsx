import React from "react";
import { ICONS } from "components";
import styled from "styled-components";

interface ButtonProps {
    $minWidth?: string;
    $maxWidth?: string;
}
interface ControlPanelProps {
    $fontSize?: number
    $btnPadding?: string
    $title__wrapperPadding?: string
}

const Wrapper = styled.div<ControlPanelProps>`
            display: flex;
            justify-content: space-between;
            align-items:center; 
            background-color: inherit;
            gap: 10px;
            width:100%;
            .content__wrapper {
                border-radius: 4px;
                display: flex;
                border: 1px solid var(--specialColor);
                align-items: center;
                width:100%;
                justify-content: flex-start;
                background-color: var(--specialColor);
                height: 42px;
                
                .title__wrapper, .text__wrapper, .keyValue__wrapper{
                    color:white;
                    height:100%;
                    border:none;
                    padding:10px;
                    display:flex;
                    justify-content:center;
                    min-width: 88px;
                    width:100%;
                    align-items:center;
                }
                .inputs__wrapper {
                        display: flex;
                        justify-content: space-between;
                        width:100%;
                        height : 40px;
                        select:hover, button:hover, .button:hover {
                            background-color: var(--specialColorHover);
                            color:white;
                            svg path {
                                fill:white;
                            }
                        }
                        button, select, .button {
                            outline: none;
                            background-color: white;
                            cursor: pointer;
                            display: flex;
                            align-items:center;
                            justify-content: center;
                            border: none;
                            outline: none;
                            padding:"12px 10px";
                            color: black;
                            width:100%;
                            svg {
                                height:14px;
                            }
                    }
                   
                }
                .text__wrapper {
                    background-color: white;
                    color:black;
                    width:100%;
                }
                .keyValue__wrapper {
                    min-width:auto;
                    height: 40px;
                    flex:auto;
                    
                    &_value, &_key {
                        background-color: white;
                        height:100%;
                        width:100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding:5px;
                    }
                    &_key {
                        background-color: var(--specialColor);
                        color:white;
                    }
                }
               
            }
    @media screen and (max-width:600px){
        gap:0;
        flex-direction: column;
        flex-wrap:nowrap;
        justify-content: center;
        gap:8px;
        background-color: inherit;
        border:none;
        height: auto;
        .content__wrapper {
            height: 42px;
            justify-content: space-between;
            overflow: hidden;
            border:1px solid rgba(88,88,88, 0.1);
            .title__wrapper {
                min-width: 78px;
            }
            .inputs__wrapper {
                display: flex;
                justify-content: space-between;
                background-color: white;
                input, button, select, .button {
                    background-color:white;
                    height: 100%;
                   
                }
                input, select {
                    width:100%;
                }
            }
        }
        .keyValue__wrapper {
            flex:auto;
        }
    }
`;
const CustomButton = styled.button<ButtonProps>`
        outline: none;
        background-color: white;
        cursor: pointer;
        display: flex;
        align-items:center;
        justify-content: center;
        height: 40px;
        border: none;
        outline: none;
        padding:"12px 10px";
        color: black;
        width:100%;
        min-width: ${props => props.$minWidth ? props.$minWidth : "auto"};
        max-width: ${props => props.$maxWidth ? props.$maxWidth : "auto"};
`;
interface CustomButtonTypes {
    callback: (value?: any) => void;
    title?: string;
    innerText?: string;
    iconName?: string;
    iconColor?: string;
    minWidth?: string;
    maxWidth?: string;
    authentication?: boolean;
}

interface Props {
    setOrder: (value: "id" | "-id") => void;
    order: "id" | "-id";
    totalTime:string;
    buttons?: CustomButtonTypes[];

}
const ControlPanel: React.FC<Props> = (props: Props): JSX.Element => {
    const { buttons, order, setOrder, totalTime } = props;
    return (<>
        <Wrapper>
            {buttons ?
                <div className="content__wrapper">
                    <div className="inputs__wrapper">
                        {buttons.filter((button) => button.authentication === undefined || button.authentication).map((button, index: number) => {
                            return (
                                <CustomButton $maxWidth={button.maxWidth} $minWidth={button.minWidth} key={index} onClick={() => button.callback()} title={(button.title ? button.title : "")}>
                                    {button.innerText ? (button.innerText) : ""}
                                    {button.iconName ?
                                        <ICONS name={button.iconName} color={button.iconColor ? button.iconColor : "black"} />
                                        : null}
                                </CustomButton>
                            )
                        })}
                    </div>
                </div>
                : null}
            <div className="content__wrapper">
                <label htmlFor="order__by__id" className="title__wrapper">{("Order")}</label>
                <div className="inputs__wrapper">
                    <button id="order__by__id" onClick={() => setOrder(order === 'id' ? '-id' : 'id')} type={'button'}>
                        <ICONS name={`angle-${order === "id" ? 'up' : 'down'}`} color="black" />
                    </button>
                </div>
            </div>

            <div className="content__wrapper keyValue__wrapper" >
                <div className="keyValue__wrapper_key">Total time</div>
                <div className="keyValue__wrapper_value">{totalTime}</div>
            </div>

        </Wrapper>
    </>
    )
}
export default ControlPanel;
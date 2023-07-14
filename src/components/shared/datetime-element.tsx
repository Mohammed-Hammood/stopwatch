import React from "react";
import { getFormatedDateTime, getTimeSince } from "utils";
import styled from "styled-components";
import { ICONS } from "components";

type Props = {
    dateTimeString: string;
}
const Wrapper = styled.button`
    display:flex;
    justify-content: center;
    align-items:center;
    gap:5px;
    cursor: pointer;
    padding:0;
    outline:0;
    border:0;
    margin: 0 2px;
    width:max-content;
    background:transparent;
    word-spacing: normal;
    font-size:  var(--fontSize13);
    align-items: center;
    span {
        display: flex;
        align-items: center;
    }
    color: ${({ color }) => color || "black"};
    &:hover {
        text-decoration: underline;
        color: var(--specialColor);
    }

`


export default function DateTimeElement({ dateTimeString }: Props) {
    const [showTimeSince, setShowTimeSince] = React.useState<boolean>(true);
    const datetime = getFormatedDateTime(dateTimeString);
    const timeSince = getTimeSince(dateTimeString);

    return (
        <Wrapper
            title={datetime}
            type="button"
            onClick={() => setShowTimeSince(!showTimeSince)}
             >
            
            <ICONS name='clock-regular' color='' class="icon13" />
            
            <span> {showTimeSince ? (timeSince) : datetime}</span>
        </Wrapper>
    )
}
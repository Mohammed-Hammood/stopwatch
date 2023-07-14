import React  from "react";
import styled from 'styled-components';
import { Input } from "styles/styled-components/input";

interface WrapperProps {

}
const Wrapper = styled.div<WrapperProps>`
  width:100%;
  display:flex;
  flex-direction: column;

    .texts__wrapper {
        width:100%;
        display: flex;
        justify-content:space-around;
        span {
            text-align: center;
            width:100%;
        }
    }
    .inputs__wrapper, .colors__wrapper {
        width:100%;
        display:flex;
        justify-content: space-evenly;
        gap:5px;
    }
    .colors__wrapper {
        justify-content: center;
        flex-direction: column;
        .text__wrapper {
            display: flex;
            justify-content: flex-start;
            align-items:center;
            width:100%;
        }
       
    }
`;
interface Props {
    hours: number;
    minutes: number;
    seconds: number;
    setHours: (hours: number) => void;
    setSeconds: (seconds: number) => void;
    setMinutes: (minutes: number) => void;
}


export default function TimerElement(props: Props) {
    const { minutes, setMinutes, hours, setHours, seconds, setSeconds } = props;
    return (
        <Wrapper>
            <div className="texts__wrapper">
                <span>{"Hours"}</span>
                <span>{"Minutes"}</span>
                <span>{"Seconds"}</span>
            </div>
            <div className="inputs__wrapper">
                <Input type="number" minLength={0} title={"Hours"} maxLength={59} value={hours} onChange={(e:any) => setHours((e.target as HTMLInputElement).valueAsNumber)} />
                <Input type="number" minLength={0} title={"Minutes"} maxLength={59} value={minutes} onChange={(e:any) => setMinutes((e.target as HTMLInputElement).valueAsNumber)} />
                <Input type="number" minLength={0} title={"Seconds"} maxLength={59} value={seconds} onChange={(e:any) => setSeconds((e.target as HTMLInputElement).valueAsNumber)} />
            </div>
        </Wrapper>
    )
}
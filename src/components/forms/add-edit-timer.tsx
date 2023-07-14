import React, { useState } from "react";
import { ColorRBGAElement, TimerElement } from "components";
import styled from 'styled-components';
import { Input } from "styles/styled-components/input";
import { TimerTypes } from "types";

interface WrapperProps {
    $color: number[];
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
        .controllers__wrapper {
            display: flex;
            height: 40px;
            gap:10px;
            .screen__wrapper, select {
                background-color: ${props => "rgba(" + props.$color + ")"};
                height:100%;
                width: 100%;
                outline:1px solid ${props => "rgba(" + props.$color + ")"};
                border-radius: 5px;
                padding:10px;
            }
            select:focus {
                outline:1px solid var(--specialColor);
            }
            select {
                background:transparent;
                border:none;
            }
        }
    }
`;
interface Props {
    setIsVisible: (value: boolean) => void;
    convertTimestampToFormatedTime: (timestamp: number) => { minutes: number, seconds: number, hours: number };
    timer?: TimerTypes;
    setTimer: (timer: { name: string, msec: number, color: number[] }) => void;
}


export default function AddEditTimerForm({ setIsVisible, convertTimestampToFormatedTime, timer, setTimer }: Props) {
    const { seconds: sec, minutes: min, hours: hrs } = convertTimestampToFormatedTime(timer ? timer.msec : 0);
    const [Error, setError] = useState<null | string>(null);
    const [timerName, setTimerName] = useState<string>(timer?.name || "");
    const [color, setColor] = useState<number[]>(timer?.color || [0, 0, 0, 1]);
    const [hours, setHours] = useState<number>(hrs);
    const [seconds, setSeconds] = useState<number>(sec);
    const [minutes, setMinutes] = useState<number>(min);

    const isTimeValidated = (): boolean => {
        if (seconds < 0 || seconds > 59) return false;
        if (minutes < 0 || minutes > 59) return false;
        if (hours < 0) return false;
        return true;
    }
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isTimeValid = isTimeValidated();
        const isNameValid = timerName.trim().length > 0 && timerName.trim().length <= 50;
       
        if (isTimeValid && isNameValid) {
            const timestamp: number = hours * 3600000 + minutes * 60000 + seconds * 1000;
            setIsVisible(false);
            setTimer({
                ...timer,
                name: timerName.trim(),
                msec: timestamp,
                color: color
            })
        } else if (!isNameValid) {
            setError("Name is required and should not be more than 50 characters");
        } else if (!isTimeValid) {
            setError("Invalid time");
        }
    }
    return (<Wrapper $color={color}>
        {Error ?
            <div className="messages warning" onClick={() => setError(null)}>{(Error)}</div>
            : null}
        <form onSubmit={handleForm} className='container'>
            <label htmlFor='timer-name'>{("Name")}<span className='red'>*</span></label>
            <Input type='text' name="timer-name" placeholder={("Timer name")} required={true} maxLength={50} value={timerName} onChange={(e: any) => setTimerName((e.target as HTMLInputElement).value)} />
            <TimerElement
                minutes={minutes}
                hours={hours}
                seconds={seconds}
                setHours={setHours}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
            />
            <div className="colors__wrapper">
                <div className="text__wrapper">{("Font color")}</div>
                <div className="controllers__wrapper">
                    <ColorRBGAElement setColor={setColor} />
                    <div className="screen__wrapper"></div>
                </div>
            </div>
            <div className='buttons'>
                <button type='submit' className='primary' ><span>{("Save")}</span></button>
                <button type='button' onClick={() => setIsVisible(false)}><span>{("Cancel")}</span></button>
            </div>
        </form>
    </Wrapper>
    )
}
//128
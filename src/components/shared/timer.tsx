import React from "react";
import { DateTimeElement, ICONS } from "components";

import { TimerTypes } from "types";


type Props = {
    timer: TimerTypes;
    isActive: boolean;
    timers: TimerTypes[];
    setActiveTimer: (value: TimerTypes) => void;
    setDeleteModal: (value: boolean) => void;
    setEditModal: (value: boolean) => void;
    addToTotalTimeHandler: (timer: TimerTypes) => void;
    activeTimerHandler: (timer: TimerTypes) => void;
    formatedTime: string;
}
export default function Timer(props: Props): JSX.Element {

    const { timer, addToTotalTimeHandler, activeTimerHandler, isActive, timers, setActiveTimer, setEditModal, setDeleteModal, formatedTime } = props;

    return (
        <div className={`timerset ${isActive ? "active" : ""} ${timer.color}`} >
            <div className='timerset__name' onClick={() => activeTimerHandler(timer)}>{timer.name}</div>
            <div className='timerset__digits_controllers_wrapper'>
                <div className="timerset__digits" onClick={() => activeTimerHandler(timer)}>
                    {formatedTime}
                </div>
                <div>
                    {<DateTimeElement dateTimeString={timer.createdAt}/>}
                </div>
                <div className='timerset__controllers'>
                    <button type='button'
                        title={`${timer.addToTotal ? ("Exclude from total time") : ("Add to total time")}`}
                        onClick={() => addToTotalTimeHandler(timer)}
                    >
                        <ICONS name={
                            timer.addToTotal ? 'circle-check-solid' : 'circle-xmark-regular'}
                            color={timer.addToTotal === true ? "green" : "red"}
                        />
                    </button>
                    {timers.length > 1 ?
                        <button
                            type='button'
                            title={`${("Delete")} "${timer.name}"`}
                            onClick={() => { setActiveTimer(timer); setDeleteModal(true) }}
                        >
                            <ICONS name='trash-solid' color='black' />
                        </button>
                        : null}
                    <button
                        type='button'
                        title={`${("Edit")} "${timer.name}"`}
                        onClick={() => { activeTimerHandler(timer); setEditModal(true) }}
                    >
                        <ICONS name='pen-to-square-solid' color='black' />
                    </button>
                </div>
            </div>
        </div>
    )
}
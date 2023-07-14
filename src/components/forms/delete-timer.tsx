import React from "react";
import { TimerTypes } from "types";

interface Props {
    setIsVisible: (value: boolean) => void;
    deleteTimer: (timer: TimerTypes) => void;
    timer: TimerTypes;
}

export default function DeleteTimerForm({ setIsVisible, deleteTimer, timer }: Props) {

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        deleteTimer(timer);
        setIsVisible(false);
    }
    return (
        <form onSubmit={handleForm} className='container'>
            <div className='text-container'>
                <span>{("Do you want to delete this timer?")}</span>
            </div>
            <div className='buttons'>
                <button type='submit' className='danger' >
                    <span>{("Confirm")}</span>
                </button>
                <button type='button' onClick={() => setIsVisible(false)}>
                    <span>{("Cancel")}</span>
                </button>
            </div>
        </form>
    )
}
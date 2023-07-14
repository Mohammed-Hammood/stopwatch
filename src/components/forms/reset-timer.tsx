import React from "react";

interface Props {
    setIsVisible: (value: boolean) => void;
    reset: () => void;
}

export default function ResetTimerForm({ setIsVisible, reset }: Props) {
    
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        reset();
        setIsVisible(false);
    }

    return (
        <form onSubmit={handleForm} className='container'>
            <div className='text-container'>
                <span>{("Do you want to reset time?")}</span>
            </div>
            <div className='buttons'>
                <button type='submit' className='warning' >
                    <span>{"Confirm"}</span>
                </button>
                <button type='button' onClick={() => setIsVisible(false)}>
                    <span>{"Cancel"}</span>
                </button>
            </div>
        </form>
    )
}
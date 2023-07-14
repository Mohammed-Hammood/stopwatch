import React, { useState } from "react";

type Props = {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    setIsVisible: (value: boolean) => void;
}

export default function PaginationForm(props: Props) {
    const { totalPages, page, setPage, setIsVisible } = props;
    const [value, setValue] = useState<number>(page)

    const handleSubmit = () => {
        if (value >= 1 && value <= totalPages) {
            setPage(value);
            setIsVisible(false);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="title">
                {("Total pages")} {totalPages}
            </div>
            <div className='section' id='name-container'>
                <label htmlFor='input-page-number'> </label>
                <input id="input-page-number" value={value} onChange={e => setValue((e.target as HTMLInputElement).valueAsNumber)} required className='inputs' maxLength={page} minLength={1} type='number' />
            </div>
            <div className='buttons-container'>
                <button className="primary" type='submit' >
                    {("Move")}
                </button>
                <button type='button' onClick={() => setIsVisible(false)}>
                    {("Cancel")}
                </button>
            </div>
        </form>)
}
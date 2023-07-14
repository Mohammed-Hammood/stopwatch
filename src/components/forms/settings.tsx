import React, { useState } from "react";
import { ICONS } from "components";
import { FiltersWrapper } from "styles/styled-components/filters";
import { TimerTypes } from "types";

interface Props {
    setIsVisible: (value: boolean) => void;
    order: "id" | "-id";
    setOrder: (order: string) => void;
    timers: TimerTypes[];
}

export default function TimerSettingsForm(props: Props): JSX.Element {
    const { setIsVisible, timers } = props;
    const [order, setOrder] = useState<"id" | "-id">(props.order);
    const resetFilters = (): void => {
        setIsVisible(false);
        props.setOrder("-id");
    }
    const downloadHandler = (): void => {
        let stringTimers = JSON.stringify(timers);

        let data = "data:text/json;charset=utf-8," + encodeURIComponent(stringTimers);
        
        const anchorElement = document.createElement('a');

        anchorElement.setAttribute("href", data);
        
        const fileName: string = (new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDay()).toString();
        
        anchorElement.setAttribute("download", fileName + ".json");
        
        document.body.appendChild(anchorElement);
        
        anchorElement.click();
        
        anchorElement.remove();
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.setOrder(order);
        setIsVisible(false);
    }
    return (
        <form onSubmit={handleSubmit} className='container'>
            <FiltersWrapper>
                <section>
                    <label className="title__wrapper" htmlFor='order-timers'>{("Order")}</label>
                    <div className="controllers__wrapper">
                        <button id='order-timers'
                            type="button"
                            className='contentCenter'
                            onClick={() => setOrder(order === "id" ? "-id" : "id")}
                        >
                            <ICONS name={`angle-${order === "id" ? 'up' : 'down'}`} color="black" />
                        </button>
                    </div>
                </section>
                <section>
                    <label className="title__wrapper" htmlFor='download'>{("Download")}</label>
                    <div className="controllers__wrapper">
                        <button type="button" className='contentCenter' onClick={downloadHandler}>
                            <ICONS name="download-solid" color="black" /> JSON
                        </button>
                    </div>
                </section>
                <section>
                    <div className="controllers__wrapper">
                        <button type="submit">{("Save")}</button>
                        <button type="button" onClick={resetFilters}>{("Reset settings")}</button>
                    </div>
                </section>
            </FiltersWrapper>
        </form>
    )
}

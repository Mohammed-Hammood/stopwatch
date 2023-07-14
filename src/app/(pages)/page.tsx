"use client";
import React, { useState, useEffect } from 'react';
import { ControlPanel, Modal, Pagination, Timer } from 'components';
import { TimerTypes } from 'types'
import { LocalStorage } from "utils";
import { HomePageWrapper } from 'styles/home-page';


export default function StopwatchPage() {
    const ls = new LocalStorage();
    const [resetTimeModal, setResetTimeModal] = useState<boolean>(false);
    const [activeTimer, setActiveTimer] = useState<TimerTypes | null>(ls.getActiveTimer());
    const [timers, setTimers] = useState<TimerTypes[]>(ls.getTimers());
    const [enabled, setEnabled] = useState<boolean>(activeTimer ? activeTimer.enabled : false);
    const [order, setOrder] = useState<"id" | "-id">("-id");
    const [addModal, setAddModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [settingsModal, setSettingsModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const limit: number = 4;
    const min = (page - 1) * limit;
    const max = page * limit;
    let interval = React.useRef<NodeJS.Timer | null>(null);
    const queryset = timers.sort((a, b) => order === 'id' ? a.id - b.id : (-a.id + b.id)).filter((rest, index: number) => index >= min && index < max);

    const resetTimer = (): void => {
        if (activeTimer) {

            const newActiveTimer = { ...activeTimer, msec: 0, enabled: false }

            if (interval.current) clearTimeout(interval.current);

            setEnabled(false);

            setActiveTimer(newActiveTimer)

            const updatedTimers = timers.map((item) => item.id === activeTimer.id ? newActiveTimer : item)

            ls.setTimers(updatedTimers);
        }
    }
    const addNewTimer = (timer: TimerTypes): void => {
        const newTimer: TimerTypes = {
            id: new Date().getTime(),
            name: timer.name,
            enabled: false,
            color: timer.color,
            createdAt: new Date().toUTCString(),
            addToTotal: true,
            msec: timer.msec,
            start: "",
            active: false
        }
        timers.push(newTimer);

        ls.setTimers(timers);

        activeTimerHandler(newTimer);
    }

    const editTimer = (timer: TimerTypes): void => {
        const oldTimer = timers.find(item => item.id === timer.id);
        if (oldTimer) {
            const updatedTimer = { ...oldTimer, name: timer.name, msec: timer.msec, color: timer.color }
            const newtimers = timers.map((item) => item.id === timer.id ? updatedTimer : item);

            setTimers(newtimers);

            setActiveTimer(updatedTimer);

            ls.setTimers(newtimers);
        }
    }
    const deleteTimer = (timer_: TimerTypes): void => {
        const timer = timers.find((item) => item.id === timer_.id);
        if (timer) {
            const newTimers = timers.filter(item => item.id !== timer.id)
            setTimers(newTimers);
            setActiveTimer(newTimers.length > 0 ? newTimers[0] : null);
            setPage(1);
            ls.setTimers(newTimers)
        }
    }
    const convertTimestampToFormatedTime = (timestamp: number): { hours: number, minutes: number, seconds: number } => {
        const seconds = Math.floor((timestamp / 1000) % 60);
        const minutes = Math.floor((timestamp / 60000) % 60);
        const hours = Math.floor((timestamp / 3600000));
        return { seconds, minutes, hours }
    }

    const handleStarTimer = (): void => {
        
        if (activeTimer) {
            let timer: TimerTypes | undefined;
            
            if (enabled) {
                if (interval.current) clearInterval(interval.current);

                timer = { ...activeTimer, enabled: false, active:true }
            }
            else {
                const timestamp = new Date().getTime() - activeTimer.msec;

                const start: string = (new Date(timestamp)).toString();
                timer = { ...activeTimer, enabled: true, start: start, active:true }
            }
            if (timer) {
                setEnabled(value => !value);

                setActiveTimer(timer);

                const newTimers = timers.map(item => timer && item.id === timer.id ? timer : item);

                ls.setTimers(newTimers);

            }
        }
    }
    const activeTimerHandler = (timer: TimerTypes): void => {
        const newTimers = timers.map((item) => {
            if (activeTimer && item.id === activeTimer.id && activeTimer.enabled) {
                const timestamp = new Date().getTime() - new Date(activeTimer.start).getTime();
                item.msec = timestamp;
                return { ...item, enabled: false, active: false };
            }
            else if (item.id === timer.id) {
                const newTimer = { ...timer, enabled: false, active: true }
                return newTimer;
            }
            return { ...item, enabled: false, active: false }
        });
        ls.setTimers(newTimers);

        setTimers(newTimers);

        setActiveTimer(timer);

        setEnabled(false);
    }
    const getTotalTime = (): string => {
        let time = 0;

        timers.filter(item => !item.active && item.addToTotal).forEach(item => time += item.msec);

        if (activeTimer && activeTimer.addToTotal) time += activeTimer.msec;

        return getFormatedTime(time);
    }

    const handleAddToTotal = (timer: TimerTypes): void => {
        const newTimers: TimerTypes[] = timers.map((item) => {
            if (item.id === timer.id) return {
                ...item,
                addToTotal: !item.addToTotal
            }
            return item;
        });
        setTimers(newTimers);

        ls.setTimers(newTimers)

        if (activeTimer && timer.id === activeTimer.id) {
            setActiveTimer({ ...activeTimer, addToTotal: !timer.addToTotal })
        }
    }
    const getFormatedTime = (timestamp: number): string => {

        const { seconds, minutes, hours } = convertTimestampToFormatedTime(timestamp);

        const format = (time: number): string => time < 10 ? `0${time}` : `${time}`;

        return `${format(hours)}:${format(minutes)}:${format(seconds)}`;

    }
    useEffect(() => {
        if (enabled && activeTimer) {
            interval.current = setInterval(() => {

                const timestamp = new Date().getTime() - new Date(activeTimer.start).getTime();

                setActiveTimer({ ...activeTimer, msec: timestamp, active: true });

            }, 100);
        }
        return () => {
            if (interval.current) clearInterval(interval.current);
        }
    }, [enabled, order, timers, activeTimer]);
    return (<>

        <HomePageWrapper className="stopwatch-page">
            <div className="center-content"  >
                <ControlPanel
                    order={order}
                    setOrder={setOrder}
                    buttons={[
                        { callback: () => setAddModal(true), title: "Add more timers", iconColor: "black", iconName: "plus-solid" },
                        { callback: () => setSettingsModal(true), title: "Settings", iconColor: "black", iconName: "gear-solid" },
                    ]}
                    totalTime={getTotalTime()}
                />
                <div className='timer__wrapper timer'>
                    {activeTimer ? <>
                        <div className='timer__name'>{activeTimer.name}</div>
                        <div className="timer__digits">
                            <div className="digits">
                                {getFormatedTime(activeTimer.msec)}
                                <span className='mil-sec'>.{(Math.floor(activeTimer.msec / 100) % 10)}</span>
                            </div>
                        </div>
                        <div className="timer__controllers" >
                            <button onClick={handleStarTimer}>
                                {enabled ? ('Stop') : ('Start')}
                            </button>
                            <button onClick={() => setResetTimeModal(true)} >
                                {("Reset time")}
                            </button>
                        </div>
                    </> : null}
                    <div className='timer__timerset_wrapper'>
                        {queryset.map((timer) => {
                            return (
                                <Timer
                                    timer={timer}
                                    key={timer.id}
                                    isActive={activeTimer && activeTimer.id === timer.id ? true : false}
                                    activeTimerHandler={activeTimerHandler}
                                    addToTotalTimeHandler={handleAddToTotal}
                                    formatedTime={getFormatedTime(activeTimer && activeTimer.id === timer.id ? activeTimer.msec : timer.msec)}
                                    timers={timers}
                                    setDeleteModal={setDeleteModal}
                                    setEditModal={setEditModal}
                                    setActiveTimer={setActiveTimer}
                                />
                            )
                        })}
                    </div>
                    {timers.length > limit ?
                        <Pagination
                            queryset={queryset}
                            page={page}
                            setPage={setPage}
                            limit={limit}
                            totalCount={timers.length}
                        />
                        : null}
                </div>
            </div>
        </HomePageWrapper>
        <Modal
            setIsVisible={setResetTimeModal}
            isVisible={resetTimeModal}
            form="reset-timer"
            title="Reset time"
            {...{ reset: resetTimer }}
        />
        <Modal
            setIsVisible={setEditModal}
            isVisible={editModal}
            form="add-edit-timer"
            title="Edit timer"
            {...{
                convertTimestampToFormatedTime,
                setTimer: editTimer,
                timer: activeTimer
            }}
        />
        <Modal
            setIsVisible={setAddModal}
            isVisible={addModal}
            form="add-edit-timer"
            title="Add new timer"
            {...{
                convertTimestampToFormatedTime,
                setTimer: addNewTimer,
            }}
        />
        <Modal
            setIsVisible={setDeleteModal}
            isVisible={deleteModal}
            form="delete-timer"
            title="Delete"
            {...{ deleteTimer, timer: activeTimer }}
        />
        <Modal
            setIsVisible={setSettingsModal}
            isVisible={settingsModal}
            form="timer-settings"
            closeButton={true}
            title="Settings"
            {...{ order, setOrder, timers: ls.getTimers() }}
        />
    </>)
}
//333
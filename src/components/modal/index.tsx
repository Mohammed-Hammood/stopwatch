import React, { Suspense, useEffect, useState } from 'react';
import { FormsNames, ModalTypes } from 'types';
import { Loader, ICONS } from 'components';
// import Forms from 'components/forms';


const Forms = React.lazy(() => import('components/forms'));


interface Props {
    form: FormsNames
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
    closeButton?: boolean;
    maxWidth?: ModalTypes['maxWidth'];
    darkLightMode?: ModalTypes['lightDarkMode'];
    title?: string;
}


export default function Modal(props: Props) {
    const { maxWidth, isVisible, closeButton, title, form, setIsVisible } = props;
    const [modal, setModal] = useState<ModalTypes>({ form: form, closeButton, title, maxWidth: maxWidth || "maxWidth600" });

    useEffect(() => {
        const body = document.body as HTMLBodyElement;
        if (body && isVisible) {
            //to prevent scrolling when modal is open
            body.style.overflowY = "hidden";
        }
        document.addEventListener('keyup', handleKeyUp);
        function handleKeyUp(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                e.preventDefault();
                document.removeEventListener('keyup', handleKeyUp);
                setIsVisible(false);
            }
        }
        return (): void => {
            document.removeEventListener('keyup', handleKeyUp);
            if (body && isVisible) {
                //to reset scrolling when modal is closed
                body.style.overflowY = "auto";
            }
        }
    }, [modal, isVisible, setIsVisible]);
    const modalToggle = (value: boolean, element?: HTMLElement): void => {
        if ((element && element.className.toString().includes('modal')) || !element) {
            document.body.style.overflowY = 'auto';
            setIsVisible(value);
        }
    }
    if (!isVisible) return null;
    return (
        <div className={"modal"} onClick={(e) => modalToggle(false, (e.target as HTMLDivElement))}>
            <div className={`${modal.maxWidth} ${modal.lightDarkMode}`}>
                <div className='header'>
                    <div>
                        <div className={`title capitalizeFirstLetter`}><span>{(modal.title ? modal.title : "")}</span></div>
                    </div>
                    <div>
                        <button onClick={() => setModal({ ...modal, lightDarkMode: modal.lightDarkMode === 'darkMode' ? "lightMode" : "darkMode" })} >
                            <ICONS color="black" name="half-circle-stroke-solid" />
                        </button>

                        {modal.closeButton === true ?
                            <button className='closeButton' onClick={() => modalToggle(false)} title={'Close the window'}>
                                <ICONS color="black" name='xmark-solid' />
                            </button>
                            : null}
                    </div>
                </div>
                <div className='body'>
                    <Suspense fallback={<Loader $size={80} $minHeight={200} />}>
                        <Forms
                            modal={modal}
                            setModal={setModal}
                            props={props}
                            {...{ setIsVisible: (value: boolean) => modalToggle(value) }}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
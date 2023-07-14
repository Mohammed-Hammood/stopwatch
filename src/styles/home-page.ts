import { styled } from "styled-components";

export const HomePageWrapper = styled.main`
    display: flex;
    justify-content: center;

    .center-content {
        width: 100%;
        max-width: var(--cardsMaxWidth);
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;

        .timer {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 10px;
            border-radius: 5px;
            padding: 5px;
            background: linear-gradient(to top, rgba(255, 255, 255, 0.1), white);;
          

            &__name {
                width: 100%;
                padding: 10px;
                text-align: center;
                min-height: 37px;
                border-radius: 5px;
                font-size: var(--fontSize20);
                font-weight: bold;
            }

            &__digits {
                background: white;
                width: 100%;
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid var(--specialColor);
                border-radius: 5px;

                .digits {
                    direction: ltr;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    font-size: var(--fontSize24);

                    .mil-sec {
                        height: 20px;
                        font-size: var(--fontSize12);
                        display: flex;
                        justify-content: center;
                        align-items: flex-end;
                    }
                }
            }

            &__controllers {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                justify-content: space-evenly;
                gap: 10px;

                button {
                    width: 100%;
                    color: white;
                    border: none;
                    cursor: pointer;
                    outline: none;
                    padding: 10px;
                    border-radius: 5px;
                    background: linear-gradient(to right, var(--specialColor), #0ac7c7);
                }

                button:active {
                    transform: translate3d(1px, 1px, 1px);
                }

                button:hover {
                    background: var(--specialColorHover);
                }
            }

            &__timerset_wrapper {
                width: 100%;
                flex-direction: column;
                display: flex;
                gap: 10px;
                min-height: 350px;

                .timerset {
                    background: white;
                    width: 100%;
                    border-radius: 5px;
                    border: 1px solid lightgray;
                    opacity: 0.8;
                    &.active, &:hover {
                        opacity: 1;
                        box-shadow: 0 0 10px var(--specialColor);
                        box-shadow: 0 0 5px var(--specialColor);
                    }

                    &__name {
                        width: 100%;
                        padding: 10px;
                        min-height: 38px;
                        color: inherit;
                        cursor: pointer;
                    }

                    &__digits_controllers_wrapper {
                        width: 100%;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        justify-content: space-between;
                        padding: 5px 10px;

                        .timerset__digits {
                            direction: ltr;
                            border: 1px solid black; //
                            background: black;
                            padding: 5px 10px;
                            border-radius: 5px;
                            color: white;
                            user-select: none;
                        }

                        .timerset__controllers {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            justify-content: flex-end;
                            width: 100%;

                            button:hover {
                                background: lightgray;
                            }

                            button {
                                padding: 2px 5px;
                                min-height: 30px;
                                border: none;
                                cursor: pointer;
                                background: transparent;
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                svg {
                                    width: 14px;
                                    height: 14px;
                                }
                            }
                        }
                    }
                }

                
            }
        }

    }
`
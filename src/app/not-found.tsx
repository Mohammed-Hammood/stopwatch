"use client";
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { AppRoutes } from 'utils';



const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .content__wrapper {
        width: 100%;
        max-width: var(--cardsMaxWidth);
        padding:10px;
        border:1px solid var(--specialColor);
        border-radius:20px;
        background: linear-gradient(to bottom, black, teal, black);
        display: flex;
        justify-content: center;
        min-height: 50px;
        flex-direction: column;
        gap:10px;
        .text {
            width: 100%;
            display:flex;
            justify-content: center;
            padding: 10px;
            font-size: var(--fontSize30);
            color:white; //var(--specialColor);
        }
        a {
            color:white;
            font-size: var(--fontSize20);
            margin: auto;
        }
       
    }
   
`;
export default function NotFound() {
    return (<>
        <Wrapper >
            <div className='content__wrapper'>
                <div className='text'>
                    <>{("Page not found")}</>
                </div>
                <Link href={AppRoutes.homePage}>Home</Link>
            </div>
        </Wrapper >
    </>
    )
}
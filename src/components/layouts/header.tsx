"use client";
import React, { useContext } from "react";
import { ICONS } from "components";
import { styled } from "styled-components";
import Link from "next/link";
import { AppRoutes } from "utils";
import { ThemeContext } from "context";
import { ThemeContextType } from "types";


const HeaderWrapper = styled.header`
    width:100%;
    position:fixed;
    top:0;
    left:0;
    nav, .nav {
        width:100%;
        height:50px;
        background: linear-gradient(to right, black, teal, black);
        display: flex;
        justify-content: space-between;
        &__logo {
            height:100%;
            display: flex;
            align-items: center;
            a {
                height: 100%;
                display: flex;
                align-items: center;
                padding:10px;
            }
        }
        &__controllers {
            margin:0 20px;
            height:100%;
            button {
                height:100%;
                padding: 10px;
                background: transparent;
                &:active {
                    transform: scale(1.1);
                }
            }
        }
        
    }
`

export default function Header() {
    const { themeToggle } = useContext(ThemeContext) as ThemeContextType;
 
    return (
        <HeaderWrapper>
            <nav className={1 ? "header_isOpen" : "app_header"} id="HeaderHeader00_nav">
                <div className="nav__logo">
                    <Link href={AppRoutes.homePage}>
                        <ICONS name="home-solid" color="white" />
                    </Link>
                </div>
                <div className="nav__controllers">
                    <button type="button" onClick={themeToggle}>
                        <ICONS name="circle-half-stroke" color="white" />
                    </button>
                </div>
            </nav>

        </HeaderWrapper>
    )
}

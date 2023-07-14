import React from "react";
import { styled } from "styled-components";

const FooterWrapper = styled.footer`
    width:100%;
    background: linear-gradient(to right, black, teal, black);
    min-height: 80px;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
`
export default function Footer() {

    return (
        <FooterWrapper className={"app_footer"}>
            <div className="bottom-content">
                <strong>{("Copyright reserved")} @2023</strong>
            </div>
        </FooterWrapper>)
}
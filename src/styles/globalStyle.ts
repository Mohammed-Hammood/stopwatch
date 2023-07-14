import { createGlobalStyle } from 'styled-components';

type Props = {
    $theme: "dark" | "light";
}

const GlobalStyle = createGlobalStyle<Props>`
    *, *::after, *::before {
        box-sizing: border-box;
        font-size: var(--fontNormal);
        font-family:inherit;
        padding:0;
        margin:0;
        background-color: transparent;
        font-family: 'Times New Roman', Times, serif;
        outline:none;
        color:inherit;
        border:none;
        text-decoration: none;
        scrollbar-color: teal black;
        scrollbar-width:5px;
        direction: inherit;
    }
    html {
        height: 100%;
        scroll-behavior: smooth;
    }
    body {
        max-width:100%;
        margin: 0;
        font-family: 'Noto Sans Arabic', 'times new roman', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif ;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background: linear-gradient(to bottom, ${({$theme}) => $theme === 'dark'? 'teal, rgba(0, 0, 0, 0.9)': 'rgba(100, 100, 100, 0.1), white'});
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    ::-webkit-scrollbar {
        width:100%;
        min-width:5px;
        height: 5px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: red; //var(--specialColor);
        cursor: pointer;
        &:hover {
            position: absolute;
            background: var(--specialColorHover1);
            width:10px;
        }
    }
    ::-webkit-scrollbar-track {
        background: black;
        box-shadow: inset 0 0 5px grey; 
    }

  
    button { 
        cursor:pointer;
        background: rgb(233, 233, 237);
        color: black;
        display:flex;
        width: fit-content;
        justify-content: center;
        align-items:center;
        gap: 5px;
    }
    
   
    h1 {
        font-size: var(--fontLarge);
    }
   ::selection, ::-moz-selection {
        color:white;
        background-color: var(--specialColor);
   }
   main {
        margin-top: 50px;
        min-height: 100%;
        padding:10px;
   }
   body, #__app {
        min-height: 100vmin;
        height: 100%;
   }

@media screen and (max-width:650px){

    svg {
        width:14px;
        height:14px;
    }
}
`;

export default GlobalStyle;

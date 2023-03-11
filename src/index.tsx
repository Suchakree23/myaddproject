import { render } from "react-dom";

import App from "./App";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);

import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react"; 
import "./index.css";
import App from "./App";
import Parse from "parse";

// Parse 初始化配置
const PARSE_APPLICATION_ID = '8ivcqSFgK5yRa0M8qtuzOAUc2n6gkPQswzSwSTdb';
const PARSE_JAVASCRIPT_KEY = 'Iyt7syrTkEaWx4RJb8ZGdWfVKknyRtcWidDpSFFm';
const PARSE_MASTER_KEY = 'pLkd4AU7mO1YAkUMvYmZLTTFwt5pibIwsKCqkqd1';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY,PARSE_MASTER_KEY );
Parse.serverURL = PARSE_HOST_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);

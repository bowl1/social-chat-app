import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Parse from "parse";

// Parse 初始化配置
const PARSE_APPLICATION_ID = 'hUEo6gOOuiBC2YxyAQieFVQOMhWVPop9dqKv6u1p';
const PARSE_JAVASCRIPT_KEY = 'pRBuo5dp7II7TJvkLr5kbFUP0MzK85F47oy8t8KP';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

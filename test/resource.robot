*** Settings ***
Documentation       A resource file with reusable keywords and variables.
...
...
...
Library            SeleniumLibrary

*** Variables ***
${SERVER}           https://www.google.com
${BROWSER}          chrome
${DELAY}            0

*** Keywords ***
Open Browser and Log In
    Open Browser    ${SERVER}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed  ${DELAY}

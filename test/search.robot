*** Settings ***
Documentation       A test suite for the Search feature.
...
...
...
Suite Setup         Open Browser and Log In
Suite Teardown      Close Browser
Resource            resource.robot

*** Test Cases ***
Valid Search
    
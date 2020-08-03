import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import  { Joke } from './../joke';
import JokeGenerator from './../jokeGenerator';
import * as axios from "axios";
import MockAxios from "axios-mock-adapter";

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
//afterAll(() => mock.restore())

test("Joke component receives props and then renders text", () => {
    const { getByTestId } = render(
        <Joke text="The funniest joke this year." /> 
    );
    expect(getByTestId("joke-text")).toHaveTextContent("The funniest joke this year.")
});

test("'Joke Generator' component fetches a random joke and renders it", async() => {
    mock.onGet().replyOnce(200, {
        value: {
            joke: "Really funny joke!"
        }
    });

    const  { getByText, queryByText, queryByTestId } = render(<JokeGenerator />);    

    expect(getByText("You haven't loaded any joke yet!")).toBeInTheDocument();
    
    fireEvent.click(getByText("Load a random joke"));
    
    expect(queryByText("You haven't loaded any joke yet!")).not.toBeInTheDocument();
    
    expect(queryByText("Loading...")).toBeInTheDocument();

    await wait(() => expect(queryByText("Loading...")).not.toBeInTheDocument());

    expect(queryByTestId("joke-text")).toBeInTheDocument();
});

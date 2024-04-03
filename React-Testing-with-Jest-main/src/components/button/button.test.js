import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("Render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div);
})

it("Render button correctly", () => {
    const { getByTestId } = render(<Button label="Click Me, Please"></Button>);
    expect(getByTestId('button')).toHaveTextContent('Click Me, Please');
})

it("Render button correctly", () => {
    const { getByTestId } = render(<Button label="Save"></Button>);
    expect(getByTestId('button')).toHaveTextContent('Save');
})

it('matches snapshot 1', () => {
    const tree = renderer.create(<Button label="Save"></Button>).toJSON();
    expect(tree).toMatchSnapshot();
})

it('matches snapshot 2', () => {
    const tree = renderer.create(<Button label="Click Me, Please"></Button>).toJSON();
    expect(tree).toMatchSnapshot();
})
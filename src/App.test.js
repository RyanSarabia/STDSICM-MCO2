/* eslint-disable import/extensions */
/** import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; */
// eslint-disable-next-line import/no-unresolved
import { formatDate } from './myFunctions';

/** test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

describe('Format Date', () => {
  it("When the input is a new date '2020-12-11T04:07:31.000+00:00', it should return '12/11/2020 | 12:07:31'", () => {
    const olddate = new Date('2020-12-11T04:07:31.000+00:00');
    const newdate = formatDate(olddate);
    expect(newdate).toEqual('12/11/2020 | 12:07:31');
  });
});

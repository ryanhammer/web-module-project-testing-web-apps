import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import * as rtl from '@testing-library/react';


test('renders without errors', ()=>{
  render(<ContactForm />);
    
});

test('renders the contact form header', ()=> {
  // Arrange
  render(<ContactForm />);

  // Act
  const h1 = screen.queryByText(/contact form/i);

  //Assert header is in document
  expect(h1).toBeInTheDocument();

  //Assert header is truthy
  expect(h1).toBeTruthy();

  // Assert header has correct text content
  expect(h1).toHaveTextContent('Contact Form');
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  // Arrange: Setup the component
  render(<ContactForm />);

  // Act: Find the first name input and enter a name that is too short
  const firstName = screen.queryByPlaceholderText(/edd/i);
  userEvent.type(firstName, 'Carl');
  
  // Assert: Check that the first name length error appears on screen
  await waitFor( () => {
    const firstNameErr = screen.queryByText(/must have at least 5 characters/i);
    expect(firstNameErr).toBeInTheDocument();
  });

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  // Arrange: Setup the component
  render(<ContactForm />);

  // Act: Click submit button without filling in form fields
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // Assert: an error will render for each of the first name, last name and email fields
  await waitFor( () => {
    const firstNameErr = screen.queryByText(/must have at least 5 characters/i);
    expect(firstNameErr).toBeInTheDocument();
    const lastNameErr = screen.queryByText(/lastname is a required field/i);
    expect(lastNameErr).toBeInTheDocument();
    const emailErr = screen.queryByText(/email must be a valid email/i);
    expect(emailErr).toBeInTheDocument();
  });
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  // Arrange: Setup the component
  render(<ContactForm />);

  // Act: Find and correctly fill in First Name and Last Name fields but not email and click submit button
  const firstName = screen.queryByPlaceholderText(/edd/i);
  userEvent.type(firstName, 'Austen');
  const lastName = screen.queryByPlaceholderText(/edd/i);
  userEvent.type(lastName, 'Allred');
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // Assert: an error will render for each of the first name, last name and email fields
  await waitFor( () => {
    const emailErr = screen.queryByText(/email must be a valid email/i);
    expect(emailErr).toBeInTheDocument();
  });
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});
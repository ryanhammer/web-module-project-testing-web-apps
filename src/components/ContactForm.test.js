import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';


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
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, 'Carl');
  
  // Assert: An error will render for the invalid length of the first name field
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

  // Assert: an error will render for each of the missing first name, last name and email fields
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
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, 'Austen');
  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, 'Allred');
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // Assert: an error will render for the missing email field
  await waitFor( () => {
    const emailErr = screen.queryByText(/email must be a valid email/i);
    expect(emailErr).toBeInTheDocument();
  });
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  // Arrange: Setup the component
  render(<ContactForm />);

  // Act: Corectly fills in first name and last name then enters an email that is not in the proper format
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, 'Austen');
  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, 'Allred');
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, 'Austen@gmail');
  
  // Assert: an error will render for invalid email format
  await waitFor( () => {
    const emailErr = screen.queryByText(/email must be a valid email/i);
    expect(emailErr).toBeInTheDocument();
  });
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  // Arrange: Setup the component
  render(<ContactForm />);

  // Act: Find and correctly fill in First Name and Email fields but not Last Name and click submit button
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, 'Austen');
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, 'austen@austenallred.com');
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // Assert: an error will render for the missing last name field
  await waitFor( () => {
    const lastNameErr = screen.queryByText(/lastname is a required field/i);
    expect(lastNameErr).toBeInTheDocument();
  });
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  // Arrange: Setup the component
  render(<ContactForm />);

  // Act: Find and correctly fill in First Name, Last Name, and Email fields but not Message field and find and click submit button
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, 'Austen');
  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, 'Allred');
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, 'austen@austenallred.com');
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // Assert: First Name, Last Name, and Email will display but not message
  await waitFor( () => {
    const firstNameDisp = screen.queryByTestId('firstnameDisplay');
    expect(firstNameDisp).toBeInTheDocument();
    const lastNameDisp = screen.queryByTestId('lastnameDisplay');
    expect(lastNameDisp).toBeInTheDocument();
    const emailDisp = screen.queryByTestId('emailDisplay');
    expect(emailDisp).toBeInTheDocument();
    const messageDisp = screen.queryByTestId('messageDisplay');
    expect(messageDisp).not.toBeInTheDocument();
  });
    
});

test('renders all fields text when all fields are submitted.', async () => {
  // Arrange: Setup the component
  render(<ContactForm />);

  // Act: Find and correctly fill in First Name, Last Name, Email, and Message fields and find and click submit button
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, 'Austen');
  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, 'Allred');
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, 'austen@austenallred.com');
  const messageInput = screen.getByLabelText(/message/i);
  userEvent.type(messageInput, 'Join Lambda School today!');
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // Assert: First Name, Last Name, Email, and Message will display
  await waitFor( () => {
    const firstNameDisp = screen.queryByTestId('firstnameDisplay');
    expect(firstNameDisp).toBeInTheDocument();
    const lastNameDisp = screen.queryByTestId('lastnameDisplay');
    expect(lastNameDisp).toBeInTheDocument();
    const emailDisp = screen.queryByTestId('emailDisplay');
    expect(emailDisp).toBeInTheDocument();
    const messageDisp = screen.queryByTestId('messageDisplay');
    expect(messageDisp).toBeInTheDocument();
  });
    
});
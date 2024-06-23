import styles from './ContactForm.module.css';
import { useState } from 'react';

function ContactForm() {
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Result if message was sent or not
  const [result, setResult] = useState('');

  // Status of while message is being sent
  const [status, setStatus] = useState('Submit');

  // Resets Form - clears the emailForm values once the submission is complete
  function resetEmailForm() {
    setEmailForm({ name: '', email: '', message: '' });
  }

  // Handle Form Changes - updates the emailForm values as changes occur in the input fields and displays a result message
  function handleEmailFormChange(event) {
    setEmailForm((preventEmailData) => {
      return {
        ...preventEmailData,
        [event.target.name]: event.target.value,
      };
    });

    if (result.length > 0) {
      setResult('');
    }
  }

  // Extracts data from the form, initiates a POST Request to the backend, and handles response message
  const handleSubmit = async (e) => {
    setResult('');
    e.preventDefault();
    setStatus('Sending...');
    console.log(e.target.elements);

    const { name, email, message } = e.target.elements;

    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    // Send information from contact form to backend
    try {
      let response = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          body: JSON.stringify(details),
        },
      });
      setStatus('Submit');
      let result = await response.json();
      if (result.status === 'success') {
        setResult('Message Sent!');
        resetEmailForm();
      } else if (result.status === 'fail') {
        alert('Uh oh! Message failed to send.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Submit');
      setResult('Uh oh! Issues with submitting message.');
    }
  };

  return (
    <>
      <h1 className={styles.h1}>Contact Me</h1>
      <form
        id='contact-form'
        onSubmit={handleSubmit}
        method='POST'
        className={styles.contactForm}
      >
        <input
          placeholder='name'
          type='text'
          name='name'
          required={true}
          value={emailForm.name}
          onChange={handleEmailFormChange}
        />
        <input
          placeholder='email address'
          type='email'
          name='email'
          required={true}
          value={emailForm.email}
          onChange={handleEmailFormChange}
        />
        <textarea
          maxLength={300}
          placeholder='message (max 300 characters)*'
          name='message'
          required={true}
          value={emailForm.message}
          onChange={handleEmailFormChange}
        />
        <button type='submit'>{status}</button>
        <h3>{result}</h3>
      </form>
    </>
  );
}

export default ContactForm;

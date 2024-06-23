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

  return (
    <>
      <h1 className={styles.h1}>Contact Me</h1>
      <form id='contact-form' className={styles.contactForm}>
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

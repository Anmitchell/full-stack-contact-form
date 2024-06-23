import styles from './App.module.css';
import ContactForm from './components/forms/contact/ContactForm';

function App() {
  return (
    <>
      <div className={styles.app}>
        <ContactForm />
      </div>
    </>
  );
}

export default App;

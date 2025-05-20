import './Register.css';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // form starting values
  const initialValues = {
    email: '',
    password: '',
  };

  // form validation rules
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  // handles login when form is submitted
  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage('✅ Successfully logged in!');
      navigate('/products'); // go to product page after login
    }

    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ maxWidth: '400px', margin: 'auto' }}>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;

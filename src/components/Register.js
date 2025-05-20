import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Register() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password, firstName, surname, username } = values;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, firstName, surname },
      },
    });

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage('✅ Successfully registered! Check your email to confirm.');
      navigate('/login');

      const { user } = data;
      await supabase.from('users').insert([
        {
          id: user.id,
          email,
          username,
          first_name: firstName,
          surname,
        },
      ]);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
  
      if (user) {
        // User is logged in already
        navigate('/products'); // Or wherever you want to redirect them
      }
    }
  
    checkUser();
  }, []);

  return (
    <div className="form-container">
      <h2>Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ maxWidth: '400px', margin: 'auto' }}>
            <label>First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" component="div" className="error" />

            <label>Surname</label>
            <Field name="surname" type="text" />
            <ErrorMessage name="surname" component="div" className="error" />

            <label>Username</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" component="div" className="error" />

            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <label>Confirm Password</label>
            <Field name="confirmPassword" type="password" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;

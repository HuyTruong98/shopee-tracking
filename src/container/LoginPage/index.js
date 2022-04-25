import { yupResolver } from '@hookform/resolvers/yup';
import { React, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import login from '../../api/ApiLoginClient';
import { HOME_PAGE } from '../../configs';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup.string().email().required('Please enter your email !'),
  password: yup
    .string()
    .min(8)
    .max(15)
    .required('Please enter your password !')
    .matches(
      '(?=.*[0-9])(?=.*?[A-Z])',
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case CharacterPassword should include at least one uppercase, one numeric value !'
    ),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const password = useRef({});
  password.current = watch('password', '');
  const navigate = useNavigate();

  function handleLogin(data) {
    const loginUser = async () => {
      try {
        await login.loginUser(data);
        reset();
        navigate(HOME_PAGE);
        toast.success('Login is Success', { icon: '👏' });
      } catch (error) {
        console.log(error);
        toast.error('Wrong Email or Password !');
      }
    };
    loginUser();
  }

  return (
    <div className="form-login background-makeup">
      <form
        className="form-signin col-sm-4 container"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal">Login Page</h1>
        </div>

        <div className="form-label-group">
          <label for="inputEmail">* Email address</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter your email..."
            {...register('email')}
          />
          <p className="error-text">
            {errors.email && errors.email.message}
          </p>
        </div>
        <div className="form-label-group">
          <label for="inputPassword">* Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter your password..."
            {...register('password')}
          />
          <p classNameName="error-text" style={{ paddingLeft: '5px', color: 'red' }}>
            {errors.password && errors.password.message}
          </p>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2021</p>
      </form>
    </div>
  );
}

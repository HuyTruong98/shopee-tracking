/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { React, useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import login from '../../api/ApiLoginClient';
import { HOME_PAGE } from '../../configs';
import useLoading from '../../hooks/userLoading';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

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
  const navigate = useNavigate();
  const token = localStorage.getItem('TOKEN') ?? null;
  const [showLoading, hideLoading] = useLoading();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  useEffect(() => {
    if (token !== null) {
      navigate(HOME_PAGE);
    }
  }, [token]);

  password.current = watch('password', '');

  function handleLogin(user) {
    const loginUser = async () => {
      try {
        showLoading();
        await login.loginUser(user);
        reset();
        navigate(HOME_PAGE);
        hideLoading();
      } catch (error) {
        showLoading();
        hideLoading();
        console.log(error);
      }
    };
    loginUser();
  }

  const handleShowPass = () => {
    if (isPasswordShown) {
      setIsPasswordShown(false);
    } else {
      setIsPasswordShown(true);
    }
  };

  return (
    <div className="form-login background-makeup">
      <form
        className="form-signin col-sm-4 container"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal">Login Page</h1>
        </div>

        <div className="form-label-group ">
          <label for="inputEmail">Email address!</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter your email..."
            {...register('email')}
          />
          <p className="my-4 text-red-500">
            {errors.email && errors.email.message}
          </p>
        </div>
        <div className="form-label-group">
          <label for="inputPassword">Password!</label>
          <input
            className="form-control"
            type={isPasswordShown ? 'hide' : 'password'}
            name="password"
            placeholder="Enter your password..."
            {...register('password')}
          />
          <div className="icon-pass" onClick={handleShowPass}>
            {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
          </div>
          <p classNameName="my-4 text-red-500">
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

import React from 'react';
import { useForm } from 'react-hook-form';
import productsApi from '../../api/ApiProductClient';
import { useStore, actions } from '../../store';
import login from '../../api/ApiLoginClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '../../configs';

function SearchBox({ setListSearchItem }) {
  const { register, handleSubmit } = useForm();
  const [state, dispatch] = useStore();
  const navigate = useNavigate();
  const refreshToken =
    JSON.stringify(localStorage.getItem('REFRESHTOKEN'))
      ? JSON.stringify(localStorage.getItem('REFRESHTOKEN'))
      : "";

  function handleLogOut() {
    const logout = async () => {
      try {
        await login.logoutUser(JSON.parse(refreshToken));
        dispatch(actions.setUserLogout({ status: false }));
        toast.success('Logout is Success', { icon: '👏' });
        navigate(LOGIN_PAGE);
      } catch (error) {
        console.log(error);
      }
    };
    logout();
  }

  function handleSearch(data) {
    const params = {
      by: 'relevancy',
      limit: 10,
      newest: 0,
      order: 'desc',
      page_type: 'search',
      scenario: 'PAGE_GLOBAL_SEARCH',
      version: 2,
      keyword: data.search,
    };
    const getItemSearch = async () => {
      try {
        const response = await productsApi.searchItem(params);
        setListSearchItem(response);
      } catch (error) {
        console.log('Failed to Fetch Product', error);
      }
    };
    getItemSearch();
  }
  return (
    <>
      <div className="header-search-items">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a></a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-5">
              <form
                className="form-inline my-2 my-lg-0"
                onSubmit={handleSubmit(handleSearch)}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  name="search"
                  placeholder="Search"
                  aria-label="Search"
                  {...register('search')}
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="log-out" onClick={handleLogOut}>
            <button className="not-found">
              Log Out
            </button>
          </div>
        </nav>
        <div className="example-search navbar-light bg-light">
          Tìm kiếm 1 keyword : ví dụ như nồi chiên không, son black rouge, tai
          nghe bluetooth
        </div>
      </div>
    </>
  );
}

export default SearchBox;

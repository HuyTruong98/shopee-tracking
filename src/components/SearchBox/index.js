import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import login from '../../api/ApiLoginClient';
import { REFRESHTOKEN } from '../../configs';
import r from '../../routes/routes';

function SearchBox({ onFilter }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem(REFRESHTOKEN);

  function handleLogout() {
    const logOutUser = async () => {
      try {
        await login.logoutUser(refreshToken);
        navigate(r.LOGIN_PAGE);
      } catch (error) {
        console.log('Log out fail', error);
      }
    };
    logOutUser();
  }

  function handleSearch(data) {
    onFilter({ keyword: data.search });
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
        <a className="navbar-brand" href="#"></a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link">
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
                Tìm kiếm 1 keyword : ví dụ như nồi chiên không, son black rouge,
                tai nghe bluetooth
              </a>
            </li>
          </ul>
          <div className="log-out" onClick={handleLogout}>
            <button className="not-found">Log Out</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SearchBox;

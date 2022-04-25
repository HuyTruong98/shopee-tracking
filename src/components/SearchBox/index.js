import React from 'react';
import { useForm } from 'react-hook-form';
import productsApi from '../../api/ApiProductClient';

function SearchBox({ setListSearchItem }) {
  const { register, handleSubmit } = useForm();

  function handleSearch(data) {
    const params = {
      by: 'relevancy',
      limit: 100,
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
            <div className="log-out" >
              <button className="not-found">Log Out</button>
            </div>
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

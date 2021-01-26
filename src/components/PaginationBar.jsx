import React from 'react';
import { Route, Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

// eslint-disable-next-line react/prop-types
export default function PaginationBar({ pageCount, pageName }) {
  return (
    <Route>
      {({ location }) => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get('page') || '1', 10);
        console.log('PAGE COUNT', pageCount);
        return (
          <Pagination
            page={page}
            count={pageCount}
            color="primary"
            size="large"
            variant="outlined"
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                /* eslint-disable */
                to={`/${pageName}${item.page === 1 ? '' : `?page=${item.page}`}${query.get('search') === null ? '' : `?search=${query.get('search')}`
                  }`}
                /* eslint-enable */
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
                className={`class-page-${item.page}-button`}
              />
            )}
            id="id-paginationbar"
          />
        );
      }}
    </Route>
  );
}

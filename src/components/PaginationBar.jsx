import React from 'react';
import { Route, Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function PaginationBar() {
  return (
    <Route>
      {({ location }) => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get('page') || '1', 10);
        return (
          <Pagination
            page={page}
            count={10}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/explore${item.page === 1 ? '' : `?page=${item.page}`}`}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
              />
            )}
          />
        );
      }}
    </Route>
  );
}

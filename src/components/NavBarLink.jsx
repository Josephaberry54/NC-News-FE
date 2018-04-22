import React from 'react';
import { NavLink } from 'react-router-dom';

import PT from 'prop-types';

const NavBarLink = ({ topic }) => {
  const { title, _id } = topic;
  return (
    <NavLink
      className="flex-sm-fill text-sm-center nav-link active text-info d-none d-sm-block"
      to={`/topics/${_id}`}
    >
      {title}
    </NavLink>
  );
};

NavBarLink.propTypes = {
  topic: PT.object
};

export default NavBarLink;

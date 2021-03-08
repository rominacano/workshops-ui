import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src={props.orientation ? '/static/logo2.png' : '/static/logo.png'}
      {...props}
    />
  );
};

export default Logo;

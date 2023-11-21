import React, { Fragment } from 'react';

const Header = ({titulo}) => {
    return ( 
        <Fragment>
            <h1>{titulo}</h1>
            <p>Soy el header</p>
        </Fragment>
     );
}
 
export default Header;
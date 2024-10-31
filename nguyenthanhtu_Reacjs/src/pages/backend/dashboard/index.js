import React from 'react';
import { Outlet } from 'react-router-dom';
const dashboard = () => {
    return (
        <>
            <Outlet />
        </>
    );
}
export default dashboard;
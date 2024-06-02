import Menu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';
import { useContext } from 'react';
import { GlobalUserContext, reducerActionTypes } from '../../../types/types';

type ProfileMenuProps = {
    isOpen: boolean,
    anchorElement: HTMLElement | null,
    setAnchorElement: (newAnchor: HTMLElement | null) => void,
}

const ProfileMenu = (props: ProfileMenuProps) => {
    const { dispatch } = useContext(GlobalUserContext);

    const handleMenuClose = () => {
        props.setAnchorElement(null)
    }

    const handleLogout = () => {
        handleMenuClose();
        dispatch({ type: reducerActionTypes.userToken, value: "" });
        localStorage.clear();
    }

    return (
        <Menu
            open={props.isOpen}
            anchorEl={props.anchorElement}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id='menuid'
            keepMounted
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    )
}

export default ProfileMenu;
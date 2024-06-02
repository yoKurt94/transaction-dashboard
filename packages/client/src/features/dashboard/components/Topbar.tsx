import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from "react";
import { GlobalUserContext } from "../../../types/types";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

type TopbarProps = {
    anchorElement: HTMLElement | null,
    setAnchorElement: (newAnchor: HTMLElement) => void
}

const Topbar = (props: TopbarProps) => {
    const { userDataState } = useContext(GlobalUserContext);

    const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        props.setAnchorElement(e.currentTarget)
    }

    return (
        <>
            {
                userDataState?.smeData && userDataState.userObject ?
                    <AppBar
                        position='relative'
                        sx={{
                            borderRadius: '12px',
                            backgroundColor: 'white',
                        }}
                    >
                        <Toolbar>
                            <Avatar
                            src="/logo.png"
                            />
                            <Typography
                                variant='h6'
                                sx={{
                                    ml: 2,
                                    color: 'black'
                                }}
                            >
                                {userDataState.smeData.legalName}
                            </Typography>
                            <Box
                                flexGrow={1}
                            />
                            <Box
                                display='flex'
                                alignItems='center'
                            >
                                <Typography
                                    sx={{
                                        mr: 1,
                                        color: 'black'
                                    }}
                                >
                                    {userDataState.userObject.name}
                                </Typography>
                                <IconButton
                                    onClick={handleProfileMenuOpen}
                                >
                                    <Avatar
                                        src={userDataState.userObject.profileImage}
                                    />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar> :
                    <Skeleton variant='rounded' width={1000} height={60}></Skeleton>
            }
        </>
    )
}

export default Topbar;
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { GlobalUserContext } from "../../types/types";
import Topbar from "../../features/dashboard/components/Topbar";
import ProfileMenu from "../../features/dashboard/components/ProfileMenu";
import TransactionBoard from "../../features/dashboard/components/TransactionBoard";

const Dashboard = () => {       
    const [ anchorElement, setAnchorElement ] = useState<HTMLElement | null>(null);
    const { userDataState } = useContext(GlobalUserContext);

    return (
        <CssBaseline>
            <Grid
                container
                component='main'
                minHeight='100vh'
                sx={{
                    backgroundImage: 'radial-gradient(grey 1px, white 1px)',
                    backgroundSize: '40px 40px'
                }}
                alignItems='center'
                justifyContent='center'
            >
                <Grid
                    container
                    item
                    md={8}
                    mb={2}
                    gap={2}
                >
                    <Topbar
                    anchorElement={anchorElement}
                    setAnchorElement={(newAnchor) => setAnchorElement(newAnchor)}
                    />
                    <ProfileMenu
                    isOpen={!!anchorElement}
                    anchorElement={anchorElement}
                    setAnchorElement={(newAnchor) => setAnchorElement(newAnchor)}
                    />
                    <TransactionBoard
                    error={userDataState?.error?.message}
                    />
                </Grid>
            </Grid>
        </CssBaseline>
    )
}

export default Dashboard;
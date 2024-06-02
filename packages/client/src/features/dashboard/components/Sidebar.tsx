import { Transaction, TransactionStatusEnum } from "../../../../../lib-common/types/Transaction";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { TransactionStringDict } from "../../../types/types";
import { createTransactionStatusChip } from "../utils/helperFunctions";
import Box from "@mui/material/Box";

type SidebarProps = {
    row: Transaction | null,
    didClickClose: () => void
}

const Sidebar = (props: SidebarProps) => {
    const transactionDetails: Transaction | null = props.row;
    const handleClose = () => {
        props.didClickClose();
    }

    const contentCard = (
        <Card
            elevation={0}
        >
            <CardHeader
                avatar={
                    <Avatar
                        src={transactionDetails?.merchantIconUrl}
                    />
                }
                action={
                    <IconButton
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                }
                title={transactionDetails?.merchantName}
                subheader={transactionDetails?.userId}
            />
            <CardContent>
                <Typography
                    variant="h6"
                >{transactionDetails?.amount + " " + transactionDetails?.currency}</Typography>
                <Typography
                    variant="body2"
                >{transactionDetails?.transactionTime}</Typography>
                {
                    Object.entries(transactionDetails || {}).map(([key, value]) => {
                        if ((key === "id" || key === "smeId") && value !== null) {
                            return (
                                <div key={key}>
                                    <Typography
                                        sx={{ mt: 2 }}
                                        variant="body2">
                                        {TransactionStringDict[key]}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                    >
                                        {value}
                                    </Typography>
                                </div>
                            )
                        } else if (key === 'status' && value !== null) {
                            return (
                                <Box
                                    key={key}
                                >
                                    <Typography
                                        sx={{ mt: 2 }}
                                        variant="body2">
                                        {TransactionStringDict[key]}
                                    </Typography>
                                    {createTransactionStatusChip(value)}

                                    {transactionDetails?.status === TransactionStatusEnum.Rejected && (
                                        <>
                                            <Typography
                                                sx={{ mt: 2 }}
                                                variant="body2">
                                                {TransactionStringDict["rejectionReason"]}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                            >
                                                {transactionDetails?.rejectionReason}
                                            </Typography>
                                        </>
                                    )}
                                </Box>
                            )
                        }
                    })
                }
            </CardContent>
        </Card>
    )

    const errorCard = (
        <>
            <Card>
                <Typography>Something went wrong.</Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon>
                    </CloseIcon>
                </IconButton>
            </Card>
        </>
    )

    return (props.row ? contentCard : errorCard)
}

export default Sidebar;
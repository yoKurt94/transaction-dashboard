import { Chip, ChipProps } from '@mui/material';
import { TransactionStatusEnum } from '../../../../../lib-common/types/Transaction';

export const utcDateToDotString = (date: string) => {
    const dateObj = new Date(date).toLocaleDateString('en-GB');
    const dateWithDots = dateObj.replace(/\//g, '.');
    return dateWithDots;
}

// Returns a colored chip based on the status of the string which will be chipped
export const createTransactionStatusChip = (transactionStatus: string) => {
    let color: ChipProps['color'] = 'primary';
    switch (transactionStatus) {
        case TransactionStatusEnum.Rejected:
            color = 'error';
            break;
        case TransactionStatusEnum.Completed:
            color = 'success';
            break;
        case TransactionStatusEnum.Pending:
            color = 'secondary';
            break;
    }
    return <Chip label={transactionStatus} color={color} />;
}
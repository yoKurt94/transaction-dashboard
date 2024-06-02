import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import FilterSection from './FilterSection';
import {
    useState,
    useContext,
    useEffect
} from 'react';
import { GlobalUserContext, reducerActionTypes } from '../../../types/types';
import useFetch from '../../../hooks/useFetch';
import * as Types from '../../../types/types'
import { Transaction } from '../../../../../lib-common/types/Transaction';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import TransactionLineChart from './TransactionLineChart';
import Skeleton from '@mui/material/Skeleton';
import Drawer from '@mui/material/Drawer';
import Sidebar from './Sidebar';
import { utcDateToDotString, createTransactionStatusChip } from '../utils/helperFunctions';
import Button from '@mui/material/Button';

type TableComponentProps = {
    error: string | undefined
}

const TransactionBoard = (props: TableComponentProps) => {
    const { userDataState, dispatch } = useContext(GlobalUserContext);
    const handleLogout = () => {
        dispatch({ type: reducerActionTypes.userToken, value: "" });
        localStorage.clear();
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [rowCount, setRowCount] = useState<number>(0);
    const [sidebarContents, setSidebarContents] = useState<Transaction | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [paginationModel, setPaginationModel] = useState<{ page: number, pageSize: number }>({
        page: 0,
        pageSize: 7,
    });
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [currentFilter, setCurrentFilter] = useState<string>("All");
    let url = `http://localhost:3000/transactions?uuid=${userDataState?.userObject?.id}&limit=7&offset=${paginationModel.page * paginationModel.pageSize}`;
    if (currentFilter !== "All") {
        url += `&status=${currentFilter}`
    }

    const dataGridData: Types.FetchResponse = useFetch(url, [shouldFetch], true);
    useEffect(() => {
        setShouldFetch(true)
    }, [paginationModel, currentFilter]);

    useEffect(() => {
        if (dataGridData.loading) {
            setIsLoadingData(true);
        } else if (isLoadingData === true) {
            setIsLoadingData(false);
            if (dataGridData.data && Types.isTransactionResponse(dataGridData.data)) {
                setTransactions(dataGridData.data.data);
                if (dataGridData.data.meta) {
                    setRowCount(dataGridData.data.meta.total);
                }
            }
            setShouldFetch(false);
        }
    }, [dataGridData]);

    const columns: GridColDef[] = [
        {
            field: 'merchantIconUrl', headerName: 'Merchant', editable: false, filterable: false, flex: 1,
            renderCell: (params) => {
                return (
                    <Box display='flex' alignItems='center' p={0.5}>
                        <Avatar src={params.row.merchantIconUrl} />
                        <Typography pl={1}>
                            {params.row.merchantName}
                        </Typography>
                    </Box>
                );
            }
        }, {
            field: 'status', headerName: 'Status', editable: false, align: 'center', headerAlign: 'center', flex: 1,
            renderCell: (params) => createTransactionStatusChip(params.row.status)
        }, {
            field: 'transactionTime', headerName: 'Date', editable: false, filterable: false, flex: 1,
            renderCell: (params) => {
                return utcDateToDotString(params.row.transactionTime);
            }
        }, {
            field: 'amount', headerName: 'Amount', editable: false, align: 'right', headerAlign: 'right', flex: 1,
            sortComparator: (_v1, _v2, params1, params2) => {
                return Number(params1.value) - Number(params2.value)
            },
            renderCell: (params) => {
                return Number(params.row.amount).toFixed(2);
            }
        }, {
            field: 'currency', headerName: 'Currency', editable: false, headerAlign: 'right', align: 'right', flex: 0.7
        }
    ]

    return (
        <>
            {
                transactions && userDataState?.userObject ?
                    <>
                        <Drawer
                            open={sidebarOpen}
                            anchor='right'
                            onClose={() => setSidebarOpen(false)}
                        >
                            <Sidebar
                                row={sidebarContents}
                                didClickClose={() => setSidebarOpen(false)}
                            />
                        </Drawer>
                        <Card
                            elevation={5}
                            sx={{
                                backgroundColor: 'white',
                                height: '100%',
                                width: '100%',
                                borderRadius: 3,
                                padding: 3
                            }}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                            >
                                <Box>
                                    <Typography variant='h4'>
                                        Transactions
                                    </Typography>
                                    <Typography variant='h6'>
                                        All current transactions
                                    </Typography>
                                </Box>
                                <Box
                                    flexGrow={1}
                                    display='flex'
                                    justifyContent='flex-end'
                                >
                                    <TransactionLineChart
                                        transactions={transactions}
                                    />
                                </Box>
                            </Box>

                            {props.error || dataGridData.error ?
                                <Alert
                                    severity='error'
                                    action={
                                        <Button color="inherit" size="small"
                                            onClick={handleLogout}
                                        >

                                            {/* if there is an API error, the user will be able to at least perform a logout */}
                                            LOGOUT
                                        </Button>
                                    }
                                >
                                    {props.error || dataGridData.error?.message}
                                </Alert> : null}
                            <FilterSection
                                isLoading={isLoadingData}
                                setCurrentFilterItem={(currentFilterItem) => setCurrentFilter(currentFilterItem)}
                            />
                            <DataGrid
                                pageSizeOptions={[7]}
                                rowCount={rowCount}
                                rows={transactions}
                                columns={columns}
                                autoHeight
                                sx={{ '--DataGrid-overlayHeight': '300px' }}
                                paginationMode='server'
                                paginationModel={paginationModel}
                                onPaginationModelChange={(model) => {
                                    setPaginationModel(model)
                                }}
                                onCellClick={(cell) => {
                                    setSidebarContents(cell.row);
                                    setSidebarOpen(true);
                                }}
                            />
                        </Card>
                    </>
                    :
                    <Skeleton variant='rounded' height={700} width={1000}></Skeleton>
            }
        </>
    )
}

export default TransactionBoard;
import { Transaction } from "../../../../../lib-common/types/Transaction";
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import {
    LinePlot,
    MarkPlot,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';

type TransactionLineChartProps = {
    transactions: Transaction[]
}

const TransactionLineChart = (props: TransactionLineChartProps) => {
    const lineChartData = props.transactions.map((transaction) => ({
        x: new Date(transaction.transactionTime).getTime(),
        y: Number(transaction.amount)
    }))
    
    return (
        <ChartContainer
        xAxis={[{
            scaleType: 'point',
            data: lineChartData.map((transaction) => transaction.x)
        }]}
        series={[
            {
                type: 'line',
                data: lineChartData.map((transaction) => transaction.y),
            },
        ]}
        sx={{
            [`& .${lineElementClasses.root}`]: {
                stroke: '#ff6600',
                strokeWidth: 2
            },
            [`& .${markElementClasses.root}`]: {
                stroke: '#ff6600',
                scale: '0.6',
                fill: '#ff6600',
                strokeWidth: 2,
            }
        }}
        width={400}
        height={125}
    >
        <LinePlot />
        <MarkPlot />
    </ChartContainer>
    )
}

export default TransactionLineChart
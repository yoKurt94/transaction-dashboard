import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CircularProgress, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { TransactionStatusEnum } from '../../../../../lib-common/types/Transaction'

type FilterSectionProps = {
    isLoading: boolean,
    setCurrentFilterItem: (item: string) => void
}

const FilterSection = (props: FilterSectionProps) => {

    const [filterItems, setFilterItems] = useState([
        { key: "All", value: true },
        { key: "COMPLETED", value: false },
        { key: "PENDING", value: false },
        { key: "REJECTED", value: false },
        { key: "REVERSED", value: false },
    ]);

    const handleFilterItemChange = (key: string) => () => {
        const updatedFilterItems = filterItems.map((oldItem) =>
            oldItem.key === key ? { ...oldItem, value: true } : { ...oldItem, value: false }
        )
        setFilterItems(updatedFilterItems);
        props.setCurrentFilterItem(key);
    }

    return (
        <Box
            display='flex'
        >
            <Box>
                <FormControl component='fieldset'>
                    <Typography>Show transactions:</Typography>
                    <RadioGroup row>
                        {filterItems.map((item) => {
                            if (item.key !== TransactionStatusEnum.Reversed) {
                                return (
                                    <FormControlLabel
                                        key={item.key}
                                        control={<Radio
                                            color='secondary'
                                            checked={item.value}
                                            onChange={handleFilterItemChange(item.key)}
                                        />}
                                        label={item.key}
                                    />
                                )
                            }
                        })}
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            flexGrow={1}
            >
                {
                    props.isLoading && <CircularProgress/>
                }
            </Box>
        </Box>
    )
}

export default FilterSection;
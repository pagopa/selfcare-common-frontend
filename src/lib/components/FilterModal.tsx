import * as React from 'react';
import {
  Typography,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

type Props = {
  /** If the popup is to be displayed */
  open: boolean;
  /** The function to be invoked when clicking on exit button or selecting a value */
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  /** The popup title */
  title: string;
  /** @see {@link FilterModalConfig} */
  filterModalConfig?: FilterModalConfig<any, any>;
  /** The popup height */
  height?: string;
  /** The popup minHeight */
  minHeight?: string;
};
export type FilterModalConfig<T, V> = {
  /** The list of values between to which choose */
  data: Array<T>;
  /** A function that will select the label to show */
  getLabel: (e: T) => string;
  /** A function that will select the value to return when selecting an item */
  getValue: (e: T) => string;
  /** The function invoked when selecting a value */
  onFilterChange: (v: V) => void;
};

/** Modal used to show a list of values from which to choose a single value */
export default function FilterModal({
  open,
  handleClose,
  title,
  filterModalConfig,
  height = '16em',
  minHeight = '16em',
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  React.useEffect(() => setValueRadio(''), [open]);

  const [valueRadio, setValueRadio] = React.useState<string>('');

  const handleChange = (_: React.ChangeEvent<HTMLInputElement>, value: any) => {
    setValueRadio(value);
  };

  const submitFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const i = data.filter((value) => value.id === valueRadio).map((x) => x)[0];
    filterModalConfig?.onFilterChange(i === undefined ? valueRadio : i);
    handleClose(event);
  };

  const data = filterModalConfig?.data !== undefined ? filterModalConfig?.data : [];
  return (
    <Dialog fullScreen={fullScreen} open={open} aria-labelledby="responsive-dialog-title">
      <Grid container direction="column" sx={{ height, minHeight, width: '21.9em' }}>
        <Box mx={3} sx={{ height: '100%' }}>
          <Grid container item mt={4}>
            <Grid item xs={10}>
              <IconButton
                onClick={(e) => {
                  setValueRadio('');
                  handleClose(e);
                }}
                style={{ position: 'absolute', top: '20px', right: '16px', zIndex: 100 }}
              >
                <ClearOutlinedIcon />
              </IconButton>
              <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: '600' }}>
                {`Filtra per ${title}`}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item>
            <Grid item xs={12} my={3}>
              <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={valueRadio}
                onChange={handleChange}
              >
                {data.map((value, index) => (
                  <FormControlLabel
                    value={filterModalConfig?.getValue(value)}
                    control={<Radio />}
                    label={filterModalConfig?.getLabel(value)}
                    key={index}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>

          <Grid item xs={12} mb={2}>
            <Button
              sx={{ width: '100%', marginBottom: '20px' }}
              color="primary"
              variant="contained"
              onClick={submitFilter}
            >
              Filtra
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Dialog>
  );
}

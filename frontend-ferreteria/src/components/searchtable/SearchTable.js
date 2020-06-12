import React, { useState } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {
    Card, CardActions, CardContent, Table, TableBody, Grid,
    TableCell, TableHead, TableRow, TablePagination, Button
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import useStyles from './SearchTable.Style';
import Split from '../dynamictable/SplitButton';

const DynamicTable = props => {

    const [busqueda, setBusqueda] = useState(1);
    const [textobusqueda, setTextoBusqueda] = useState("");
    
    const { data, columns, loading, header, ...rest } = props;
    const classes = useStyles();

    const [selectedValue, setSelectedValue] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleMenuHeader = (index) => {
        header.actions[index].action(data[(selectedValue - 1)]);
    }

    const handleChange = (event) => {
        setSelectedValue(parseInt(event.target.value));
    };

    const handlePageChange = (event, other) => {
        setPage(parseInt(other));
    }
    
    const handleRowsPerPageChange = (event, page) => {
        setPage(0);
        setSelectedValue(0);
        setRowsPerPage(parseInt(page.key.replace(".$", "")));
    };

    const handleClickMain = () => {
        header.reloadEvent(busqueda, textobusqueda);
    }

    const handleChangeForm = (a) => (e) => {
        setBusqueda(e.target.value);
        setTextoBusqueda("");
    };

    const handleChangeForm2 = (a) => (e) => {
        setTextoBusqueda(e.target.value);
    };

    const renderColumnHeader = () => (
        <TableRow style={{ padding: 0 }}>
            <TableCell className={clsx(classes.column, classes.firstCol)}/>
            {columns.map((item, index) => (
                <TableCell className={classes.column} style={{width: '50px'}} key={index}>
                    {item.name}
                </TableCell>
            ))}
        </TableRow>
    )

    const renderLoading = () => (
        <TableRow>                                        
            <TableCell className={classes.emptyRow} colSpan={columns.length + 1}>
                Cargando datos
            </TableCell> 
        </TableRow>
    );

    const renderEmpty = () => (
        <TableRow>                                        
            <TableCell className={classes.emptyRow} colSpan={columns.length + 1}>
                No hay datos que mostrar
            </TableCell> 
        </TableRow>
    );

    const renderBody = () => (
        data.slice(rowsPerPage * page, (rowsPerPage * page) + rowsPerPage).map((oData, oIndex) => {
            const nIndex = oIndex + 1;
            const isSelected = selectedValue === nIndex;
            
            return (
                <TableRow key={nIndex} className={clsx(isSelected ? classes.selected : '')}>
                    <TableCell style={{ padding: 0, textAlign: 'center'}}>
                        <Radio
                            checked={isSelected}
                            onChange={handleChange}
                            value={nIndex}
                            name="radio-select"
                            inputProps={{ 'aria-label': nIndex }}
                        />
                    </TableCell>
                    {columns.map((oCol, oIndexCol) => (
                        <TableCell key={nIndex + '-' + oIndexCol}>
                            {oCol.type === 'link' ? (
                                <Link to={oData[oCol.url]} className={classes.linkTitle} style={(oCol.textStyle != null ? oCol.textStyle : {})}>
                                    {oData[oCol.index]}
                                </Link>
                            ):( <div style={(oCol.textStyle != null ? oCol.textStyle : {})}>{oData[oCol.index]}</div> )}
                        </TableCell>
                    ))}
                </TableRow>
            )
        })
    );

    return (
        <Card {...rest} className={classes.root}>
            <CardContent className={classes.content}>
                <Grid container className={classes.headerContainer}>
                    <Grid item lg={12} md={12} sm={12}>
                        <div className={classes.headerTitle}>{header.title}</div>
                    </Grid>
                    <Grid lg={2} md={3} xs={12} item>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel id="select-valor-label">Tipo Búsqueda</InputLabel>
                            <Select id="select-valor" value={busqueda} onChange={handleChangeForm()}>
                                <MenuItem key={-1} value=""><em>---</em></MenuItem>
                                {[{ id: 1, name: "Código"}, { id: 2, name: "Nombre"}].map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid lg={3} md={6} xs={12} item>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="input-etiqueta">Ingrese texto</InputLabel>
                            <OutlinedInput
                                id="input-etiqueta"
                                value={textobusqueda}
                                onChange={handleChangeForm2()}
                                labelWidth={60}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item lg={2} md={3} sm={12} style={{ paddingRight: '10px' }}>
                        <Button variant="contained" color="secondary" onClick={handleClickMain} fullWidth>
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item lg={2} md={3} sm={12}>
                        <Split data={header.actions} disabled={selectedValue === 0} onClick={handleMenuHeader}/>
                    </Grid>
                </Grid>
                <PerfectScrollbar className={classes.scroll}>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>{renderColumnHeader()}</TableHead>
                            <TableBody>
                                {loading ? renderLoading() : 
                                (data !=null && data.length > 0 ? renderBody() : renderEmpty()) }
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={data.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </CardActions>
        </Card>
    );
};

DynamicTable.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired, 
    loading: PropTypes.bool, 
    header: PropTypes.object.isRequired,
};

export default DynamicTable;
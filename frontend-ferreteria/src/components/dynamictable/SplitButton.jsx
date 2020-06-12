import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const SplitButton = (props) => {
    
    const { data, onClick, ...others } = props;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleMenuItemClick = (event, index) => {
        setOpen(false);
        onClick(index);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid item xs={6} lg={3} sm={4} md={3}>
            <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
                <Button
                    {...others}
                    variant="outlined"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <div style={{ marginRight: '10px' }}>Opciones</div>
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper open={open} style={{ zIndex: 1000 }}
            anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" style={{ paddingTop: 0, paddingBottom: 0 }}>
                        {data.map((option, index) => (
                        <MenuItem
                            key={index}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option.name}
                        </MenuItem>
                        ))}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </Grid>
    );
}


export default SplitButton;
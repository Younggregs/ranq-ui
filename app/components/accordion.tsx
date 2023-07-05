"use client"
import React from 'react'
import { Grid } from '../lib/mui';
import { Add, Remove } from '@mui/icons-material';

export default function Accordion({title, message}: {title: string, message: string}) {
    const [open, setOpen] = React.useState(false);
    const [textColor, setTextColor] = React.useState('#000');
    const [backgroundColor, setBackgroundColor] = React.useState('#fff');

    const handleClick = () => {
        setOpen(!open);
        setTextColor(!open ? '#fff' : '#000');
        setBackgroundColor(!open ? '#000' : '#fff');
    }

    return (
        <Grid 
            style={styles.container}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid 
                container
                alignItems="center"
                justifyContent="space-between"
                direction="row"
                style={styles.titleBox}
                sx={{backgroundColor: backgroundColor}}
                onClick={() => handleClick()}
            >
                <Grid item xs={11}>
                    <h3 style={{color: textColor}}>{title}</h3>
                </Grid>
                <Grid item xs={1}>
                    {!open ? 
                        <Add style={{color: textColor}}/> : 
                        <Remove style={{color: textColor}}/>
                    }
                </Grid>
            </Grid>
            {open && (
                <Grid 
                    style={styles.textBox}
                >
                    <p>
                        {message}
                    </p>
                </Grid>
            )}
            
        </Grid>
        )

}

const styles = {
    container: {
        width: '100%',
        color: '#000',
        marginBottom: '1rem'
    },
    titleBox: {
        width: '20rem',
        height: '5rem',
        border: '1px solid #000',
        padding: '1rem',
        cursor: 'pointer',
        borderRadius: '0.5rem',
        marginBotton: '1rem'
    },
    textBox: {
        width: '25rem',
        padding: '1rem',
        marginBotton: '1rem',
        marginTop: '1rem'
    }
}
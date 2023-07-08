import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Grid, ListItemButton, ListItemIcon } from '../lib/mui';
import Icon from './icons';
import Logo from './logo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import resolveLink from '../lib/resolve-link';
import user from '../lib/user-details';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MenuModal() {
  const [open, setOpen] = React.useState(false);
  const isLoggedIn = user().token
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const handleLogin = () => {
        router.push('/verify-email')
    }

  return (
    <div>
        <Grid 
            onClick={handleClickOpen}
            sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Icon name="menu" />
        </Grid>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <Grid
                container
                sx={styles.container}
            >
                <Grid
                    container
                    direction="row"
                    sx={styles.header}
                >
                    <Grid item xs={6}>
                        <Logo shade="dark" menu={false}/>
                    </Grid>
                    <Grid container justifyContent={'flex-end'} item xs={6}>
                        <IconButton
                            edge="start"
                            sx={{color: '#000'}}
                            onClick={handleClose}
                            aria-label="close"
                            >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                >
                    <Grid item xs={12}>
                        <List>
                            {['Home', 'Rank Poll'].map((text, index) => (
                                <ListItem key={text}>
                                    <ListItemButton>
                                        <Link href={resolveLink(text)}>
                                        <ListItemText 
                                            sx={styles.listFont} 
                                            primary={text} />
                                        </Link>
                                    </ListItemButton>
                                </ListItem>
                            ))}

                                {isLoggedIn ?(
                                    <ListItem key={'signout'} sx={{marginTop: 10}}>
                                    <ListItemButton
                                        onClick={() => handleLogout()}
                                    >
                                        <ListItemText 
                                            sx={styles.listFont} 
                                            primary={'Sign Out'} />
                                            <ListItemIcon>
                                                <Icon name="signout" />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                                ): (
                                <ListItem key={'signin'} sx={{marginTop: 10}}>
                                    <ListItemButton
                                        onClick={() => handleLogin()}
                                    >
                                        <ListItemText 
                                            sx={styles.listFont} 
                                            primary={'Sign In'} />
                                            <ListItemIcon>
                                                <Icon name="signin" />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                                ) }
                                
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    </div>
  );
}

const styles = {
    container: {
        backgroundColor: '#fff', 
        height: '100vh',
    }, 
    header: {
        height: '4rem',
        padding: '0 1rem',
    },
    listFont: {
        color: '#000'
    }
}
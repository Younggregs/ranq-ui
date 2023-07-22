import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Grid } from '../../lib/mui';
import Logo from '../logo';
import { useRouter } from 'next/navigation';
import user from '../../lib/user-details';
import CustomButton from '../button';
import Duo from '@mui/icons-material/Duo';
import YouTube from 'react-youtube';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const opts = {
    height: '600',
    width: '360',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

export default function HowToVideo() {
  const [open, setOpen] = React.useState(false);
  const isLoggedIn = user().token
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const _onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  return (
    <div>
        <Grid 
            onClick={handleClickOpen}
            sx={{ display: { xs: 'flex', md: 'none' } }}
            container
            direction="row"
            alignItems="center"
        >
                <i><b>How to vote</b></i>
                <CustomButton 
                    color="#0F1017" 
                    border="1px solid #fff"
                    title="Watch Video" 
                    Icon={<Duo />}
                />
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
                    <YouTube videoId="ZeuX3M6zdb8" opts={opts} onReady={_onReady} />
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
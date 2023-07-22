import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './logo';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid } from '../lib/mui';
import MenuModal from './menu-modal';
import Link from 'next/link';
import resolveLink from '../lib/resolve-link';
import user from '../lib/user-details';

const pages = ['Home', 'Rank Poll'];
const isLoggedIn = user().token;
pages.push(isLoggedIn ? 'Sign Out' : 'Sign In');

function MenuBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0F1017',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar 
        sx={{padding: '0 1rem', height: '4rem', alignItems: 'center', justifyContent: 'center'}}
        position="static" 
        enableColorOnDark>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo shade="light" menu={true}/>

            <Box sx={{ flexGrow: 1 }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
              </Menu>
            </Box>
            <Grid
              sx={{ display: { xs: 'flex', md: 'none' } }}>
              <MenuModal />
            </Grid>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link key={page} href={resolveLink(page)}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default MenuBar;
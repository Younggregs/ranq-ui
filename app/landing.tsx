import stylesMain from './page.module.css'
import { Grid } from './lib/mui';
import Footer2 from "./components/footer-2";
import Footer1 from "./components/footer-1";
import MenuBar from "./components/menu-bar";
import ContainerTitle from './components/landing/container-title';
import ContainerHowTo from './components/landing/container-how-to';
import ContainerFeature from './components/landing/container-feature';
import ContainerFAQ from './components/landing/container-faq';

export default function Landing() {
  return (
    <main className={stylesMain.main}>
      <Grid container>
        <MenuBar />
      </Grid>

      <ContainerTitle />
      <ContainerHowTo />
      <ContainerFeature />
      <ContainerFAQ />

      <Grid
        container
      >
        <Footer1 />
        <Footer2 />
      </Grid>
    </main>
  )
}


const styles = {
  card: {
    padding: "1rem",
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    borderRadius: "var(--border-radius)",
  }, 
  containerTitle: {
    backgroundColor: '#0F1017',
    minHeight: '30rem',
    color: '#fff',
    padding: '0 1rem',
    textAlign: 'center',
  }, 
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
  },
  text: {
    fontSize: '1rem',
    fontWeight: 'normal',
    margin: '0',
    padding: '0',
    color: '#CFCFD1'
  },
  spacing: {
    marginBottom: '1rem',
  }
};
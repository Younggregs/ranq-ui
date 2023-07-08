import Image from 'next/image'
import Link from 'next/link'
import { Grid } from '../lib/mui'
import { East } from '@mui/icons-material'
import { text } from 'stream/consumers'

export default function CustomButton(
    {color, textColor='#fff', border, width='20rem', title, Icon}: 
    {
        color?: string,
        textColor?: string, 
        border?: string, 
        width?: string,
        title: string, 
        Icon?: any
    }) {
    return (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ m:2, width: width, backgroundColor: color, border: border, color: textColor}}
            style={styles.card}
          >
              <h3 style={styles.title}>
                  {title}
              </h3>
              {Icon && Icon}
          </Grid>
    )
}

const styles = {
    card: {
        padding: "1rem",
        borderRadius: "var(--border-radius)",
        cursor: 'pointer',
    },
    title: {
        padding: '0 1rem 0 0',
    } 
}
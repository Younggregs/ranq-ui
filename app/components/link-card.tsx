"use client";
import * as React from "react";
import { cardWidth } from "../lib/constants";
import { Button, Grid, Typography } from "../lib/mui";
import copy from "copy-to-clipboard";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
  } from "react-share";
import { uiUrl } from "../lib/constants";

export default function LinkCard({type, token, title}: {type: string, token: string, title: string}) {
    const [copied, setCopied] = React.useState(false);   
    const link = `${uiUrl}/${token}`

    const copyLink = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
        copy(link)
    }

    // abbreviate text if too long
    const abbreviate = (text: string) => {
        if (text.length > 25) {
            return text.slice(0, 25) + '...'
        }   
        return text
    }


    return (
        <Grid
            container
            direction="column"
            sx={{ m: 2, width: cardWidth}}
            style={styles.card}
        >
       {type.toLowerCase() === 'private' ? (
           <div>
               <p style={styles.title}>Links Sent!</p>
               <p style={styles.text}>Voting links have been sent to each voter email</p>
           </div>
       ): (
           <Grid>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <p style={styles.title}>Share Poll</p>
                    <Grid style={styles.line} />
                </Grid>
               
               <Grid  
                   container
                   direction="row" 
                   justifyContent={"space-between"} 
                   style={{marginTop: '1rem', marginBottom: '1rem', padding: 2}}         
               >
                   <TwitterShareButton
                       url={link}
                       title={title}
                   >
                       <TwitterIcon size={32} round={true} />
                   </TwitterShareButton>
                   <FacebookShareButton
                       url={link}
                       title={title}
                   >
                       <FacebookIcon size={32} round={true} />
                   </FacebookShareButton>
                   <WhatsappShareButton
                       url={link}
                       title={title}
                   >
                       <WhatsappIcon size={32} round={true} />
                   </WhatsappShareButton>
                   <LinkedinShareButton
                       url={link}
                       title={title}
                   >
                       <LinkedinIcon size={32} round={true} />
                   </LinkedinShareButton>
                   <TelegramShareButton
                       url={link}
                       title={title}
                   >
                       <TelegramIcon size={32} round={true} />
                   </TelegramShareButton>
               </Grid>

               <Grid style={styles.line} />
               <Grid  
                   container
                   direction="row"
               >
                   <Grid 
                        container
                        direction="row"
                        alignItems="center"
                        style={styles.linkField}
                        item 
                        xs={9}
                    >
                       <p style={styles.text}>
                          {abbreviate(link)}
                       </p>
                   </Grid>

                    <Grid
                        container
                        item 
                        xs={3}
                    >
                        <Button  
                                variant="contained" 
                                color="primary" 
                                style={{margin: 2, color: '#000', backgroundColor: '#fff'}}
                                onClick={() => copyLink()}
                        >
                            {!copied ? 'Copy' : 'Copied' }  
                        </Button>
                    </Grid>
               </Grid>

           </Grid>
           
       )}
   </Grid>
    )

}

const styles = {
    input: {
      backgroundColor: "#fff",
    },
    card: {
      border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
      borderRadius: "var(--border-radius)",
    }, 
    linkField: {
        padding: 2,
    },
    title: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#505050',
        margin: '1rem',
    },
    text: {
        fontSize: '1rem',
        color: '#505050',
        },
    line: {
        width: '100%',
        height: '1px',
        backgroundColor: '#D4D4D8',
     },
};
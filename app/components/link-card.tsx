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

export default function LinkCard({type, id}: {type: string, id: string}) {
    const [copied, setCopied] = React.useState(false);   
    const link = `${uiUrl}/rank?id=${id}`

    const copyLink = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
        copy(link)
    }
    return (
        <Grid
        container
        direction="column"
        sx={{ m: 2, width: cardWidth }}
        style={styles.card}
   >
       {type === 'private' ? (
           <div>
               <h4>Links Sent!</h4>
               <p>Voting links have been sent to each voter email</p>
           </div>
       ): (
           <div>
               <h4>Share vote link with voters</h4>
               <Grid  
                   container
                   direction="row" 
                   style={styles.linkCard}  
                   justifyContent={"space-between"} 
                   
               >
                   <div style={styles.linkField}>
                       <Typography variant="body2" color="text.secondary">
                          {link}
                       </Typography>
                   </div>
                   <Button  
                       variant="contained" 
                       color="primary" 
                       onClick={() => copyLink()}
                   >
                       {!copied ? 'Copy' : 'Copied' }  
                   </Button>
               </Grid>
               <Grid  
                   container
                   direction="row" 
                   justifyContent={"space-between"} 
                   style={{marginTop: 5}}         
               >
                   <TwitterShareButton
                       url={link}
                       title="Vote for your favourite musician"
                   >
                       <TwitterIcon size={32} round={true} />
                   </TwitterShareButton>
                   <FacebookShareButton
                       url={link}
                       title="Vote for your favourite musician"
                   >
                       <FacebookIcon size={32} round={true} />
                   </FacebookShareButton>
                   <WhatsappShareButton
                       url={link}
                       title="Vote for your favourite musician"
                   >
                       <WhatsappIcon size={32} round={true} />
                   </WhatsappShareButton>
                   <LinkedinShareButton
                       url={link}
                       title="Vote for your favourite musician"
                   >
                       <LinkedinIcon size={32} round={true} />
                   </LinkedinShareButton>
                   <TelegramShareButton
                       url={link}
                       title="Vote for your favourite musician"
                   >
                       <TelegramIcon size={32} round={true} />
                   </TelegramShareButton>
               </Grid>

           </div>
           
       )}
   </Grid>
    )

}

const styles = {
    input: {
      backgroundColor: "#fff",
    },
    card: {
      padding: "1rem",
      border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
      borderRadius: "var(--border-radius)",
    },
   linkCard: {
      border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
      marginTop: 5,
   }, 
   linkField: {
      padding: 2,
   }
  };
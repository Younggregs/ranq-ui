"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  Grid,
  Button,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "../lib/mui";
import ActivityIndicator from "../components/activity-indicator";
import { useRouter, useSearchParams } from 'next/navigation'
import { cardWidth } from "../lib/constants";
import { useMutation, cacheExchange, fetchExchange, } from 'urql';
import { CREATE_POLL }from "../utils/mutations";
import bgColor from "../lib/random-color";

export default function Preview({data}: {data: any}) {
    // data = {
    //     title: 'title',
    //     description: 'description',
    //     contestants: 'contestants1, contestant2, contestant3',
    //     type: 'type',
    //     voters: 'voter1, voter2, voter3',
    //     duration: '0:1:3',
    //     durationS: 500
    // }
    const [createPollResult, createPoll] = useMutation(CREATE_POLL);
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);

    const title = searchParams?.get('title')
    const description = searchParams?.get('description')
    const contestants = data?.contestants.split(',').map((c: any) => c.trim())
    const type = searchParams?.get('type')
    const voters = data?.voters.split(',').map((c: any) => c.trim())
    const duration = data?.duration.split(':').map((c: any) => c.trim())
    const durationS = searchParams?.get('durationS')

    const submit = () => {
        setIsLoading(true);
        
        const data_ = {
            title: data.title,
            description: data.description,
            contestants,
            type: data.type,
            voters,
            duration: data.duration,
            durationS: parseInt(data.durationS || '600'),
        }
        
        createPoll(data_).then(result => {
          setIsLoading(false);
            if (result.error) {
              console.error('Oh no!', result.error);
            }
            console.log('result', result);
            router.push(`/poll?id=${result.data.createPoll.poll.token}`)
          });
        
        
    }

  return (
    <main className={stylesMain.main}>
      <Grid
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >

            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <p style={styles.title}>Poll Preview</p>
            </Grid>
            <Grid style={styles.line} />
        <Grid
             container
             direction="column"
             sx={styles.textBox}
             style={styles.card}
        >
            <p style={styles.label}>Poll Title</p>
            <p style={styles.text}>{data.title}</p>
        </Grid>
        <Grid
             container
             direction="column"
             sx={styles.textBox}
             style={styles.card}
        >
            <p style={styles.label}>Description</p>
            <p style={styles.text}>{data.description}</p>
        </Grid>
        <Grid
             container
             direction="column"
             sx={styles.textBox}
             style={styles.card}
        >
            <p style={styles.label}>Poll Type</p>
            <p style={styles.text}>{data.type.toUpperCase()}</p>
        </Grid>
        <Grid
             container
             direction="column"
             sx={styles.textBox}
             style={styles.card}
        >
            <p style={styles.label}>Contestants ({contestants.length})</p>
            <List>
                {contestants.map((c: any) => ( 
                    <ListItem key={c}>
                        <ListItemIcon>
                            <Grid 
                                style={{ 
                                      height: '10px', 
                                      width: '10px',
                                      borderRadius: '50%',
                                      backgroundColor: bgColor(),
                                    }} 
                              />
                        </ListItemIcon>
                        <ListItemText
                            primary={c}
                        />
                    </ListItem>
                ))}
            </List>
        </Grid>
        {data.type === 'private' && (
            <Grid
                    container
                    direction="column"
                    sx={styles.textBox}
                    style={styles.card}
            >
                <p style={styles.label}>Voters ({voters.length})</p>
                <List>
                    {voters.map((c: any) => ( 
                        <ListItem key={c}>
                            <ListItemIcon>
                                <Grid 
                                    style={{ 
                                        height: '10px', 
                                        width: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: bgColor(),
                                        }} 
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={c}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        )}
        <Grid
             container
             direction="column"
             sx={styles.textBox}
             style={styles.card}
        >
            <p style={styles.label}>Duration</p>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid
                    style={styles.durationBox}
                    alignItems="center"
                    justifyContent="center"
                    container
                >
                    {duration[0] || 0}d
                </Grid>
                <Grid
                    style={styles.durationBox}
                    alignItems="center"
                    justifyContent="center"
                    container
                >
                    {duration[1] || 0}h
                </Grid>
                <Grid
                    style={styles.durationBox}
                    alignItems="center"
                    justifyContent="center"
                    container
                >
                    {duration[2] || 0}m
                </Grid>
            </Grid>
        </Grid>
        <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={styles.textBox} 
            >
        {isLoading ? (
            <ActivityIndicator />
        ): (
        <Button 
            sx={styles.button} 
            variant="contained"
            onClick={submit}
        >
            Create Poll
        </Button>
        )}
       </Grid>
      </Grid>
      </Grid>
      <div>
        <p>Terms and Conditions apply</p>
      </div>
    </main>
  );
}



const styles = {
    input: {
        backgroundColor: "#fff",
    },
    card: {
        padding: "1rem",
    },
    button: {
        width: '20rem', 
        backgroundColor: '#E14817',
        borderRadius: 'var(--border-radius)',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#000',
        margin: '1rem',
    },
    line: {
        width: '100%',
        height: '2px',
        backgroundColor: '#D4D4D8',
        marginTop: '1rem',
        marginBottom: '1rem'
     },
     label: {
        fontSize: "1rem",
        fontWeight: "bold",
    },
    text: {
        color: "#697077",
    },
    textBox: {
        width: cardWidth,
    },
    durationBox: {
        border: '0.5px solid #697077',
        color: '#697077',
        borderRadius: '.5rem',
        height: '3rem',
        width: '3rem',

    },
};
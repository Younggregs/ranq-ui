"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "../lib/mui";
import { Folder, ContactPage, VisibilityOff, HowToVote } from "../lib/mui-icon";
import Link from 'next/link'
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { useRouter, useSearchParams } from 'next/navigation'
import { cardWidth } from "../lib/constants";

export default function Preview() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);

    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const contestants = searchParams.get('contestants')?.split(',').map((c) => c.trim())
    const type = searchParams.get('type')
    const voters = searchParams.get('voters')?.split(',').map((c) => c.trim())
    const duration = searchParams.get('duration')

    const submit = () => {
        setIsLoading(true);
        const data = {
            title,
            description,
            contestants,
            type,
            voters,
            duration,
        }
        console.log('data', data)
        router.push('/poll')
        setIsLoading(false);
    }

  return (
    <main className={stylesMain.main}>
      <Title />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
            <FormHeader header="Preview" />
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Title</h4>
            {title}
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Description</h4>
            {description}
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Contestants ({contestants?.length})</h4>
            <List>
                {contestants?.map((c) => ( 
                    <ListItem key={c}>
                        <ListItemIcon>
                            <ContactPage />
                        </ListItemIcon>
                        <ListItemText
                            primary={c}
                        />
                    </ListItem>
                ))}
            </List>
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Poll Type</h4>
            {type?.toUpperCase()}
        </Grid>
        {searchParams.get('type') === 'private' && (
            <Grid
                    container
                    direction="column"
                    sx={{ m: 2, width: cardWidth }}
                    style={styles.card}
            >
                <h4>Voters ({voters?.length})</h4>
                <List>
                    {voters?.map((c) => ( 
                        <ListItem key={c}>
                            <ListItemIcon>
                                <HowToVote />
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
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Duration</h4>
            {duration?.toUpperCase()}
        </Grid>
        {isLoading ? (
            <ActivityIndicator />
        ): (
        <Button 
            sx={{ m: 2, width: cardWidth }} 
            variant="contained"
            onClick={submit}
        >
            Create Poll
        </Button>
        )}
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
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    borderRadius: "var(--border-radius)",
  }
};
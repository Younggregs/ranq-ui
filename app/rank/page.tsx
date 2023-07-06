"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  Grid,
  Button,
} from "../lib/mui";
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { cardWidth } from "../lib/constants";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useQuery, useMutation } from 'urql';
import { useRouter, useSearchParams } from 'next/navigation'
import { FETCH_POLL_BY_ID, FETCH_RANK_POLL, VOTER_STATUS }from "../utils/queries";
import { CREATE_VOTE }from "../utils/mutations";
import Link from "next/link";
import Footer1 from "../components/footer-1";
import Footer2 from "../components/footer-2";
import MenuBar from "../components/menu-bar";
import { KeyboardArrowRight, Margin, StayPrimaryLandscapeSharp } from "@mui/icons-material";
import RankHeader from "../components/rank/header";
import Icon from "../components/icons";
import bgColor from "../lib/random-color";

export default function Rank() {   
    const [createVoteResult, createVote] = useMutation(CREATE_VOTE);
    const [isLoading, setIsLoading] = React.useState(false);
    const [ranked, setRanked] = React.useState([]);
    const [voted, setVoted] = React.useState(false);
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams?.get('token')
    console.log('id', token)

    const [res_status] = useQuery({query: VOTER_STATUS, variables: {token}});
    const { data: data_, fetching: fetching_, error: error_ } = res_status;
    console.log('data_', data_)

    const [res_rank_poll] = useQuery({query: FETCH_POLL_BY_ID, variables: {id: token}});
    const { data, fetching, error } = res_rank_poll;
    console.log('data', data)

    React.useEffect(() => {
        if (data?.pollById?.contestants)
          setRanked(data?.pollById.contestants);
    }, [data]);

    // Function to update list on drop
    const handleDrop = (droppedItem: any) => {
      // Ignore drop outside droppable container
      if (!droppedItem.destination) return;
      var updatedList = [...ranked];
      // Remove dragged item
      const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
      // Add dropped item
      updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
      // Update State
      setRanked(updatedList);
    };

    const submit = () => {
      setIsLoading(true);
      const data_ = {
        id: data?.pollById.id,
        ranked,
      }
      createVote(data_).then(result => {
        setIsLoading(false);
        if (result.error) {
          console.error('Oh no!', result.error);
        }else{
          console.log('result', result);
        }
        setVoted(true);
      });
    }

    const redirectToSigin = () => {
      router.push(`/verify-email?token=${token}`)
    }

  return (
    <main className={stylesMain.main}>
      <Grid container>
        <MenuBar />
      </Grid>

      <Grid
        style={styles.titleContainer}
      >
        <Grid 
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          style={styles.titleCard}
        >
            <p style={styles.title2}>Poll</p>
            <KeyboardArrowRight />
            <p style={styles.text}>{data_?.voterStatus.title}</p>
        </Grid>
      </Grid>

      

     {voted ?(
      <Grid
        justifyContent="center"
        alignItems="center"
      >
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>You have voted!</h4>
            <p>Your vote has been recorded successfully, thank you.</p>
            <p>Follow the result
                <Link href={`/result?token=${token}`}>
                  <span style={{color: '#0000ff', padding: 2}}><b>here</b></span>
                </Link>
            </p>
        </Grid>
      </Grid>
     ) : (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
        
        {fetching || fetching_ && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <ActivityIndicator />
          </Grid>
        )}

        {!fetching_ && !fetching && !data_?.voterStatus.isValid && (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
                <h2>Wrong Turn</h2>
                <p>This link is invalid</p>
            </Grid>
          )}

          {!fetching_ && !fetching && data_?.voterStatus.isValid && !data_?.voterStatus.isLoggedIn && (
            redirectToSigin()
          )}

          {!fetching && !fetching_ && data_?.voterStatus.isValid && data_?.voterStatus.pollStatus === 'completed' && data_?.voterStatus.isLoggedIn && (
            <Grid 
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
                <h2>Hello, Poll has ended.</h2>
                <p>Voting has ended on this poll</p>
                <p>Title: {data_?.voterStatus.title} </p>
                <p>Check the result
                  <Link href={`/result?token=${token}`}>
                    <span style={{color: '#0000ff', padding: 2}}><b>here</b></span>
                  </Link>
                </p>
            </Grid>
          )}

          {!fetching && !fetching_ && data_?.voterStatus.isValid && data_?.voterStatus.voted && data_?.voterStatus.pollStatus !== 'completed' && data_?.voterStatus.isLoggedIn && (
            <Grid 
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
                <h2>Hello {data_?.voterStatus.name}, You have voted</h2>
                <p>Title: {data_?.voterStatus?.title} </p>
                <p>Check the result
                  <Link href={`/result?token=${token}`}>
                    <span style={{color: '#0000ff', padding: 2}}><b>here</b></span>
                  </Link>
                </p>
            </Grid>
          )}

        {!fetching && !fetching_ && data_?.voterStatus.isValid && data_?.voterStatus.pollStatus !== 'completed' && !data_?.voterStatus.voted && data_?.voterStatus.isLoggedIn && (
          <Grid
            container
          >
            <RankHeader data={data}/>
          <Grid
              container
              direction="row"
              justifyContent="space-between"
              sx={{ width: '100%' }}
              style={styles.card}
          >
              <p style={styles.title2}>Contestants</p>
              <Grid>
                {isLoading ? (
                  <ActivityIndicator />
                ): (
                  <Button 
                    sx={styles.button} 
                    variant="contained"
                    onClick={() => submit()}
                >
                    Submit
                </Button>
                )}
              </Grid>
          </Grid>
          <Grid
            container
            direction="column"
          >
              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Grid sx={styles.listContainer}>
                    {ranked.map((item: any, index: any) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <Grid 
                              style={styles.itemContainer} 
                              sx={{backgroundColor: bgColor()}}
                            >
                              <p>{item.toUpperCase()}</p>
                              <Icon name="drag" />
                            </Grid>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    </Grid>
                  </div>
                )}
                </Droppable>
              </DragDropContext>
          </Grid>
          </Grid>
        )}
        
      </Grid>
      </Grid>
      )}
      <Grid
        container
      >
        <Footer1 />
        <Footer2 />
      </Grid>
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
  rankCard: {
    margin: "1rem",
    backgroundColor: "#fff",
  },
 linkCard: {
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    marginTop: 5,
 }, 
 linkField: {
    padding: 2,
 },
 listContainer: {
    display: "flex",
    fontSize: 18,
    backgroundColor: "#fff",
    flexDirection: "column",
    borderRadius: '5px',
    padding: '1rem',
    width: '100%',
    marginBottom: '1rem',
  },
  itemContainer: {
    color: "#fff",
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    borderRadius: '.5rem',
    padding: '1rem',
    margin: '1rem',
    height: '5rem',
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000',
    margin: '0',
    padding: '0',
  },
  title2: {
    fontSize: '1.5rem',
    color: '#000',
    margin: '0',
    padding: '0',
  },
  text: {
    fontSize: '1rem',
    fontWeight: 'normal',
    margin: '0',
    padding: '0',
    color: '#000'
  },
  titleCard: {
    padding: '2rem',
    backgroundColor: '#fff',
  },
  titleContainer: {
    backgroundColor: '#D4D4D8',
    minHeight: '5vh',
    width: '100%',
  },
  titleContainer1: {
    backgroundColor: '#D4D4D8',
    minHeight: '15vh',
    width: '100%',
    padding: '2rem',
  },
   coloredText: {
    color: "#E14817",
    fontSize: '1rem',
  },
  coloredBox: {
    backgroundColor: "#fff",
    height: '2rem',
    borderRadius: '0.5rem',
  },
  spacing: {
    marginTop: '2rem',
  },
  button: {
    width: '10rem', 
    backgroundColor: '#E14817',
    borderRadius: 'var(--border-radius)',
}
};
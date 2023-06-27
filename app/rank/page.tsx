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
import { FETCH_RANK_POLL, VOTER_STATUS }from "../utils/queries";
import { CREATE_VOTE }from "../utils/mutations";
import Link from "next/link";

export default function Rank() {   
    const [createVoteResult, createVote] = useMutation(CREATE_VOTE);
    const [isLoading, setIsLoading] = React.useState(false);
    const [ranked, setRanked] = React.useState([]);
    const [voted, setVoted] = React.useState(false);
    const [pollToken, setPollToken] = React.useState('');
    const searchParams = useSearchParams()
    const token = searchParams?.get('token')
    console.log('id', token)

    const [res_status] = useQuery({query: VOTER_STATUS, variables: {token}});
    const { data: data_, fetching: fetching_, error: error_ } = res_status;
    console.log('data_', data_)

    const [res_rank_poll] = useQuery({query: FETCH_RANK_POLL, variables: {token}});
    const { data, fetching, error } = res_rank_poll;
    console.log('data', data)

    React.useEffect(() => {
        if (data?.fetchRankPoll?.contestants)
          setRanked(data?.fetchRankPoll.contestants);
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
        id: token,
        ranked,
      }
      createVote(data_).then(result => {
        setIsLoading(false);
        if (result.error) {
          console.error('Oh no!', result.error);
        }else{
          setPollToken(result.data.createVote.poll.token);
          console.log('result', result);
        }
        setVoted(true);
      });
      
    }

  return (
    <main className={stylesMain.main}>
      <Title />

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
                <Link href={`/result?token=${pollToken}`}>
                  <span style={{color: '#0000ff', padding: 2}}><b>here</b></span>
                </Link>
            </p>
        </Grid>
      </Grid>
     ) : (
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
        <Grid>
            <FormHeader header="Rank contestants" />
        </Grid>
        
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

          {!fetching && !fetching_ && data_?.voterStatus.isValid && data_?.voterStatus.pollStatus === 'completed' && (
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
                  <Link href={`/result?token=${data_?.voterStatus?.token}`}>
                    <span style={{color: '#0000ff', padding: 2}}><b>here</b></span>
                  </Link>
                </p>
            </Grid>
          )}

          {!fetching && !fetching_ && data_?.voterStatus.isValid && data_?.voterStatus.voted && data_?.voterStatus.pollStatus !== 'completed' && (
            <Grid 
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
                <h2>Hello, This voting link has been used.</h2>
                <p>Title: {data_?.voterStatus?.title} </p>
                <p>Check the result
                  <Link href={`/result?token=${data_?.voterStatus?.token}`}>
                    <span style={{color: '#0000ff', padding: 2}}><b>here</b></span>
                  </Link>
                </p>
            </Grid>
          )}

        {!fetching && !fetching_ && data_?.voterStatus.isValid && data_?.voterStatus.pollStatus !== 'completed' && !data_?.voterStatus.voted && (
          <Grid>
          <Grid
              container
              direction="column"
              sx={{ m: 2, width: cardWidth }}
              style={styles.card}
          >
              <h4>{data?.fetchRankPoll.title}</h4>
              {data?.fetchRankPoll.description}
          </Grid>
          <Grid
              container
              direction="column"
              sx={{ m: 2, width: cardWidth }}
              style={styles.card}
          >
              <h4>
                Vote Below! Contestants ({data?.fetchRankPoll.contestants.length})
              </h4>
              <p>Drag and drop contestants from highest to lowest</p>
          </Grid>
          <Grid
              container
              direction="column"
              sx={{ m: 2, width: cardWidth }}
              style={styles.card}
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
                            <Grid style={styles.itemContainer}>
                              {item}
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
          <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ m: 1, width: cardWidth }} 
            >
          {isLoading ? (
            <ActivityIndicator />
            ): (
            <Button 
                sx={{ m: 2, width: "30ch" }} 
                variant="contained"
                onClick={() => submit()}
            >
                Submit
            </Button>
            )}
            </Grid>
          </Grid>
        )}
        
      </Grid>
      </Grid>
      )}
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
    backgroundColor: "#000",
    flexDirection: "column",
    padding: 2
  },
  itemContainer: {
    backgroundColor: "#fff",
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    padding: 2,
    margin: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
};
"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  Grid,
  Button,
  ListItemText,
} from "../lib/mui";
import { Folder, ContactPage, VisibilityOff, HowToVote } from "../lib/mui-icon";
import copy from 'copy-to-clipboard';
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { useSearchParams } from 'next/navigation'
import { cardWidth } from "../lib/constants";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

  const data = {
    title: "Best Musician 2023",
    description: "Rate by trend, quality, lyrics, rhythm and dept",
    contestants: [
        "Davido",
        "Asake",
        "Seyi Vibes",
        "Young Jonn",
        "Wande Coal"
    ],
    type: "public",
    voters: [
        "dretzam@gmail.com",
        "ret@red.com",
        "doll@gmail.com",
        "drape@gmail.com"
    ],
    duration: "1:15:15"
}
export default function Rank() {   
    const [pollStatus, setPollStatus] = React.useState('ongoing');
    const [isLoading, setIsLoading] = React.useState(false);
    const [rankedList, setRankedList] = React.useState(data.contestants);
    const [voted, setVoted] = React.useState(false);

        // Function to update list on drop
    const handleDrop = (droppedItem) => {
      // Ignore drop outside droppable container
      if (!droppedItem.destination) return;
      var updatedList = [...rankedList];
      // Remove dragged item
      const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
      // Add dropped item
      updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
      // Update State
      setRankedList(updatedList);
    };

    const submit = () => {
      console.log("submit");
      setIsLoading(true);
      setVoted(true);
      setIsLoading(false);
    }

    console.log('rankedList', rankedList)

  return (
    <main className={stylesMain.main}>
      <Title />

     {voted ?(
      <Grid
        container
        direction="column"
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
        </Grid>
      </Grid>
     ) : (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
            <FormHeader header="Rank contestants" />
        </Grid>
        
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>{data.title}</h4>
            {data.description}
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Vote Below! Contestants ({data.contestants?.length})</h4>
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
                  style={styles.listContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {rankedList.map((item, index) => (
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
                </div>
              )}
              </Droppable>
            </DragDropContext>
        </Grid>
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
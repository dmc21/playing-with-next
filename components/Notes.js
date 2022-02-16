import { Card, Grid, Text, Switch, Button } from "@nextui-org/react";
import { Delete } from 'react-iconly';
import firebase from '../services/auth';

export default function Notes(props) {


    const removeNote = (note) => {

        firebase.firestore().collection("notes").doc(note.path).delete().then(r => {
            console.log("Removed")
        })

    }
    const updateChecked = (note) => {
        firebase.firestore().collection("notes").doc(note.path).set({
            isDone: !note.data.isDone
        }, { merge: true }).then(res => {
            console.log("updated!")
        })
    }

    return (
        <Grid md={8} xs={12} direction="column" css={{
            display: "flex",
            gap: "10px",

        }}>

            {props.notes.map((note, i) => {

                return (
                    <Card key={`note-${i}`} css={{ overflow: "hidden" }}>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between', gap: "20px" }}>
                            <Text h3 size={14}>
                                {note.data.title}
                            </Text>
                            <Button onClick={() => removeNote(note)} auto icon={<Delete fill="currentColor" />} color="error" flat></Button>
                        </Card.Header>
                        <Card.Body>
                            <Text >
                                {note.data.description}
                            </Text>
                        </Card.Body>
                        <Card.Footer css={{ justifyContent: "flex-end" }}>
                            <Grid css={{ padding: 0 }}>
                                <Switch size="sm" onChange={() => updateChecked(note)} color="success" checked={note.data.isDone} />
                            </Grid>
                        </Card.Footer>
                    </Card>
                )

            })}


        </Grid>
    )

}
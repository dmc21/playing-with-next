import { Card, Grid, Text, Switch, Input, Row, Button, Textarea, Avatar, Divider, Loading } from "@nextui-org/react";
import { useState, useMemo, useEffect } from "react";
import firebase from '../../services/auth';
import { useRouter } from 'next/router';
import { useInput } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTheme as useNextTheme } from 'next-themes'

export default function Notes(props) {

    const router = useRouter();
    const { setTheme } = useNextTheme();
    setTheme("dark");
    const [user, loading, error] = useAuthState(firebase.auth());
    const [notes, setNotes] = useState([
        {
            title: "Note 1",
            description: "Note description",
            isDone: false
        },
        {
            title: "Note 2",
            description: "Note description",
            isDone: false
        },
        {
            title: "Note 3",
            description: "Note description",
            isDone: false
        },
        {
            title: "Note 4",
            description: "Note description",
            isDone: false
        }
    ]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")

    useEffect(() => {
        console.log(user);
        if (!loading && !user)
            router.push('/')
    }, [user, loading])



    const onCreateNote = (event) => {
        event.preventDefault();

        const note = {
            title: event.target.title.value,
            description: event.target.description.value,
            isDone: false
        }

        if (note.title.trim() === "" || note.description.trim() === "")
            return false

        notes.push(note);

        setNotes([...notes]);

        event.target.title.value = ""
        event.target.description.value = ""

    }

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            router.push("/")
        })
    }


    return (

        <Grid.Container gap={2} justify="center">

            <Grid md={4}>
                <Card>
                    {loading ? <Loading /> : <Card.Header css={{ justifyContent: "space-between" }}>
                        <Grid css={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: '10px',
                            alignItems: "center"
                        }}>
                            <Avatar size="md" src={user?.photoURL || ''} color="primary" bordered />
                            <Text>
                                {user?.displayName || ''}
                            </Text>
                        </Grid>

                        <Button shadow color="secondary" auto onClick={() => signOut()}>Logout</Button>
                    </Card.Header>}

                    <Divider />
                    <Card.Body>
                        <form onSubmit={(e) => onCreateNote(e)}>
                            <Card.Body justify="center">
                                <Grid>
                                    <Input
                                        clearable
                                        shadow={false}
                                        type="text"
                                        name="title"
                                        label="Title"
                                        placeholder="Default title">

                                    </Input>
                                </Grid>
                                <Grid>
                                    <Textarea
                                        fullWidth={true}
                                        clearable
                                        shadow={false}
                                        name="description"
                                        label="Description"
                                        placeholder="Default description"

                                    />
                                </Grid>
                            </Card.Body>

                            <Card.Footer justify="center">
                                <Row justify='center'>
                                    <Button type="submit" shadow color="success" auto>
                                        Create
                                    </Button>
                                </Row>
                            </Card.Footer>
                        </form>
                    </Card.Body>
                </Card>
            </Grid>

            <Grid md={8} direction="column" css={{
                display: "flex",
                gap: "10px"
            }}>


                {notes.map((note, i) => {

                    return (
                        <Card key={`note-${i}`} css={{ overflow: "hidden" }}>
                            <Card.Header>
                                <Text h3 size={14}>
                                    {note.title}
                                </Text>
                            </Card.Header>
                            <Card.Body>
                                <Text >
                                    {note.description}
                                </Text>
                            </Card.Body>
                            <Card.Footer css={{ justifyContent: "flex-end" }}>
                                <Grid css={{ padding: 0 }}>
                                    <Switch size="sm" color="success" checked={note.isDone} />
                                </Grid>
                            </Card.Footer>
                        </Card>
                    )

                })}


            </Grid>
        </Grid.Container>
    )
}

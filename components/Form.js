import { Card, Grid, Text, Input, Row, Button, Textarea, Avatar, Divider, Loading } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Form(props) {

    const signOut = () => {
        props.firebase.auth().signOut().then(() => {
            router.push("/")
        })
    }

    const onCreateNote = (event) => {
        event.preventDefault();

        const note = {
            githubId: props.user.uid,
            title: event.target.title.value,
            description: event.target.description.value,
            isDone: false
        }

        if (note.title.trim() === "" || note.description.trim() === "")
            return false

        props.firebase.firestore().collection("notes").add(note).then(function (doc) {
            console.log("added!")
        }).catch(function (error) {
            console.log(`Error ${error}`)
        });

        toast("Note successfully added")

        event.target.title.value = ""
        event.target.description.value = ""

    }

    return (
        <Grid md={4} xs={12}>
            <ToastContainer />
            <Card>
                {props.loading ? <Loading /> : <Card.Header css={{ justifyContent: "space-between" }}>
                    <Grid css={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '10px',
                        alignItems: "center"
                    }}>
                        <Avatar size="md" src={props.user?.photoURL || ''} color="primary" bordered />
                        <Text>
                            {props.user?.displayName || ''}
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
    )

}
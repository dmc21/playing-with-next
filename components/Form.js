import { Card, Grid, Text, Input, Row, Button, Textarea, Avatar, Divider, Loading } from "@nextui-org/react";

import {useFormik} from 'formik';
import { useState } from "react";

export default function Form(props) {

    const [titleHelper, setTitleHelper] = useState({
        helperText:"",
        helperColor: ""
    })

    const [descriptionHelper, setDescriptionHelper] = useState({
        helperText:"",
        helperColor: ""
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },

        onChange: event => {
            console.log(event);
        },

        onSubmit: v => {
            onCreateNote();
        },
    })


    const validateTitle = () => {
        if (formik.values.title.trim() === ""){
            setTitleHelper({
                helperText: "Title is required",
                helperColor: "error"
            })

            return false;
        }

        setTitleHelper({
            helperText: "This is a good title!",
            helperColor: "success"
        })

        return true
    }

    const validateDescription = () => {
    
        if (formik.values.description.trim() === ""){
            setDescriptionHelper({
                helperText: "Description is required",
                helperColor: "error"
            })

            return false
        }

        setDescriptionHelper({
            helperText: "This is a good description!",
            helperColor: "success"
        })

        return true

    }

    const signOut = () => {
        props.firebase.auth().signOut().then(() => {
            router.push("/")
        })
    }

    const onCreateNote = () => {

        const note = {
            githubId: props.user.uid,
            title: formik.values.title,
            description: formik.values.description,
            isDone: false
        }

        if (note.title.trim() === "" || note.description.trim() === "")
            return false

        props.firebase.firestore().collection("notes").add(note).then(function (doc) {
            console.log("added!")
        }).catch(function (error) {
            console.log(`Error ${error}`)
        });

        formik.resetForm()

        setTitleHelper({
            helperColor: "",
            helperText: ""
        })
        setDescriptionHelper({
            helperColor: "",
            helperText: ""
        })

    }

    return (
        <Grid md={4} xs={12}>
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
                    <form onSubmit={formik.handleSubmit}>
                        <Card.Body justify="center">
                            <Grid>
                                <Input
                                    clearable
                                    shadow={false}
                                    type="text"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    helperText={titleHelper.helperText}
                                    helperColor={titleHelper.helperColor}
                                    onKeyUp={() => validateTitle()}
                                    name="title"
                                    label="Title"
                                    placeholder="Default title">

                                </Input>
                            </Grid>
                            <Grid>
                                <Textarea
                                    fullWidth={true}
                                    shadow={true}
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    helperText={descriptionHelper.helperText}
                                    helperColor={descriptionHelper.helperColor}
                                    onKeyUp={() => validateDescription()}
                                    name="description"
                                    label="Description"
                                    placeholder="Default description"
                                />
                            </Grid>
                        </Card.Body>

                        <Card.Footer justify="center">
                            <Row justify='center'>
                                <Button 
                                disabled={formik.values.title.trim() === "" || formik.values.description.trim() === ""} 
                                type="submit" 
                                shadow={formik.values.title.trim() !== "" && formik.values.description.trim() !== ""} 
                                color="success" 
                                auto>
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
import { Grid } from "@nextui-org/react";
import { useState, useEffect } from "react";
import firebase from '../../services/auth';
import { useRouter } from 'next/router';
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import Form from "../../components/Form";
import Notes from "../../components/Notes";

export default function PrivateView() {

    const router = useRouter();
    const [user, loading, error] = useAuthState(firebase.auth());
    const [notes, setNotes] = useState([]);

    const darkTheme = createTheme({
        type: 'dark'
    })

    useEffect(() => {

        if (!loading && !user)
            router.push('/')

        if (user) {

            firebase.firestore().collection("notes").where("githubId", "==", firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
                setNotes(
                    snapshot.docs.map((doc) => {
                        return { data: doc.data(), path: doc.ref.path.split("/")[1] }
                    })
                );
            })
        }

    }, [user, loading])




    return (

        <NextUIProvider theme={darkTheme}>
            <Grid.Container gap={2} justify="center">
                <Form loading={loading} user={user} firebase={firebase}></Form>
                <Notes notes={notes} />
            </Grid.Container>
        </NextUIProvider>


    )
}

import styles from '../styles/App.module.css';
import firebase from '../services/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Row } from '@nextui-org/react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from '@nextui-org/react';
import Image from 'next/image';

// Configure FirebaseUI.
const uiConfig = {
  signInSuccessUrl: "/private",
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
};

export default function App() {

  const router = useRouter();
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (user)
      router.push('/private')
  }, [user])

  return (
    <>

      <div>


        <div className={styles.bgWrap}>
          <Image
            alt="Mountains"
            src="/bg.jpg"
            layout="fill"
            objectFit="cover"
            quality={75}
          />
        </div>


        <Grid.Container gap={2} alignContent="center" justify="center" alignItems='center' css={
          {
            height: "100vh",
          }
        }>
          <Grid>
            <Row justify='center'>
              {loading ? <Loading></Loading> : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
            </Row>
          </Grid>
        </Grid.Container>
      </div>

    </>
  )
}

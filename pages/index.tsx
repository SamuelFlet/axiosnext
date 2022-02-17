/* eslint-disable react/jsx-key */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MainFeaturedPost from "../components/MainFeaturedPost";
import Header from "../components/Header";

const client = new ApolloClient({
  uri: "https://practicedbapp.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const sections = [
  { title: "Home", url: "/" },
  { title: "About", url: "#" },
  { title: "Personal Website", url: "#" },
];


const wowie = gql`
  query {
    allPosts(L: 1) {
      title
      image
    }
  }
`;

function OlderPost() {
  const { loading, error, data } = useQuery(wowie);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allPosts.map(({ title, image }:{title:any, image:any}) => (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Increase the priority of the hero background image */}
      <Image src={image} alt="Alt Text" layout="fill" />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {title}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  ));
}

const Home: NextPage = () => {
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="/styles/kingsgmb.ttf"
            as="font"
            crossOrigin=""
          />
        </Head>

        <main className={styles.main}>
          <Header title="Samuel's Blog" sections={sections} />
          <div className={styles.flexy}>
            <MainFeaturedPost />
            <OlderPost />
          </div>
        </main>
      </div>
    </ApolloProvider>
  );
};

export default Home;

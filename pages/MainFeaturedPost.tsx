/* eslint-disable react/jsx-key */
import * as React from "react";
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
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const mainfeaturedQuery = gql`
  query {
    newPost(N: 1) {
      id
      title
      subtitle
      body
      image
    }
  }
`;

export default function MainFeaturedPost() {
  const { loading, error, data } = useQuery(mainfeaturedQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.newPost.map(({ subtitle, title, body, image }) => (
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
            <Typography variant="h5" color="inherit" paragraph>
              {subtitle}
            </Typography>
            <Link variant="subtitle1" href="#">
              {body}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  ));
}

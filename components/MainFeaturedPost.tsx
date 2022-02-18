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
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
      publishDate
    }
  }
`;

export default function MainFeaturedPost() {
  const { loading, error, data } = useQuery(mainfeaturedQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.newPost.map(({ subtitle, title, publishDate, image }:{title:any, image:any, subtitle:any, publishDate:any}) => (
    <Grid sx={{ p: 2 }}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h1" variant="h1">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {publishDate}
            </Typography>
            <Typography variant="h5" paragraph sx={{ pt: 5 }}>
              {subtitle}
            </Typography>
            <Typography variant="subtitle1" color="primary" sx={{ pt: 5 }}>
              Continue reading...
            </Typography>
          </CardContent>
          <Image src={image} alt="ewnigig" height={400} width={400} />
        </Card>
      </CardActionArea>
    </Grid>
  ));
}

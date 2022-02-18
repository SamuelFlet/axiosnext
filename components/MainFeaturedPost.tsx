/* eslint-disable react/jsx-key */
import * as React from "react";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const mainfeaturedQuery = gql`
  query {
    newPost(N: 1) {
      title
      subtitle
      image
      publishDate
      body
      author {
        username
      }
    }
  }
`;

export default function MainFeaturedPost() {
  const { loading, error, data } = useQuery(mainfeaturedQuery);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.newPost.map(
    ({
      subtitle,
      title,
      publishDate,
      image,
      author,
      body,
    }: {
      title: any;
      image: any;
      subtitle: any;
      publishDate: any;
      author: any;
      body: any;
    }) => (
      <Grid sx={{ p: 2 }}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h1" variant="h1">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {publishDate}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {author.username}
            </Typography>
            <Typography variant="h5" paragraph sx={{ pt: 5 }}>
              {subtitle}
            </Typography>
            <CardActions>
              <Button variant="text" onClick={handleOpen}>
                Learn More
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {title}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {body}
                  </Typography>
                </Box>
              </Modal>
            </CardActions>
          </CardContent>
          <Image src={image} alt="ewnigig" height={400} width={400} />
        </Card>
      </Grid>
    )
  );
}

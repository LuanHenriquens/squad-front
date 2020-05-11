import React, { useEffect, useState } from "react";

import {
  Container,
  Grid,
  InputBase,
  Paper,
  Card,
  Fab,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../layout/header/header";
import CardSquad from "../card-squad/CardSquad.js";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { getAllSquads, getSquadByName } from "../../services/squad.service.js";
import { squadStatusScreenOfCreate } from "../../redux/actions/squadAction"
import CreateSquad from "../create-squad/CreateSquad.js";

export default function Home() {
  const dispatch = useDispatch();

  const [listSquad, setListSquad] = useState([]);
  const [searchSquad, setSearchSquad] = useState();

  const updated = useSelector(store => store.squadReducer.updated);

  useEffect(() => {
    if (searchSquad)
      getSquadByName(searchSquad).then((squadList) => {
        setListSquad(squadList.data);
      });
    else
      getAllSquads().then((squadList) => {
        setListSquad(squadList.data);
      });
  }, [searchSquad, updated]);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    cardContainer: {
      padding: 10,
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Header></Header>
      <Container>
        <br></br>
        <Card className={classes.cardContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Buscar Squad ..."
                  inputProps={{ "aria-label": "Buscar Squad ..." }}
                  onChange={(event) => {
                    setSearchSquad(event.target.value);
                  }}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Fab color="primary" className={classes.fab} aria-label="add" onClick={() => {
              squadStatusScreenOfCreate(dispatch, true);
            }}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid container spacing={2}>
            {listSquad.map((squad) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={squad.id}>
                  <CardSquad squad={squad}></CardSquad>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </Container>

      <CreateSquad></CreateSquad>
    </>
  )
}
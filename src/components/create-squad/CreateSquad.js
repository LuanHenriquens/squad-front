import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Container, TextField, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  squadStatusScreenOfCreate,
  squadUpdatedData,
} from "../../redux/actions/squadAction";
import { useForm } from "react-hook-form";
import { createSquad } from "../../services/squad.service";
import { NotificationManager } from "react-notifications";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function CreateSquad() {
  const dispatch = useDispatch();

  const open = useSelector((store) => {
    return store.squadReducer.squadModal;
  });

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();

  const handleClose = () => {
    squadStatusScreenOfCreate(dispatch, false);
  };

  function onSubmit(form) {
    createSquad(form)
      .then((squad) => {
        NotificationManager.success(
          "Squad criada com sucesso!",
          "Sucesso",
          5000
        );
        squadUpdatedData(dispatch, true);
        handleClose();
      })
      .catch((ex) => {
        NotificationManager.error(
          "Houve um erro ao criar a squad: " + ex.message,
          "Erro",
          5000
        );
      });
  }

  return (
    <>
      <Dialog fullScreen open={open ? true : false} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Criação de Squad
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                Salvar
              </Button>
            </Toolbar>
          </AppBar>
          <Container>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  error={errors?.name ? true : false}
                  helperText={errors.name?.message}
                  name="name"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Campo nome é obrigatório.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Máximo de 20 caracteres.",
                    },
                  })}
                  fullWidth
                  label="Nome da Squad"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="standard-basic"
                  name="description"
                  error={errors.description ? true : false}
                  helperText={errors.description?.message}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Campo descrição é obrigatório.",
                    },
                    maxLength: {
                      value: 100,
                      message: "Máximo de 100 caracteres.",
                    },
                  })}
                  multiline
                  fullWidth
                  label="Descrição"
                />
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
    </>
  );
}

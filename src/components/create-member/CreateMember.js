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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  memberStatusScreenOfCreate,
  listMembers,
  memberUpdatedData,
} from "../../redux/actions/memberAction";

import { createSquadMember } from "../../services/member.service";

import MuiAutoComplete from "../function-select/function-select";
import { NotificationManager } from "react-notifications";

export default function CreateMember() {
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    formControl: {
      minWidth: 120,
    },
    formControlSquad: {
      minWidth: 400,
    },
  }));

  const squad = useSelector((store) => {
    return store.memberReducer.squadToCreate;
  });

  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm();

  const handleClose = () => {
    memberStatusScreenOfCreate(dispatch, null);
    listMembers(dispatch, squad);
  };

  function onSubmit(form) {
    if (form.function === null) {
      NotificationManager.info("Preencha o campo função.", "Informação", 5000);
    } else {
      createSquadMember({
        ...form,
        squad_id: squad.id,
      })
        .then((memberCreated) => {
          NotificationManager.success(
            "Membro criado com sucesso.",
            "Sucesso",
            5000
          );

          memberUpdatedData(dispatch, true);
          handleClose();
        })
        .catch((ex) => {
          NotificationManager.error(
            "Houve um erro ao adicionar o membro " + ex.message,
            "Erro",
            5000
          );
        });
    }
  }

  return (
    <>
      <Dialog fullScreen open={squad ? true : false} onClose={handleClose}>
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
                Adicionar membro para a squad {squad?.name}
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
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                  name="name"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Campo nome é obrigatório.",
                    },
                    maxLength: {
                      value: 100,
                      message: "Máximo de 100 caracteres.",
                    },
                  })}
                  fullWidth
                  label="Nome"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  name="squadName"
                  disabled={true}
                  value={squad?.name | ""}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Squad"
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={4}>
                {/* <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Função</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="function"
                    inputRef={register}
                  >
                    <MenuItem value={10}>DEV</MenuItem>
                    <MenuItem value={20}>QA</MenuItem>
                    <MenuItem value={30}>PO</MenuItem>
                    <MenuItem value={30}>Tech Leader</MenuItem>
                  </Select>
                </FormControl> */}
                <MuiAutoComplete control={control} />
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
    </>
  );
}

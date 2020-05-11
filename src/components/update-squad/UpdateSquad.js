import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  squadStatusScreenOfUpdate,
  squadUpdatedData,
} from "../../redux/actions/squadAction";
import { Grid, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import { updateSquad } from "../../services/squad.service";
import { NotificationManager } from "react-notifications";

export default function UpdateSquad() {
  const { register, errors, handleSubmit, setValue, control } = useForm({
    defaultValues: { name: "", description: "" },
  });

  const dispatch = useDispatch();

  const squad = useSelector((store) => store.squadReducer.squad);

  const handleClose = () => {
    squadStatusScreenOfUpdate(dispatch, null);
  };

  useEffect(() => {
    if (squad) {
      setTimeout(
        () =>
          setValue([
            { id: squad.id },
            { name: squad.name },
            { description: squad.description },
            {
              create_date: format(new Date(squad.create_date), "dd/MM/yyyy"),
            },
          ]),
        500
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squad]);

  function onSubmit(form) {
    form.create_date = squad.create_date;

    updateSquad(form).then((c) => {
      NotificationManager.success(
        "Squad atualizada com sucesso!",
        "Sucesso",
        5000
      );

      squadUpdatedData(dispatch, true);

      handleClose();
    });
  }

  return (
    <div>
      <Dialog
        open={squad ? true : false}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Editando {squad?.name}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Controller
                  name="id"
                  control={control}
                  onChange={([e]) => {
                    return parseInt(e.target.value, 10);
                  }}
                  as={<TextField />}
                  id="standard-basic"
                  disabled={true}
                  fullWidth
                  type="number"
                  label="ID"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={0}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="outlined-helperText"
                  error={errors.name}
                  helperText={errors.name?.message}
                  name="name"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  label="Nome"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="outlined-helperText"
                  error={errors.name}
                  helperText={errors.name?.message}
                  name="create_date"
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  label="Data de Criação"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-required"
                  name="description"
                  defaultValue="Hello World"
                  error={errors.description}
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
                  fullWidth
                  label="Descrição"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

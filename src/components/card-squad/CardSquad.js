import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from "react-redux"
import { deletedSquad } from "../../services/squad.service"
import { squadUpdatedData } from "../../redux/actions/squadAction"
import { NotificationManager } from "react-notifications"

export default function CardSquad({ squad }) {
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    btnDeletar: {
      color: "red"
    }
  });

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          { squad.name }
        </Typography>
        <Typography variant="body2" component="p">
          { squad.description }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Membros</Button>
        <Button size="small">Editar</Button>
        <Button size="small" className={classes.btnDeletar} onClick={() => {
          deletedSquad(squad.id).then(deletedData => {
            NotificationManager.success("Squad deletada com sucesso!", "Sucesso", 5000);
            squadUpdatedData(dispatch, true);
          }).catch(ex => {
            NotificationManager.error("Houve um erro ao deletar a squad: "+ex.message, "Erro", 5000);
          })
        }}>Deletar</Button>
      </CardActions>
    </Card>
    </>
  )
}
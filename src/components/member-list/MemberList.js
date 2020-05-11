import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CreateMember from "../create-member/CreateMember";
import {
  listMembers,
  memberStatusScreenOfCreate,
} from "../../redux/actions/memberAction";
import {
  listMemberBySquadId,
  deleteSquadMember,
} from "../../services/member.service";
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

export default function MemberList() {
  const [memberList, setMemberList] = useState([]);

  const dispatch = useDispatch();

  const squad = useSelector((store) => store.memberReducer.squad);
  const updated = useSelector((store) => store.memberReducer.updated);

  const classes = useStyles();

  useEffect(() => {
    if (squad)
      listMemberBySquadId(squad.id).then((memberList) => {
        setMemberList(memberList.data);
      });
  }, [squad, updated]);

  function handleClose() {
    listMembers(dispatch, null);
  }

  return (
    <>
      <Dialog fullScreen open={squad ? true : false} onClose={handleClose}>
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
              Tela de membros - {squad?.name}
            </Typography>
            <Button
              autoFocus
              onClick={() => {
                memberStatusScreenOfCreate(dispatch, squad);
              }}
              color="inherit"
              type="submit"
            >
              ADICIONAR
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <br />
          {memberList ? (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Função</TableCell>
                    <TableCell align="right">Data de Entrada</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {memberList.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell align="right">{member.function}</TableCell>
                      <TableCell align="right">{member.create_date}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="close"
                          onClick={() => {
                            deleteSquadMember(member.id)
                              .then((deleted) => {
                                NotificationManager.success(
                                  "Membro deletado com sucesso!",
                                  "Sucesso",
                                  5000
                                );

                                setMemberList(
                                  memberList.filter(
                                    (memberFilter) =>
                                      memberFilter.id !== member.id
                                  )
                                );
                              })
                              .catch((ex) => {
                                NotificationManager.error(
                                  "Houve um erro ao tentar deletar o membro: " +
                                    ex.message,
                                  "Erro",
                                  5000
                                );
                              });
                          }}
                        >
                          <DeleteForever />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Container>
      </Dialog>

      <CreateMember></CreateMember>
    </>
  );
}

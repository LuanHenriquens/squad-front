import api from "./api.js"

export async function getAllSquads() {
  return await api.get("/squad/getall");
}

export async function getSquadByName(squadName) {
  return await api.get(`/squad/getbyname?name=${squadName}`);
}

export async function createSquad(squad) {
  return await api.post(`/squad`, squad);
}

export async function deletedSquad(squadId) {
  return await api.delete(`/squad?id=${squadId}`);
}
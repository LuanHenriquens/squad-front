import api from "./api";

export async function listMemberBySquadId(squadId) {
  return await api.get(`/member/getbysquad?squad_id=${squadId}`);
}

export async function deleteSquadMember(memberId) {
  return await api.delete(`/member?id=${memberId}`);
}

export async function createSquadMember(member) {
  return await api.post(`/member`, member);
}

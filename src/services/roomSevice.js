import httpService from "./httpService";

export const roomService = {
  create,
  query,
  queryOne,
};

async function query() {
  return await httpService.get("room");
}
async function queryOne(id) {
  return await httpService.get(`room/${id}`);
}

async function create(roomDetails) {
  return await httpService.post("room", roomDetails);
}

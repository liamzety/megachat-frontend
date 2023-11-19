import httpService from "./httpService";

export const chatService = {
  create,
  query,
  queryOne,
  createMsg,
};

async function query() {
  return await httpService.get("chat");
}
async function queryOne(id) {
  return await httpService.get(`chat/${id}`);
}

async function create(chatDetails) {
  return await httpService.post("chat", chatDetails);
}
async function createMsg(msg) {
  return await httpService.post(`chat/${msg.chatId}`, msg);
}

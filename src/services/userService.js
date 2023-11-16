import httpService from "./httpService";

export const userService = {
  query,
  add,
};

async function query() {
  return await httpService.get("user");
}
async function add(user) {
  return await httpService.post("user", user);
}

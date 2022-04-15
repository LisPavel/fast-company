import * as users from "./fake.api/user.api";
import professionsApi from "./fake.api/professions.api";

const API = {
  users,
  professions: professionsApi,
};
export default API;

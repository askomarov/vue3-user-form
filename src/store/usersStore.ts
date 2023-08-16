import { IUser } from "@/types/IUser.type";
import { defineStore } from "pinia";
// import { ref } from "vue";

const initialData : IUser[] = [
  {
    id: 1,
    name: "John",
    surname: "Legend",
    role: "manager",
    number: "+381621116045",
    avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
  },
  {
    id: 2,
    name: "Max",
    surname: "Stranger",
    role: "employee",
  },
];
// interface Data {
//   users: IUser[]
// }
interface State {
  data: IUser[]
}

export const useUsersStore = defineStore("usersStore", {
  state: (): State => ({
    data: initialData,
  }),
  getters:{
    getUsersData(state){
      return state.data
    }
  },
  actions:{
    addNewUser(payload: IUser){
      this.data.push(payload);
    },
    updateUserData(payload: IUser, id: number | string){
      this.data = this.data.map((user) => {
        if (user.id === id) {
          return payload;
        }
        return user;
      });
    },
    deleteUserById(id: number | string){
      this.data = this.data.filter((user) => user.id !== id);
    }
  }
});

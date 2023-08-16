<script setup lang="ts">
import { ref, reactive } from "vue";
import UserItem from "@/components/UserItem.vue";
import type { IUser } from "@/types/IUser.type";
import UserForm from "@/components/UserForm.vue";
import { UserFormModeEnums } from "@/types/UserFormModeEnums";

const isSurnameVisible = ref<boolean>(true);

const users = ref<IUser[]>([
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
]);
const userFormOptions = reactive({
  mode: UserFormModeEnums.new,
  title: "Создать новый Тег",
  open: false,
});

const currentUser = ref<IUser | null>();

const openUserFormModal = () => {
  userFormOptions.open = true;
};
const closeUserFormModal = () => {
  userFormOptions.open = false;
};

const onButtonOpenUserForm = (
  formType: UserFormModeEnums,
  payload: IUser | null = null
) => {
  switch (formType) {
    case UserFormModeEnums.edit:
      if (payload) {
        currentUser.value = { ...payload };
      }

      userFormOptions.mode = UserFormModeEnums.edit;
      userFormOptions.title = "Update user";
      break;

    default:
      userFormOptions.mode = UserFormModeEnums.new;
      userFormOptions.title = "Create new user";
      break;
  }

  openUserFormModal();
};
const onBtnDeleteUserClick = (userId: number | string) => {
  console.log(userId);
};

const updateUser = (payload: IUser, id: number | string) => {
  users.value = users.value.map((user) => {
    if (user.id === id) {
      return payload;
    }
    return user;
  });
};

const onSubmitUserForm = (payload: IUser) => {
  console.log(payload);
  switch (userFormOptions.mode) {
    case "edit":
      if (!currentUser.value) return;
      updateUser(payload, currentUser.value.id);
      break;

    default:
      users.value.push(payload);
      break;
  }
  closeUserFormModal();
};
</script>

<template>
  <v-sheet class="content" rounded="xl" elevation="6">
    <header class="header">
      <v-btn
        color="success"
        @click="onButtonOpenUserForm(UserFormModeEnums.new)"
        prepend-icon="mdi-plus"
        >Add user</v-btn
      >
      <v-checkbox
      class="header__checkbox"
        v-model="isSurnameVisible"
        label="Show surname"
        hide-details
      ></v-checkbox>
      <h2 class="header__title">Users list</h2>
    </header>
    <ul class="users-list">
      <user-item
        v-for="user in users"
        :key="user.id"
        :user="user"
        :is-surname-visible="isSurnameVisible"
        @edit-user="onButtonOpenUserForm(UserFormModeEnums.edit, user)"
        @delete-user="onBtnDeleteUserClick(user.id)"
      ></user-item>
    </ul>
  </v-sheet>
  <!--  -->
  <v-dialog v-model="userFormOptions.open">
    <v-sheet class="form-wrap" rounded="xl" elevation="6">
      <header>
        <v-btn
          class="form-wrap__btn-close"
          color="primary"
          icon="mdi-close"
          @click="closeUserFormModal"
          aria-label="Close Dialog"
        >
        </v-btn>
      </header>
      <user-form
        :user-to-edit="currentUser"
        :form-mode="userFormOptions.mode"
        @on-submit-user-form="onSubmitUserForm"
      ></user-form>
    </v-sheet>
  </v-dialog>
</template>

<style scoped lang="scss">
.content {
  padding: 1rem;
  display: grid;
  gap: 1rem;
}
.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.header__title{
  flex: 1 0 auto;
}
.header__checkbox{
  flex: 0 1 auto;
}
.users-list {
  list-style: none;
  display: grid;
  gap: 1rem;
  width: 100%;
}
.form-wrap {
  background-color: #fff;
  padding: 2rem;
  position: relative;
}
.form-wrap__btn-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>

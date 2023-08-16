<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useConfirmDialog } from "@vueuse/core";
import { useUsersStore } from "@/store/usersStore";
import UserItem from "@/components/UserItem.vue";
import UserForm from "@/components/UserForm.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import type { IUser } from "@/types/IUser.type";
import { UserFormModeEnums } from "@/types/UserFormModeEnums";
import MyContact from "@/components/MyContact.vue";

const isConfirmDialogOpen = ref(false);
const confirmDialogInstance = useConfirmDialog(isConfirmDialogOpen);

const isSurnameVisible = ref<boolean>(true);
const userStore = useUsersStore();
const users = computed(() => userStore.getUsersData);
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
const userIdToDelete = ref<number | string>();

confirmDialogInstance.onConfirm((result) => {
  if (!result || !userIdToDelete.value) return;
  userStore.deleteUserById(userIdToDelete.value);
});
const onBtnDeleteUserClick = (userId: number | string) => {
  userIdToDelete.value = userId;
  isConfirmDialogOpen.value = true;
};

const onSubmitUserForm = (payload: IUser) => {
  switch (userFormOptions.mode) {
    case UserFormModeEnums.edit:
      if (!currentUser.value) return;
      userStore.updateUserData(payload, currentUser.value.id);
      break;

    default:
      userStore.addNewUser(payload);
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
      v-if="users.length"
        v-for="user in users"
        :key="user.id"
        :user="user"
        :is-surname-visible="isSurnameVisible"
        @edit-user="onButtonOpenUserForm(UserFormModeEnums.edit, user)"
        @delete-user="onBtnDeleteUserClick(user.id)"
      ></user-item>
      <li v-else>
       🙂 Add first user
      </li>
    </ul>
  </v-sheet>
  <!-- user form -->
  <v-dialog v-model="userFormOptions.open">
    <v-sheet class="form-wrap" rounded="xl" elevation="6">
      <header>
        <h2 class="form-wrap__title">{{ userFormOptions.title }}</h2>
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
  <!-- confirm  dialog -->
  <confirm-dialog
    v-model="isConfirmDialogOpen"
    @agree="confirmDialogInstance.confirm(true)"
    @cancel="confirmDialogInstance.confirm(false)"
  ></confirm-dialog>
  <my-contact></my-contact>
</template>

<style scoped lang="scss">
.content {
  padding: 1rem;
  display: grid;
  align-self: start;
  gap: 1rem;
}
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
.header__title {
  flex: 1 0 auto;
}
.header__checkbox {
  flex: 0 1 auto;
}
.users-list {
  list-style: none;
  display: grid;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  box-shadow: inset 0 0 6px 0 $gray300;
  border-radius: 1rem;
}
.form-wrap {
  background-color: $white;
  padding: 2rem;
  position: relative;
}
.form-wrap__title {
  text-align: center;
  margin: 0 0 1rem;
}
.form-wrap__btn-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>

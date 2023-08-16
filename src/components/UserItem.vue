<script setup lang="ts">
import { IUser } from "@/types/IUser.type";

export interface UserProps {
  user: IUser | null;
  isSurnameVisible: boolean;
}
withDefaults(defineProps<UserProps>(), {
  user: null,
  isSurnameVisible: true,
});
</script>
<template>
  <li class="user-item" v-if="user">
    <div class="user-item__meta">
      <v-avatar>
        <v-img
          v-if="user.avatar"
          width="40"
          height="40"
          :src="user.avatar"
          alt="John"
        ></v-img>
        <v-icon v-else size="40px" icon="mdi-account-circle"></v-icon>
      </v-avatar>
      <h3 class="user-item__name">
        {{ user.name }}
        <span v-show="isSurnameVisible" class="user-item__name-surname">{{
          user.surname
        }}</span>
      </h3>
      <p class="user-item__role">{{ user.role }}</p>
      <a v-if="(user.role === 'manager')" :href="`tel:${user.number}`">{{
        user.number
      }}</a>
    </div>
    <div class="user-item__actions">
      <v-btn
        color="primary"
        icon="mdi-pencil"
        size="small"
        @click="$emit('editUser')"
      ></v-btn>
      <v-btn
        color="error"
        icon="mdi-delete"
        size="small"
        @click="$emit('deleteUser')"
      ></v-btn>
    </div>
  </li>
</template>

<style scoped lang="scss">
// asd
.user-item{
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
}

.user-item__meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
}
.user-item__name {
  flex: 1 0 30%;
  text-align: left;
}
.user-item__name-surname {
}
.user-item__role {
}
.user-item__actions {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
</style>

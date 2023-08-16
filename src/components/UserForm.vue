<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { v4 as uuid } from "uuid";
import { IUser, UserRoleEnums } from "@/types/IUser.type";
import { UserFormModeEnums } from "@/types/UserFormModeEnums";

const emit = defineEmits(["onSubmitUserForm"]);

type FormMode = keyof typeof UserFormModeEnums;

interface TagFormProps {
  formMode: FormMode;
  userToEdit?: IUser | null;
}

const props = withDefaults(defineProps<TagFormProps>(), {
  formMode: "new",
});

const initialFormData: IUser = {
  id: uuid(),
  role: "employee",
  name: "",
  surname: "",
  number: "",
};

const userForm = ref<HTMLFormElement>();
const formData = ref(false);

let newUser = reactive<IUser>({ ...initialFormData });
if (props.formMode === "edit" && props.userToEdit) {
  const { userToEdit } = toRefs(props);
  newUser.name = userToEdit?.value?.name || "";
  newUser.surname = userToEdit?.value?.surname || "";
  newUser.id = userToEdit?.value?.id || uuid();
  newUser.number = userToEdit?.value?.number || "";
  newUser.role = userToEdit?.value?.role || UserRoleEnums.employee;
}
const onRoleChange = (role: UserRoleEnums) => {
  if (role === UserRoleEnums.employee) {
    newUser.number = "";
  }
};
const onSubmit = async () => {
  emit("onSubmitUserForm", newUser);
  newUser = initialFormData;
  userForm.value?.reset();
};
</script>
<template>
  <v-form ref="userForm" @submit.prevent="onSubmit" v-model="formData">
    <fieldset>
      <v-radio-group
        v-model="newUser.role"
        @onchange="onRoleChange"
        :disabled="formMode === UserFormModeEnums.edit"
      >
        <v-radio
          v-for="item in UserRoleEnums"
          :label="item"
          :value="item"
          @click="onRoleChange(item)"
        ></v-radio>
      </v-radio-group>
      <legend>Select role</legend>
    </fieldset>
    <fieldset class="inputs">
      <legend>BIO</legend>
      <v-text-field
        variant="outlined"
        clearable
        v-model="newUser.name"
        label="Name"
        :rules="[(v) => !!v || 'Field is required']"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        clearable
        v-model="newUser.surname"
        label="Surname"
        :rules="[(v) => !!v || 'Field is required']"
      ></v-text-field>
      <v-text-field
        v-if="newUser.role === UserRoleEnums.manager"
        variant="outlined"
        clearable
        v-model="newUser.number"
        label="Number"
      ></v-text-field>
    </fieldset>

    <v-btn
      :disabled="!formData"
      block
      color="success"
      size="large"
      type="submit"
      variant="elevated"
    >
      {{ formMode === UserFormModeEnums.edit ? "Update user" : "Create user" }}
    </v-btn>
  </v-form>
</template>

<style scoped lang="scss">
fieldset {
  text-align: left;

  legend {
    margin-left: 1rem;
    padding-inline: 1rem;
  }

  &.inputs {
    padding: 1rem;
    display: grid;
    gap: 1rem;
  }
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}
</style>

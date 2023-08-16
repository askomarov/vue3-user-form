<script setup lang="ts">
import { useVModel } from '@vueuse/core';
const emits = defineEmits(["update:modelValue","cancel", 'agree'])
interface ConfirmProps{
  modelValue: boolean
}
const onCancel = ()=>{
  emits('cancel')
}
const onAgree = ()=>{
  emits('agree')
}
const props = withDefaults(defineProps<ConfirmProps>(), {
  modelValue: false,
});
const isOpen = useVModel(props, 'modelValue', emits)

</script>
<template>
  <v-dialog v-model="isOpen" @keydown.esc="onCancel">
    <v-card>
      <v-toolbar dark dense flat>
        <v-toolbar-title class="white--text">Do you realy want to delete User?</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-4">delete user </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" @click.native="onAgree">Yes</v-btn>
        <v-btn color="grey" @click.native="onCancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

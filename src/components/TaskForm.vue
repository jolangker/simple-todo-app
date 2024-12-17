<script setup lang='ts'>
import dayjs from 'dayjs';
import { reactive } from 'vue';
import { Task, TaskForm } from '../types';

const props = defineProps<{
  init?: Task
}>()

const emit = defineEmits<{
  (e: 'save', v: TaskForm): void,
  (e: 'cancel'): void
}>()

const payload = reactive<TaskForm>({
  name: props.init?.name ?? '',
  due_date: props.init?.due_date ?? dayjs().format('YYYY-MM-DD')
})

const handleSave = () => {
  emit('save', payload)
  payload.name = ''
  payload.due_date = dayjs().format('YYYY-MM-DD')
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div>
      <label class="label">Task Name</label>
      <input v-model="payload.name" class="w-full input input-bordered focus:input-primary" placeholder="Input task name..." />
    </div>
    <div>
      <label class="label">Due Date</label>
      <input v-model="payload.due_date" type="date" class="w-full input input-bordered focus:input-primary" />
    </div>
    <div class="mt-2 flex justify-end gap-x-2">
      <button class="btn btn-error btn-outline hover:!text-white btn-md" @click="emit('cancel')">Cancel</button>
      <button 
        class="btn btn-primary text-white btn-md"
        :class="{'btn-disabled': !payload.name}"
        :disabled="!payload.name"
        type="submit"
        @click="handleSave"
      >
        Save
      </button>
    </div>
  </div>
</template>
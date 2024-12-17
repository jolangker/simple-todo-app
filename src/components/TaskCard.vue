<script setup lang='ts'>
import { Task } from '../types';
import Icon from './Icon.vue';

const emit = defineEmits<{
  (e: 'update', val: Task): void
  (e: 'delete', val: Task): void
}>()

defineProps<{ task: Task }>()
</script>

<template>
  <div class="p-4 border bg-white rounded-lg filter drop-shadow-sm flex items-center" :class="{ 'bg-gray-100': task.is_completed }">
    <div class="flex-grow">
      <div class="flex items-center">
        <div class="w-6 flex items-center">
          <input v-model="task.is_completed" type="checkbox" class="checkbox checkbox-xs rounded checked:checkbox-primary" />
        </div>
        <p class="text-sm font-medium" :class="{'line-through': task.is_completed}">{{ task.name }}</p>
      </div>
      <div v-if="!task.is_completed" class="mt-1 ml-6">
        <div class="badge badge-ghost text-xs gap-x-1">
          <icon name="calendar" />
          {{ task.due_date }}
        </div>
      </div>
    </div>
    <div v-if="!task.is_completed" class="flex gap-x-2">
      <button class="btn btn-sm text-base btn-square btn-warning text-white" @click="emit('update', task)">
        <icon name="pencil" />
      </button>
      <button class="btn btn-sm text-base btn-square btn-error text-white" @click="emit('delete', task)">
        <icon name="trash" />
      </button>
    </div>
  </div>
</template>
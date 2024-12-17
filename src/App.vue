<script setup lang='ts'>
import { ref } from 'vue';
import Icon from './components/Icon.vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import { useLocalStorage } from '@vueuse/core';
import { Task } from './types';

const modalAddTask = ref<HTMLDialogElement>()

const tasks = useLocalStorage<Task[]>('tasks', [])

const handleAddTask = (val: Omit<Task, 'id' | 'is_completed'>) => {
  const payload: Task = {
    ...val,
    id: Math.random(),
    is_completed: false
  }

  tasks.value.push(payload)

  modalAddTask.value?.close()
}
</script>

<template>
  <div class="min-h-[100dvh] px-8">
    <div class="w-full max-w-2xl mx-auto pb-8">
      <div class="h-[80px] flex items-center border-b-2 py-2">
        <h1 class="text-3xl font-semibold">To-Do</h1>
      </div>
      <div class="flex items-center py-4 gap-x-2">
        <button class="btn btn-primary btn-sm rounded-lg" @click="modalAddTask?.showModal()">
          <icon name="plus" />
          New Task
        </button>
      </div>
      <task-list />
    </div>
    <dialog ref="modalAddTask" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add Task</h3>
        <div class="py-4">
          <TaskForm @cancel="modalAddTask?.close()" @save="handleAddTask" />
        </div>
      </div>
    </dialog>
  </div>
</template>

<style>
.bg-main {
  background-image: url('./assets/bg-main.jpg');
}
</style>
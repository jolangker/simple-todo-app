<script setup lang='ts'>
import { useLocalStorage } from '@vueuse/core';
import TaskCard from './TaskCard.vue';
import { Task, TaskForm as ITaskForm } from '../types';
import { ref } from 'vue';
import TaskForm from './TaskForm.vue';

const modalUpdateTask = ref<HTMLDialogElement>()
const tasks = useLocalStorage<Task[]>('tasks', [])

const selectedTask = ref<Task>()

const key = ref(Math.random())

const handleDelete = (task: Task) => {
  tasks.value = tasks.value.filter((_task) => _task.id !== task.id)
}

const openModalUpdate = (task: Task) => {
  key.value = Math.random()
  selectedTask.value = task
  modalUpdateTask.value?.showModal()
}

const closeModalUpdate = () => {
  selectedTask.value = undefined
  modalUpdateTask.value?.close()
}

const handleUpdate = (task: ITaskForm) => {
  const taskIdx = tasks.value.findIndex((_task) => _task.id === selectedTask.value?.id)
  tasks.value[taskIdx] = {
    ...tasks.value[taskIdx],
    name: task.name,
    due_date: task.due_date
  }
  modalUpdateTask.value?.close()
}
</script>

<template>
  <div>
    <div v-if="tasks.length" class="flex flex-col gap-y-3">
      <task-card v-for="task in tasks" :key="task.id" :task="task" @update="openModalUpdate" @delete="handleDelete" />
      <dialog ref="modalUpdateTask" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Update Task</h3>
          <div class="py-4">
            <task-form :key="key" @cancel="closeModalUpdate" @save="handleUpdate" :init="selectedTask" />
          </div>
        </div>
      </dialog>
    </div>
    <div v-else class="h-40 grid place-items-center text-lg italic font-medium">
      You dont have any task
    </div>
  </div>
</template>
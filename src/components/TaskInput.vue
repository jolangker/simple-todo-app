<script setup lang='ts'>
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';
import { Task } from '../types';
import dayjs from 'dayjs';

const inputRef = ref<HTMLInputElement>()
const taskInput = ref('')
const tasks = useLocalStorage<Task[]>('tasks', [])

const handleSubmit = () => {
  if (taskInput.value) {
    const payload: Task =  {
      id: dayjs().unix(),
      title: taskInput.value,
      description: '',
      date: dayjs().format('DD-MM-YYYY'),
      note: '',
      is_completed: false,
    }

    tasks.value.push(payload)

    taskInput.value = ''
    inputRef.value?.blur()
  }
}


</script>

<template>
  <div class="fixed w-full left-0 bottom-0 h-20 px-4 ">
    <form class="w-full max-w-xl mx-auto" @submit.prevent="handleSubmit">
      <input ref="inputRef" v-model="taskInput" type="text" placeholder="Input task here..." class="input w-full input-bordered" />
    </form>
  </div>
</template>
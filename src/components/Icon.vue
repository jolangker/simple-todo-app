<script setup lang='ts'>
import { computed } from 'vue';

const { name } = defineProps<{
  name: string,
  size?: number
}>()

const id = computed(() => {
  return `icon-${name}-${Math.random()}`
})

const importIcon = async () => {
  try {
    const res =  await import(`../assets/icons/${name}.svg?raw`)
    // console.log(decodeURIComponent(res.default))
    const div = document.createElement('div')
    div.id = id.value
    div.innerHTML = res.default

    const svg = div.querySelector('svg')!
    svg.setAttribute('width', '1em')
    svg.setAttribute('height', '1em')
    
    const i = document.getElementById(`${id.value}`)!
    i.appendChild(svg)
  } catch (error) {
    console.error(error)
  }
}

importIcon()
</script>

<template>
  <i :id />
</template>
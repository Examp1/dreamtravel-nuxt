<template>
    <ul class="accordion">
      <slot></slot>
    </ul>
  </template>
  
  <script setup>
  import { provide, reactive } from 'vue'
  
  // Создаем реактивное состояние для аккордеона
  const accordionState = reactive({
    count: 0,
    active: null
  })
  
  // Провайдим состояние дочерним компонентам
  provide('Accordion', accordionState)
  </script>
  
  <style lang="scss" scoped>
  .accordion {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  </style>
<script setup>
import { useData } from 'vitepress'
import Posts from './Posts.vue'
const { site, frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.home">
    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <ul>
      <li><a href="/markdown-examples.html">Markdown Examples</a></li>
      <li><a href="/api-examples.html">API Examples</a></li>
    </ul>
  </div>
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
  <Posts />
</template>
<script setup>
import { useData } from 'vitepress'
import Nav from './Nav.vue'
import Posts from './Posts.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="bg-leaves bg-repeat bg-16 w-screen">
    <div class="container mx-auto bg-slate-200/95 min-h-screen p-16 text-grey font-bold">
      <Nav />
      <Posts v-if="frontmatter.layout === 'posts'" />
      <Content v-else />
    </div>
  </div>
</template>


<!-- 
  <NotFound v-if="page.isNotFound" />
  <Home v-if="frontmatter.layout === 'home'" />
  <Page v-else /> <Page /> renders <Content /> -->

<script setup>
import { data as posts } from './posts.data'
console.log(posts)
</script>

<template>
    <h1>Blog Posts</h1>
    <ul>
        <li v-for="post of posts">
            <a :href="post.url">{{ post.frontmatter.title }}</a>
            <span>by {{ post.frontmatter.author }}</span>
        </li>
    </ul>
</template>
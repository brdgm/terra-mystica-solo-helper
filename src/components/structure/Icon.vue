<template>
  <img :src="imageUrl" draggable="false" alt=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  setup() {
    const images = require.context('@/assets/icons', true, /\.(png|jpg)$/)
    return { images }
  },
  props: {
    type: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      required: false
    }
  },
  computed: {
    imageUrl() : string {
      const extension = this.extension || 'png'
      if (this.type) {
        return this.images(`./${this.type}/${this.name}.${extension}`)
      }
      else {
        return this.images(`./${this.name}.${extension}`)
      }
    }
  }
})
</script>

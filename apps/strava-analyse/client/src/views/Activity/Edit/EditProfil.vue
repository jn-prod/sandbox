<template>
    <section></section>
</template>

<script>
export default {
    name: "EditActivity",
  props: {
    userId: {
      type: String,
      required: true,
    },
    activityService: {
        type: Object,
        required: true
    }
  },
}
</script>
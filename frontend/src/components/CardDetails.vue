<template>
  <div class="card">
    <p class="card__category">
      Category: {{ category }}
    </p>
    <p class="card__question">
      {{ question }}
    </p>
    <p class="card__tag">
      {{ tag }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 300px;
  justify-content: space-around;
  background-color: #dfe6e9;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &__question,
  &__category,
  &__tag {
    margin: 0;
  }

  &__category {
    font-weight: bold;
  }

  &__tag {
    background-color: #a29bfe;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>


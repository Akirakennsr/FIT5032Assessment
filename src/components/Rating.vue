<template>
  <div class="rating-stars">
    <span v-for="i in 5" :key="i" class="star" :class="{filled: i <= rating}" @click="setRating(i)">
      ★
    </span>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
const props = defineProps({
  value: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false }
});
const emit = defineEmits(['update:value', 'rate']);
const rating = ref(props.value);
watch(() => props.value, v => rating.value = v);
function setRating(val) {
  if (props.readonly) return;
  rating.value = val;
  emit('update:value', val); 
  emit('rate', val);
}
</script>

<style scoped>
.rating-stars {
  display: inline-block;
  font-size: 2rem;
  color: #ffd700;
  cursor: pointer;
}
.star {
  margin: 0 2px;
  transition: color 0.2s;
}
.star.filled {
  color: #ffd700;
}
.star:not(.filled) {
  color: #ddd;
}
</style>

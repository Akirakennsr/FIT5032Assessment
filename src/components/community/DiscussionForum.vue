<script setup>
import { ref, computed, onMounted } from 'vue';
import Rating from '../Rating.vue';
import { isAuthenticated } from '../../auth';
import forumComments from '../../data/forumComments.json';

const comments = ref([]);
const newComment = ref('');
const newRating = ref(0);
const user = JSON.parse(localStorage.getItem('currentUser'));
// localStorage.clear(); 
const saved = localStorage.getItem('forumComments');  
if (saved) {
  comments.value = JSON.parse(saved);
} else {
  comments.value = forumComments;
}

function addComment() {
  if (!isAuthenticated.value) {
    alert('Please login to comment.');
    return;
  }
  const text = newComment.value.trim();
  if (!text) {
    alert('Comment cannot be empty.');
    return;
  }
  if (text.length > 200) {
    alert('Comment too long (max 200 chars).');
    return;
  }
  if (text && newRating.value > 0) {
    comments.value.push({
      user: user?.username || 'Anonymous',
      text: text, 
      date: new Date().toLocaleString(),
      rating: newRating.value
    });
    newComment.value = '';
    newRating.value = 0;
  } else if (text) {
    comments.value.push({
      user: user?.username || 'Anonymous',
      text: text,
      date: new Date().toLocaleString(),
      rating: null
    });
    newComment.value = '';
    newRating.value = 0;
  }
  localStorage.setItem('forumComments', JSON.stringify(comments.value));
}

const avgRating = computed(() => {
  const rated = comments.value.filter(c => typeof c.rating === 'number' && !isNaN(c.rating));
  if (!rated.length) return 0;
  return (rated.reduce((sum, c) => sum + c.rating, 0) / rated.length).toFixed(1);
});
</script>
<template>
  <div class="forum-section">
    <h2>Discussion Forum</h2>
    <div class="rating-block">
      <span>Average Rating: <b>{{ avgRating }}</b> / 5</span>
    </div>
    <div class="comments-block">
      <h3>Comments</h3>
      <div v-for="(c, i) in comments" :key="i" class="comment-item">
        <b>{{ c.user }}</b> <span class="date">{{ c.date }}</span>
        <div >{{ c.text }}</div>
        <div v-if="typeof c.rating === 'number' && c.rating > 0">
          <Rating :value="c.rating" :readonly="true" />
          <span class="comment-rating">({{ c.rating }}/5)</span>
        </div>
      </div>
      <div v-if="isAuthenticated" class="add-comment">
        <textarea v-model="newComment" placeholder="Add your comment..."></textarea>
        <div class="rate-row">
          <span>Rate:</span>
          <Rating v-model:value="newRating" :readonly="false" />
        </div>
        <button @click="addComment">Submit</button>
      </div>
      <div v-else class="login-tip">Please login to comment and rate.</div>
    </div>
  </div>
</template>
<style scoped>
.forum-section {
  margin: 24px auto;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.rating-block {
  margin-bottom: 24px;
}
.comments-block {
  margin-top: 16px;
  text-align: left;
}
.comment-item {
  background: #fff;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.comment-rating {
  color: #0f7be0;
  margin-left: 8px;
  font-size: 15px;
}
.rate-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 12px 0;
}
.add-comment textarea {
  width: 100%;
  min-height: 60px;
  margin-bottom: 8px;
}
.add-comment button {
  background: #0f7be0;
  color: #fff;
  border: none;
  padding: 6px 18px;
  border-radius: 4px;
  cursor: pointer;
}
.login-tip {
  color: #888;
  font-size: 14px;
  margin-top: 8px;
}
.date {
  color: #aaa;
  font-size: 12px;
  margin-left: 8px;
}
</style>

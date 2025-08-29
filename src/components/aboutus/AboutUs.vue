<template>
  <section class="aboutus-section">
    <h1>About Us</h1>
    <p>We are dedicated to supporting the mental health of young people through collaboration with various organizations. Below is a list of our esteemed partners:</p>
    <DataTable :value="partners" responsiveLayout="scroll">
      <Column field="name" header="Organization Name"></Column>
      <Column field="location" header="Location"></Column>
    </DataTable>
  </section>
</template> 
 
<script setup>
import { ref } from 'vue';
import DataTable  from 'primevue/datatable';
import Column from 'primevue/column';
import partnersData from '../../data/partners.json';

const partners = ref(partnersData);
</script>

<style scoped>
.aboutus-section {
  max-width: 800px;
  margin: 40px auto;
  padding: 32px 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  text-align: center;
}
h1 {
  color: #0f7be0;
  margin-bottom: 18px;
}
p {
  font-size: 18px;
  color: #333;
}
</style>

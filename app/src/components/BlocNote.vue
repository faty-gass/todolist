<template>
  <q-card class="my-card">
    <q-card-section class="bg-purple text-white">
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-card-section>
      <q-card
        dark
        bordered
        class="bg-grey-9 my-card"
        v-for="item in notes"
        :key="item._id"
      >
        <q-card-section>
          <div>{{ item.content }}</div>
        </q-card-section>
      </q-card>
    </q-card-section>
    <q-card-actions align="around" v-if="status == 'pending'">
      <q-btn>Ajouter</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    title: String,
    notes: [Object],
    status: String
  }
};
</script>

<style></style>

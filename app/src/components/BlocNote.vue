<template>
  <q-card class="my-card ">
    <q-card-section class="bg-purple text-white">
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-card-section>
      <div v-for="item in notes" :key="item._id" class="row">
        <q-card dark bordered class="bg-grey-9 my-card q-ma-sm col-md-8">
          <q-card-section>
            <div>{{ item.content }}</div>
          </q-card-section>
        </q-card>
        <div class="col-md-2">
          <q-btn flat round class="text-blue" icon="edit" />
          <q-btn
            flat
            round
            class="text-red"
            icon="delete"
            @click="deleteNote"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="around" v-if="status == 'pending'">
      <q-input outlined dense v-model="text" label="Nouvelle tâche" />
      <q-btn @click="onSubmit">Ajouter</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import axios from "axios";
export default {
  props: {
    title: String,
    notes: [Object],
    status: String,
    update: Function
  },

  data() {
    return {
      text: ""
    };
  },

  methods: {
    onSubmit() {
      var data = JSON.stringify({ content: this.text });

      var config = {
        method: "post",
        url: "http://localhost:8080/add",
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };
      axios(config)
        .then(response => {
          console.log(response.data);
          this.$emit("update-note");
          this.text = null;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    deleteNote() {
      console.log(mess);
    }
  }
};
</script>

<style></style>

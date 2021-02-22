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
          <q-btn 
            flat 
            round 
            class="text-blue" 
            icon="edit" 
            @click="openEdit(item._id)"/>
          <q-btn
            flat
            round
            class="text-red"
            icon="delete"
            @click="deleteNote(item._id)"
          />
        </div>
      <!--------------------------- EDIT MODAL ------------------------------>
        <q-dialog v-model="edit">
          <q-card style="width: 500px; max-width: 70vw;">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Modifier la tâche</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <q-form
                @submit="updateNote"
                class="q-gutter-md"
              >
                <q-input
                  filled
                  v-model="currentContent"
                  hint="Contenue de la tâche"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-toggle v-model="currentStatus" :label="currentStatus ? 'A Faire' : 'Terminée' " />

                <div>
                  <q-btn label="Valider" type="submit" color="primary"/>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
<!--------------------------- END  EDIT MODAL ------------------------------>
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
    notes: Array,
    status: String,
  },

  data() {
    return {
      text: "",
      edit : false,
      currentContent : "",
      currentStatus : "",
      noteId : "",
    };
  },

  methods: {
    onSubmit() {
      const data = JSON.stringify({ content: this.text });

      const config = {
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
          this.$emit("new-note", response.data);
          this.text = null;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    openEdit(id) {
      const currentNote = this.notes.filter( note => note._id == id)[0]
      console.log(currentNote)
      this.edit = true;
      this.noteId = currentNote._id;
      this.currentContent = currentNote.content;
      this.currentStatus = currentNote.status == "pending" ? false : true 
    },

    updateNote(){
      const newStatus = this.currentStatus ? "done" : "pending";
      const data = JSON.stringify({"status": newStatus, "content": this.currentContent});

      const config = {
        method: 'patch',
        url: `http://localhost:8080/update/${this.noteId}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then((response) => {
        console.log(response.data);
        this.$emit("update-note", response.data.note);
        this.edit = false;
      })
      .catch(function (error) {
        console.log(error);
      });

    },

    deleteNote(id) {
      const config = {
        method: 'delete',
        url: `http://localhost:8080/delete/${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
      };

      axios(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.message){
          this.$emit('delete-note')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }
};
</script>

<style></style>

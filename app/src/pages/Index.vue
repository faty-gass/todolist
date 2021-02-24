<template>
  <q-page class="q-pa-sm flex flex-center">

    <div class="row">
      <div
        v-for="(item, idx) in columns"
        :key="idx"
        class="col-12 col-md-6 q-pa-md"
      >
        <BlocNote
          :title="item.title"
          :notes="item.data"
          :status="item.status"
          v-on:new-note="newNote"
          v-on:update-note="updateNote"
          v-on:delete-note="deleteNote"
        />
        
      </div>
    </div>
  </q-page>
</template>

<script>
import BlocNote from "src/components/BlocNote.vue";
import axios from "axios";

export default {
  name: "PageIndex",
  components: { BlocNote },

  data() {

    return {
      allNotes : [ ],
      columns: [
        {
          title: "Tâches à faire",
          status: "pending",
          data: []
        },
        { title: "Tâches terminées", status: "done", data: [] }
      ]
    };
  },

  computed : {
/*     pending_notes(){
      return this.allNotes.filter( note => note.status == "pending")
    },
    done_notes(){
      return this.allNotes.filter( note => note.status == "done")
    } */
  },

  mounted() {
    this.getAllNotes()
  },
    

  methods : {
    getAllNotes (){
      axios
      .get('http://localhost:8080/show')
      .then(response => {
        this.allNotes = response.data
        //console.log("notes", this.allNotes)
        
        let pendingColumn = this.columns.find( note => note.status == "pending");
        pendingColumn.data = response.data.filter( note => note.status == "pending")
        let doneColumn = this.columns.find( note => note.status == "done");
        doneColumn.data = response.data.filter( note => note.status == "done")
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    newNote(payload){
      let pendingColumn = this.columns.find( note => note.status == "pending")
      pendingColumn.data.push(payload)
    },

    updateNote(payload){
      let updStatus = payload.status
      let dataColumn ;
      let oppDataColumn ;
      if (updStatus == "pending"){
        dataColumn = this.columns.find( column => column.status == "pending").data
        oppDataColumn = this.columns.find( column => column.status == "done").data
      } else if (updStatus == "done"){
        dataColumn = this.columns.find( column => column.status == "done").data
        oppDataColumn = this.columns.find( column => column.status == "pending").data
      }
      let currentNote = dataColumn.find(note => note._id == payload._id)
      if (currentNote){
        let idx = dataColumn.findIndex( note => note._id == payload._id)
        currentNote[idx] = payload
      } else {
        dataColumn.push(payload)
        oppDataColumn.splice(oppDataColumn.findIndex( note => note._id == payload._id),1)
      }
    },

    deleteNote(payload){
      this.columns.forEach( column => {
        let idx = column.data.findIndex( note => note._id == payload)
        if (idx >=0){
          column.data.splice(idx, 1)
        }
      });
    }
    
  }

};

/*     <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > */
</script>
<style scoped>

</style>

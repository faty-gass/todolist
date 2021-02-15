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
          v-on:update-note="getAllNotes"
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
        //console.log(response.data);
        this.allNotes = response.data
        console.log("notes", this.allNotes)
        
        let pendingColumn = this.columns.find( note => note.status == "pending");
        pendingColumn.data = response.data.filter( note => note.status == "pending")
        let doneColumn = this.columns.find( note => note.status == "done");
        doneColumn.data = response.data.filter( note => note.status == "done")
         
        //this.columns.find( note => note.status == "done") = response.data.filter( note => note.status == "done");
      })
      .catch(function (error) {
        console.log(error);
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

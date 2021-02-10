<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div
        v-for="(item, idx) in columns"
        :key="idx"
        class="col-12 col-md q-px-md"
      >
        <BlocNote
          :title="item.title"
          :notes="item.data"
          :status="item.status"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import BlocNote from "src/components/BlocNote.vue";
export default {
  name: "PageIndex",
  components: { BlocNote },

  data() {
    let pending_notes = [
      { _id: 1, content: "note en cours 1" },
      { _id: 2, content: "note en cours 2" }
    ];
    let done_notes = [
      { _id: 3, content: "note terminée 1" },
      { _id: 4, content: "note terminée 2" },
      { _id: 5, content: "note terminée 3" }
    ];
    return {
      columns: [
        {
          title: "Tâches à faire",
          status: "pending",
          data: pending_notes
        },
        { title: "Tâches terminées", status: "done", data: done_notes }
      ]
    };
  }
};

/*     <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > */
</script>

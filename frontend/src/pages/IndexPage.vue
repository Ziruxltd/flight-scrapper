<template>
  <q-page>
    <q-card class="q-mx-xl">
      <q-card-section class="q-ma-lg">
        <q-form @submit="submit">
          <div class="row justify-between">
            <q-input
              label="Departure Point"
              outlined
              v-model="departurePoint"
              class="col-3 q-pr-md"
            />
            <q-input
              label="Arrival point"
              outlined
              v-model="arrivalPoint"
              class="col-3 q-px-md"
            />
            <q-input
              class="col-3 q-px-md"
              v-model="fromDate"
              outlined
              label="From"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="fromDate">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="toDate"
              class="col-3 q-pl-md"
              label="To"
              outlined
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="toDate">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row justify-between">
            <q-checkbox toggle label="No stops" v-model="noStop" />
            <q-btn label="Search" color="primary" type="submit" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDestinations } from "src/services";

const departurePoint = ref("");
const arrivalPoint = ref("");
const fromDate = ref("");
const toDate = ref("");
const noStop = ref(true);
const destinations = ref([]);

onMounted( async () => {
  destinations.value = await getDestinations();
});

function submit() {
  const form = {
    departurePoint: departurePoint.value,
    arrivalPoint: arrivalPoint.value,
    fromDate: fromDate.value,
    toDate: toDate.value,
    noStop: noStop.value,
  };
  console.log("form: ", form);
}
</script>

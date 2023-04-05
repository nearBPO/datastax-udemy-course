<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import useReadings from "@/modules/sensors/useReadings";
import type { Reading, Form } from "@/modules/sensors/interfaces";

const { readings, sensorOptions, mutation, remove } = useReadings();
const { isLoading: loadingSave, isError, isSuccess } = mutation;
const toast = useToast();
const dt = ref();
const form = ref<Form>({});
const dialog = ref<boolean>(false);

const filters = ref({
  // @ts-ignore: Unreachable code error
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const exportCSV = () => {
  dt.value.exportCSV();
};

const upsert = () => {
  mutation.mutate(form.value);
  dialog.value = false;
};
const erase = (reading: Reading) => {
  remove(reading);
};

const generate = (name: string, min: number, max: number) => {
  // @ts-ignore: Unreachable code error
  form.value[name] = Math.random() * (max - min) + min;
};

const generateAll = () => {
  form.value.timestamp = Math.ceil(Date.now() / 1000).toString();
  generate("temp", 20, 30);
  generate("humidity", 40, 80);
  generate("co", 0.002, 0.005);
  generate("smoke", 0.01, 0.025);
  generate("lpg", 0.004, 0.006);
  form.value.motion = false;
  form.value.light = false;
};

const toPercentage = (measure: number): string => {
  return `${(measure * 100).toFixed(2)}%`;
};
const toDate = (timestamp: string): string => {
  const date = new Date(Number(timestamp) * 1000).toUTCString();
  return `${date}`;
};

watch(isSuccess, (isSuccess) => {
  if (isSuccess)
    toast.add({
      severity: "success",
      summary: "Guardado",
      detail: "Cambios guardados",
      life: 3000,
    });
});
watch(isError, (isError) => {
  if (isError)
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ha ocurrido un problema",
      life: 3000,
    });
});
watch(loadingSave, (loadingSave) => {
  if (loadingSave)
    toast.add({
      severity: "info",
      summary: "Guardando",
      detail: "Por favor espere",
      life: 3000,
    });
});
</script>

<template>
  <Toast />

  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="() => (dialog = true)"
          />
        </template>
        <template #end>
          <Button
            label="Export"
            icon="pi pi-upload"
            class="p-button-help"
            @click="exportCSV()"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="readings"
        responsiveLayout="scroll"
        class="p-datatable-customers"
        dataKey="id"
        :paginator="true"
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} logs"
        :filters="filters"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justiify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center">Recent records</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..."
              />
            </span>
          </div>
        </template>
        <Column field="sensor" header="Sensor" :sortable="true"></Column>
        <Column field="timestamp" header="Timestamp" :sortable="true">
          <template #body="slotProps">
            {{ toDate(slotProps.data.timestamp) }}
          </template>
        </Column>
        <Column field="temp" header="Temp" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.temp.toFixed(2) }}
          </template>
        </Column>
        <Column header="Humidity" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.humidity.toFixed(2) }}%
          </template>
        </Column>
        <Column field="co" header="CO2" :sortable="true">
          <template #body="slotProps">
            {{ toPercentage(slotProps.data.co) }}
          </template>
        </Column>
        <Column field="lpg" header="LPG" :sortable="true">
          <template #body="slotProps">
            {{ toPercentage(slotProps.data.lpg) }}
          </template>
        </Column>
        <Column field="smoke" header="Smoke" :sortable="true">
          <template #body="slotProps">
            {{ toPercentage(slotProps.data.smoke) }}
          </template>
        </Column>
        <Column field="motion" header="Motion" :sortable="true">
          <template #body="slotProps">
            <span :class="'bool-badge status-' + slotProps.data.motion">{{
              slotProps.data.motion
            }}</span>
          </template>
        </Column>
        <Column field="light" header="Light" :sortable="true">
          <template #body="slotProps">
            <span :class="'bool-badge status-' + slotProps.data.light">{{
              slotProps.data.light
            }}</span>
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="erase(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <Dialog
    v-model:visible="dialog"
    :style="{ width: '450px' }"
    header="Product Details"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="device" class="mb-3">Sensor</label>
      <Dropdown
        id="device"
        v-model="form.sensor"
        :options="sensorOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Select a Sensor"
      />
    </div>

    <div class="field">
      <label for="ts" class="mb-3">Timestamp</label>
      <div class="p-inputgroup">
        <InputText id="ts" v-model="form.timestamp" disabled />
        <Button
          icon="pi pi-replay"
          class="p-button-secondary"
          @click="generateAll"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="temp">Temp</label>
        <div class="p-inputgroup">
          <InputNumber
            id="temp"
            v-model="form.temp"
            mode="decimal"
            :maxFractionDigits="2"
          />
          <Button
            icon="pi pi-replay"
            class="p-button-secondary"
            @click="generate('temp', 20, 30)"
          />
        </div>
      </div>
      <div class="field col">
        <label for="humidity">Humidity</label>
        <div class="p-inputgroup">
          <InputNumber
            id="humidity"
            v-model="form.humidity"
            mode="decimal"
            :maxFractionDigits="2"
          />
          <Button
            icon="pi pi-replay"
            class="p-button-secondary"
            @click="generate('humidity', 40, 80)"
          />
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="co">CO"</label>
        <div class="p-inputgroup">
          <InputNumber
            id="co"
            v-model="form.co"
            mode="decimal"
            :maxFractionDigits="5"
          />
          <Button
            icon="pi pi-replay"
            class="p-button-secondary"
            @click="generate('co', 0.002, 0.005)"
          />
        </div>
      </div>
      <div class="field col">
        <label for="smoke">Smoke</label>
        <div class="p-inputgroup">
          <InputNumber
            id="smoke"
            v-model="form.smoke"
            mode="decimal"
            :maxFractionDigits="4"
          />
          <Button
            icon="pi pi-replay"
            class="p-button-secondary"
            @click="generate('smoke', 0.01, 0.025)"
          />
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="lpg">LPG"</label>
        <div class="p-inputgroup">
          <InputNumber
            id="lpg"
            v-model="form.lpg"
            mode="decimal"
            :maxFractionDigits="5"
          />
          <Button
            icon="pi pi-replay"
            class="p-button-secondary"
            @click="generate('lpg', 0.004, 0.006)"
          />
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="motion">Motion</label>
        <div class="p-inputgroup">
          <ToggleButton
            id="motion"
            v-model="form.motion"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            class="w-full sm:w-10rem"
            aria-label="Confirmation"
          />
        </div>
      </div>
      <div class="field col">
        <label for="light">Light</label>
        <div class="p-inputgroup">
          <ToggleButton
            id="light"
            v-model="form.light"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            class="w-full sm:w-10rem"
            aria-label="Confirmation"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="() => (dialog = false)"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="upsert"
      />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
    }
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 960px) {
    ::v-deep(.p-toolbar) {
        flex-wrap: wrap;

        .p-button {
            margin-bottom: 0.25rem;
        }
    }
}
</style>

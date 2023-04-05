import { useMutation, useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import AstraAPI from "./api";
import {
  SensorID,
  type Form,
  type Reading,
  type ReadingsResponse,
  type savedReading,
} from "./interfaces";
import { useReadingStore } from "./store";

const get = async (): Promise<Reading[]> => {
  const { data } = await AstraAPI.get<ReadingsResponse>(
    `/readings_by_sensor/rows`
  );
  return data.data;
};

const useReadings = () => {
  const store = useReadingStore();
  const { readings } = storeToRefs(store);

  const { data, ...query } = useQuery(["readings"], () => get());

  watch(data, (readings) => {
    if (readings) store.set(readings);
  });

  const sensorOptions = [
    { label: "NORTE", value: SensorID.B827EbBf9D51 },
    { label: "NORESTE", value: SensorID.The000F0070910A },
    { label: "SUR", value: SensorID.The1CBfCe15Ec4D },
  ];

  const save = async (form: Form): Promise<savedReading> => {
    const { sensor, timestamp, ...body } = form;
    const { data } = await AstraAPI.put<savedReading>(
      `/readings_by_sensor/${sensor}/${timestamp}`,
      body
    );
    store.set(await get());
    return data;
  };

  const mutation = useMutation(save);

  const remove = async (form: Reading): Promise<boolean> => {
    const { sensor, timestamp } = form;
    const { status } = await AstraAPI.delete<any>(
      `/readings_by_sensor/${sensor}/${timestamp}`
    );
    if (status === 204)
      store.set(store.readings.filter((r) => r.timestamp !== timestamp));
    else console.log("Error en el status:", status);
    return status === 204;
  };

  return {
    readings,
    query,
    sensorOptions,
    mutation,
    remove,
  };
};

export default useReadings;

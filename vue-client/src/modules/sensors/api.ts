import axios from "axios";

const AstraAPI = axios.create({
    baseURL: `https://${import.meta.env.VITE_ASTRA_DB_ID}-${import.meta.env.VITE_ASTRA_DB_REGION
        }.apps.astra.datastax.com/api/rest/v2/keyspaces/${import.meta.env.VITE_ASTRA_DB_KEYSPACE
        }`,
    headers: {
        "X-Cassandra-Token": `${import.meta.env.VITE_ASTRA_DB_APPLICATION_TOKEN}`,
    },
});

export default AstraAPI;

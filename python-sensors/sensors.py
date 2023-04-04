from yaml.loader import SafeLoader
import concurrent.futures
import csv
import datetime
import json
import logging
import pulsar
import pytz
import threading
import time
import yaml

with open('python-sensors/config.yaml') as f:
    data = yaml.load(f, Loader=SafeLoader)
    serviceUrl, pulsarToken, tenantName, namespace, topicName = data['astra'].values()
    topic = "persistent://{0}/{1}/{2}".format(tenantName, namespace, topicName)

client = pulsar.Client(serviceUrl, authentication=pulsar.AuthenticationToken(pulsarToken))
producer = client.create_producer(topic)

def csv_reader(sensor):
    with open(r'data/iot_telemetry_data.csv', newline='') as File:
        reader = csv.reader(File)
        filtered = filter(lambda x: x[1] == sensor, reader)
        for row in filtered:
            yield row

def thread_function(sensor):
    logging.info("Sensor %s: starting", sensor)
    for row in csv_reader(sensor):
        body = {
            "sensor": row[1],
            "timestamp": row[0],
            "co": float(row[2]),
            "humidity": float(row[3]),
            "light": row[4].lower() in ("yes", "true", "t", "1"),
            "lpg": float(row[5]),
            "motion": row[6].lower() in ("yes", "true", "t", "1"),
            "smoke": float(row[7]),
            "temp": float(row[8])
            }
        j = json.dumps(body)
        producer.send(j.encode('utf-8'))
        time.sleep(15)
    logging.info("Sensor %s: finishing. ", sensor)

if __name__ == "__main__":
    sensors = ['b8:27:eb:bf:9d:51', '00:0f:00:70:91:0a', '1c:bf:ce:15:ec:4d']

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        executor.map(thread_function, sensors)




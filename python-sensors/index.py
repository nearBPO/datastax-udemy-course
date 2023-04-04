from pulsar import Function
from pulsar.schema import *
import json

# FUNCION DE APACHE PULSAR UTILIZANDO PYTHON
# ES IMPORTANTE MANTENER EL NOMBRE COMO index.py YA QUE DE OTRA MANERA ASTRA STREAMING NO LO RECONOCE

class LoggingFunction(Function):
    def __init__(self):
        pass

    def process(self, input, context):
        log = context.get_logger()
        try:
            j = json.loads(input)
            temp = j['temp']
            if temp > 21.5:
                log.info("""Aviso de temperatura elevada: \n
                            Temperatura: {}, \n
                            Sensor: {}, \n
                            Hora: {}.""".format(temp, j['sensor'], j['timestamp']))
        except Exception as e:
            log.info(str(e) + '-error')
            log.info(input)
        finally:
            return input

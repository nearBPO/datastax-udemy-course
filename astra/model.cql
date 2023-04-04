CREATE TABLE "udemy"."readings_by_sensor" (
  "sensor" text,
  "timestamp" text,
  "temp" double,
  "smoke" double,
  "humidity" double,
  "co" double,
  "lpg" double,
  "motion" boolean,
  "light" boolean,
  PRIMARY KEY ("sensor", "timestamp")
)
WITH CLUSTERING ORDER BY ("timestamp" DESC);
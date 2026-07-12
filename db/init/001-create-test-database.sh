#!/bin/sh
set -eu

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres <<-EOSQL
SELECT 'CREATE DATABASE ${MESAFLOW_TEST_DATABASE}'
WHERE NOT EXISTS (
  SELECT FROM pg_database WHERE datname = '${MESAFLOW_TEST_DATABASE}'
)\gexec
EOSQL

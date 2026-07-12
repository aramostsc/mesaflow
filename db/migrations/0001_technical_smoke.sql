CREATE SCHEMA IF NOT EXISTS mesaflow_technical;

CREATE TABLE IF NOT EXISTS mesaflow_technical.environment_smoke (
  key text PRIMARY KEY,
  checked_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO mesaflow_technical.environment_smoke (key)
VALUES ('eng-a0-002')
ON CONFLICT (key) DO UPDATE
SET checked_at = now();

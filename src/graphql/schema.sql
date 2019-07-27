--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: omgisaw; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA omgisaw;


--
-- Name: omgisaw_private; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA omgisaw_private;


--
-- Name: postgraphile_watch; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA postgraphile_watch;


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: notify_watchers_ddl(); Type: FUNCTION; Schema: postgraphile_watch; Owner: -
--

CREATE FUNCTION postgraphile_watch.notify_watchers_ddl() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'ddl',
      'payload',
      (select json_agg(json_build_object('schema', schema_name, 'command', command_tag)) from pg_event_trigger_ddl_commands() as x)
    )::text
  );
end;
$$;


--
-- Name: notify_watchers_drop(); Type: FUNCTION; Schema: postgraphile_watch; Owner: -
--

CREATE FUNCTION postgraphile_watch.notify_watchers_drop() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'drop',
      'payload',
      (select json_agg(distinct x.schema_name) from pg_event_trigger_dropped_objects() as x)
    )::text
  );
end;
$$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: sighting; Type: TABLE; Schema: omgisaw; Owner: -
--

CREATE TABLE omgisaw.sighting (
    id integer NOT NULL,
    description text,
    location public.geography NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    url character varying(255),
    subject_id integer NOT NULL
);


--
-- Name: sighting_id_seq; Type: SEQUENCE; Schema: omgisaw; Owner: -
--

CREATE SEQUENCE omgisaw.sighting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sighting_id_seq; Type: SEQUENCE OWNED BY; Schema: omgisaw; Owner: -
--

ALTER SEQUENCE omgisaw.sighting_id_seq OWNED BY omgisaw.sighting.id;


--
-- Name: subject; Type: TABLE; Schema: omgisaw; Owner: -
--

CREATE TABLE omgisaw.subject (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    nickname character varying(100) NOT NULL,
    slug character varying(150) NOT NULL,
    picture character varying(255),
    description text,
    location public.geography,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: subject_id_seq; Type: SEQUENCE; Schema: omgisaw; Owner: -
--

CREATE SEQUENCE omgisaw.subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: subject_id_seq; Type: SEQUENCE OWNED BY; Schema: omgisaw; Owner: -
--

ALTER SEQUENCE omgisaw.subject_id_seq OWNED BY omgisaw.subject.id;


--
-- Name: sighting id; Type: DEFAULT; Schema: omgisaw; Owner: -
--

ALTER TABLE ONLY omgisaw.sighting ALTER COLUMN id SET DEFAULT nextval('omgisaw.sighting_id_seq'::regclass);


--
-- Name: subject id; Type: DEFAULT; Schema: omgisaw; Owner: -
--

ALTER TABLE ONLY omgisaw.subject ALTER COLUMN id SET DEFAULT nextval('omgisaw.subject_id_seq'::regclass);


--
-- Name: sighting sighting_pkey; Type: CONSTRAINT; Schema: omgisaw; Owner: -
--

ALTER TABLE ONLY omgisaw.sighting
    ADD CONSTRAINT sighting_pkey PRIMARY KEY (id);


--
-- Name: subject subject_pkey; Type: CONSTRAINT; Schema: omgisaw; Owner: -
--

ALTER TABLE ONLY omgisaw.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (id);


--
-- Name: subject subject_slug_key; Type: CONSTRAINT; Schema: omgisaw; Owner: -
--

ALTER TABLE ONLY omgisaw.subject
    ADD CONSTRAINT subject_slug_key UNIQUE (slug);


--
-- Name: sighting sighting_subject_id_fkey; Type: FK CONSTRAINT; Schema: omgisaw; Owner: -
--

ALTER TABLE ONLY omgisaw.sighting
    ADD CONSTRAINT sighting_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES omgisaw.subject(id);


--
-- Name: postgraphile_watch_ddl; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER postgraphile_watch_ddl ON ddl_command_end
         WHEN TAG IN ('ALTER AGGREGATE', 'ALTER DOMAIN', 'ALTER EXTENSION', 'ALTER FOREIGN TABLE', 'ALTER FUNCTION', 'ALTER POLICY', 'ALTER SCHEMA', 'ALTER TABLE', 'ALTER TYPE', 'ALTER VIEW', 'COMMENT', 'CREATE AGGREGATE', 'CREATE DOMAIN', 'CREATE EXTENSION', 'CREATE FOREIGN TABLE', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE POLICY', 'CREATE RULE', 'CREATE SCHEMA', 'CREATE TABLE', 'CREATE TABLE AS', 'CREATE VIEW', 'DROP AGGREGATE', 'DROP DOMAIN', 'DROP EXTENSION', 'DROP FOREIGN TABLE', 'DROP FUNCTION', 'DROP INDEX', 'DROP OWNED', 'DROP POLICY', 'DROP RULE', 'DROP SCHEMA', 'DROP TABLE', 'DROP TYPE', 'DROP VIEW', 'GRANT', 'REVOKE', 'SELECT INTO')
   EXECUTE PROCEDURE postgraphile_watch.notify_watchers_ddl();


--
-- Name: postgraphile_watch_drop; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER postgraphile_watch_drop ON sql_drop
   EXECUTE PROCEDURE postgraphile_watch.notify_watchers_drop();


--
-- PostgreSQL database dump complete
--


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
-- Data for Name: post; Type: TABLE DATA; Schema: omgisaw; Owner: -
--

COPY omgisaw.post (id, username) FROM stdin;
1	IanWenskink
2	Nelis
\.


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: omgisaw; Owner: -
--

SELECT pg_catalog.setval('omgisaw.post_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--


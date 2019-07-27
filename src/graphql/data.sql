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
-- Data for Name: subject; Type: TABLE DATA; Schema: omgisaw; Owner: -
--

COPY omgisaw.subject (id, name, nickname, slug, picture, description, location, created_at) FROM stdin;
1	Bigfoot	Biggie	bigfoot	\N	Big, hairy foot	0101000020E61000006AF06371A4FA4940FF7AE0BE69051240	2019-07-27 18:11:57.308145+02
\.


--
-- Data for Name: sighting; Type: TABLE DATA; Schema: omgisaw; Owner: -
--

COPY omgisaw.sighting (id, description, location, "timestamp", url, subject_id) FROM stdin;
1	I WAS HIDING IN A BUSH WHEN BIGFOOT WALKED PAST ME! OMG I AM SO SCARED!!!!	0101000020E6100000FE11E1BABD0B4A402B830FCAA0171540	2019-07-27 19:39:55.161777+02	\N	1
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: sighting_id_seq; Type: SEQUENCE SET; Schema: omgisaw; Owner: -
--

SELECT pg_catalog.setval('omgisaw.sighting_id_seq', 1, true);


--
-- Name: subject_id_seq; Type: SEQUENCE SET; Schema: omgisaw; Owner: -
--

SELECT pg_catalog.setval('omgisaw.subject_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--


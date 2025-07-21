--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2025-07-21 12:36:18

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16415)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    rating double precision,
    image text,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16414)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 216
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    fullname character varying(255) NOT NULL,
    dob date,
    email character varying(255) NOT NULL,
    mobile character varying(20),
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3181 (class 2604 OID 16418)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 16403)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3338 (class 0 OID 16415)
-- Dependencies: 217
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES (2, 'Dark Green Arrow Bow', 'Professional archery bow for heroes. For beginners.', 99.99, 5, 'https://cdn.pixabay.com/photo/2016/07/30/16/22/arrow-1557462_640.jpg', 2, '2025-07-21 10:17:54.558755', '2025-07-21 12:29:19.247736');
INSERT INTO public.products VALUES (5, 'Red Cape', 'Professional red cape ', 10.99, 4.5, 'https://cdn.pixabay.com/photo/2015/01/05/18/15/woman-589508_1280.jpg', 2, '2025-07-21 12:29:56.037332', '2025-07-21 12:30:25.710901');
INSERT INTO public.products VALUES (6, 'Elegant Arrows', 'Restock your arrows! Comes with 10 arrows.', 15.99, 4.9, ' https://cdn.pixabay.com/photo/2017/10/03/19/39/arrow-2813787_640.jpg', 2, '2025-07-21 12:31:05.819923', '2025-07-21 12:31:05.819923');


--
-- TOC entry 3336 (class 0 OID 16400)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Test User', NULL, 'test@example.com', NULL, 'testuser', 'hashedpassword', '2025-07-21 00:51:04.134587', '2025-07-21 00:51:04.134587');
INSERT INTO public.users VALUES (2, 'Oliver Queen', '1990-01-15', 'oliver@test.com', '90901111', 'oliverqueen', '$2b$10$B/CjWS0V/CBPiREIb7j/bOBNyO/VuNsS8ySH1U5CCcfHAZ2f0QQo.', '2025-07-21 00:56:15.090875', '2025-07-21 00:56:15.090875');
INSERT INTO public.users VALUES (3, 'John Diggle', '1991-01-01', 'john@test.com', '90902222', 'johndiggle', '$2b$10$15IG7R2SHLd9n0aCgR0bIuBHtkaD2s8L6/nlhWhx1WYJAaxp/u.Km', '2025-07-21 10:22:37.489919', '2025-07-21 10:22:37.489919');
INSERT INTO public.users VALUES (4, 'Barry Allen', '2008-01-01', 'barry@test.com', '90903333', 'barry', '$2b$10$gvJsXg6FwjI/G/q2YvOxZ.JGPybf1PNb0xppzZrNKF4KTvyPmduCS', '2025-07-21 11:30:01.710065', '2025-07-21 11:30:01.710065');


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 216
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 6, true);


--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 3191 (class 2606 OID 16425)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 16411)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3187 (class 2606 OID 16409)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 16413)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3192 (class 2606 OID 16435)
-- Name: products FK_176b502c5ebd6e72cafbd9d6f70; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-07-21 12:36:18

--
-- PostgreSQL database dump complete
--


--
-- PostgreSQL database dump
--

\restrict VJT67RYxRIIjU3T1zGiKmEx8tGk9SggRIJ0F3jbw92UTds85i5Fmgc3tqGeDu1x

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-11-07 02:40:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4996 (class 1262 OID 17243)
-- Name: sgce; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE sgce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Bolivia.utf8';


\unrestrict VJT67RYxRIIjU3T1zGiKmEx8tGk9SggRIJ0F3jbw92UTds85i5Fmgc3tqGeDu1x
\connect sgce
\restrict VJT67RYxRIIjU3T1zGiKmEx8tGk9SggRIJ0F3jbw92UTds85i5Fmgc3tqGeDu1x

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 870 (class 1247 OID 17281)
-- Name: rol_nombre_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.rol_nombre_enum AS ENUM (
    'ADMIN',
    'DOCENTE',
    'ESTUDIANTE'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 17297)
-- Name: curso; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.curso (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying,
    gestion character varying NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    "docenteId" integer
);


--
-- TOC entry 225 (class 1259 OID 17296)
-- Name: curso_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.curso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 225
-- Name: curso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.curso_id_seq OWNED BY public.curso.id;


--
-- TOC entry 220 (class 1259 OID 17258)
-- Name: docente; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.docente (
    id integer NOT NULL,
    titulo character varying,
    "usuarioId" integer
);


--
-- TOC entry 219 (class 1259 OID 17257)
-- Name: docente_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.docente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 219
-- Name: docente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.docente_id_seq OWNED BY public.docente.id;


--
-- TOC entry 218 (class 1259 OID 17245)
-- Name: estudiante; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.estudiante (
    id integer NOT NULL,
    codigo character varying NOT NULL,
    "usuarioId" integer
);


--
-- TOC entry 217 (class 1259 OID 17244)
-- Name: estudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.estudiante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 217
-- Name: estudiante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.estudiante_id_seq OWNED BY public.estudiante.id;


--
-- TOC entry 230 (class 1259 OID 17317)
-- Name: evaluacion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluacion (
    id integer NOT NULL,
    titulo character varying NOT NULL,
    tipo character varying NOT NULL,
    fecha date NOT NULL,
    ponderacion numeric(5,2) NOT NULL,
    "cursoId" integer
);


--
-- TOC entry 229 (class 1259 OID 17316)
-- Name: evaluacion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.evaluacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 229
-- Name: evaluacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.evaluacion_id_seq OWNED BY public.evaluacion.id;


--
-- TOC entry 228 (class 1259 OID 17307)
-- Name: inscripcion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inscripcion (
    id integer NOT NULL,
    fecha timestamp without time zone DEFAULT now() NOT NULL,
    "estudianteId" integer,
    "cursoId" integer
);


--
-- TOC entry 227 (class 1259 OID 17306)
-- Name: inscripcion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inscripcion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 227
-- Name: inscripcion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inscripcion_id_seq OWNED BY public.inscripcion.id;


--
-- TOC entry 232 (class 1259 OID 17326)
-- Name: nota; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nota (
    id integer NOT NULL,
    nota numeric(5,2) NOT NULL,
    feedback character varying,
    "evaluacionId" integer,
    "estudianteId" integer
);


--
-- TOC entry 231 (class 1259 OID 17325)
-- Name: nota_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.nota_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 231
-- Name: nota_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.nota_id_seq OWNED BY public.nota.id;


--
-- TOC entry 224 (class 1259 OID 17288)
-- Name: rol; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    nombre public.rol_nombre_enum NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 17287)
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 223
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;


--
-- TOC entry 222 (class 1259 OID 17269)
-- Name: usuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    apellido character varying NOT NULL,
    email character varying NOT NULL,
    password_hash character varying NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    "rolId" integer
);


--
-- TOC entry 221 (class 1259 OID 17268)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 4785 (class 2604 OID 17300)
-- Name: curso id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.curso ALTER COLUMN id SET DEFAULT nextval('public.curso_id_seq'::regclass);


--
-- TOC entry 4781 (class 2604 OID 17261)
-- Name: docente id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.docente ALTER COLUMN id SET DEFAULT nextval('public.docente_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 17248)
-- Name: estudiante id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.estudiante ALTER COLUMN id SET DEFAULT nextval('public.estudiante_id_seq'::regclass);


--
-- TOC entry 4789 (class 2604 OID 17320)
-- Name: evaluacion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluacion ALTER COLUMN id SET DEFAULT nextval('public.evaluacion_id_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 17310)
-- Name: inscripcion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscripcion ALTER COLUMN id SET DEFAULT nextval('public.inscripcion_id_seq'::regclass);


--
-- TOC entry 4790 (class 2604 OID 17329)
-- Name: nota id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nota ALTER COLUMN id SET DEFAULT nextval('public.nota_id_seq'::regclass);


--
-- TOC entry 4784 (class 2604 OID 17291)
-- Name: rol id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 17272)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 4984 (class 0 OID 17297)
-- Dependencies: 226
-- Data for Name: curso; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.curso (id, nombre, descripcion, gestion, activo, "docenteId") FROM stdin;
\.


--
-- TOC entry 4978 (class 0 OID 17258)
-- Dependencies: 220
-- Data for Name: docente; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.docente (id, titulo, "usuarioId") FROM stdin;
\.


--
-- TOC entry 4976 (class 0 OID 17245)
-- Dependencies: 218
-- Data for Name: estudiante; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.estudiante (id, codigo, "usuarioId") FROM stdin;
\.


--
-- TOC entry 4988 (class 0 OID 17317)
-- Dependencies: 230
-- Data for Name: evaluacion; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.evaluacion (id, titulo, tipo, fecha, ponderacion, "cursoId") FROM stdin;
\.


--
-- TOC entry 4986 (class 0 OID 17307)
-- Dependencies: 228
-- Data for Name: inscripcion; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inscripcion (id, fecha, "estudianteId", "cursoId") FROM stdin;
\.


--
-- TOC entry 4990 (class 0 OID 17326)
-- Dependencies: 232
-- Data for Name: nota; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.nota (id, nota, feedback, "evaluacionId", "estudianteId") FROM stdin;
\.


--
-- TOC entry 4982 (class 0 OID 17288)
-- Dependencies: 224
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rol (id, nombre) FROM stdin;
1	ADMIN
2	DOCENTE
3	ESTUDIANTE
\.


--
-- TOC entry 4980 (class 0 OID 17269)
-- Dependencies: 222
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuario (id, nombre, apellido, email, password_hash, activo, "rolId") FROM stdin;
1	Admin	SGCE	admin@sgce.com	$2b$10$zTGlKUOql21ibhUqDFAJTump2FryWcuwnUOtzC7tQf5YLlZYY/Etm	t	1
3	Carlos	Fernandez	carlos@example.com	$2b$10$ckLGyvvR3B01vsh1UrUhYezmrq7TjbrlKUCdfJnJ2Nhh6.XMTn5kq	t	2
5	alvaro	figeroa	alvaro@sgce.com	$2b$10$Y9keNnP7EghlPJaro9YnRur7RwyXvHq8y8t0WBlUpn3mS3f1aqNeW	t	3
2	Tania	Gómez	maria@sgce.com	$2b$10$UPm1avfdSCW.q0MZycRz..5WFS8TaqEf0HYw/GTZhEIVTrp/Fbyq.	t	2
\.


--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 225
-- Name: curso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.curso_id_seq', 1, false);


--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 219
-- Name: docente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.docente_id_seq', 1, false);


--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 217
-- Name: estudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.estudiante_id_seq', 1, false);


--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 229
-- Name: evaluacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.evaluacion_id_seq', 1, false);


--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 227
-- Name: inscripcion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inscripcion_id_seq', 1, false);


--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 231
-- Name: nota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.nota_id_seq', 1, false);


--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 223
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rol_id_seq', 3, true);


--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuario_id_seq', 5, true);


--
-- TOC entry 4818 (class 2606 OID 17333)
-- Name: nota PK_0b416af9c0ccf8deed7b568b5ae; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nota
    ADD CONSTRAINT "PK_0b416af9c0ccf8deed7b568b5ae" PRIMARY KEY (id);


--
-- TOC entry 4810 (class 2606 OID 17305)
-- Name: curso PK_76073a915621326fb85f28ecc5d; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.curso
    ADD CONSTRAINT "PK_76073a915621326fb85f28ecc5d" PRIMARY KEY (id);


--
-- TOC entry 4816 (class 2606 OID 17324)
-- Name: evaluacion PK_7dfbeff9d39651e98d382682f5e; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT "PK_7dfbeff9d39651e98d382682f5e" PRIMARY KEY (id);


--
-- TOC entry 4802 (class 2606 OID 17277)
-- Name: usuario PK_a56c58e5cabaa04fb2c98d2d7e2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY (id);


--
-- TOC entry 4798 (class 2606 OID 17265)
-- Name: docente PK_badad2b3623effea5d5d5b244c4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.docente
    ADD CONSTRAINT "PK_badad2b3623effea5d5d5b244c4" PRIMARY KEY (id);


--
-- TOC entry 4812 (class 2606 OID 17313)
-- Name: inscripcion PK_bdff6201e066cec231d770912bb; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscripcion
    ADD CONSTRAINT "PK_bdff6201e066cec231d770912bb" PRIMARY KEY (id);


--
-- TOC entry 4792 (class 2606 OID 17252)
-- Name: estudiante PK_c7507c4641e36b102952aefc33b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT "PK_c7507c4641e36b102952aefc33b" PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 17293)
-- Name: rol PK_c93a22388638fac311781c7f2dd; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY (id);


--
-- TOC entry 4794 (class 2606 OID 17256)
-- Name: estudiante REL_5d941817a8a51e3a514cd414e8; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT "REL_5d941817a8a51e3a514cd414e8" UNIQUE ("usuarioId");


--
-- TOC entry 4800 (class 2606 OID 17267)
-- Name: docente REL_9bb4565bc671073bed5f7e9579; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.docente
    ADD CONSTRAINT "REL_9bb4565bc671073bed5f7e9579" UNIQUE ("usuarioId");


--
-- TOC entry 4796 (class 2606 OID 17254)
-- Name: estudiante UQ_13ef92e00f9bc471b927c431231; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT "UQ_13ef92e00f9bc471b927c431231" UNIQUE (codigo);


--
-- TOC entry 4804 (class 2606 OID 17279)
-- Name: usuario UQ_2863682842e688ca198eb25c124; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE (email);


--
-- TOC entry 4814 (class 2606 OID 17315)
-- Name: inscripcion UQ_6a053bd04a6eca98a086e6d3af1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscripcion
    ADD CONSTRAINT "UQ_6a053bd04a6eca98a086e6d3af1" UNIQUE ("estudianteId", "cursoId");


--
-- TOC entry 4808 (class 2606 OID 17295)
-- Name: rol UQ_9792c580a992d554ee1621c5b45; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "UQ_9792c580a992d554ee1621c5b45" UNIQUE (nombre);


--
-- TOC entry 4820 (class 2606 OID 17335)
-- Name: nota UQ_e953f6c314ae054d643d3101a62; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nota
    ADD CONSTRAINT "UQ_e953f6c314ae054d643d3101a62" UNIQUE ("evaluacionId", "estudianteId");


--
-- TOC entry 4825 (class 2606 OID 17361)
-- Name: inscripcion FK_2157ab3b92fa4d35f850cfb4be1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscripcion
    ADD CONSTRAINT "FK_2157ab3b92fa4d35f850cfb4be1" FOREIGN KEY ("cursoId") REFERENCES public.curso(id) ON DELETE CASCADE;


--
-- TOC entry 4824 (class 2606 OID 17351)
-- Name: curso FK_3cceff1843ab79bb542b0f37729; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.curso
    ADD CONSTRAINT "FK_3cceff1843ab79bb542b0f37729" FOREIGN KEY ("docenteId") REFERENCES public.docente(id) ON DELETE RESTRICT;


--
-- TOC entry 4826 (class 2606 OID 17356)
-- Name: inscripcion FK_48627f6fd1f0e55988a7e8d4fd3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscripcion
    ADD CONSTRAINT "FK_48627f6fd1f0e55988a7e8d4fd3" FOREIGN KEY ("estudianteId") REFERENCES public.estudiante(id) ON DELETE CASCADE;


--
-- TOC entry 4828 (class 2606 OID 17376)
-- Name: nota FK_4c8b6125973b1789c358afcefa7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nota
    ADD CONSTRAINT "FK_4c8b6125973b1789c358afcefa7" FOREIGN KEY ("estudianteId") REFERENCES public.estudiante(id) ON DELETE CASCADE;


--
-- TOC entry 4829 (class 2606 OID 17371)
-- Name: nota FK_58f14830d0581d8ef857b1a145f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nota
    ADD CONSTRAINT "FK_58f14830d0581d8ef857b1a145f" FOREIGN KEY ("evaluacionId") REFERENCES public.evaluacion(id) ON DELETE CASCADE;


--
-- TOC entry 4821 (class 2606 OID 17336)
-- Name: estudiante FK_5d941817a8a51e3a514cd414e86; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT "FK_5d941817a8a51e3a514cd414e86" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- TOC entry 4823 (class 2606 OID 17346)
-- Name: usuario FK_611daf5befc024d9e0bd7bdf4da; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "FK_611daf5befc024d9e0bd7bdf4da" FOREIGN KEY ("rolId") REFERENCES public.rol(id);


--
-- TOC entry 4827 (class 2606 OID 17366)
-- Name: evaluacion FK_62575129f04b643b52ee1e722d0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT "FK_62575129f04b643b52ee1e722d0" FOREIGN KEY ("cursoId") REFERENCES public.curso(id) ON DELETE CASCADE;


--
-- TOC entry 4822 (class 2606 OID 17341)
-- Name: docente FK_9bb4565bc671073bed5f7e9579c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.docente
    ADD CONSTRAINT "FK_9bb4565bc671073bed5f7e9579c" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id) ON DELETE CASCADE;


-- Completed on 2025-11-07 02:40:43

--
-- PostgreSQL database dump complete
--

\unrestrict VJT67RYxRIIjU3T1zGiKmEx8tGk9SggRIJ0F3jbw92UTds85i5Fmgc3tqGeDu1x


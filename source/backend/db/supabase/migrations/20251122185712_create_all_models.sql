--
-- PostgreSQL database dump
--

-- \restrict uWNwsJ3MVy0kblxDQKCVKutSwCmjaWa9AKRvhdkvRjbNfHD2C4BcwoQwHwfNMiA

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

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
-- Name: MenuItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MenuItems" (
    "itemID" integer NOT NULL,
    "restID" integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    description text,
    category character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: MenuItems_itemID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."MenuItems_itemID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: MenuItems_itemID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."MenuItems_itemID_seq" OWNED BY public."MenuItems"."itemID";


--
-- Name: Restaurants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Restaurants" (
    "restID" integer NOT NULL,
    "userID" integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    tags character varying(255)[] DEFAULT ARRAY['no-tags-created'::character varying(255)],
    description text,
    open_hours text,
    logo character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Restaurants_restID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Restaurants_restID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Restaurants_restID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Restaurants_restID_seq" OWNED BY public."Restaurants"."restID";


--
-- Name: Schedules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Schedules" (
    "restID" integer NOT NULL,
    day integer NOT NULL,
    open double precision NOT NULL,
    close double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    "userID" integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Users_userID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Users_userID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Users_userID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Users_userID_seq" OWNED BY public."Users"."userID";


--
-- Name: MenuItems itemID; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MenuItems" ALTER COLUMN "itemID" SET DEFAULT nextval('public."MenuItems_itemID_seq"'::regclass);


--
-- Name: Restaurants restID; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Restaurants" ALTER COLUMN "restID" SET DEFAULT nextval('public."Restaurants_restID_seq"'::regclass);


--
-- Name: Users userID; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users" ALTER COLUMN "userID" SET DEFAULT nextval('public."Users_userID_seq"'::regclass);


--
-- Name: MenuItems MenuItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MenuItems"
    ADD CONSTRAINT "MenuItems_pkey" PRIMARY KEY ("itemID", "restID");


--
-- Name: Restaurants Restaurants_address_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Restaurants"
    ADD CONSTRAINT "Restaurants_address_key" UNIQUE (address);


--
-- Name: Restaurants Restaurants_phone_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Restaurants"
    ADD CONSTRAINT "Restaurants_phone_key" UNIQUE (phone);


--
-- Name: Restaurants Restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Restaurants"
    ADD CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("restID");


--
-- Name: Schedules Schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Schedules"
    ADD CONSTRAINT "Schedules_pkey" PRIMARY KEY ("restID", day);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userID");


--
-- Name: MenuItems MenuItems_restID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MenuItems"
    ADD CONSTRAINT "MenuItems_restID_fkey" FOREIGN KEY ("restID") REFERENCES public."Restaurants"("restID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Restaurants Restaurants_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Restaurants"
    ADD CONSTRAINT "Restaurants_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."Users"("userID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Schedules Schedules_restID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Schedules"
    ADD CONSTRAINT "Schedules_restID_fkey" FOREIGN KEY ("restID") REFERENCES public."Restaurants"("restID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

-- \unrestrict uWNwsJ3MVy0kblxDQKCVKutSwCmjaWa9AKRvhdkvRjbNfHD2C4BcwoQwHwfNMiA


--
-- Name: FP_Walls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FP_Walls" (
    "restID" integer NOT NULL,
    points JSON[] NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: FP_Tables; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FP_Tables" (
    "tableID" integer NOT NULL,
    "restID" integer NOT NULL,
    position JSON NOT NULL,
    rotation double precision NOT NULL,
    capacity integer NOT NULL,
    reservable boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: FP_Tables_tableID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."FP_Tables_tableID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: FP_Tables_tableID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."FP_Tables_tableID_seq" OWNED BY public."FP_Tables"."tableID";


--
-- Name: FP_Misc; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FP_Misc" (
    "miscID" integer NOT NULL,
    "restID" integer NOT NULL,
    position JSON NOT NULL,
    rotation double precision NOT NULL,
    type character varying(255) NOT NULL,
    data JSON NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: FP_Misc_miscID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."FP_Misc_miscID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: FP_Misc_miscID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."FP_Misc_miscID_seq" OWNED BY public."FP_Misc"."miscID";



--
-- Name: FP_Tables tableID; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FP_Tables" ALTER COLUMN "tableID" SET DEFAULT nextval('public."FP_Tables_tableID_seq"'::regclass);


--
-- Name: FP_Misc miscID; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FP_Misc" ALTER COLUMN "miscID" SET DEFAULT nextval('public."FP_Misc_miscID_seq"'::regclass);


--
-- Name: FP_Walls FP_Walls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FP_Walls"
    ADD CONSTRAINT "FP_Walls_pkey" PRIMARY KEY ("restID");


--
-- Name: FP_Tables FP_Tables_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FP_Tables"
    ADD CONSTRAINT "FP_Tables_pkey" PRIMARY KEY ("tableID", "restID");


--
-- Name: FP_Misc FP_Misc_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FP_Misc"
    ADD CONSTRAINT "FP_Misc_pkey" PRIMARY KEY ("miscID", "restID");


--
-- Name: FP_Walls FP_Walls_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FP_Walls"
    ADD CONSTRAINT "FP_Walls_restID_fkey" FOREIGN KEY ("restID") REFERENCES public."Restaurants"("restID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FP_Tables FP_Tables_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FP_Tables"
    ADD CONSTRAINT "FP_Tables_restID_fkey" FOREIGN KEY ("restID") REFERENCES public."Restaurants"("restID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FP_Misc FP_Misc_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FP_Misc"
    ADD CONSTRAINT "FP_Misc_restID_fkey" FOREIGN KEY ("restID") REFERENCES public."Restaurants"("restID") ON UPDATE CASCADE ON DELETE CASCADE;


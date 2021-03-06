PGDMP     ;    #                y            or    13.2    13.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    25191    or    DATABASE     c   CREATE DATABASE "or" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Croatian_Croatia.1250';
    DROP DATABASE "or";
                postgres    false            ?            1259    25200    auti    TABLE     ?  CREATE TABLE public.auti (
    naziv character varying NOT NULL,
    marka character varying,
    model character varying,
    gorivo character varying,
    godinaproizvodnje character varying,
    snagamotora character varying,
    maxbrzina character varying,
    masa character varying,
    potrosnjagoriva character varying,
    mjenjac character varying,
    id integer NOT NULL
);
    DROP TABLE public.auti;
       public         heap    postgres    false            ?            1259    49773    auti_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.auti_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.auti_id_seq;
       public          postgres    false    200            ?           0    0    auti_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.auti_id_seq OWNED BY public.auti.id;
          public          postgres    false    202            ?            1259    49808    slike    TABLE     P   CREATE TABLE public.slike (
    image character varying,
    auto_id integer
);
    DROP TABLE public.slike;
       public         heap    postgres    false            ?            1259    41582    v    VIEW     ?  CREATE VIEW public.v AS
 SELECT array_to_json(array_agg(row_to_json(auti.*))) AS array_to_json
   FROM ( SELECT auti_1.naziv,
            auti_1.marka,
            auti_1.model,
            auti_1.gorivo,
            auti_1.godinaproizvodnje,
            auti_1.snagamotora,
            auti_1.maxbrzina,
            auti_1.masa,
            auti_1.potrosnjagoriva,
            auti_1.mjenjac
           FROM public.auti auti_1) auti;
    DROP VIEW public.v;
       public          postgres    false    200    200    200    200    200    200    200    200    200    200            ,           2604    49775    auti id    DEFAULT     b   ALTER TABLE ONLY public.auti ALTER COLUMN id SET DEFAULT nextval('public.auti_id_seq'::regclass);
 6   ALTER TABLE public.auti ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    200            ?          0    25200    auti 
   TABLE DATA           ?   COPY public.auti (naziv, marka, model, gorivo, godinaproizvodnje, snagamotora, maxbrzina, masa, potrosnjagoriva, mjenjac, id) FROM stdin;
    public          postgres    false    200   ?       ?          0    49808    slike 
   TABLE DATA           /   COPY public.slike (image, auto_id) FROM stdin;
    public          postgres    false    203   ?       ?           0    0    auti_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.auti_id_seq', 10, true);
          public          postgres    false    202            .           2606    25207    auti auti_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.auti
    ADD CONSTRAINT auti_pkey PRIMARY KEY (naziv);
 8   ALTER TABLE ONLY public.auti DROP CONSTRAINT auti_pkey;
       public            postgres    false    200            0           2606    49807    auti c1 
   CONSTRAINT     @   ALTER TABLE ONLY public.auti
    ADD CONSTRAINT c1 UNIQUE (id);
 1   ALTER TABLE ONLY public.auti DROP CONSTRAINT c1;
       public            postgres    false    200            1           2606    49814    slike slike_auto_id_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public.slike
    ADD CONSTRAINT slike_auto_id_fkey FOREIGN KEY (auto_id) REFERENCES public.auti(id);
 B   ALTER TABLE ONLY public.slike DROP CONSTRAINT slike_auto_id_fkey;
       public          postgres    false    2864    203    200            ?   ?  x?u?Mn?0???S?2]D!)J??q?????8?a$?"?gPr???UV?ǵ]??y|o???H??*????0??"?«?7]M?2	???|cQ=???8(v?|????QZT?]S????R[??A?8~l?????4??inq?s????x!???9??????rS?t?*U5?7_?B?I????o`???ǽG?͹?$?6ՙn??/?i???T8??9?r4aqo??h?y??It?Q???Jd??Ra?d??&8M??Eg??_?)C>̱????"p!???'???7?仩T?_???
???3?????,?=???ec3\6????3>??y׸U???~?????????s^?o.??6??>?V??8W??t`?tbr????aK???m?k?????g?-L8??&bHڧ???}?z|?'?U՟6????$?h?zb????G??F	\      ?   ?  x?M??n?0D??W?&?T%??????h?(
????H?????Y????<3?ǝ??W\<9&?K??u??<|???GLS?g?2Q?s?q???dk??_?J?rD?϶\<ȡ?Nwl???J<>}C6??@NQ?T/??m[8+]??J??&Dk3?+D???^b???f?V?	?V???\??*;?S3?w???Ai????
|"<Km???բ?????~????T?s??l\7V?F????Ze몶???sd#?T?l݈?=*Ĩ?c???,Ϳ??????<?W?C?2??l;?Ѱ??n?g(??dpo???HF???w{"?xI??"]?? s??Z?GGoI#ī?W??A*|?8J.A???P?n????di2?M&oU$?N??.???B?#???     
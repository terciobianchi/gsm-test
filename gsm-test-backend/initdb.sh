#!/bin/bash
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d "$POSTGRES_DB"  <<-EOSQL
     create table public.todos (
        id serial primary key,
        done boolean not null default false,
        task text not null,
        due timestamptz
     );
EOSQL
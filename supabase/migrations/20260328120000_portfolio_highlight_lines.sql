-- Optional case-study highlight lines (shown on portfolio cards). Run once if your DB was created before this migration.

alter table "Portfolio" add column if not exists highlight_line1 text;
alter table "Portfolio" add column if not exists highlight_line2 text;
alter table "Portfolio" add column if not exists highlight_line3 text;

comment on column "Portfolio".highlight_line1 is 'e.g. Education Platform • UAE Market';
comment on column "Portfolio".highlight_line2 is 'e.g. 92% Employment Outcome Focus';
comment on column "Portfolio".highlight_line3 is 'e.g. Built for Lead Conversion';

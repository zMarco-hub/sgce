PGPASSWORD=2312xD dropdb -h localhost -U postgres -p 5432 sgce
PGPASSWORD=2312xD createdb -h localhost -U postgres -p 5432 sgce
PGPASSWORD=2312xD psql -h localhost -p 5432 -U postgres -d sgce -f sgce.sql
PGPASSWORD=2312xD psql -h localhost -p 5432 -U postgres -d sgce -f datos.sql
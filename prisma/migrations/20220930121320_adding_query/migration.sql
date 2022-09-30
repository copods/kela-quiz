-- This is an empty migration.
-- This is an empty migration.
-- This is an empty migration.
-- This is an empty migration.
-- This is an empty migration.
Create or replace function random_string(length integer) returns text as
$$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$ language plpgsql;
----------

DO $$
DECLARE 
  nameVar varchar='aabcd1234';
  userIdVar varchar;
  firstNameVar varchar;
  roleIDVar varchar;
  random_id varchar;
  userWorkspaceId varchar;
  userList record;
BEGIN
    -- UPDATE "User" SET "firstName"=nameVar where email='careers@copods.co';
    
    FOR userList in SELECT *  FROM "User" LOOP
    random_id=random_string(25);
    userWorkspaceId=random_string(25);
      --  UPDATE "User" SET "firstName"=userList.id where userList.email='careers@copods.co';
      -- UPDATE "User" SET "lastName"=userList."roleId" where userList.email='careers@copods.co';
      -- UPDATE "User" SET "email"=userList."firstName" where userList.email='careers@copods.co';
      
      PERFORM * FROM "UserWorkspace" where "userId"=userList.id;
      IF NOT FOUND THEN
        -- UPDATE "User" SET "firstName"=userList.id where userList.email='careers@copods.co';
        userIdVar =  userList.id;
        firstNameVar =  userList."firstName";
        roleIDVar =  userList."roleId";
        INSERT INTO "Workspace" ("id", "createdById","name","updatedAt") VALUES (random_id,userIdVar,firstNameVar, current_timestamp);
        INSERT INTO "UserWorkspace" ("id","workspaceId","userId","roleId","isDefault","updatedAt") VALUES (userWorkspaceId,random_id,userIdVar,roleIDVar,TRUE,current_timestamp);
      END IF;
    END LOOP;  
END; $$;


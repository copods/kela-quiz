DO $$
DECLARE 
  userIdVar varchar;
  userIdCopods varchar;
  userList record;
  u1 record;
  u2 record;
  userList1 record;
  userWorkspaceId varchar;
  roleIDVar varchar;
  userList2 record;
BEGIN
    FOR userList in SELECT *  FROM "User" LOOP
      PERFORM * FROM "User" where userList."email"='careers@copods.co';
      if found THEN
        FOR userList1 in SELECT *  FROM "Workspace" LOOP
          PERFORM * From "Workspace" where userList1."createdById"=userList.id;
            raise notice 'fsdsd';
            if found THEN
              raise notice 'ssdf ';
              userIdCopods=userList1."id";
              raise notice 'swefsdf %',userIdCopods;
            end if;  
        end loop;    
      END IF;
    END LOOP; 
    for u1 in select * from "User" LOOP
      userWorkspaceId=random_string();  
      PERFORM * from "User" where u1."email"='careers@copods.co';
      if not found then
        userIdVar=u1."id";
        roleIDVar=u1."roleId";
        INSERT INTO "UserWorkspace" ("id","workspaceId","userId","roleId","isDefault","updatedAt") VALUES (userWorkspaceId,userIdCopods,userIdVar,roleIDVar,FALSE,current_timestamp);
      end if;
    end loop;
END; $$;
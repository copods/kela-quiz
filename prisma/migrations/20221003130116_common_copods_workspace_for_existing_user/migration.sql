DO $$
DECLARE 
  userIdVar varchar;
  userIdCopods varchar;
  userList record;
  workspaceList record;
  userWorkspaceId varchar;
  roleIDVar varchar;
BEGIN
    FOR userList in SELECT *  FROM "User" LOOP
      PERFORM * FROM "User" where userList."email"='careers@copods.co';
      if found THEN
        FOR workspaceList in SELECT *  FROM "Workspace" LOOP
          PERFORM * From "Workspace" where workspaceList."createdById"=userList.id;
            if found THEN
              userIdCopods=workspaceList."id";
            end if;  
        end loop;    
      END IF;
    END LOOP; 
    for userList in select * from "User" LOOP
      userWorkspaceId=random_string();  
      PERFORM * from "User" where userList."email"='careers@copods.co';
      if not found then
        userIdVar=userList."id";
        roleIDVar=userList."roleId";
        INSERT INTO "UserWorkspace" ("id","workspaceId","userId","roleId","isDefault","updatedAt") VALUES (userWorkspaceId,userIdCopods,userIdVar,roleIDVar,FALSE,current_timestamp);
      end if;
    end loop;
END; $$;

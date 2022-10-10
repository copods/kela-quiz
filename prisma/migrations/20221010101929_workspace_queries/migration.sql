DO $$
DECLARE 
  workspaceId varchar;
  userWorkspaceId varchar;
  userList record;
BEGIN
    FOR userList in SELECT *  FROM "User" LOOP
      workspaceId=gen_random_uuid();
      userWorkspaceId=gen_random_uuid();  
      PERFORM * FROM "UserWorkspace" where "userId"=userList."id" AND "isDefault"=FALSE;
      IF NOT FOUND THEN
        INSERT INTO "Workspace" ("id", "createdById","name","updatedAt") VALUES (workspaceId,userList."id",userList."firstName", current_timestamp);
        INSERT INTO "UserWorkspace" ("id","workspaceId","userId","roleId","isDefault","updatedAt") VALUES (userWorkspaceId,workspaceId,userList."id",userList."roleId",TRUE,current_timestamp);
      END IF;
    END LOOP;  
END; $$;

-----common workspace-------
DO $$
DECLARE 
  workspaceIdCopods varchar;
  userList record;
  workspaceList record;
  userWorkspaceId varchar;
BEGIN
    FOR userList in SELECT *  FROM "User" LOOP
      PERFORM * FROM "User" where userList."email"='careers@copods.co';
      if found THEN
        FOR workspaceList in SELECT *  FROM "Workspace" LOOP
          PERFORM * From "Workspace" where workspaceList."createdById"=userList."id";
            if found THEN
              workspaceIdCopods=workspaceList."id";
            end if;  
        end loop;    
      END IF;
    END LOOP; 
    for userList in select * from "User" LOOP
      userWorkspaceId=gen_random_uuid();  
      PERFORM * from "User" where userList."email"='careers@copods.co';
      if not found then
        INSERT INTO "UserWorkspace" ("id","workspaceId","userId","roleId","isDefault","updatedAt") VALUES (userWorkspaceId,workspaceIdCopods,userList."id",userList."roleId",FALSE,current_timestamp);
      end if;
    end loop;
END; $$;

-----section-------

DO $$
DECLARE 
  workspaceIdCopods varchar;
  userList record;
  workspaceList record;
  sectionList record;
BEGIN
    FOR userList in SELECT *  FROM "User" LOOP
      PERFORM * FROM "User" where userList."email"='careers@copods.co';
      if found THEN
        FOR workspaceList in SELECT *  FROM "Workspace" LOOP
          PERFORM * From "Workspace" where workspaceList."createdById"=userList."id";
            if found THEN
              workspaceIdCopods=workspaceList."id";
            end if;  
        end loop;    
      END IF;
    END LOOP; 
    for sectionList in select * from "Section" LOOP
          update "Section"
          set "workspaceId"=workspaceIdCopods;
    end loop;
END; $$;


------test-------

DO $$
DECLARE 
  workspaceIdCopods varchar;
  userList record;
  workspaceList record;
  testList record;
BEGIN
    FOR userList in SELECT *  FROM "User" LOOP
      PERFORM * FROM "User" where userList."email"='careers@copods.co';
      if found THEN
        FOR workspaceList in SELECT *  FROM "Workspace" LOOP
          PERFORM * From "Workspace" where workspaceList."createdById"=userList."id";
            if found THEN
              workspaceIdCopods=workspaceList."id";
            end if;  
        end loop;    
      END IF;
    END LOOP; 
    for testList in select * from "Test" LOOP
          update "Test"
          set "workspaceId"=workspaceIdCopods;
    end loop;
END; $$;

-------result---------

DO $$
DECLARE 
  workspaceIdCopods varchar;
  userList record;
  workspaceList record;
  resultList record;
BEGIN
    FOR userList in SELECT *  FROM "User" LOOP
      PERFORM * FROM "User" where userList."email"='careers@copods.co';
      if found THEN
        FOR workspaceList in SELECT *  FROM "Workspace" LOOP
          PERFORM * From "Workspace" where workspaceList."createdById"=userList.id;
            if found THEN
              workspaceIdCopods=workspaceList."id";
            end if;  
        end loop;    
      END IF;
    END LOOP; 
    for resultList in select * from "CandidateResult" LOOP
          update "CandidateResult"
          set "workspaceId"=workspaceIdCopods;
    end loop;
END; $$;


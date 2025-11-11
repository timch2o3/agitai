package org.agitlab.agitai.workspace;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "workspaces")
public class Workspace {

    private String id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public WorkspaceDTO toDTO() {
        return new WorkspaceDTO(this.name);
    }
}

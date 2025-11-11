package org.agitlab.agitai.workspace;

public class WorkspaceDTO {

    private String name;

    public WorkspaceDTO() {
    }

    public WorkspaceDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

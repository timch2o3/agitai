package org.agitlab.agitai.workspace;

public class CreateWorkspaceRequest {

    private String name;

    public CreateWorkspaceRequest() {
    }

    public CreateWorkspaceRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

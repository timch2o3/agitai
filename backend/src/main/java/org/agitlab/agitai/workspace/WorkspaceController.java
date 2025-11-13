package org.agitlab.agitai.workspace;

import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WorkspaceController {

    public WorkspaceController(WorkspaceServiceImpl workspaceService) {
        this.workspaceService = workspaceService;
    }

    private final WorkspaceService workspaceService;

    @GetMapping("/api/users/{email}/workspaces")
    public ResponseEntity<List<WorkspaceDTO>> getUserWorkspaces(@PathVariable String email) {
        return ResponseEntity.ok(workspaceService.findUserWorkspaces(email));
    }

    @PostMapping("/api/workspaces")
    public ResponseEntity<WorkspaceDTO> createWorkspace(@RequestBody CreateWorkspaceRequest request) {
        Workspace workspace = new Workspace();
        workspace.setName(request.getName());

        Workspace savedWorkspace = workspaceService.save(workspace);
        return ResponseEntity.ok(savedWorkspace.toDTO());
    }
}

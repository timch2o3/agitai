package org.agitlab.agitai.workspace;

import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
}

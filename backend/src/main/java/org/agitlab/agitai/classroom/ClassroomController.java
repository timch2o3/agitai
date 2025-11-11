package org.agitlab.agitai.classroom;

import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClassroomController {

    @Resource
    private ClassroomService classroomService;

    @GetMapping("/api/workspaces/{workspaceId}/classrooms")
    public ResponseEntity<List<Classroom>> getClassroomsByWorkspace(@PathVariable String workspaceId) {
        List<Classroom> classrooms = classroomService.findByWorkspaceId(workspaceId);
        return ResponseEntity.ok(classrooms);
    }
}

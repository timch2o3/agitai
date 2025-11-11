package org.agitlab.agitai.classroom;

import java.util.List;
import java.util.Optional;

public interface ClassroomService {

    List<Classroom> findAll();

    Optional<Classroom> findById(String id);

    List<Classroom> findByWorkspaceId(String workspaceId);

    Classroom save(Classroom classroom);

    void deleteById(String id);
}

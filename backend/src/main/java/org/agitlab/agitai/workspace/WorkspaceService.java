package org.agitlab.agitai.workspace;

import java.util.List;
import java.util.Optional;

public interface WorkspaceService {

    List<Workspace> findAll();

    Optional<Workspace> findById(String id);

    Workspace save(Workspace workspace);

    void deleteById(String id);

    List<WorkspaceDTO> findUserWorkspaces(String email);
}

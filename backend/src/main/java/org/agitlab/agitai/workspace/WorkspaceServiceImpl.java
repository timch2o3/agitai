package org.agitlab.agitai.workspace;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;

    public WorkspaceServiceImpl(WorkspaceRepository workspaceRepository, WorkspaceMemberRepository workspaceMemberRepository) {
        this.workspaceRepository = workspaceRepository;
        this.workspaceMemberRepository = workspaceMemberRepository;
    }

    @Override
    public List<Workspace> findAll() {
        return workspaceRepository.findAll();
    }

    @Override
    public Optional<Workspace> findById(String id) {
        return workspaceRepository.findById(id);
    }

    @Override
    public Workspace save(Workspace workspace) {
        return workspaceRepository.save(workspace);
    }

    @Override
    public void deleteById(String id) {
        workspaceRepository.deleteById(id);
    }

    @Override
    public List<WorkspaceDTO> findUserWorkspaces(String email) {
        // 1. 멤버십 조회 (인덱스: email)
        List<WorkspaceMember> members =
                workspaceMemberRepository.findByEmail(email);

        if (members.isEmpty()) {
            return Collections.emptyList();
        }

        // 2. Workspace 일괄 조회 (인덱스: _id)
        List<String> workspaceIds = members.stream()
                .map(WorkspaceMember::getWorkspaceId)
                .toList();

        List<Workspace> workspaces =
                workspaceRepository.findAllById(workspaceIds);

        // 3. 결합 (메모리에서)
        return workspaces.stream().map(Workspace::toDTO).toList();
    }
}

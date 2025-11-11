package org.agitlab.agitai.classroom;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    private final ClassroomRepository classroomRepository;

    public ClassroomServiceImpl(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    @Override
    public List<Classroom> findAll() {
        return classroomRepository.findAll();
    }

    @Override
    public Optional<Classroom> findById(String id) {
        return classroomRepository.findById(id);
    }

    @Override
    public List<Classroom> findByWorkspaceId(String workspaceId) {
        return classroomRepository.findByWorkspaceId(workspaceId);
    }

    @Override
    public Classroom save(Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    @Override
    public void deleteById(String id) {
        classroomRepository.deleteById(id);
    }
}

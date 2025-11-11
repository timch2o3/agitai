package org.agitlab.agitai.classroom;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ClassroomRepository extends MongoRepository<Classroom, String> {

    List<Classroom> findByWorkspaceId(String workspaceId);

}

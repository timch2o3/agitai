package org.agitlab.agitai.workspace;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkspaceMemberRepository extends MongoRepository<WorkspaceMember, String> {

    List<WorkspaceMember> findByEmail(String email);
}

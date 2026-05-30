package com.secureshop.backend.repository;


import com.secureshop.backend.model.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

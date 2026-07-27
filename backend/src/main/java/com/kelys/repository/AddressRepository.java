package com.kelys.repository;

import com.kelys.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserIdOrderByIsDefaultDesc(Long userId);
    Optional<Address> findByUserIdAndIsDefaultTrue(Long userId);
    List<Address> findByUserId(Long userId);
}

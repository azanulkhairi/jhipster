package com.fpt.example.service;

import com.fpt.example.domain.Leave;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Leave}.
 */
public interface LeaveService {

    /**
     * Save a leave.
     *
     * @param leave the entity to save.
     * @return the persisted entity.
     */
    Leave save(Leave leave);

    /**
     * Get all the leaves.
     *
     * @return the list of entities.
     */
    List<Leave> findAll();
    /**
     * Get all the LeaveDTO where Employee is {@code null}.
     *
     * @return the list of entities.
     */
    List<Leave> findAllWhereEmployeeIsNull();


    /**
     * Get the "id" leave.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Leave> findOne(Long id);

    /**
     * Delete the "id" leave.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

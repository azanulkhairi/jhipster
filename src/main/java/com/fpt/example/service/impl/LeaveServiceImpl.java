package com.fpt.example.service.impl;

import com.fpt.example.service.LeaveService;
import com.fpt.example.domain.Leave;
import com.fpt.example.repository.LeaveRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Leave}.
 */
@Service
@Transactional
public class LeaveServiceImpl implements LeaveService {

    private final Logger log = LoggerFactory.getLogger(LeaveServiceImpl.class);

    private final LeaveRepository leaveRepository;

    public LeaveServiceImpl(LeaveRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    /**
     * Save a leave.
     *
     * @param leave the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Leave save(Leave leave) {
        log.debug("Request to save Leave : {}", leave);
        return leaveRepository.save(leave);
    }

    /**
     * Get all the leaves.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Leave> findAll() {
        log.debug("Request to get all Leaves");
        return leaveRepository.findAll();
    }



    /**
    *  Get all the leaves where Employee is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Leave> findAllWhereEmployeeIsNull() {
        log.debug("Request to get all leaves where Employee is null");
        return StreamSupport
            .stream(leaveRepository.findAll().spliterator(), false)
            .filter(leave -> leave.getEmployee() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one leave by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Leave> findOne(Long id) {
        log.debug("Request to get Leave : {}", id);
        return leaveRepository.findById(id);
    }

    /**
     * Delete the leave by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Leave : {}", id);
        leaveRepository.deleteById(id);
    }
}

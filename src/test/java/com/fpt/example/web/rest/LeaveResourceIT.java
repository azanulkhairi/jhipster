package com.fpt.example.web.rest;

import com.fpt.example.TestJhipsterApp;
import com.fpt.example.domain.Leave;
import com.fpt.example.repository.LeaveRepository;
import com.fpt.example.service.LeaveService;
import com.fpt.example.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.fpt.example.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link LeaveResource} REST controller.
 */
@SpringBootTest(classes = TestJhipsterApp.class)
public class LeaveResourceIT {

    private static final Long DEFAULT_DAYS_AMOUNT = 1L;
    private static final Long UPDATED_DAYS_AMOUNT = 2L;

    private static final Long DEFAULT_TAKEN_DAY = 1L;
    private static final Long UPDATED_TAKEN_DAY = 2L;

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private LeaveService leaveService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restLeaveMockMvc;

    private Leave leave;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LeaveResource leaveResource = new LeaveResource(leaveService);
        this.restLeaveMockMvc = MockMvcBuilders.standaloneSetup(leaveResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Leave createEntity(EntityManager em) {
        Leave leave = new Leave()
            .daysAmount(DEFAULT_DAYS_AMOUNT)
            .takenDay(DEFAULT_TAKEN_DAY);
        return leave;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Leave createUpdatedEntity(EntityManager em) {
        Leave leave = new Leave()
            .daysAmount(UPDATED_DAYS_AMOUNT)
            .takenDay(UPDATED_TAKEN_DAY);
        return leave;
    }

    @BeforeEach
    public void initTest() {
        leave = createEntity(em);
    }

    @Test
    @Transactional
    public void createLeave() throws Exception {
        int databaseSizeBeforeCreate = leaveRepository.findAll().size();

        // Create the Leave
        restLeaveMockMvc.perform(post("/api/leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leave)))
            .andExpect(status().isCreated());

        // Validate the Leave in the database
        List<Leave> leaveList = leaveRepository.findAll();
        assertThat(leaveList).hasSize(databaseSizeBeforeCreate + 1);
        Leave testLeave = leaveList.get(leaveList.size() - 1);
        assertThat(testLeave.getDaysAmount()).isEqualTo(DEFAULT_DAYS_AMOUNT);
        assertThat(testLeave.getTakenDay()).isEqualTo(DEFAULT_TAKEN_DAY);
    }

    @Test
    @Transactional
    public void createLeaveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = leaveRepository.findAll().size();

        // Create the Leave with an existing ID
        leave.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLeaveMockMvc.perform(post("/api/leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leave)))
            .andExpect(status().isBadRequest());

        // Validate the Leave in the database
        List<Leave> leaveList = leaveRepository.findAll();
        assertThat(leaveList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLeaves() throws Exception {
        // Initialize the database
        leaveRepository.saveAndFlush(leave);

        // Get all the leaveList
        restLeaveMockMvc.perform(get("/api/leaves?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(leave.getId().intValue())))
            .andExpect(jsonPath("$.[*].daysAmount").value(hasItem(DEFAULT_DAYS_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].takenDay").value(hasItem(DEFAULT_TAKEN_DAY.intValue())));
    }
    
    @Test
    @Transactional
    public void getLeave() throws Exception {
        // Initialize the database
        leaveRepository.saveAndFlush(leave);

        // Get the leave
        restLeaveMockMvc.perform(get("/api/leaves/{id}", leave.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(leave.getId().intValue()))
            .andExpect(jsonPath("$.daysAmount").value(DEFAULT_DAYS_AMOUNT.intValue()))
            .andExpect(jsonPath("$.takenDay").value(DEFAULT_TAKEN_DAY.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLeave() throws Exception {
        // Get the leave
        restLeaveMockMvc.perform(get("/api/leaves/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLeave() throws Exception {
        // Initialize the database
        leaveService.save(leave);

        int databaseSizeBeforeUpdate = leaveRepository.findAll().size();

        // Update the leave
        Leave updatedLeave = leaveRepository.findById(leave.getId()).get();
        // Disconnect from session so that the updates on updatedLeave are not directly saved in db
        em.detach(updatedLeave);
        updatedLeave
            .daysAmount(UPDATED_DAYS_AMOUNT)
            .takenDay(UPDATED_TAKEN_DAY);

        restLeaveMockMvc.perform(put("/api/leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLeave)))
            .andExpect(status().isOk());

        // Validate the Leave in the database
        List<Leave> leaveList = leaveRepository.findAll();
        assertThat(leaveList).hasSize(databaseSizeBeforeUpdate);
        Leave testLeave = leaveList.get(leaveList.size() - 1);
        assertThat(testLeave.getDaysAmount()).isEqualTo(UPDATED_DAYS_AMOUNT);
        assertThat(testLeave.getTakenDay()).isEqualTo(UPDATED_TAKEN_DAY);
    }

    @Test
    @Transactional
    public void updateNonExistingLeave() throws Exception {
        int databaseSizeBeforeUpdate = leaveRepository.findAll().size();

        // Create the Leave

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLeaveMockMvc.perform(put("/api/leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leave)))
            .andExpect(status().isBadRequest());

        // Validate the Leave in the database
        List<Leave> leaveList = leaveRepository.findAll();
        assertThat(leaveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLeave() throws Exception {
        // Initialize the database
        leaveService.save(leave);

        int databaseSizeBeforeDelete = leaveRepository.findAll().size();

        // Delete the leave
        restLeaveMockMvc.perform(delete("/api/leaves/{id}", leave.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Leave> leaveList = leaveRepository.findAll();
        assertThat(leaveList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Leave.class);
        Leave leave1 = new Leave();
        leave1.setId(1L);
        Leave leave2 = new Leave();
        leave2.setId(leave1.getId());
        assertThat(leave1).isEqualTo(leave2);
        leave2.setId(2L);
        assertThat(leave1).isNotEqualTo(leave2);
        leave1.setId(null);
        assertThat(leave1).isNotEqualTo(leave2);
    }
}

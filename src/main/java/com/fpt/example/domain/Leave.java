package com.fpt.example.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Leave.
 */
@Entity
@Table(name = "jhi_leave")
public class Leave implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "days_amount")
    private Long daysAmount;

    @Column(name = "taken_day")
    private Long takenDay;

    @OneToOne(mappedBy = "leave")
    @JsonIgnore
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDaysAmount() {
        return daysAmount;
    }

    public Leave daysAmount(Long daysAmount) {
        this.daysAmount = daysAmount;
        return this;
    }

    public void setDaysAmount(Long daysAmount) {
        this.daysAmount = daysAmount;
    }

    public Long getTakenDay() {
        return takenDay;
    }

    public Leave takenDay(Long takenDay) {
        this.takenDay = takenDay;
        return this;
    }

    public void setTakenDay(Long takenDay) {
        this.takenDay = takenDay;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Leave employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Leave)) {
            return false;
        }
        return id != null && id.equals(((Leave) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Leave{" +
            "id=" + getId() +
            ", daysAmount=" + getDaysAmount() +
            ", takenDay=" + getTakenDay() +
            "}";
    }
}

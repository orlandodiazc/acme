package com.ditod.acme.domain.revenue;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Revenue {
    @Id
    private String monthName;

    @NotNull
    private int revenue;

    public Revenue() {
    }

    public Revenue(String monthName, int revenue) {
        this.monthName = monthName;
        this.revenue = revenue;
    }

    public String getMonthName() {
        return monthName;
    }

    public int getRevenue() {
        return revenue;
    }
}

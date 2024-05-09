package com.ditod.acme.domain.revenue;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Revenue {
    private @Id String monthName;

    @NotNull
    private int revenue;

    public String getMonthName() {
        return monthName;
    }

    public int getRevenue() {
        return revenue;
    }
}

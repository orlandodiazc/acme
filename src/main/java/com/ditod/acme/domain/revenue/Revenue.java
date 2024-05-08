package com.ditod.acme.domain.revenue;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "revenues")
public class Revenue {
    private @Id String monthName;
    private int revenue;

    public String getMonthName() {
        return monthName;
    }

    public int getRevenue() {
        return revenue;
    }
}

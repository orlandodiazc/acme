package com.ditod.acme.domain.revenue;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RevenueController {
    private final RevenueRepository repository;

    public RevenueController(RevenueRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/revenues")
    List<Revenue> all() {
        return repository.findAll();
    }
}

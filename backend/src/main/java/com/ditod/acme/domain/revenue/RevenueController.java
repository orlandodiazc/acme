package com.ditod.acme.domain.revenue;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/revenues")
@Tag(name = "revenue", description = "Access monthly revenue statistics")
public class RevenueController {
    private final RevenueRepository repository;

    public RevenueController(RevenueRepository repository) {
        this.repository = repository;
    }

    @GetMapping()
    List<Revenue> allRevenues() {
        return repository.findAll();
    }
}

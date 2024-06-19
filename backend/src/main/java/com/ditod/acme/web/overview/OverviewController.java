package com.ditod.acme.web.overview;

import com.ditod.acme.web.overview.dto.OverviewResponse;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/overview")
@Tag(name = "overview", description = "Access statistics about your customers")
public class OverviewController {

    private final OverviewService overviewService;

    public OverviewController(OverviewService overviewService) {
        this.overviewService = overviewService;
    }

    @GetMapping()
    OverviewResponse overview() {
        return overviewService.findOverview();
    }


}

package com.ditod.acme.web.overview;

import com.ditod.acme.web.overview.dto.OverviewResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/overview")
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

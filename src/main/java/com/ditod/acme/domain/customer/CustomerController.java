package com.ditod.acme.domain.customer;

import com.ditod.acme.domain.customer.dto.CustomerFilteredResponse;
import com.ditod.acme.domain.customer.dto.CustomerSummaryResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/summary")
    List<CustomerSummaryResponse> allCustomersSummary() {
        return customerService.findAllSummary();
    }

    @GetMapping()
    List<CustomerFilteredResponse> customersByQuery(
            @RequestParam(required = false, defaultValue = "") String q) {
        return customerService.findCustomersByQuery(q);
    }
}

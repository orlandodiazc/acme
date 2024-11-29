package com.ditod.acme.web.customer;

import com.ditod.acme.domain.customer.CustomerService;
import com.ditod.acme.web.customer.dto.CustomerFilteredResponse;
import com.ditod.acme.web.customer.dto.CustomerSummaryResponse;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customers")
@Tag(name = "customer", description = "Everything about your customers")
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
    List<CustomerFilteredResponse> filteredCustomers(
            @RequestParam(required = false, defaultValue = "") String searchQuery) {
        return customerService.findCustomersByQuery(searchQuery);
    }
}

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
    private final CustomerRepository repository;

    public CustomerController(CustomerRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/summary")
    List<CustomerSummaryResponse> allCustomersSummary() {
        return repository.findAll(CustomerSummaryResponse.class);
    }

    @GetMapping()
    List<CustomerFilteredResponse> findCustomerByTerm(
            @RequestParam(required = false, defaultValue = "") String searchTerm) {
        return repository.findFilteredCustomers(searchTerm);
    }
}

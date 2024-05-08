package com.ditod.acme.domain.customer;

import com.ditod.acme.domain.customer.dto.CustomerFilteredDTO;
import com.ditod.acme.domain.customer.dto.CustomerSummaryDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController {
    private final CustomerRepository repository;

    public CustomerController(CustomerRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/customers/summary")
    List<CustomerSummaryDTO> all() {
        return repository.findSimpleAll();
    }

    @GetMapping("/customers")
    List<CustomerFilteredDTO> findByQuery(@RequestParam(required = false, defaultValue
            = "") String query) {
        return repository.findFilteredCustomers(query);
    }
}

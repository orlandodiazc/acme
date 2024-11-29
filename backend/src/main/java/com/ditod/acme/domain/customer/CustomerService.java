package com.ditod.acme.domain.customer;

import com.ditod.acme.exception.EntityDoesNotExistException;
import com.ditod.acme.web.customer.dto.CustomerFilteredResponse;
import com.ditod.acme.web.customer.dto.CustomerSummaryResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer findById(UUID id) {
        return customerRepository.findById(id)
                                 .orElseThrow(() -> new EntityDoesNotExistException("customer", id));
    }

    public List<CustomerSummaryResponse> findAllSummary() {
        return customerRepository.findAllBy(CustomerSummaryResponse.class);
    }

    public List<CustomerFilteredResponse> findCustomersByQuery(
            String searchQuery) {
        return customerRepository.findFilteredCustomers(searchQuery);
    }
}

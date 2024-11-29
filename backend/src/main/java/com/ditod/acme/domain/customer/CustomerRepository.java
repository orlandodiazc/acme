package com.ditod.acme.domain.customer;

import com.ditod.acme.web.customer.dto.CustomerFilteredResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    <T> List<T> findAllBy(Class<T> type);

    @Query(value = """
            SELECT c.id as id, c.name as name, c.email as email, ci.id as imageId,
                   COUNT(i.id) AS invoicesCount,
                   SUM(CASE WHEN i.status = 'pending' THEN i.amount ELSE 0 END) AS pendingTotal,
                   SUM(CASE WHEN i.status = 'paid' THEN i.amount ELSE 0 END) AS paidTotal
            FROM Customer c
            LEFT JOIN c.image ci
            LEFT JOIN c.invoices i
            WHERE c.name LIKE LOWER(CONCAT('%', :searchQuery, '%'))
                          OR LOWER(c.email) LIKE LOWER(CONCAT('%', :searchQuery, '%'))
            GROUP BY c.id, ci.id
            ORDER BY c.name ASC
            """)
    List<CustomerFilteredResponse> findFilteredCustomers(
            @Param("searchQuery") String searchQuery);


}

package com.ditod.acme.domain.customer;

import com.ditod.acme.domain.customer.dto.CustomerFilteredDTO;
import com.ditod.acme.domain.customer.dto.CustomerSummaryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    @Query("SELECT id as id, name as name FROM Customer")
    List<CustomerSummaryDTO> findSimpleAll();

    @Query(value = """   
            SELECT
                c.id as id,
                c.name as name,
                c.email as email,
                c.imageUrl as imageUrl,
                COUNT(i.id) as invoicesCount,
                SUM(CASE WHEN i.status = 'pending' THEN i.amount ELSE 0 END) AS pendingInvoicesTotal,
                SUM(CASE WHEN i.status = 'paid' THEN i.amount ELSE 0 END) AS paidInvoicesTotal
            FROM Customer c
            LEFT JOIN c.invoices i
            WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :term, '%')) OR LOWER(c.email) LIKE LOWER(CONCAT('%', :term, '%'))
            GROUP BY c.id
            ORDER BY c.name ASC
            """)
    List<CustomerFilteredDTO> findFilteredCustomers(@Param("term") String query);
}

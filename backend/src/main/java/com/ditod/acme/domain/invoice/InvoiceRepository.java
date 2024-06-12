package com.ditod.acme.domain.invoice;

import com.ditod.acme.domain.invoice.dto.InvoiceFilteredPageable;
import com.ditod.acme.domain.invoice.dto.InvoiceSummaryResponse;
import com.ditod.acme.domain.invoice.dto.InvoiceTotalByStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {

    <T> Optional<T> findById(UUID id, Class<T> type);

    List<InvoiceSummaryResponse> findTop5ByOrderByCreatedAtDesc();

    @Query(value = """
            SELECT
            SUM(CASE WHEN i.status = 'paid' THEN amount ELSE 0 END) AS paidInvoicesTotal,
            SUM(CASE WHEN i.status = 'pending' THEN amount ELSE 0 END) AS pendingInvoicesTotal
            FROM Invoice i
             """)
    InvoiceTotalByStatus findInvoiceTotalByStatus();

    @Query(value = """
            SELECT i.id as id, i.amount as amount, i.createdAt as createdAt,
                i.status as status, c.name as name, c.email as email, ci.id as imageId
            FROM Invoice i
            JOIN i.customer c
            LEFT JOIN c.image ci
            WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR
                LOWER(c.email) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR
                LOWER(CAST(i.amount AS string)) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR
                LOWER(CAST(i.createdAt AS string)) LIKE LOWER(CONCAT('%', :searchQuery, '%')) OR
                LOWER(i.status) LIKE LOWER(CONCAT('%', :searchQuery, '%'))
            ORDER BY i.createdAt DESC
              """)
    Page<InvoiceFilteredPageable> findFilteredInvoices(
            @Param("searchQuery") String searchQuery, Pageable pageable);
}

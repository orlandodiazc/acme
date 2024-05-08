package com.ditod.acme.domain.invoice;

import com.ditod.acme.domain.invoice.dto.InvoiceDetailsDTO;
import com.ditod.acme.domain.invoice.dto.InvoiceFilteredDTO;
import com.ditod.acme.domain.invoice.dto.InvoiceTotalByStatusDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {

    @Query(value = """
            SELECT i.id as id, i.amount as amount, c.name as name, c.imageUrl as imageUrl, c.email as email
            FROM Invoice i JOIN i.customer c
            ORDER BY i.processingDate
            """)
    List<InvoiceDetailsDTO> findLatestInvoices(Pageable pageable);

    @Query(value = """
            SELECT
            SUM(CASE WHEN i.status = 'paid' THEN amount ELSE 0 END) AS paidInvoicesTotal,
            SUM(CASE WHEN i.status = 'pending' THEN amount ELSE 0 END) AS pendingInvoicesTotal
            FROM Invoice i
             """)
    InvoiceTotalByStatusDTO findInvoiceTotalByStatus();

    @Query(value = """
            SELECT i.id as id, i.amount as amount, i.processingDate as processingDate,
                        i.status as status, c.name as name, c.email as email, c.imageUrl as imageUrl
            FROM Invoice i
            JOIN i.customer c
            WHERE
                LOWER(c.name) LIKE LOWER(CONCAT('%', :term, '%'))
                OR LOWER(c.email) LIKE LOWER(CONCAT('%', :term, '%'))
                OR CAST(i.amount AS string) LIKE LOWER(CONCAT('%', :term, '%'))
                OR CAST(i.processingDate AS string) LIKE LOWER(CONCAT('%', :term, '%'))
                OR CAST(i.status AS string) LIKE LOWER(CONCAT('%', :term, '%'))
            ORDER BY i.processingDate DESC
              """)
    Page<InvoiceFilteredDTO> findFilteredInvoices(@Param("term") String query,
                                                  Pageable pageable);
}

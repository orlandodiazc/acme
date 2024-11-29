package com.ditod.acme;

import com.ditod.acme.domain.customer.Customer;
import com.ditod.acme.domain.customer.CustomerRepository;
import com.ditod.acme.domain.customer_image.CustomerImage;
import com.ditod.acme.domain.customer_image.CustomerImageRepository;
import com.ditod.acme.domain.invoice.Invoice;
import com.ditod.acme.domain.invoice.InvoiceRepository;
import com.ditod.acme.domain.invoice.Status;
import com.ditod.acme.domain.permission.Permission;
import com.ditod.acme.domain.permission.PermissionRepository;
import com.ditod.acme.domain.revenue.Revenue;
import com.ditod.acme.domain.revenue.RevenueRepository;
import com.ditod.acme.domain.role.Role;
import com.ditod.acme.domain.role.RoleRepository;
import com.ditod.acme.domain.user.User;
import com.ditod.acme.domain.user.UserRepository;
import net.datafaker.Faker;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {
    @Value("${data-loader.images.directory}")
    private String IMAGES_DIRECTORY;
    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final CustomerRepository customerRepository;
    private final CustomerImageRepository customerImageRepository;
    private final InvoiceRepository invoiceRepository;

    private final RevenueRepository revenueRepository;

    public DataLoader(PermissionRepository permissionRepository,
                      RoleRepository roleRepository, UserRepository userRepository,
                      PasswordEncoder passwordEncoder,
                      CustomerRepository customerRepository,
                      CustomerImageRepository customerImageRepository,
                      InvoiceRepository invoiceRepository,
                      RevenueRepository revenueRepository) {
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customerRepository = customerRepository;
        this.customerImageRepository = customerImageRepository;
        this.invoiceRepository = invoiceRepository;
        this.revenueRepository = revenueRepository;
    }

    private byte[] readFileBytes(File file) {
        try {
            return Files.readAllBytes(file.toPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<String> permissions = List.of("CREATE", "READ", "UPDATE", "DELETE");
        for (String permission : permissions) {
            permissionRepository.save(new Permission(permission));
        }

        List<Permission> permissionsAllAccess = permissionRepository.findAll();
        Role adminRole = new Role("ROLE_ADMIN", permissionsAllAccess);
        roleRepository.save(adminRole);
        User admin = new User("admin@example.com", passwordEncoder.encode("123456"),
                              List.of(adminRole));
        userRepository.save(admin);

        List<Invoice> invoices = new ArrayList<>();
        List<Customer> customers = new ArrayList<>();
        Faker faker = new Faker();

        for (int i = 0; i < 10; i++) {
            String firstName = faker.name().firstName();
            String lastName = faker.name().lastName();
            String name = firstName + " " + lastName;
            String email = firstName + faker.letterify("??") + "@example.com";

            Customer newCustomer = new Customer(name, email);
            File userImageFile = new File(IMAGES_DIRECTORY + "/customer/" + i + ".jpg");
            byte[] userImageContent = readFileBytes(userImageFile);
            CustomerImage newCustomerImage = new CustomerImage(firstName + "'s avatar",
                                                               Files.probeContentType(
                                                                       userImageFile.toPath()),
                                                               userImageContent, newCustomer);
            newCustomer.setImage(newCustomerImage);
            customers.add(newCustomer);

            for (int j = 0; j < faker.number().numberBetween(1, 6); j++) {
                Invoice newInvoice = new Invoice(faker.number()
                                                      .numberBetween(5, 50000), faker.options()
                                                                                     .option(Status.class),
                                                 newCustomer);
                invoices.add(newInvoice);
            }
        }
        Collections.shuffle(customers);
        Collections.shuffle(invoices);

        customerRepository.saveAll(customers);
        invoiceRepository.saveAll(invoices);
        revenueRepository.saveAll(List.of(new Revenue("Jan", 2000), new Revenue("Feb", 1800),
                                          new Revenue("Mar", 2200), new Revenue("Apr", 2500),
                                          new Revenue("May", 2300), new Revenue("Jun", 3200),
                                          new Revenue("Jul", 3500), new Revenue("Aug", 3700),
                                          new Revenue("Sep", 2500), new Revenue("Oct", 2800),
                                          new Revenue("Nov", 3000), new Revenue("Dec", 4800)));
    }
}

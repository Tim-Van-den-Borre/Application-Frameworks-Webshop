package be.ehb.werkstuk.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Size(min = 4, max = 20, message = "The name of the product should be between 4 and 20 characters long.")
    private String name;

    @NotBlank(message = "Please enter a description.")
    private String description;

    @NotBlank(message = "Price cannot be empty")
    private double price;

    // add a product_category column to the product table.
    @OneToOne
    @JoinColumn(name = "product_category", nullable = false)
    private Category category;

    // constructor
    public Product() {
    }

    // getters & setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}

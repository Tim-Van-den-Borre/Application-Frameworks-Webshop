package be.ehb.werkstuk.dao;

import be.ehb.werkstuk.model.Category;
import be.ehb.werkstuk.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductDAO extends CrudRepository<Product, Integer> {

    @Query("SELECT p FROM Product p")
    Iterable<Product> getAll();

    Iterable<Product> getAllByCategory(Category category);
}

package be.ehb.backend.dao;

import be.ehb.backend.entity.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductDAO extends CrudRepository<Product, Integer> {
    Iterable<Product> findAllByCategory_Name(String category);
}

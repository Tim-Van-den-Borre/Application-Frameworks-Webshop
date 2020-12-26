package be.ehb.backend.dao;

import be.ehb.backend.entity.ProductOrder;
import org.springframework.data.repository.CrudRepository;

public interface ProductOrderDAO extends CrudRepository<ProductOrder, Integer> {

    Iterable<ProductOrder> findAllByUsername(String username);
}

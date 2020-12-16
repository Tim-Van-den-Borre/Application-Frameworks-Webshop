package be.ehb.backend.dao;

import be.ehb.backend.entity.Orders;
import org.springframework.data.repository.CrudRepository;

public interface OrdersDAO extends CrudRepository<Orders, Integer> {
}

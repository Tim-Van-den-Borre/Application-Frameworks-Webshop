package be.ehb.backend.dao;

import be.ehb.backend.entity.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryDAO extends CrudRepository<Category, Integer> {
}

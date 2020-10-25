package be.ehb.werkstuk.dao;

import be.ehb.werkstuk.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryDAO extends CrudRepository<Category, Integer> {
}
